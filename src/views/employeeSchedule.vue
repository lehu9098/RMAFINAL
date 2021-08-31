<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" @click="getEvents(false)">All Shifts</v-btn>
          <v-btn outlined class="mr-4" @click="getEvents(true)">My Shifts</v-btn>
          <div class="flex-grow-1"></div>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title> {{startMonth}}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-btn outlined class="mr-4" @click="setToday">
            Today
          </v-btn>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

<v-sheet height="1000">
  <v-calendar
  ref="calendar"
  v-model="focus"
  color="primary"
  :events="events"
  :event-color="getEventColor"
  :event-margin-bottom="3"
  :now="today"
  :type="type"
  @click:event="showEvent"
  @click:more="viewDay"
  @click:date="type = 'day'"
  @change="updateRange"
  ></v-calendar>
  <v-menu
  v-model="selectedOpen"
  :close-on-content-click="false"
  :activator="selectedElement"
  offset-x
  >
  <v-card color="grey lighten-4" :width="350" flat>
    <v-toolbar :color="selectedEvent.color" dark>
      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-card-text>
      <form v-if="currentlyEditing !== selectedEvent.id">
        {{ selectedEvent.details }}
      </form>
    </v-card-text>
</v-card>
</v-menu>
</v-sheet>
</v-col>
</v-row>
</template>

<script>
import fb from '@/fb'
export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    name: null,
    details: null,
    start: null,
    end: null,
    color: '', // default event color
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false,
    dialogDate: false,
    names: [],
    employee: [],
    startTime: "",
    endTime: "",
    employeeName: "",
    employeeShifts: [],
    allShifts: [],

  }),
  mounted () {
    this.getEvents(false)
  },
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }
      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth
      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear
      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)
      switch (this.type) {
        case 'month':
        return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
        return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
        return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    }
  },
  methods: {
    getEmployeeShifts: function()
    {
      fb.auth.onAuthStateChanged(user => {
          user.getIdTokenResult().then(idTokenResult => {
            if(idTokenResult.claims.admin == true)
            {
              fb.db.collection('users').doc(user.uid).get().then(snapshot => {
                  fb.db.collection('calenderEvents').where("name", "==", snapshot.data().fullName).get().then(snapshot => {
                    console.log(snapshot.docs)
                    snapshot.docs.forEach(doc => {
                      this.events.push(doc.data())
                    })
                  })
              })
            }
          })
      })
    },
    getAllShifts: function()
    {
        let snapshot = fb.db.collection('calenderEvents').get()
        const events = []
        snapshot.forEach(doc => {
          let appData = doc.data()
          appData.id = doc.id
          events.push(appData)
        })
        this.events = events
    },
    async getEvents (bool) {
      if(bool == true){
        console.log(this.employeeShifts)
        this.events = this.employeeShifts;
      }
      else {
        console.log(this.allShifts)
          this.events = this.allShifts;
      }
    },
    setDialogDate( { date }) {
      this.dialogDate = true
      this.focus = date
    },
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    getEmployeeColor(employeeName){
      this.employee.forEach( emp => {
        if(emp.name === employeeName)
        {
          this.color = emp.color
        }
      });

    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    updateRange ({ start  }) {
      this.start = start
    },
    nth (d) {
      return d > 3 && d < 21
      ? 'th'
      : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    }
  },
  created()
  {
    fb.auth.onAuthStateChanged(user => {
        user.getIdTokenResult().then(idTokenResult => {
          if(idTokenResult.claims.admin == true)
          {
            fb.db.collection('users').doc(user.uid).get().then(snapshot => {
                fb.db.collection('calenderEvents').where("name", "==", snapshot.data().fullName).get().then(snapshot => {
                  snapshot.docs.forEach(doc => {
                    this.employeeShifts.push(doc.data())
                  })
                })
            })
          }
        })
    })
    fb.db.collection('calenderEvents').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        let appData = doc.data()
        appData.id = doc.id
        this.allShifts.push(appData)
      })
    })

  }
}
</script>
