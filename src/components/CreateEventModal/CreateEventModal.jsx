import React, { useContext, useEffect, useState } from 'react'
import styles from './CreateEventModal.module.scss'
import defaultBackground from '../../assets/images/background.jpg';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const CreateEventModal = ({ isOpen, onClose, onEventCreated }) => {
    const { user } = useContext(AuthContext);
    const [eventImage, setEventImage] = useState("");
    const [eventTitle, setEventTitle] = useState("");
    const [eventDateTime, setEventDateTime] = useState("");
    const [eventCity, setEventCity] = useState("")
    const [eventLocation, setEventLocation] = useState("");
    const [eventDescription, setEventDescription] = useState("");

    if (!isOpen) return null;
    if (!user) return null;

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEventImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleEventSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const [date, eventTime] = eventDateTime.split("T");
            const eventDate = formatDate(date); 

            const response = await axios.post('http://localhost:5000/events', {
                id: String(Date.now()),
                organizerId: user.id,
                image: eventImage, // Изображение
                title: eventTitle, // 
                date: eventDate, // Дата события
                time: eventTime, // Время события
                city: eventCity, // Город
                location: eventLocation, // Местоположение
                description: eventDescription, // Описание события
                participants: [], // Участники (пустой массив, если нет участников)
            });
            console.log('Событие добавлено:', response.data);
            onClose(); 
            onEventCreated();
        } catch (error) {
            console.error('Ошибка при добавлении события:', error);
        }
    };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
                <h2>Создать событие</h2>
                <button className={styles.closeButton} onClick={onClose}>×</button>
            </div>
            <form className={styles.form} onSubmit={handleEventSubmit}> 
                <div className={styles.eventImage}>
                    <div className={styles.eventImageWrapper}>
                        <img 
                            src={eventImage || defaultBackground}
                            alt="Event Image" 
                            className={styles.preview} 
                        />
                    </div>
                    <input className={styles.fileInput} type="file" name="eventImage" accept="image/*" required onChange={handleImageUpload} />
                </div>
                <div className={styles.eventInfo}>
                    <div className={styles.eventInputs}>
                        <div className={styles.inputWrapper}>
                            <span className={styles.label}>Название:</span>
                            <input type='text' name="eventTitle" maxLength="100" required onChange={(e) => setEventTitle(e.target.value)} />
                        </div>
                        <div className={styles.inputWrapper}>
                            <span className={styles.label}>Дата и время:</span>
                            <input type="datetime-local" required onChange={(e) => setEventDateTime(e.target.value)} />
                        </div>
                        <div className={styles.inputWrapper}>
                            <span className={styles.label}>Город:</span>
                            <select className={styles.eventCity} onChange={(e) => setEventCity(e.target.value)}>
                                <option value="0">---</option>
                                <option value="almaty">Алматы</option>
                                <option value="astana">Астана</option>
                                <option value="aktau">Актау</option>
                            </select>
                        </div>
                        <div className={styles.inputWrapper}>
                            <span className={styles.label}>Адрес:</span>
                            <input type='text' name="eventLocation" required maxLength="100" onChange={(e) => setEventLocation(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.inputWrapper}>
                        <span className={styles.label}>Описание:</span>
                        <textarea name="eventDescription" maxLength="200" onChange={(e) => setEventDescription(e.target.value)} />
                    </div>
                    <button type="submit" className={styles.submitButton}>Создать</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateEventModal