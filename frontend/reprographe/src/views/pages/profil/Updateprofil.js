import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast ,ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer, 
  CFormInput,
  CInputGroup,
  CRow,
} from '@coreui/react';

export default function Profil() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email:'',
  });
  const [initialProfil, setInitialProfil] = useState({});

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/getoneporfil/${id}`);
        setInitialProfil(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error);
        toast.error('Erreur lors de la récupération du profil');
      }
    };
    fetchProfil();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si les valeurs du formulaire ont été modifiées
    if (JSON.stringify(formData) === JSON.stringify(initialProfil)) {
      toast.info('Aucune modification');
      return;
    }
    

    try {
      await axios.put(`http://localhost:8080/api/updateprofil/${id}`, formData);
      toast.success('Profil modifié avec succès');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Erreur de contrôle de saisie
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      } else {
        console.error('Erreur lors de la mise à jour du profil :', error);
        toast.error('Erreur lors de la mise à jour du profil');
      }
    }
  };

  return (<div>
    <ToastContainer/>
    <CContainer>
      <form onSubmit={handleSubmit}>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Modifier mon profil: {initialProfil.username}</strong>
              </CCardHeader>
              <CCardBody>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Nom d'utilisateur"
                    aria-label="Nom d'utilisateur"
                    type="text"
                    name="username"
                    value={formData.username || ''}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="email"
                    aria-label="email"
                    type="text"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Mot de passe"
                    aria-label="Mot de passe"
                    type="password"
                    name="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                  />
                </CInputGroup>
                
                <CButton type="submit" color="primary">
                  Mettre à jour
                </CButton>
                <Link to={`/profile/${id}`}>retourner vers votre profile</Link>             
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </form>
    </CContainer>
    </div>
  );
}
