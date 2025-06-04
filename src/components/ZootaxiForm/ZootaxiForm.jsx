import { useContext, useEffect, useState } from 'react';
import styles from './ZootaxiForm.module.scss';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const ZootaxiForm = ({ onNext }) => {
  const { user } = useContext(AuthContext);
  const userId = user?.id;

  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({
    id: String(Date.now()),
    petId: '',
    phone: '',
    from: '',
    to: '',
    distance: '',
    price: '',
    datetime: '',
    comment: '',
    ownerId: userId
  });

  useEffect(() => {
    if (userId) {
      fetchPets(userId);
    }
  }, [userId]);

  const fetchPets = async (ownerId) => {
    try {
      const res = await axios.get('http://localhost:5000/pets', {
        params: { ownerId }
      });
      setPets(res.data);
    } catch (error) {
      console.error('Ошибка при загрузке питомцев:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/rides', {
      ...formData,
    });

    onNext(formData);
    console.log(formData) // переходим к компоненту ожидания, передаём rideId
  } catch (error) {
    console.error('Ошибка при создании заявки:', error);
    alert('Не удалось отправить заявку. Попробуйте позже.');
  }
};


  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      <div className={styles.inputGroup}>
        <label htmlFor="petId">Питомец</label>
        <select
          id="petId"
          name="petId"
          value={formData.petId}
          onChange={handleChange}
          className={styles.pet}
          required
        >
          <option value="">Выберите питомца</option>
          {pets.map((pet) => (
            <option key={pet.id} value={pet.id}>
              {pet.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="phone">Номер телефона для связи</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder='+77001234567'
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="from">Откуда</label>
        <input
          type="text"
          id="from"
          name="from"
          value={formData.from}
          onChange={handleChange}
          placeholder="ул. Розыбакиева 124"
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="to">Куда</label>
        <input
          type="text"
          id="to"
          name="to"
          value={formData.to}
          onChange={handleChange}
          placeholder="ул. Саина 45"
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="datetime">Дата и время</label>
        <input
          type="datetime-local"
          id="datetime"
          name="datetime"
          value={formData.datetime}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="comment">Комментарий</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Например, если питомец болен или агрессивен"
          maxLength="150"
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Заказать зоотакси
      </button>
    </form>
  );
};

export default ZootaxiForm;