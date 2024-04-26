import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenSquare, faPlus,faLink } from '@fortawesome/free-solid-svg-icons';
import { toast,ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';
import Updatereunion from './Updatereunion';

export default function Reunion() {
  const [reunions, setReunions] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedReunionId, setSelectedReunionId] = useState(null);

  useEffect(() => {
    const fetchReunions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getallreunion');
        setReunions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des réunions :', error);
      }
    };
    fetchReunions();
  }, []);

  const handleDeleteReunion = async (reunionId) => {
    try {
      await axios.delete(`http://localhost:8080/api/deletereunion/${reunionId}`);
      setReunions(reunions.filter((reunion) => reunion._id !== reunionId));
      toast.success('Réunion supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de la réunion :', error);
      toast.error('Erreur lors de la suppression de la réunion');
    }
  };

  const openUpdateForm = (reunionId) => {
    setShowUpdateForm(true);
    setSelectedReunionId(reunionId);
  };

  const closeUpdateForm = () => {
    setShowUpdateForm(false);
    setSelectedReunionId(null);
  };

  return (<div>
     <ToastContainer />
      <CContainer>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Liste des réunions</strong>
              </CCardHeader>
              <CCardBody>
                <Link to="/forms/Addreunion"> 
                  <CButton color="primary" style={{ margin: '9px' }}>
                    <FontAwesomeIcon icon={faPlus} /> Ajouter une réunion
                  </CButton>
                </Link>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Titre</th>
                        <th>Date début</th>
                        <th>Date fin</th>
                        <th>Description</th>
                        <th>lieu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reunions.map((reunion) => (
                        <tr key={reunion._id}>
                          <td>{reunion.titre}</td>
                          <td>{reunion.date_debut}</td>
                          <td>{reunion.date_fin}</td>
                          <td>{reunion.description}</td>
                          <td>{reunion.lieu}</td>

                          <td>
                            <CButton onClick={() => handleDeleteReunion(reunion._id)}>
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ marginRight: '10px' }}
                                title="Supprimer"
                              />
                            </CButton>
                            <Link to={`/forms/Updatereunion/${reunion._id}`}>
                              <FontAwesomeIcon
                                icon={faPenSquare}
                                style={{ marginRight: '10px' }}

                                title="Modifier"
                              />
                            </Link>
                            <Link to={`/consulterreunion/${reunion._id}`}>
                            <FontAwesomeIcon icon={faLink} 
                                title="consulter"
                                style={{ marginLeft: '5px' }} 

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
      {showUpdateForm && <Updatereunion reunionId={selectedReunionId} onClose={closeUpdateForm} />}
    
    </div>
  );
}
