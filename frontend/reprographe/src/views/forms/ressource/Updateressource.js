import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; // Importez toast et react-toastify
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

export default function Updateressource() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: id,
    name: '',
    description: '', 
    category: '',
    file:'',
  });
  const [initialressource, setInitialressource] = useState({});
  const [errors, setErrors] = useState(null); // Nouvel état pour stocker les erreurs

  useEffect(() => {
    const fetchressource = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/getoneressource/${id}`);
        setInitialressource(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la  Ressource pédagogique :', error);
      }
    };
    fetchressource();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      file: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(JSON.stringify(formData)===JSON.stringify(initialressource)){
      toast.info('aucune modification');
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('file', formData.file);
      
      await axios.put(
        `http://localhost:8080/api/updateressource/${id}`,
        formDataToSend
      );
      toast.success(' Ressource pédagogique mise à jour avec succès'); // Affichage de la notification de succès
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\' Ressource pédagogique :', error);
    }
  };

  return (
    <CContainer xl>
      <form onSubmit={handleSubmit}>
      {errors && ( // Afficher les erreurs si elles existent
          <div className="alert alert-danger" role="alert">
            {errors}
          </div>
        )}
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Mettre à jour une  Ressource pédagogique: {initialressource.name}</strong>
              </CCardHeader>
              <CCardBody>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Nom"
                    aria-label="Nom"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </CInputGroup>
                
                <CInputGroup className="mb-3" >
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
                    placeholder="Catégorie"
                    aria-label="Catégorie"
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />

                </CInputGroup>
                <CInputGroup className="mb-3">
                  <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                  />
                </CInputGroup>
                <CButton type="submit" color="primary" style={{"margin":"12px"}}>
                  Mettre à jour
                </CButton>
                <Link to="/forms/ressource">Retour à la liste des  Ressources pédagogiques</Link>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </form>
    </CContainer>
  );
}
