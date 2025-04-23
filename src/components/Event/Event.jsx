import React, { useContext, useState } from 'react'
import styles from './Event.module.scss'
import defaultBackground from '../../assets/images/background.jpg'
import location from '../../assets/icons/location.svg'
import menu from '../../assets/icons/menu.svg'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const Event = ({ event, organizer }) => {
  const { user } = useContext(AuthContext);

  const [participants, setParticipants] = useState(event.participants || []);
  const [isEventMenuOpen, setIsEventMenuOpen] = useState(false);
  const isParticipating = participants.includes(user?.id);

  if(!event) return null;
  if(!user) return null;

  const isOrganizer = user.id === event.organizerId ? true : false;

  const handleEventDelete = async (id) => {
    if (window.confirm("Вы уверены что хотите удалить данное событие?")) {
        try {
            await axios.delete(`http://localhost:5000/events/${id}`);
            console.log("Событие удалено");
        } catch (error) {
            console.error('Ошибка при удалении события:', error);
        }
    }
  };

  const handleParticipation = async () => {
    try {
      let updatedParticipants;
      if (isParticipating) {
        updatedParticipants = participants.filter(id => id !== user.id);
      } else {
        updatedParticipants = [...participants, user.id];
      }
  
      await axios.put(`http://localhost:5000/events/${event.id}`, {
        ...event,
        participants: updatedParticipants,
      });
      setParticipants(updatedParticipants);
      console.log(isParticipating);
    } catch (error) {
      console.error("Ошибка при обновлении участия:", error);
    }
  };
  

  return (
    <div className={styles.event}>
      <div className={styles.eventImageWrapper}>
        <img className={styles.eventImage} src={event?.image || defaultBackground} alt="" />
      </div>
      <div className={styles.eventInfo}>
        <div className={styles.eventTitleWrapper}>
          <h2 className={styles.eventTitle}>{event.title}</h2>
          {isOrganizer && (
            <>
            <button className={`${styles.menuButton} ${isEventMenuOpen ? styles.active : ''}`} onClick={() => setIsEventMenuOpen(!isEventMenuOpen)}>
                <img className={styles.menuIcon} src={menu} alt="" />
            </button>
            {isEventMenuOpen && (
                <div className={styles.menuContent}>
                    <button className={styles.deleteButton} onClick={() => handleEventDelete(event.id)}>
                        <span>Удалить</span>
                    </button>
                </div>
            )}
            </>
            )}
        </div>
        <div className={styles.eventDateTime}>
            <p className={styles.eventDate}>{event.date}</p>
            <span className={styles.dot}>·</span>
            <p className={styles.eventTime}>{event.time}</p>
        </div>
        <div className={styles.eventLocation}>
          <img className={styles.locationIcon} src={location} alt="" />
          <span className={styles.locationText}>{event.location}</span>
        </div>
        <p className={styles.eventDescription}>{event.description}</p>
        <div className={styles.eventActions}>
          <p className={styles.eventOrganizer}>Организатор: {organizer?.name} {organizer?.surname}</p>
          {
            !isOrganizer && (
              <button className={styles.joinButton} onClick={handleParticipation}>
                {isParticipating ? 'Отменить участие' : 'Участвовать'}
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Event