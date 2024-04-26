import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
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

export default function Reunion() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: id,
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',
    lieu:'',
  });
  const [initialEvent, setInitialEvent] = useState({});
  const [errors, setErrors] = useState(null); // État pour stocker les erreurs de validation

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/getonereunion/${id}`);
        setInitialEvent(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la réunion :', error);
      }
    };
    fetchEvent();
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
    if (JSON.stringify(formData) === JSON.stringify(initialEvent)) {
      toast.info('Aucune modification');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/updatereunion/${id}`, formData);
      toast.success('Réunion mise à jour avec succès');
      setFormData(response.data); // Mise à jour des données du formulaire avec la réponse de l'API
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la réunion :', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrors(error.response.data.error); // Stocker les erreurs de validation dans l'état
        toast.error(error.response.data.error); // Afficher l'erreur dans une notification toast
      } else {
        toast.error('Erreur lors de la mise à jour de la réunion');
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <CContainer xl>
        <form onSubmit={handleSubmit}>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>Mettre à jour une réunion: {initialEvent.titre}</strong>
                </CCardHeader>
                <CCardBody>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Titre"
                      aria-label="Titre"
                      type="text"
                      name="titre"
                      value={formData.titre}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Description"
                      aria-label="Description"
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Date de début"
                      aria-label="Date de début"
                      type="date"
                      name="date_debut"
                      value={formData.date_debut}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Date de fin"
                      aria-label="Date de fin"
                      type="date"
                      name="date_fin"
                      value={formData.date_fin}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Lieu"
                      aria-label="Lieu"
                      type="text"
                      name="lieu"
                      value={formData.lieu}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CButton type="submit" color="primary">
                    Mettre à jour
                  </CButton>
                  <Link to="/forms/Reunion">Retourner à la liste des réunions</Link>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </form>
      </CContainer>
    </div>
  );
}
