import React, { useContext, useState } from 'react'
import styles from './AddPetModal.module.scss'
import defaultAvatar from '../../assets/images/avatar.png';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const AddPetModal = ({ isOpen, onClose, onPetAdded }) => {
    const { user } = useContext(AuthContext);
    const [petImage, setPetImage] = useState("");
    const [petName, setPetName] = useState("");
    const [petType, setPetType] = useState("");
    const [petBreed, setPetBreed] = useState("");
    const [petGender, setPetGender] = useState("");
    const [petBirthday, setPetBirthday] = useState(0);
    const [petBio, setPetBio] = useState("");
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPetImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    function calculateAge(birthday) {
        const [day, month, year] = birthday.split('.');
        const birthDate = new Date(year, month - 1, day);
        let currentDate = new Date();
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();
        const dayDiff = currentDate.getDate() - birthDate.getDate();
      
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }

        const getYearDeclension = (years) => {
            if (years % 10 === 1 && years % 100 !== 11) {
                return "год";
            } else if ([2, 3, 4].includes(years % 10) && ![12, 13, 14].includes(years % 100)) {
                return "года";
            } else {
                return "лет";
            }
        };

        return `${age} ${getYearDeclension(age)}`;
    };

    const handlePetSubmit = async (e) => {
        e.preventDefault();
    
        const petAge = calculateAge(petBirthday);
    
        try {
            const response = await axios.post('http://localhost:5000/pets', {
                ownerId: user.id,
                image: petImage, // Изображение
                name: petName, // Имя питомца
                type: petType, // Тип питомца
                breed: petBreed || "Без породы", // Порода питомца (если пусто, устанавливаем 'Без породы')
                gender: petGender, // Пол питомца
                age: petAge, // Возраст питомца
                bio: petBio || "", // Биография питомца (если пусто, будет пустое значение)
            });
            console.log('Питомец добавлен:', response.data);
            onPetAdded();
            onClose(); 
        } catch (error) {
            console.error('Ошибка при добавлении питомца:', error);
        }
    };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
                <h2>Добавить питомца</h2>
                <button className={styles.closeButton} onClick={onClose}>×</button>
            </div>
            <form className={styles.form} onSubmit={handlePetSubmit}>
                <div className={styles.avatar}>
                    <div className={styles.avatarContent}>
                        <img 
                            src={petImage || defaultAvatar} 
                            alt="Avatar" 
                            className={styles.preview} 
                        />
                        <input className={styles.fileInput} type="file" name="avatar" accept="image/*" onChange={handleImageUpload} />
                    </div>
                </div>
                <div className={styles.name}>
                    <span className={styles.label}>Кличка:</span>
                    <input type="text" name="petName" onChange={(e) => setPetName(e.target.value)}/>
                </div>
                <div className={styles.type}>
                    <span className={styles.label}>Тип питомца:</span>
                    <select id="type" name="type" onChange={(e) => setPetType(e.target.value)}>
                        <option value="">Выберите тип</option>
                        <option value="Собака">Собака</option>
                        <option value="Кошка">Кошка</option>
                        <option value="Хомяк">Хомяк</option>
                        <option value="Попугай">Попугай</option>
                        <option value="Рыбка">Рыбка</option>
                        <option value="Другое">Другое</option>
                    </select>
                </div>
                <div className={styles.breed}>
                    <span className={styles.label}>Порода питомца:</span>
                    <input type="text" name="petBreed" onChange={(e) => setPetBreed(e.target.value)} />
                </div>
                <div className={styles.gender}>
                    <span className={styles.label}>Пол питомца:</span>
                    <select id="type" name="type" onChange={(e) => setPetGender(e.target.value)}>
                        <option value="">-</option>
                        <option value="Мальчик">Мальчик</option>
                        <option value="Девочка">Девочка</option>
                    </select>
                </div>
                <div className={styles.birthday}>
                    <span className={styles.label}>День рождения:</span>
                    <input type="text" name="petBirthday" placeholder='ДД.ММ.ГГГГ' onChange={(e) => setPetBirthday(e.target.value)} />
                </div>
                <div className={styles.bio}>
                    <span className={styles.label}>О питомце:</span>
                    <textarea name="petBio" maxLength="150" onChange={(e) => setPetBio(e.target.value)} />
                </div>                    
                <button type="submit" className={styles.saveButton}>Сохранить</button>
            </form>
        </div>
    </div>
  )
}

export default AddPetModal