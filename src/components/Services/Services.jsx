import React, { useEffect, useState } from 'react';
import styles from './Services.module.scss';
import ServiceMap from '../ServiceMap/ServiceMap';
import ServiceCard from '../ServiceCard/ServiceCard';
import axios from 'axios';

const cityCenters = {
  алматы: { lat: 43.235377, lng: 76.896718 },
  астана: { lat: 51.147104, lng: 71.430600 },
  актау: { lat: 43.650001, lng: 51.200000 },
};

const Services = () => {
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [serviceCards, setServiceCards] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const [mapCenter, setMapCenter] = useState(cityCenters['алматы']);

  useEffect(() => {
    fetchServiceCards();
  }, []);

  const fetchServiceCards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/services');
      setServiceCards(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке услуг:', error);
    }
  };


  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);

    if (city && cityCenters[city]) {
      setMapCenter(cityCenters[city]);
    }
  };

  const uniqueCities = Array.from(
    new Set(serviceCards.map(s => s.city?.toLowerCase()).filter(Boolean))
  );

  const filteredServices = serviceCards
    .filter(service => {
      const matchesTag = selectedTag ? service.tags?.includes(selectedTag) : true;
      const matchesCity = selectedCity ? service.city?.toLowerCase() === selectedCity : true;
      return matchesTag && matchesCity;
    })
    .sort((a, b) => {
      const order = { premium: 0, medium: 1, basic: 2 };
      return (order[a.type] ?? 99) - (order[b.type] ?? 99);
    });

  const mapMarkers = selectedCity
    ? filteredServices
    : serviceCards;

  return (
    <div className={styles.services}>
      <div className={styles.servicesHeader}>
        <select
          className={styles.typeFilter}
          onChange={e => setSelectedTag(e.target.value)}
          value={selectedTag}
        >
          <option value="">Все услуги</option>
          {Array.from(new Set(serviceCards.flatMap(s => s.tags || []))).map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>

        <select
          className={styles.cityFilter}
          onChange={handleCityChange}
          value={selectedCity}
        >
          <option value="">Все города</option>
          {uniqueCities.map(city => (
            <option key={city} value={city}>
              {city.charAt(0).toUpperCase() + city.slice(1)}
            </option>
          ))}
        </select>

      </div>

      <div className={styles.servicesContent}>
        <div className={styles.servicesList}>
          {filteredServices.length ? (
            filteredServices.map(serviceCard => (
              <ServiceCard
                key={serviceCard.id}
                serviceCard={serviceCard}
                type={serviceCard.type}
                onSelect={() => setSelectedServiceId(serviceCard.id)}
                isSelected={serviceCard.id === selectedServiceId}
              />
            ))
          ) : (
            <p>Услуги не найдены по выбранным фильтрам.</p>
          )}
        </div>

        <div className={styles.servicesMap}>
          <ServiceMap
            serviceCards={mapMarkers}
            selectedServiceId={selectedServiceId}
            onSelect={setSelectedServiceId}
            center={mapCenter}
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
