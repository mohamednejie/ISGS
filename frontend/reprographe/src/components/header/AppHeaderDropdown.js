import React from 'react';
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import {
  cilCreditCard,
  cilUser,
  cilLockLocked,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { faUser } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { Link } from 'react-router-dom'; 
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/logout');
      localStorage.removeItem('utilisateur');
      window.location.href = '/login'; 
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
    <CDropdownItem onClick={handleLogout}>
      <CIcon icon={cilLockLocked} className="me-2" />
      Logout
    </CDropdownItem>
  );
};

const AppHeaderDropdown = () => {
  const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
  const id = utilisateur ? utilisateur.id : '';
  const isConnected = utilisateur !== null;

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <FontAwesomeIcon icon={faUser} size="md" style={{ "marginTop": "10px" }} />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem>
          <CIcon icon={cilUser} className="me-2" />
          <Link to={`/profile/${id}`}>Profile</Link>
        </CDropdownItem>
        {!isConnected && (
          <>
            <CDropdownItem>
              <CIcon icon={cilUser} className="me-2" />
              <Link to={`/login`}>Login</Link>
            </CDropdownItem>
            <CDropdownItem>
              <CIcon icon={cilCreditCard} className="me-2" />
              <Link to="/register">Create Account</Link>
            </CDropdownItem>
          </>
        )}
        {isConnected && <Logout />}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
