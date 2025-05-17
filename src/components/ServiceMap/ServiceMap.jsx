import React, { useEffect } from 'react'
import styles from './ServiceMap.module.scss'

const ServiceMap = () => {
  useEffect(() => {
    if (window.ymaps) {
      window.ymaps.ready(init);
    }

    function init() {
      const map = new window.ymaps.Map("map", {
        center: [43.238949, 76.889709], // Алматы
        zoom: 12,
      });

      const points = [
        {
          coords: [43.2385, 76.8898],
          name: "Пушистик",
          address: "ул. Айманова, 12",
        },
        {
          coords: [43.2402, 76.9001],
          name: "КотоСпа",
          address: "ул. Сатпаева, 5",
        },
        {
          coords: [43.2356, 76.8951],
          name: "Лапки+",
          address: "пр. Абая, 45",
        },
      ];

      points.forEach((point) => {
        const placemark = new window.ymaps.Placemark(point.coords, {
          balloonContent: `<strong>${point.name}</strong><br/>${point.address}`,
        });
        map.geoObjects.add(placemark);
      });
    }
  }, []);

  return (
  <div id="map" className={styles.serviceMap}>

  </div>
)}

export default ServiceMap