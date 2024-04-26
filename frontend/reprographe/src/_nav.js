import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilDescription,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
const id = utilisateur ? utilisateur.id : '';
const isConnected = utilisateur !== null;

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  {
    component: CNavTitle,
    name: 'tache',
  },
  {
    component: CNavGroup,
    name: 'gérer',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Demande ',
        to: '/forms/formation',
      },
     
      {
        component: CNavItem,
        name: 'Demande accepté',
        to: '/forms/event',
      },

     
      
    ],
  },

  {
    component: CNavItem,
    name: 'espace Personnel',
    to: `/User/${id}`,
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  
  
  
  
]

export default _nav
