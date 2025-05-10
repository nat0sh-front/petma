import React from 'react'

import styles from './PetList.module.scss'
import addIcon from '../../assets/icons/plus.svg'
import Pet from '../Pet/Pet'
import EmptyState from '../EmptyState/EmptyState'

const PetList = ( {pets, onAddPetClick, handlePetAdded, isOwnProfile} ) => {
  return (
    <div className={styles.pets}>
        <div className={styles.petsHeader}>
            <h3 className={styles.petsTitle}>Питомцы</h3>
            {isOwnProfile &&
            (<button className={styles.addPetButton} onClick={onAddPetClick}>
                <img className={styles.addIcon} src={addIcon} alt="Add pet" />
                <span className={styles.addPetButtonText}>Добавить питомца</span>
            </button>)}
        </div>
        <div className={styles.petsContent}>
          {pets.length === 0 ? (
            <EmptyState
              message={isOwnProfile ? "добавь своего хвостатого друга" : "еще не добавил хвостатого друга"}
            />
          ) : (
            pets.map(pet => (
              <Pet key={pet.id} pet={pet} handlePetAdded={handlePetAdded} isOwnProfile={isOwnProfile} />
            ))
          )}
        </div>
    </div>
  )
}

export default PetList