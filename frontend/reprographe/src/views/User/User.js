import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';

const UserDemandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [error, setError] = useState('');
  const { userId } = useParams();

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/getuserdemande/${userId}`);
        setDemandes(response.data);
      } catch (err) {
        console.error('Error retrieving user demandes:', err);
        setError('Failed to retrieve demandes: ' + err.message);
        toast.error('Failed to retrieve demandes.');
      }
    };

    fetchDemandes();
  }, [userId]);

  const handleDeleteDemande = async (demandeId) => {
    try {
      await axios.delete(`http://localhost:8080/api/deletedemande/${demandeId}`);
      setDemandes(demandes.filter(demande => demande._id !== demandeId));
      toast.success('Demande successfully removed');
    } catch (error) {
      console.error('Error deleting the demande:', error);
      toast.error('Failed to delete the demande.');
    }
  };

  

  return (
    <div>
      <ToastContainer />
      <CContainer>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Liste des Demandes de l'Utilisateur</strong>
              </CCardHeader>
              
              <Link to={`/forms/Ajouterevent/${userId}`}>
                <CButton type="submit" color="primary" style={{ margin: '12px', width: '210px' }}>
                 Envoyer une demande
                </CButton>
              </Link>
              <CCardBody>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Date de Demande</th>
                        <th>Nombre de Copies</th>
                        <th>Couleur</th>
                        <th>Recto Verso</th>
                        <th>État</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demandes.map((demande, index) => (
                        <tr key={index}>
                          <td>{demande.username}</td>
                          <td>{new Date(demande.datedemande).toLocaleDateString()}</td>
                          <td>{demande.copieNumber}</td>
                          <td>{demande.couleur}</td>
                          <td>{demande.rectoVerso}</td>
                          <td>{demande.etat}</td>
                          <td>
                            {demande.etat !== "Acceptée" && (<CButton color="danger" onClick={() => handleDeleteDemande(demande._id)}>
                              <FontAwesomeIcon icon={faTrash} title="Remove" />
                            </CButton>)}
                            {
                              demande.etat === "En attente" && (
                             <Link to={`/forms/UpdateEventForm/${demande._id}`}>
                              <CButton color="info" style={{ marginLeft: '10px' }}>
                                <FontAwesomeIcon icon={faPenSquare} title="Modify" />
                              </CButton>
                             </Link>
                             )
                            }
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
};

export default UserDemandes;
