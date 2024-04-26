import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  CFormSelect,
} from '@coreui/react';

export default function ModifyDemande() {
  const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
  const userId = utilisateur ? utilisateur.id : '';
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    copieNumber: '',
    couleur: '',
    rectoVerso: ''
  });

  useEffect(() => {
    const fetchDemande = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/getonedemande/${id}`);
        setFormData({
          copieNumber: response.data.copieNumber || '',
          couleur: response.data.couleur || '',
          rectoVerso: response.data.rectoVerso || ''
        });
      } catch (error) {
        console.error('Erreur lors de la récupération de la demande:', error);
        toast.error('Failed to fetch demande data');
      }
    };
    fetchDemande();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/updatedemande/${id}`, formData);
      toast.success('Demande mise à jour avec succès');
      navigate(`/User/${userId}`);
    } catch (error) {
      console.error('Erreur lors de l’envoi de la demande:', error.response?.data || error.message);
      toast.error(`Échec de l'envoi de la demande: ${error.response?.data?.error || "Erreur inconnue"}`);
    }
  };

  return (
    <CContainer>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Mettre à jour une demande</strong>
              </CCardHeader>
              <CCardBody>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Nombre de copies"
                    aria-label="Nombre de copies"
                    type="number"
                    name="copieNumber"
                    value={formData.copieNumber}
                    onChange={handleChange}
                    required
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormSelect aria-label="Recto Verso" name="rectoVerso" value={formData.rectoVerso} onChange={handleChange}>
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </CFormSelect>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormSelect aria-label="Couleur" name="couleur" value={formData.couleur} onChange={handleChange}>
                    <option value="Noir et blanc">Noir et blanc</option>
                    <option value="Couleur">Couleur</option>
                  </CFormSelect>
                </CInputGroup>
                <CButton type="submit" color="primary" style={{marginRight:'9px'}}>Mettre à jour</CButton>
                <Link to={`/User/${userId}`} className="btn btn-secondary ml-2">Annuler</Link>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </form>
    </CContainer>
  );
}
