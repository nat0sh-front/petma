import React, { useEffect, useState } from "react";
import styles from "./Services.module.scss";
import ServiceMap from "../ServiceMap/ServiceMap";
import ServiceCard from "../ServiceCard/ServiceCard";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const cityCenters = {
  алматы: { lat: 43.235377, lng: 76.896718 },
  астана: { lat: 51.147104, lng: 71.4306 },
  актау: { lat: 43.650001, lng: 51.2 },
};

const Services = () => {
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [serviceCards, setServiceCards] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [mapCenter, setMapCenter] = useState(cityCenters["алматы"]);
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    fetchServiceCards();
  }, []);

  const fetchServiceCards = async () => {
    try {
      const response = await axios.get("http://localhost:5000/services");
      setTimeout(() => {
        setServiceCards(response.data);
        setLoading(false);
      }, 1500); // 1.5 сек
    } catch (error) {
      console.error("Ошибка при загрузке услуг:", error);
      setLoading(false);
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
    new Set(serviceCards.map((s) => s.city?.toLowerCase()).filter(Boolean))
  );

  const filteredServices = serviceCards
    .filter((service) => {
      const matchesTag = selectedTag
        ? service.tags?.includes(selectedTag)
        : true;
      const matchesCity = selectedCity
        ? service.city?.toLowerCase() === selectedCity
        : true;
      return matchesTag && matchesCity;
    })
    .sort((a, b) => {
      const order = { premium: 0, medium: 1, basic: 2 };
      return (order[a.type] ?? 99) - (order[b.type] ?? 99);
    });

  const mapMarkers = selectedCity ? filteredServices : serviceCards;

  const renderSkeleton = () => (
    <>
      {Array(2)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            style={{
              background: "#fff",
              padding: 16,
              borderRadius: 12,
              marginBottom: 20,
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
            >
              <Skeleton circle width={50} height={50} />
              <div style={{ marginLeft: 10 }}>
                <Skeleton width={140} height={16} />
                <Skeleton width={80} height={14} style={{ marginTop: 4 }} />
              </div>
            </div>
            <Skeleton width={160} height={14} style={{ marginBottom: 8 }} />
            <Skeleton count={2} height={12} style={{ marginBottom: 6 }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Skeleton width={90} height={28} borderRadius={6} />
              <Skeleton width={100} height={32} borderRadius={6} />
            </div>
          </div>
        ))}
    </>
  );

  const renderSkeletonMap = () => (
    <>
      <div
        style={{
          width: 475,
          height: 475,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <Skeleton height={475} width={475} />
      </div>
    </>
  );

  return (
    <div className={styles.services}>
      <div className={styles.servicesHeader}>
        <select
          className={styles.typeFilter}
          onChange={(e) => setSelectedTag(e.target.value)}
          value={selectedTag}
        >
          <option value="">Все услуги</option>
          {Array.from(new Set(serviceCards.flatMap((s) => s.tags || []))).map(
            (tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            )
          )}
        </select>

        <select
          className={styles.cityFilter}
          onChange={handleCityChange}
          value={selectedCity}
        >
          <option value="">Все города</option>
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city.charAt(0).toUpperCase() + city.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.servicesContent}>
        <div className={styles.servicesList}>
          {loading ? (
            renderSkeleton()
          ) : filteredServices.length ? (
            filteredServices.map((serviceCard) => (
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
          {loading ? (
            <>{renderSkeletonMap()}</>
          ) : (
            <ServiceMap
              serviceCards={mapMarkers}
              selectedServiceId={selectedServiceId}
              onSelect={setSelectedServiceId}
              center={mapCenter}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
