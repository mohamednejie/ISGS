import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css'; 
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CButton,
} from '@coreui/react';

const ParticipationList = () => {
  const [participations, setParticipations] = useState([]);
  const { id } = useParams();
   console.log(id)
  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/getparticpreun/${id}`);
              setParticipations(participations.filter((participation) => participation._id !== reunId));

        setParticipations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la liste des participations :', error);
        toast.error('Erreur lors de la récupération de la liste des participations');
      }
    };
    fetchParticipations();
  }, []);

  const cancelparticipation = async (reunId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cancelpartreun/${reunId}`);
      setParticipations(participations.filter((participation) => participation._id !== reunId));
      toast.success('Participation à l\'événement supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de la participation à la réunion:', error);
      toast.error('Erreur lors de la suppression de la participation à la réunion');
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
                <strong>Liste des participations aux réunions</strong>
              </CCardHeader>
              <CCardBody>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                      <th>id</th>

                        <th>réunion</th>
                        <th>Utilisateur</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participations?.map((participation, index) => (
                        <tr key={index}>
                            <td>{participation.reunId}</td>
                          <td>{participation.titre}</td>
                          <td>{participation.username}</td>
                          <td>{participation.email}</td>
                          <td>
                            <CButton onClick={() => cancelparticipation(participation._id)}>
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ marginRight: '10px' }}
                                title="Supprimer"
                              />
                            </CButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <CButton type="submit" color="primary" style={{ margin: '12px', width: '100px' }}>
                 <Link to="/forms/Reunion" style={{ textDecoration: 'none', color: 'inherit'}}>Annuler</Link>
                            </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default ParticipationList;
