import React from 'react'

import styles from './PetList.module.scss'
import addIcon from '../../assets/icons/plus.svg'
import Pet from '../Pet/Pet'

const PetList = () => {
  return (
    <div className={styles.pets}>
        <div className={styles.petsHeader}>
            <h3 className={styles.petsTitle}>Питомцы</h3>
            <button className={styles.addPetButton}>
                <img className={styles.addIcon} src={addIcon} alt="Add pet" />
                <span className={styles.addPetButtonText}>Добавить питомца</span>
            </button>
        </div>
        <div className={styles.petsContent}>
            <Pet />
            <Pet />
        </div>
    </div>
  )
}

export default PetList