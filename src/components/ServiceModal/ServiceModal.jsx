import React, { useContext, useState } from "react";
import styles from "./ServiceModal.module.scss";
import defaultBackground from "../../assets/images/background.jpg";
import defaultAvatar from "../../assets/images/avatar.png";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import StarRating from "../StarRating/StarRating";
import location from "../../assets/icons/location.svg";
import phone from "../../assets/icons/phone.svg";
import clock from "../../assets/icons/clock.svg";
import site from "../../assets/icons/site.svg";
import insta from "../../assets/icons/insta.svg";
import Slider from "react-slick";

const ServiceModal = ({ serviceCard, type, isOpen, onClose }) => {
  const { user } = useContext(AuthContext);

  if (!isOpen) return null;

  // function formatDate(dateString) {
  //     const date = new Date(dateString);
  //     return date.toLocaleDateString("ru-RU", {
  //         day: "numeric",
  //         month: "long",
  //         year: "numeric",
  //     });
  // }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <span>Подробнее об организации</span>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <img className={styles.image} src={defaultAvatar} alt="avatar" />
            </div>
            <div className={styles.titleSection}>
              <h3 className={styles.name}>{serviceCard.name}</h3>
              <span className={styles.ratingWrapper}>
                <StarRating rating={serviceCard.rating} />
                <span className={styles.ratingValue}>
                  {serviceCard.rating.toFixed(1)}
                </span>
              </span>
            </div>
          </div>
          <div className={styles.tags}>
            {serviceCard.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className={styles.imageSlider}>
            {serviceCard.images && serviceCard.images.length > 0 && (
              <Slider
                dots={true}
                infinite={false}
                arrows={false}
                autoplay={true}
                speed={500}
                slidesToShow={3}
                slidesToScroll={1}
                className={styles.slider}
              >
                {serviceCard.images.map((imgUrl, index) => (
                  <div key={index} className={styles.slide}>
                    <img
                      src={imgUrl}
                      alt={`service-${index}`}
                      className={styles.slideImage}
                    />
                  </div>
                ))}
              </Slider>
            )}
          </div>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <img className={styles.infoLabel} src={location} alt="location" />
              <span className={styles.infoValue}>{serviceCard.address}</span>
            </div>
            <div className={styles.infoItem}>
              <img className={styles.infoLabel} src={clock} alt="clock" />
              <span className={styles.infoValue}>Пн-Пт: 10:00 - 20:00</span>
            </div>
            <div className={styles.infoItem}>
              <img className={styles.infoLabel} src={phone} alt="phone" />
              <span className={styles.infoValue}>+7 (123) 456-78-90</span>
            </div>
            <div className={styles.infoItem}>
              <img className={styles.infoLabel} src={insta} alt="insta" />
              <span className={styles.infoValue}>@zoomarket_kz</span>
            </div>
            <div className={styles.infoItem}>
              <img className={styles.infoLabel} src={site} alt="site" />
              <span className={styles.infoValue}>www.zoomarket.kz</span>
            </div>
          </div>
          <div className={styles.description}>
            <p>{serviceCard.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
