import React, { useState } from 'react'
import styles from './Pet.module.scss'
import defaultAvatar from '../../assets/images/avatar.png'
import editIcon from '../../assets/icons/edit.svg'
import PetModal from '../PetModal/PetModal'

const Pet = ({ pet, handlePetAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEditClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className={styles.pet}>
        <img className={styles.petAvatar} width={80} height={80} src={pet.image || defaultAvatar} alt="Pet" />
        <div className={styles.petInfo}>
          <div className={styles.petHeader}>
            <span className={styles.petName}>{pet.name}</span>
            <button className={styles.petEditButton} onClick={handleEditClick}>
              <img className={styles.petEditIcon} src={editIcon} alt="Edit" />
            </button>
          </div>
          <div className={styles.petTags}>
            <span className={styles.petType}>{pet.type}</span>
            <span className={styles.petGender}>{pet.gender}</span>
            <span className={styles.petAge}>{pet.age}</span>
            <span className={styles.petBreed}>{pet.breed}</span>
          </div>
          <span className={styles.petBio}>{pet.bio}</span>
        </div>
      </div>
      {isModalOpen && (
        <PetModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onPetAdded={handlePetAdded}
          editablePet={pet}
        />
      )}
    </>
  )
}

export default Pet
