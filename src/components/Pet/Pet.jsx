import React from 'react'
import styles from './Pet.module.scss'
import defaultAvatar from '../../assets/images/avatar.png'

const Pet = ({ pet }) => {
  return (
    <div className={styles.pet}>
        <img className={styles.petAvatar} src={pet.image} alt="Pet" />
        <div className={styles.petInfo}>
            <span className={styles.petName}>{pet.name}</span>
            <div className={styles.petInfoWrapper}>
                <span className={styles.petType}>{pet.type}</span>
                <span className={styles.petGender}>{pet.gender}</span>
                <span className={styles.petAge}>{pet.age}</span>
                <span className={styles.petBreed}>{pet.breed}</span>
            </div>
            <span className={styles.petBio}>{pet.bio}</span>
        </div>
    </div>
  )
}

export default Pet