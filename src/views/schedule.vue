<template>
<v-container>
  <v-app id="inspire" class="mb-12">
    <v-row class="mb-10">
      <v-col class="mb-12">
        <div class="pa-4" style="border-bottom: 1px solid black; border-top: 1px solid black;">
          <h1 style="text-align:center;" class="text-uppercase">Calendar</h1>
        </div>
        <v-sheet height="64">
          <v-toolbar flat class="d-flex justify-space-around white">
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon large>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar" class="px-10">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon large>
                mdi-chevron-right
              </v-icon>
            </v-btn>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="100%">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
            max-width="400"
          >
            <v-card color="grey lighten-4" min-width="250" max-height="400" flat style="overflow: scroll;">
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn text color="white" route :to="selectedEvent.catagory">
                  <v-icon small>
                    near_me
                  </v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.time"></span>
                <br />
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-app>
</v-container>
</template>

<script>
import fb from '@/fb'
export default{

  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange darken-2', 'grey darken-1', 'pink', 'yellow darken-2']
  }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay ({ date }) {
      if(this.type == 'month')
      {
        this.focus = date
        this.type = 'day'
      }
      else{
        this.type = 'month'
      }
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    timeFormatted: function(time)
    {
      var timeFormatted;
      var timeCheck = time.slice(0, 2)
      if(timeCheck <= 12)
      {
        if(timeCheck >= 10)
        {
          timeFormatted = time.slice(0, 5) + " AM";
        }
        else {
          timeFormatted = time.slice(1, 5) + " AM";
        }

      }
      else{

        timeFormatted =  (timeCheck-12) + time.slice(2, 5) + " PM";
      }
      return timeFormatted;
    },
    updateRange () {
      const events = []
        fb.db.collection('upcomingEvent').get().then((snapshot) => {
          snapshot.docs.forEach((doc) => {

            if(doc.data().catagory == "FishAlongs"){
              events.push({
                name: doc.data().title,
                start: doc.data().date,
                end: doc.data().date,
                color: this.colors[0],
                catagory: doc.data().catagory,
                details: doc.data().description,
                time: this.timeFormatted(doc.data().time[0])
                })
            }
            if(doc.data().catagory == "BugsandBrews"){
              events.push({
                name: doc.data().title,
                start: doc.data().date,
                end: doc.data().date,
                color: this.colors[1],
                catagory: doc.data().catagory,
                details: doc.data().description,
                time: this.timeFormatted(doc.data().time[0])
                })
            }
            if(doc.data().catagory == "CreekCleanup"){
              events.push({
                name: doc.data().title,
                start: doc.data().date,
                end: doc.data().date,
                color: this.colors[2],
                catagory: doc.data().catagory,
                details: doc.data().description,
                time: this.timeFormatted(doc.data().time[0])
                })
            }
            if(doc.data().catagory == "otherEvents"){
              events.push({
                name: doc.data().title,
                start: doc.data().date,
                end: doc.data().date,
                color: this.colors[3],
                catagory: doc.data().catagory,
                details: doc.data().description,
                time: this.timeFormatted(doc.data().time[0])
                })
            }
            if(doc.data().catagory == "IntroClasses"){
              events.push({
                name: doc.data().title,
                start: doc.data().date,
                end: doc.data().date,
                color: this.colors[4],
                catagory: doc.data().catagory,
                details: doc.data().description,
                time: this.timeFormatted(doc.data().time[0])
                })
            }
            if(doc.data().catagory == "TyingClasses"){
              events.push({
                name: doc.data().title ,
                start: doc.data().date,
                end: doc.data().date,
                color: this.colors[5],
                catagory: doc.data().catagory,
                details: doc.data().description,
                time: this.timeFormatted(doc.data().time[0])
                })
            }
            if(doc.data().catagory == "kidsCamp"){
              events.push({
                name: doc.data().title,
                start: doc.data().date,
                end: doc.data().enddate,
                color: this.colors[6],
                catagory: doc.data().catagory,
                details: doc.data().description,
                time: this.timeFormatted(doc.data().time[0])
                })
            }
            if(doc.data().catagory == "otherClasses"){
              events.push({
                name: doc.data().title,
                start: doc.data().date,
                end: doc.data().date,
                color: this.colors[7],
                catagory: doc.data().catagory,
                details: doc.data().description,
                time: this.timeFormatted(doc.data().time[0])
                })
            }
          })
        }).then(() => {
          fb.db.collection('SpecialtyTrips').get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              events.push({
                name: doc.data().type,
                start: doc.data().date,
                end: doc.data().date,
                color: this.colors[8],
                catagory: doc.data().trip,
                details: "",
                time: ""
                })
            })
          })
        })
      this.events = events
    },
  },
}
</script>
