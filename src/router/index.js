import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Events from '../views/Events/Events.vue'
import RiverReports from '../views/RiverReports.vue'
import Employees from '../views/Employees.vue'
import AddEvent from '../views/Admin/addEvent.vue'
import SignUp from '../views/SignUp.vue'
import Account from '../views/Account.vue'
import UpdateRR from '../views/Admin/updateRiverReports.vue'
import BoulderCreek from '../views/Rivers/BoulderCreek.vue'
import AddEmployee from '../views/Admin/addEmployee.vue'
import SouthBoulderCreek from '../views/Rivers/SouthBoulderCreek.vue'
import EventPortal from '../views/Admin/EventPortal.vue'
import MyEvents from '../views/myEvents.vue'
import Classes from '../views/Events/classes.vue'
import AddClass from '../views/Admin/addClass.vue'
import MySubscriptions from '../views/mySubscriptions.vue'
import GuideTrips from '../views/GuideTrips.vue'
import Blog from '../views/Blog/Blog.vue'
import AddBlog from '../views/Admin/addBlog.vue'
import SingleBlog from '../views/Blog/singleBlog.vue'
import Email from '../views/emailDev.vue'
import BugsandBrews from '../views/Events/BugsandBrews.vue'
import FishAlongs from '../views/Events/FishAlongs.vue'
import CreekCleanUp from '../views/Events/CreekCleanUp.vue'
import IntroClasses from '../views/Events/Intro.vue'
import TyingClasses from '../views/Events/TyingClasses.vue'
import KidsCamp from '../views/Events/KidsCamp.vue'
import StVrain from '../views/Rivers/StVrain.vue'
import BigThompson from '../views/Rivers/BigThompson.vue'
//import AddKidsCamp from '../views/addKidsCamp.vue'
import KidsCampSignUp from '../views/KidsCamp/KidsCampSignUp.vue'
import Confirm from '../views/confirm.vue'
import Schedule from '../views/schedule.vue'
import Handler from '../views/emailHandler.vue'
import Sylvandale from '../views/GuideTrips/Sylvandale.vue'
import Phantom from '../views/GuideTrips/PhantomCanyon.vue'
import Boxwood from '../views/GuideTrips/Boxwood.vue'
import HalfDay from '../views/GuideTrips/HalfDay.vue'
import FullDay from '../views/GuideTrips/FullDay.vue'
import Forgot from '../views/Forgot.vue'
import Policies from '../views/Policies.vue'
import Delete from '../views/Admin/Delete.vue'
import BlueRiver from '../views/Rivers/BlueRiver.vue'
import SouthPlatte from '../views/Rivers/SouthPlatte.vue'
import Colorado from '../views/Rivers/Colorado.vue'
import Eagle from '../views/Rivers/Eagle.vue'
import Modify from '../views/Admin/ModifyEvent.vue'
import SpecialtyTrips from '../views/GuideTrips/SpecialtyTrips.vue'
import OtherEvents from '../views/Events/otherEvents.vue'
import OtherClasses from '../views/Events/otherClasses.vue'
import OneOnOne from '../views/Events/OneOnOne.vue'
import AddKC from '../components/AddKC.vue'
import Arkansas from '../views/Rivers/Arkansas.vue'
import RMNP from '../views/Rivers/RMNP.vue'
import ClearCreek from '../views/Rivers/ClearCreek.vue'
import Calendar from '../views/schedule.vue'
import Kids from '../views/KidsCamp/kids.vue'
import Youth from '../views/KidsCamp/youth.vue'
import TyingVideos from '../views/tyingVideos.vue'
import WhatToBring from '../views/GuideTrips/WhatToBring.vue'
import AddAnnouncements from '../views/Admin/addAnnouncements.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Events',
    name: 'Events',
    component: Events
  },
  {
    path: '/RiverReports',
    name: 'RiverReports',
    component: RiverReports
  },
  {
    path: '/Employees',
    name: 'Employees',
    component: Employees
  },
  {
    path: '/AddEvent',
    name: 'AddEvent',
    component: AddEvent
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/Account',
    name: 'Account',
    component: Account
  },
  {
    path: '/UpdateRR',
    name: 'UpdateRR',
    component: UpdateRR
  },
  {
    path: '/BoulderCreek',
    name: 'BoulderCreek',
    component: BoulderCreek
  },
  {
    path: '/AddEmployee',
    name: 'AddEmployee',
    component: AddEmployee
  },
  {
    path: '/SouthBoulderCreek',
    name: 'SouthBoulderCreek',
    component: SouthBoulderCreek
  },
  {
    path: '/EventPortal',
    name: 'EventPortal',
    component: EventPortal
  },
  {
    path: '/MyEvents',
    name: 'MyEvents',
    component: MyEvents
  },
  {
    path: '/Classes',
    name: 'Classes',
    component: Classes
  },
  {
    path: '/AddClass',
    name: 'AddClass',
    component: AddClass
  },
  {
    path: '/MySubscriptions',
    name: 'MySubscriptions',
    component: MySubscriptions
  },
  {
    path: '/GuideTrips',
    name: 'GuideTrips',
    component: GuideTrips
  },
  {
    path: '/Blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/AddBlog',
    name: 'AddBlog',
    component: AddBlog
  },
  {
    path: '/Blog/:id',
    name: 'SingleBlog',
    component: SingleBlog
  },
  {
    path: '/Email',
    name: 'Email',
    component: Email
  },
  {
    path: '/BugsandBrews',
    name: 'BugsandBrews',
    component: BugsandBrews
  },
  {
    path: '/FishAlongs',
    name: 'FishAlongs',
    component: FishAlongs
  },
  {
    path: '/CreekCleanUp',
    name: 'CreekCleanUp',
    component: CreekCleanUp
  },
  {
    path: '/IntroClasses',
    name: 'IntroClasses',
    component: IntroClasses
  },
  {
    path: '/TyingClasses',
    name: 'TyingClasses',
    component: TyingClasses
  },
  {
    path: '/KidsCamp',
    name: 'KidsCamp',
    component: KidsCamp
  },
  {
    path: '/StVrain',
    name: 'StVrain',
    component: StVrain
  },
  {
    path: '/BigThompson',
    name: 'BigThompson',
    component: BigThompson
  },
  {
    path: '/KidsCamp/:id/:date/:time',
    name: 'KidsCampSignUp',
    component: KidsCampSignUp
  },
  {
    path: '/:dbName/:eventID/:id/:date/:time/:title/:email',
    name: 'Confirm',
    component: Confirm
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule
  },
  {
    path: '/_/Handler',
    name: 'Handler',
    component: Handler
  },
  {
    path: '/Sylvandale',
    name: 'Sylvandale',
    component: Sylvandale
  },
  {
    path: '/Phantom',
    name: 'Phantom',
    component: Phantom
  },
  {
    path: '/Boxwood',
    name: 'Boxwood',
    component: Boxwood
  },
  {
    path: '/HalfDay',
    name: 'HalfDay',
    component: HalfDay
  },
  {
    path: '/FullDay',
    name: 'FullDay',
    component: FullDay
  },
  {
    path: '/Forgot',
    name: 'Forgot',
    component: Forgot
  },
  {
    path: '/Policies',
    name: 'Policies',
    component: Policies
  },
  {
    path: '/Delete',
    name: 'Delete',
    component: Delete
  },
  {
    path: '/BlueRiver',
    name: 'BlueRiver',
    component: BlueRiver
  },
  {
    path: '/SouthPlatte',
    name: 'SouthPlatte',
    component: SouthPlatte
  },
  {
    path: '/Colorado',
    name: 'Colorado',
    component: Colorado
  },
   {
      path: '/Modify',
      name: 'Modify',
      component: Modify
    },
    {
       path: '/SpecialtyTrips',
       name: 'SpecialtyTrips',
       component: SpecialtyTrips
     },
     {
        path: '/Eagle',
        name: 'Eagle',
        component: Eagle
      },
      {
         path: '/OtherEvents',
         name: 'OtherEvents',
         component: OtherEvents
       },
       {
          path: '/OtherClasses',
          name: 'OtherClasses',
          component: OtherClasses
        },
        {
           path: '/AddKC',
           name: 'AddKC',
           component: AddKC
         },
         {
            path: '/OneOnOne',
            name: 'OneOnOne',
            component: OneOnOne
          },
          {
             path: '/Arkansas',
             name: 'Arkansas',
             component: Arkansas
           },
           {
              path: '/RMNP',
              name: 'RMNP',
              component: RMNP
            },
            {
               path: '/ClearCreek',
               name: 'ClearCreek',
               component: ClearCreek
             },
             {
                path: '/Calendar',
                name: 'Calendar',
                component: Calendar
              },
              {
                 path: '/Kids',
                 name: 'Kids',
                 component: Kids
               },
               {
                  path: '/Youth',
                  name: 'Youth',
                  component: Youth
                },
                {
                   path: '/TyingVideos',
                   name: 'TyingVideos',
                   component: TyingVideos
                 },
                 {
                    path: '/WhatToBring',
                    name: 'WhatToBring',
                    component: WhatToBring
                  },
                  {
                     path: '/AddAnnouncements',
                     name: 'AddAnnouncements',
                     component: AddAnnouncements
                   }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }

})

export default router
