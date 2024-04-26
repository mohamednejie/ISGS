import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
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
} from '@coreui/react'

export default function Ajouterressource() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    file: '',
  });
  const [errors, setErrors] = useState(null); // Nouvel état pour stocker les erreurs

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8080/api/createressource', formData)
      console.log(response.data) // Log the response if needed
      toast.success('ressource pédagogique  ajouté avec succès') // Display success notification
      // Clear form after successful submission if needed
      setFormData({
        name: '',
        description: '',
        category: '',       
        file: '',
      })
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrors(error.response.data.error); // Stocker les erreurs dans l'état
      }
    }
  }

  return (
    <CContainer>
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
                <strong>Créer une nouvelle ressource pédagogique </strong>
              </CCardHeader>
              <CCardBody>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Nom de la ressource pédagogique "
                    aria-label="Nom de la ressource pédagogique "
                    type="text"
                    name="name"
                    value={formData.name}
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
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="category"
                    aria-label="category"
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                </CInputGroup>
                
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="importer le fichier "
                    aria-label="file"
                    type="file"
                    name="file"
                    value={formData.file}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CButton type="submit" color="primary" style={{ marginRight: '10px' }}>
                  Créer une ressource pédagogique 
                </CButton>
                <Link to="/forms/ressource">
                  <CButton color="secondary">Retour à la liste</CButton>
                </Link>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </form>
    </CContainer>
  )
}
