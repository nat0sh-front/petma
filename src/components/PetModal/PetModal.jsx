import React, { useContext, useEffect, useState } from 'react'
import styles from './PetModal.module.scss'
import defaultAvatar from '../../assets/images/avatar.png';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const PetModal = ({ isOpen, onClose, onPetAdded, editablePet }) => {
    const { user } = useContext(AuthContext);
    const [petImage, setPetImage] = useState("");
    const [petName, setPetName] = useState("");
    const [petType, setPetType] = useState("");
    const [petBreed, setPetBreed] = useState("");
    const [petGender, setPetGender] = useState("");
    const [petBirthday, setPetBirthday] = useState(0);
    const [petBio, setPetBio] = useState("");

    useEffect(() => {
        if (editablePet) {
          setPetImage(editablePet.image || "");
          setPetName(editablePet.name || "");
          setPetType(editablePet.type || "");
          setPetBreed(editablePet.breed || "");
          setPetGender(editablePet.gender || "");
          setPetBirthday(editablePet.birthday || "");
          setPetBio(editablePet.bio || "");
        } else {
          setPetImage("");
          setPetName("");
          setPetType("");
          setPetBreed("");
          setPetGender("");
          setPetBirthday("");
          setPetBio("");
        }
      }, [editablePet, isOpen]);

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

        const payload = {
            ownerId: user.id,
            image: petImage,
            name: petName,
            type: petType,
            breed: petBreed || "Без породы",
            gender: petGender,
            age: petAge,
            bio: petBio || "",
            birthday: petBirthday,
        };
    
        try {
            let response;
            if (editablePet) {
            // редактирование
            response = await axios.put(`http://localhost:5000/pets/${editablePet.id}`, payload);
            } else {
            // добавление
            response = await axios.post('http://localhost:5000/pets', payload);
            }
            console.log('Питомец добавлен:', response.data);
            onPetAdded();
            onClose(); 
        } catch (error) {
            console.error('Ошибка при добавлении питомца:', error);
        }
    };

    const handleDeletePet = async (id) => {
        if (window.confirm("Вы уверены, что хотите удалить этого питомца?")) {
            try {
                await axios.delete(`http://localhost:5000/pets/${id}`);
                console.log('Питомец удалён');
                onPetAdded(); 
                onClose();    
            } catch (error) {
                console.error('Ошибка при удалении питомца:', error);
            }
        }
    };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
                <h2>{editablePet ? "Редактировать питомца" : "Добавить питомца"}</h2>
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
                    <input type="text" name="petName" value={petName} onChange={(e) => setPetName(e.target.value)}/>
                </div>
                <div className={styles.type}>
                    <span className={styles.label}>Тип питомца:</span>
                    <select id="type" name="type" value={petType} onChange={(e) => setPetType(e.target.value)}>
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
                    <input type="text" name="petBreed" value={petBreed} onChange={(e) => setPetBreed(e.target.value)} />
                </div>
                <div className={styles.gender}>
                    <span className={styles.label}>Пол питомца:</span>
                    <select id="gender" name="gender" value={petGender} onChange={(e) => setPetGender(e.target.value)}>
                        <option value="">-</option>
                        <option value="Мальчик">Мальчик</option>
                        <option value="Девочка">Девочка</option>
                    </select>
                </div>
                <div className={styles.birthday}>
                    <span className={styles.label}>День рождения:</span>
                    <input type="text" name="petBirthday" value={petBirthday} placeholder='ДД.ММ.ГГГГ' onChange={(e) => setPetBirthday(e.target.value)} />
                </div>
                <div className={styles.bio}>
                    <span className={styles.label}>О питомце:</span>
                    <textarea name="petBio" value={petBio} maxLength="150" onChange={(e) => setPetBio(e.target.value)} />
                </div>
                <div className={styles.buttons}>
                    {editablePet && (
                        <button 
                            type="button" 
                            className={styles.deleteButton}
                            onClick={() => handleDeletePet(editablePet.id)}
                        >
                            Удалить
                        </button>
                    )}                  
                    <button type="submit" className={styles.saveButton}>Сохранить</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default PetModal