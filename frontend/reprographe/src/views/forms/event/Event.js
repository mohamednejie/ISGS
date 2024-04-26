import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';

export default function AcceptedDemandes() {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getaccepteddemande');
        setDemandes(response.data);
      } catch (error) {
        console.error('Error retrieving accepted demandes:', error);
        toast.error('Failed to retrieve accepted demandes.');
      }
    };
    fetchDemandes();
  }, []);

  const handleDeleteDemande = async (demandeId) => {
    try {
      await axios.delete(`http://localhost:8080/api/deleteAccepted/${demandeId}`);
      setDemandes(demandes.filter(demande => demande.demandeId !== demandeId));
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
                <strong>List of Accepted Demandes</strong>
              </CCardHeader>
              <CCardBody>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Number of Copies</th>
                        <th>Color</th>
                        <th>Request Date</th>
                        <th>Acceptance Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demandes.map((demande, index) => (
                        <tr key={index}>
                          <td>{demande.username}</td>
                          <td>{demande.copieNumber}</td>
                          <td>{demande.couleur}</td>
                          <td>{new Date(demande.datedemande).toLocaleDateString()}</td>
                          <td>{new Date(demande.dateAcceptation).toLocaleDateString()}</td>
                          <td>
                            <CButton color="danger" onClick={() => handleDeleteDemande(demande.demandeId)}>
                              <FontAwesomeIcon icon={faTrash} title="Remove" />
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
    </div>
  );
}
