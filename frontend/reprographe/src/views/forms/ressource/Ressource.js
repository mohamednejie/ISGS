import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; 

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react';

export default function ressource() {
  const [ressource, setressource] = useState([]);

  useEffect(() => {
    const fetchressource = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getressource');
        setressource(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des ressources pédagogique  :', error);
      }
    };
    fetchressource();
  }, []);

  const handleDeleteressource = async (ressourceId) => {
    try {
      await axios.delete(`http://localhost:8080/api/deleteressource/${ressourceId}`);
      setressource(ressource.filter((ressource) => ressource._id !== ressourceId));
      toast.success('ressource pédagogique  supprimé avec succès'); 
    } catch (error) {
      console.error('Erreur lors de la suppression de la ressource pédagogique  :', error);
      toast.error('Erreur lors de la suppression de la ressource pédagogique ');
    }
  }

  return (
    <div>
      <ToastContainer /> 
      <CContainer>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Liste des ressources pédagogique</strong>
              </CCardHeader>
              <Link  to={"/forms/Ajouterressource"}>
              <CButton type="submit" color="primary" style={{ margin: '12px', width: '120px' }}>
                ajouter + </CButton> </Link>                
              <CCardBody>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Nom</th>                       
                        <th>Description</th>
                        <th>category</th>
                        <th>file</th>
                        <th>Actions</th> 
                      </tr>
                    </thead>
                    <tbody>
                      {ressource.map((ressource, index) => (
                        <tr key={index}>
                          <td>{ressource.name}</td>                          
                          <td>{ressource.description}</td>
                          <td>{ressource.category}</td>
                          <td>{ressource.file}</td>


                          <td>
                            <CButton onClick={() => handleDeleteressource(ressource._id)}>
                              <FontAwesomeIcon 
                                icon={faTrash} 
                                style={{ marginRight: '10px' }} 
                                title="Supprimer" 
                              />
                            </CButton>
                            <Link to={`/forms/Updateressource/${ressource._id}`}>
                              <FontAwesomeIcon
                                icon={faPenSquare}
                                title="Modifier"
                              />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}
