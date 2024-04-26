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

export default function NewReunionForm() {
  const [reunion, setReunion] = useState({
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',
    lieu: '',
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReunion({ ...reunion, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/creatreunion', reunion);
      console.log(response.data); // Log the response if needed
      toast.success('Réunion ajoutée avec succès'); // Display success notification

      // Réinitialiser le formulaire après la création réussie
      setReunion({
        titre: '',
        description: '',
        date_debut: '',
        date_fin: '',
        lieu: '',
      });
      setErrors(null); // Clear any previous errors
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // Display error notification
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <CContainer xl>
        <CRow className="justify-content-center">
          <CCol xs={12}>
            <CCard className="mt-4">
              <CCardHeader>
                <strong>Créer une nouvelle réunion</strong>
              </CCardHeader>
              <CCardBody>
                <form onSubmit={handleSubmit}>
                  {errors && (
                    <div className="alert alert-danger" role="alert">
                      {errors}
                    </div>
                  )}
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Titre"
                      type="text"
                      name="titre"
                      value={reunion.titre}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Description"
                      type="text"
                      name="description"
                      value={reunion.description}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Date de début"
                      type="date"
                      name="date_debut"
                      value={reunion.date_debut}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Date de fin"
                      type="date"
                      name="date_fin"
                      value={reunion.date_fin}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Lieu"
                      type="text"
                      name="lieu"
                      value={reunion.lieu}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CButton type="submit" color="primary" style={{ margin: '12px' }}>
                    Créer Réunion
                  </CButton>
                  <Link to="/forms/Reunion" style={{ color: 'secondary' }}>
                    Retour à la liste
                  </Link>
                </form>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}
