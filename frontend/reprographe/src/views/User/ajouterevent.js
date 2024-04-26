import React, { useState } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CRow,
  CFormInput,
  CFormLabel,
  CFormSelect
} from '@coreui/react';

const EnvoyerDemandeForm = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [demandeDetails, setDemandeDetails] = useState({
    copieNumber: '',
    couleur: 'Noir et blanc',
    rectoVerso: 'Non',
    fileId: null, // This needs specific handling for file uploads if required
    filePath: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDemandeDetails(prevState => ({ ...prevState, [name]: value }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/envoyerdemande/${userId}`, demandeDetails);
      toast.success('Demande envoyée avec succès!', {
        onClose: () => navigate(`/user-demandes/${userId}`),
        delay: 500 // Delays navigation until toast is shown
      });
    } catch (error) {
      console.error('Erreur lors de l`envoi de la demande:', error.response?.data || error.message);
      toast.error(`Échec de l'envoi de la demande: ${error.response?.data?.error || "Erreur inconnue"}`);
    }
  };

  return (
    <CContainer>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Envoyer une Demande</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="copieNumber">Nombre de Copies</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormInput type="number" id="copieNumber" name="copieNumber" value={demandeDetails.copieNumber} onChange={handleChange} required />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="couleur">Couleur</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormSelect name="couleur" id="couleur" value={demandeDetails.couleur} onChange={handleChange}>
                      <option value="Noir et blanc">Noir et blanc</option>
                      <option value="Couleur">Couleur</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="rectoVerso">Recto Verso</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormSelect name="rectoVerso" id="rectoVerso" value={demandeDetails.rectoVerso} onChange={handleChange}>
                      <option value="Non">Non</option>
                      <option value="Oui">Oui</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CButton type="submit" color="primary">Envoyer</CButton>
                <Link to={`/User/${userId}`}><CButton>annuler</CButton></Link>             

              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default EnvoyerDemandeForm;
