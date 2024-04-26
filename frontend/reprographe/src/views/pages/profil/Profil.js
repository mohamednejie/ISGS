import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import QRCode from 'qrcode.react';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CButton
} from '@coreui/react';

export default function Profil() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/getoneporfil/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de votre profil :', error);
      }
    };
    fetchProfil();
  }, [id]);

  return (
    <div>
      <ToastContainer /> 
      <CContainer>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Mon profil</strong>
              </CCardHeader>
              <CCardBody>
                <div className="user-info">
                  <h3>Informations utilisateur</h3>
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <tbody>
                        <tr>
                          <th>Nom</th>
                          <td>{user && user.username}</td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>{user && user.email}</td>
                        </tr>
                        <tr>
                          <th>Mot de passe</th>
                          <td>{user && user.password}</td>
                        </tr>
                        <tr>
                          <th>Rôle</th>
                          <td>
                            {user && user.roles && user.roles.map((role, index) => (
                              <span key={index}>
                                {role.name}
                                {index < user.roles.length - 1 && ', '}
                              </span>
                            ))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="qr-code" style={{ textAlign: 'center' }}>
                  {user && <QRCode value={ window.location.origin + `/#/profile/${user._id}`} />}
                  <h3>QR Code</h3>
                </div>
                <div className="actions"> 
                  <Link to={`/updateprofile/${user && user._id}`} style={{ marginRight: '12px', textDecoration: 'none' }}>
                    <CButton type="submit" color="primary" style={{ width: '120px' }}>
                      <FontAwesomeIcon icon={faPenSquare} title="Modifier" style={{ marginRight: '5px' }} />
                      Modifier
                    </CButton>
                  </Link>
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <CButton type="submit" color="primary" style={{ width: '120px' }}>
                      Annuler
                    </CButton>
                  </Link>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}
