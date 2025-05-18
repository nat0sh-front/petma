import React from 'react'
import styles from './ServiceCard.module.scss'
import defaultAvatar from '../../assets/images/avatar.png'
import location from '../../assets/icons/location.svg'
import StarRating from '../StarRating/StarRating'
import crown from '../../assets/icons/crown.svg'
import pet from '../../assets/icons/pet.svg'

const ServiceCard = ({ type }) => {

  return (
    <div className={`${styles.card} ${
    type === 'premium'
        ? styles.cardPremium
        : type === 'medium'
        ? styles.cardMedium
        : styles.cardBasic
    }`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardImage}>
          <img className={styles.image} src={defaultAvatar} alt="avatar" />
        </div>
        <div className={styles.cardTitle}>
          <h3 className={styles.title}>ZooMarket.kz</h3>
          <span className={styles.rating}>
            <StarRating rating={4.5} />
            <span className={styles.ratingValue}>4.5</span>
          </span>
        </div>
        {type === 'premium' ? (
        <img
            width={32}
            height={32}
            className={`${styles.badge} ${styles.badgePremium}`}
            src={crown}
            alt="crown"
        />
        ) : type === 'medium' ? (
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
          <span className={styles.locationText}>ул.Сатпаева 63</span>
          {type !== 'basic' && (
            <>
                <span className={styles.dot}>·</span>
                <span className={styles.distance}>2.5 км от вас</span>
            </>
          )}
        </div>
        {type === 'premium' && (
          <div className={styles.description}>
            <p className={styles.descriptionText}>
              Мы предлагаем широкий ассортимент товаров для домашних животных, включая корма, игрушки и аксессуары.
            </p>
          </div>
        )}
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.tags}>
          <span className={styles.tag}>Зоомагазин</span>
        </div>
        {type !== 'basic' && (
          <button className={styles.button}>Подробнее</button>
        )}
      </div>
    </div>
  )
}

export default ServiceCard
