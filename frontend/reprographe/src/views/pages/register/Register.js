import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate();
  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, roles: [role] })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to register.');
      }
      // Affichage du message de succès
      setSuccessMessage('Account created successfully!');
   
         navigateTo('/login')   // Réinitialiser les champs du formulaire
      setUsername('');
      setEmail('');
      setPassword('');
      setRole('');
      // Effacer les messages d'erreur précédents
      setErrorMessage('');
    } catch (error) {
      console.error('Registration error:', error.message);
      // Afficher le message d'erreur
      setErrorMessage(error.message);
      // Effacer le message de succès précédent
      setSuccessMessage('');
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                      placeholder="Username" 
                      autoComplete="username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput 
                      placeholder="Email" 
                      autoComplete="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput 
                      type="password" 
                      placeholder="Password" 
                      autoComplete="new-password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormSelect 
                      autoComplete="role" 
                      value={role} 
                      onChange={(e) => setRole(e.target.value)}
                      >
                      <option value="" disabled>Select your role</option>
                      <option value="etudiant">etudiant</option>
                      <option value="prof">enseignant(e)</option>
                      <option value="modScolarite">bibliothecaire</option>
                      <option value="admin">Admin</option>
                      <option value="admin">reprographe</option>

                   </CFormSelect>
                  </CInputGroup>
                  {errorMessage ? (
                    <p className="text-danger">{errorMessage}</p>
                  ) : successMessage ? (
                    <p className="text-success">{successMessage}</p>
                  ) : null}
                  <div className="d-grid">
                    <CButton color="success" onClick={handleRegister}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
