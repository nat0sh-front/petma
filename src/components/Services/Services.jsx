import React, { useState } from 'react'
import styles from './Services.module.scss'
import ServiceMap from '../ServiceMap/ServiceMap';
import StarRating from '../StarRating/StarRating';
import ServiceCard from '../ServiceCard/ServiceCard';

const Services = () => {
  const [selectedtype, setSelectedType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <div className={styles.services}>
      <div className={styles.servicesHeader}>
        <select className={styles.typeFilter} onChange={(e) => setSelectedType(e.target.value)} value={selectedtype}>
          <option value="">Все услуги</option>
          <option value="almaty">Ветеринар</option>
          <option value="astana">Груминг</option>
          <option value="aktau">Зоомагазин</option>
        </select>
        <select className={styles.cityFilter} onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
          <option value="">Все города</option>
          <option value="almaty">Алматы</option>
          <option value="astana">Астана</option>
          <option value="aktau">Актау</option>
        </select>
      </div>
      <div className={styles.servicesContent}>
        <div className={styles.servicesList}>
          <ServiceCard type='premium' />
          <ServiceCard type='medium' />
          <ServiceCard type='basic' />
        </div>
        <div className={styles.servicesMap}>
          <ServiceMap />
        </div>
      </div>
    </div>
  )
}

export default Services