import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbarjs } from '@/widgets/layout';

function NotificationPanel() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les notifications d'acceptation ou de rejet depuis le serveur
    async function fetchNotifications() {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
              console.error("Access token not found");
              return;
            }
        
            const config = {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            };
            
            const response = await axios.get('/user/jobseeker/notifications', config); // Utilisation de l'access token dans la configuration de la requête
            // Filtrer les notifications pour n'afficher que celles d'acceptation ou de rejet
            const filteredNotifications = response.data.filter(notification => {
              return notification.type === 'acceptation' || notification.type === 'rejet';
            });
            setNotifications(filteredNotifications);
        } catch (error) {
            console.error('Erreur lors de la récupération des notifications:', error);
        }
    }
    
    // Appeler la fonction pour récupérer les notifications lors du chargement du composant
    fetchNotifications();
  }, []);

  return (
    <>
      <Navbarjs/>
      <div className="notification-panel">
        <h2>Notifications</h2>
        <ul>
          {notifications.map(notification => (
            <li key={notification._id}>
              {notification.message}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default NotificationPanel;
