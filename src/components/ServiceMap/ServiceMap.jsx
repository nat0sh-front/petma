import React, { useEffect, useRef } from 'react';
import styles from './ServiceMap.module.scss';

const ServiceMap = ({ serviceCards, selectedServiceId, onSelect, center }) => {
  const mapRef = useRef(null);
  const placemarksRef = useRef([]);
  const mapContainerRef = useRef(null);

useEffect(() => {
  if (!window.ymaps || !mapRef.current) return;

  const testPlacemark = new window.ymaps.Placemark(
    [43.235377, 76.896718], // Алматы, ул. Сатпаева 63
    { balloonContent: 'Тестовая метка' },
    { preset: 'islands#redIcon' }
  );

  mapRef.current.geoObjects.add(testPlacemark);
}, []);


  // Инициализация карты один раз
  useEffect(() => {
    if (!window.ymaps) return;

    window.ymaps.ready(() => {
      if (!mapRef.current) {
        mapRef.current = new window.ymaps.Map(mapContainerRef.current, {
          center: [center.lat, center.lng], // Стартуем с центра из пропсов
          zoom: 12, // Нормальный зум для города
          controls: ['zoomControl'],
        });
      }
    });
  }, []);

  // Следим за изменением центра и меняем позицию карты
  useEffect(() => {
    if (!mapRef.current || !center) return;

    mapRef.current.setCenter([center.lat, center.lng], 12, { duration: 500 }); 
  }, [center]);

  // Рендерим метки
  useEffect(() => {
    if (!mapRef.current) return;

    // Удаляем старые метки
    placemarksRef.current.forEach(pm => mapRef.current.geoObjects.remove(pm));
    placemarksRef.current = [];

    // Добавляем новые метки
    serviceCards.forEach(service => {
      if (!service.location) return;

      const placemark = new window.ymaps.Placemark(
        [service.location.lat, service.location.lng],
        {},
        { preset: 'islands#blueIcon' }
      );

      placemark.serviceId = service.id;

      placemark.events.add('click', () => {
        if (onSelect) onSelect(service.id);
      });

      mapRef.current.geoObjects.add(placemark);
      placemarksRef.current.push(placemark);
    });
  }, [serviceCards, onSelect]);

  // Выделяем выбранную метку
  useEffect(() => {
    if (!mapRef.current || !placemarksRef.current.length) return;

    // Снимаем выделение со всех
    placemarksRef.current.forEach(pm => pm.options.set('preset', 'islands#blueIcon'));

    // Подсвечиваем выбранную
    if (selectedServiceId) {
      const placemark = placemarksRef.current.find(pm => pm.serviceId === selectedServiceId);
      if (placemark) {
        placemark.options.set('preset', 'islands#greenIcon');
        const coords = placemark.geometry.getCoordinates();
        mapRef.current.setCenter(coords, 14, { duration: 300 });
      }
    }
  }, [selectedServiceId]);

  return <div ref={mapContainerRef} id="map" className={styles.serviceMap}></div>;
};

export default ServiceMap;
