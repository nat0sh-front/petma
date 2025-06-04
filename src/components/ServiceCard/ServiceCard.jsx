import React, { useEffect, useRef, useState } from "react";
import styles from "./ServiceCard.module.scss";
import defaultAvatar from "../../assets/images/avatar.png";
import location from "../../assets/icons/location.svg";
import StarRating from "../StarRating/StarRating";
import crown from "../../assets/icons/crown.svg";
import pet from "../../assets/icons/pet.svg";
import ServiceModal from "../ServiceModal/ServiceModal";

const ServiceCard = ({ serviceCard, type, onSelect, isSelected }) => {
  const cardRef = useRef(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  useEffect(() => {
    if (isSelected && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [isSelected]);

  return (
    <div
      ref={cardRef}
      className={`
        ${styles.card} 
        ${
          type === "premium"
            ? styles.cardPremium
            : type === "medium"
            ? styles.cardMedium
            : styles.cardBasic
        } 
        ${isSelected ? styles.highlight : ""}
      `}
      id={`card-${serviceCard.id}`}
      onClick={onSelect}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          <div className={styles.cardImage}>
            <img className={styles.image} src={defaultAvatar} alt="avatar" />
          </div>
          <div className={styles.title}>
            <h3 className={styles.name}>{serviceCard.name}</h3>
            <span className={styles.rating}>
              <StarRating rating={serviceCard.rating} />
              <span className={styles.ratingValue}>
                {serviceCard.rating.toFixed(1)}
              </span>
            </span>
          </div>
        </div>
        {type === "premium" ? (
          <img
            width={32}
            height={32}
            className={`${styles.badge} ${styles.badgePremium}`}
            src={crown}
            alt="crown"
          />
        ) : type === "medium" ? (
          <img
            width={32}
            height={32}
            className={`${styles.badge} ${styles.badgeMedium}`}
            src={pet}
            alt="pet"
          />
        ) : null}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.location}>
          <img className={styles.locationIcon} src={location} alt="location" />
          <span className={styles.locationText}>{serviceCard.address}</span>
        </div>
        {type === "premium" && (
          <div className={styles.description}>
            <p className={styles.descriptionText}>{serviceCard.description}</p>
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.tags}>
          {serviceCard.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        {type !== "basic" && (
          <button
            className={styles.button}
            onClick={() => setIsServiceModalOpen(true)}
          >
            Подробнее
          </button>
        )}
      </div>

      <ServiceModal
        serviceCard={serviceCard}
        type={type}
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
      />
    </div>
  );
};

export default ServiceCard;
