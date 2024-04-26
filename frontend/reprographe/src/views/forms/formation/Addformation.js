import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
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

export default function envoyerdemande() {
  const [formation, setFormation] = useState({
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormation({ ...formation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/creatformation', formation);
      console.log(response.data); // Log the response if needed
      toast.success('Formation ajoutée avec succès'); // Display success notification

      // Réinitialiser le formulaire après la création réussie
      setFormation({
        titre: '',
        description: '',
        date_debut: '',
        date_fin: '',
      });
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrors(error.response.data.error); // Stocker les erreurs dans l'état
        toast.error(error.response.data.error)
      }
      toast.error('Erreur lors de la création de la formation'); // Display error notification
    }
  };

  return (
    <CContainer>
      <ToastContainer />
      <CRow className="justify-content-center">
        <CCol xs={12}>
          <CCard className="mt-4">
            <CCardHeader>
              <strong>Créer une nouvelle formation</strong>
            </CCardHeader>
            <CCardBody>
              <form onSubmit={handleSubmit}>
                
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Titre"
                    type="text"
                    name="titre"
                    value={formation.titre}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Description"
                    type="text"
                    name="description"
                    value={formation.description}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Date de début"
                    type="date"
                    name="date_debut"
                    value={formation.date_debut}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Date de fin"
                    type="date"
                    name="date_fin"
                    value={formation.date_fin}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CButton type="submit" color="primary" style={{ margin: '12px' }}>
                  Créer Formation
                </CButton>
                <Link to="/forms/formation" style={{ color: 'secondary' }}>
                  Retour à la liste
                </Link>
              </form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}
