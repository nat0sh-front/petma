import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import EventsLayout from '../../layouts/EventsLayout/EventsLayout'
import styles from './EventsPage.module.scss'

const EventsPage = () => {
  return (
    <div className={styles.eventsPage}>
        <Header />
        <Sidebar />
        <EventsLayout />
    </div>
  )
}

export default EventsPage