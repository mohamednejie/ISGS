import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';

export default function Demandes() {
  const [demandes, setDemandes] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedDemandeId, setSelectedDemandeId] = useState(null);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getalldemande');
        setDemandes(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error);
        toast.error('Erreur lors de la récupération des demandes');
      }
    };
    fetchDemandes();
  }, []);

  const handleDeleteDemande = async (demandeId) => {
    try {
      await axios.put(`http://localhost:8080/api/refuserdemande/${demandeId}`);
      setDemandes(prevDemandes => prevDemandes.filter(demande => demande._id !== demandeId));
      toast.success('Demande refusée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de la demande:', error);
      toast.error('Erreur lors de la suppression de la demande');
    }
  };

  const handleAcceptDemande = async (demandeId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/accepterdemande/${demandeId}`);
      if (response.status === 200) {
        setDemandes(prevDemandes => prevDemandes.filter(demande => demande._id !== demandeId));
        toast.success('Demande acceptée avec succès et retirée de la liste');
      } else {
        toast.error('La demande n\'a pas pu être acceptée');
      }
    } catch (error) {
      console.error('Erreur lors de l\'acceptation de la demande:', error);
      toast.error('Erreur lors de l\'acceptation de la demande');
    }
  };

  const openUpdateForm = (demandeId) => {
    setShowUpdateForm(true);
    setSelectedDemandeId(demandeId);
  };

  const closeUpdateForm = () => {
    setShowUpdateForm(false);
    setSelectedDemandeId(null);
  };

  return (
    <div>
      <ToastContainer />
      <CContainer>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Liste des demandes</strong>
                
              </CCardHeader>
              <CCardBody>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Nombre de Copies</th>
                        <th>Couleur</th>
                        <th>Recto/Verso</th>
                        <th>Date de Demande</th>
                        <th>État</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demandes.map((demande, index) => (
                        <tr key={index}>
                          <td>{demande.userId ? demande.userId.username : 'No User'}</td>
                          <td>{demande.copieNumber}</td>
                          <td>{demande.couleur}</td>
                          <td>{demande.rectoVerso}</td>
                          <td>{new Date(demande.datedemande).toLocaleDateString()}</td>
                          <td>{demande.etat}</td>
                          <td>
                            <CButton color="danger" onClick={() => handleDeleteDemande(demande._id)}>
                              <FontAwesomeIcon icon={faTrash} title="Refuser" />
                            </CButton>
                            <CButton color="success" onClick={() => handleAcceptDemande(demande._id)} style={{ margin: '0 10px' }}>
                              <FontAwesomeIcon icon={faCheck} title="Accepter" />
                            </CButton>
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
      {showUpdateForm && (
        // Assuming Updateformation is a valid component that handles updating a demande
        <Updateformation demandeId={selectedDemandeId} onClose={closeUpdateForm} />
      )}
    </div>
  );
}
