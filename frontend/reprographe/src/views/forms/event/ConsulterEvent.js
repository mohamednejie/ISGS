import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { CButton, CContainer } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGroupArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: '20px',
  },
};

export default function ConsulterEvenement() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/getoneevenent/${id}`);
        setEvent(response.data);
        console.log('Chemin de l\'image :', response.data.filePath); // Ajout du console.log
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'événement :', error);
      }
    };
    fetchEvent();
  }, [id]);

  const participer = async () => {
    const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
    if (!utilisateur || !utilisateur.id) {
      console.error('ID de l\'utilisateur non disponible');
      return;
    }
    const userId = utilisateur.id;

    try {
      const response = await axios.post(`http://localhost:8080/api/participatevent/${id}/${userId}`);
      console.log('Participation réussie:', response.data);
      toast.success('Participation réussie')
    } catch (error) {
      console.error('Erreur lors de la participation à l\'événement :', error);
    }
  };

  if (!event) {
    return <div style={styles.container}>Chargement en cours...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <CContainer>
        <div style={styles.container}>
          <h1>{event.name}</h1>
          <p>Date: {event.date}</p>
          <p>Lieu: {event.lieu}</p>
          <p>Description: {event.description}</p>
          <p>Durée: {event.duree}</p>

          {event.filePath && (
            <div>
              <p>Image de l'événement :</p>
             
             <img src={`http://localhost:8080/${event.filePath}`} alt="Event" style={styles.image} />
              <p>Chemin du fichier de l'événement : {event.filePath}</p>
            </div>
          )}

          <CButton type="submit" color="primary" onClick={participer} style={{ margin: '12px', width: '120px' }}>
            Participer
            <FontAwesomeIcon icon={faGroupArrowsRotate} style={{ marginLeft: '5px' }} />
          </CButton>

          <Link to={`/forms/Participerevent/${id}`}>
            <CButton type="submit" color="primary" style={{ margin: '12px', width: '220px' }}>
              Liste de participation
              <FontAwesomeIcon icon={faGroupArrowsRotate} style={{ marginLeft: '5px' }} />
            </CButton>
          </Link>

          <CButton type="submit" color="primary" style={{ margin: '12px', width: '100px' }}>
            <Link to="/forms/event" style={{ textDecoration: 'none', color: 'inherit' }}>Annuler</Link>
          </CButton>
        </div>
      </CContainer>
    </div>
  );
}
