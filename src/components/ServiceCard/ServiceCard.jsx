import React from 'react'
import styles from './ServiceCard.module.scss'
import defaultAvatar from '../../assets/images/avatar.png'
import location from '../../assets/icons/location.svg'
import StarRating from '../StarRating/StarRating'
import crown from '../../assets/icons/crown.svg'

const ServiceCard = () => {
  return (
    <div className={styles.card}>
        <div className={styles.cardHeader}>
            <div className={styles.cardImage}>
                <img className={styles.image} src={defaultAvatar} alt="" />
            </div>
            <div className={styles.cardTitle}>
                <h3 className={styles.title}>ZooMarket.kz</h3>
                <span className={styles.rating}>
                    <StarRating rating={4.5} />
                    <span className={styles.ratingValue}>4.5</span>
                </span>
            </div>
            <img width={32} height={32} className={styles.badge} src={crown} alt="" />
        </div>
        <div className={styles.cardContent}>
            <div className={styles.location}>
                <img className={styles.locationIcon} src={location} alt="" />
                <span className={styles.locationText}>ул.Сатпаева 63</span>
                <span className={styles.dot}>·</span>
                <span className={styles.distance}>2.5 км</span>
            </div>
            <div className={styles.description}>
                <p className={styles.descriptionText}>
                    Мы предлагаем широкий ассортимент товаров для домашних животных, включая корма, игрушки и аксессуары.
                </p>
            </div>
        </div>
        <div className={styles.cardFooter}>
            <div className={styles.tags}>
                <span className={styles.tag}>Груминг</span>
                <span className={styles.tag}>Ветеринар</span>
                <span className={styles.tag}>Ветеринар</span>
            </div>
            <button className={styles.button}>Подробнее</button>
        </div>
    </div>
  )
}

export default ServiceCard