import React from 'react'

//Forms
const Reunion = React.lazy(() => import('./views/forms/Reunion/Reunion'))
const Ressource = React.lazy(() => import('./views/forms/ressource/Ressource'))
const UpdateEventForm = React.lazy(() => import('./views/User/UpdateEventForm'))
const Ajouterevent = React.lazy(()=> import('./views/User/ajouterevent'))
const Formation = React.lazy(() => import('./views/forms/formation/Formation'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const event = React.lazy(() => import('./views/forms/event/Event'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))
const User = React.lazy(() => import('./views/User/User'))
const Ajouterformation = React.lazy(() =>import('./views/forms/formation/Addformation'))
const Updateformation = React.lazy(()=> import('./views/forms/formation/Updateformation'))
const Consulterformation = React.lazy(()=> import('./views/forms/formation/Consulterformation'))
const Participationformation = React.lazy(()=> import('./views/forms/formation/Participationformation'))

const Consulterreunion = React.lazy(()=> import('./views/forms/Reunion/Consulterreunion'))

const Updatereunion = React.lazy(()=> import('./views/forms/Reunion/Updatereunion'))
const Ajouterreunion = React.lazy(() =>import('./views/forms/Reunion/Addreunion'))
const Ajouterressource = React.lazy(() =>import('./views/forms/ressource/Ajouterressource'))
const Updateressource = React.lazy(()=> import('./views/forms/ressource/Updateressource'))
const Login = React.lazy(()=> import('./components/header/AppHeaderDropdown'))
const Logout = React.lazy(()=> import('./components/header/AppHeaderDropdown'))
const Register = React.lazy(()=> import('./components/header/AppHeaderDropdown'))
const Profil=React.lazy(()=>import ('./views/pages/profil/Profil'))
const UpdateProfil=React.lazy(()=>import ('./views/pages/profil/Updateprofil'))
const ConsulterEvent = React.lazy(() => import('./views/forms/event/ConsulterEvent'))
const Participerevent=React.lazy(()=>import ('./views/forms/event/Participerevent'))
const Participationreun=React.lazy(()=>import ('./views/forms/Reunion/Participationreun'))








const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/User/:userId', name: 'User', element: User },
  { path: '/forms', name: 'Forms', element: Formation, exact: true },
  { path: '/forms/formation', name: 'Form Control', element: Formation },
  { path: '/forms/event', name: 'event', element: event },
  { path: '/forms/Reunion', name: 'Checks & Radios', element: Reunion },
  { path: '/forms/Updatereunion/:id', name: 'Updatereunion', element: Updatereunion },
  {path: '/forms/Addreunion', name: 'Addreunion', element: Ajouterreunion},
  {path: '/consulterreunion/:id', name: 'Addreunion', element: Consulterreunion},
  {path: '/participationreunion/:id', name: 'Addreunion', element: Participationreun},

  { path: '/forms/ressource', name: 'ressource', element: Ressource },
  { path: '/forms/UpdateEventForm/:id', name: 'UpdateEventForm', element: UpdateEventForm },
  { path: '/forms/Ajouterevent/:userId', name: 'Ajouterevent', element: Ajouterevent },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
 
  
  {path: '/sdbsd', name: 'Ajouterformation', element: Ajouterformation},
  {path: '/forms/Updateformation/:id', name: 'Updateformation', element: Updateformation},
  {path: '/consulterformation/:id', name: 'consulterformation', element: Consulterformation},
  {path: '/Participationformation/:id', name: 'Participationformation', element: Participationformation},

  
  {path: '/forms/Ajouterressource', name: 'Ajouterressource', element: Ajouterressource},
  {path: '/forms/Updateressource/:id', name: 'Updateressource', element: Updateressource},
  {path: '/login', name: 'Login', element: Login},
  {path: '/logout', name: 'Logout', element: Logout},

  {path: '/register', name: 'Register', element: Register},
  {path: '/profile/:id', name:'profil',element:Profil},
  {path: '/updateprofile/:id', name:'updateprofil',element:UpdateProfil},
  {path: '/consulterevent/:id', name: 'ConsulterEvent', element: ConsulterEvent },
  {path:'/forms/Participerevent/:id', name:'participerevent',element:Participerevent}

]

export default routes
