import React, { useContext, useEffect, useState } from 'react'
import styles from './EventsList.module.scss'
import Event from '../Event/Event'
import plus from '../../assets/icons/plus.svg'
import CreateEventModal from '../CreateEventModal/CreateEventModal'
import EmptyState from '../EmptyState/EmptyState'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const EventsList = () => {
  const [isOpenCreateEventModal, setIsOpenCreateEventModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events');
      setTimeout(() => {
        setEvents(response.data);
        setLoading(false); 
      }, 1500);
    } catch (error) {
      console.error('Ошибка при загрузке событий:', error);
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error);
    }
  };

  const getFilteredEvents = () => {
    let filtered = [...events];

    if (filterType === 'mine' && user) {
      filtered = filtered.filter(event =>
        event.organizerId === user.id || event.participants?.includes(user.id)
      );
    }

    if (selectedCity) {
      filtered = filtered.filter(event => event.city === selectedCity);
    }

    return filtered;
  };

  const getMyOrganizedEvents = () => {
    return events.filter(
      event =>
        event.organizerId === user?.id &&
        (selectedCity ? event.city === selectedCity : true)
    );
  };

  const getMyParticipatedEvents = () => {
    return events.filter(
      event =>
        event.participants?.includes(user?.id) &&
        event.organizerId !== user?.id &&
        (selectedCity ? event.city === selectedCity : true)
    );
  };

  const renderSkeleton = () => (
    <div style={{ padding: 16 }}>
      {Array(2).fill(0).map((_, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            gap: 16,
            background: '#fff',
            borderRadius: 12,
            marginBottom: 20,
            alignItems: 'flex-start',
          }}
        >
          <Skeleton width={170} height={170} style={{ borderRadius: 12 }} />
          <div style={{ flex: 1 }}>
            <Skeleton width={180} height={20} style={{ marginBottom: 8 }} />
            <Skeleton width={120} height={14} style={{ marginBottom: 6 }} />
            <Skeleton width={160} height={14} style={{ marginBottom: 6 }} />
            <Skeleton width={`100%`} height={14} style={{ marginBottom: 6 }} />
            <Skeleton width={`60%`} height={14} style={{ marginBottom: 12 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Skeleton width={140} height={14} />
              <Skeleton width={100} height={36} style={{ borderRadius: 8 }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className={styles.events}>
        <div className={styles.eventsHeader}>
          <div className={styles.eventFilters}>
            <button className={`${styles.allEventsButton} ${filterType === 'all' ? styles.active : ''}`} onClick={() => setFilterType('all')}>Все события</button>
            <button className={`${styles.myEventsButton} ${filterType === 'mine' ? styles.active : ''}`} onClick={() => setFilterType('mine')}>Мои события</button>
            <select className={styles.cityFilter} onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
              <option value="">Все города</option>
              <option value="almaty">Алматы</option>
              <option value="astana">Астана</option>
              <option value="aktau">Актау</option>
            </select>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.createEventButton} onClick={() => setIsOpenCreateEventModal(true)}>
              <span>Создать</span>
              <img className={styles.plusIcon} src={plus} alt="" />
            </button>
          </div>
        </div>

        {loading ? (
          renderSkeleton()
        ) : filterType === 'mine' ? (
          <>
            {getMyOrganizedEvents().length > 0 && (
              <div className={styles.eventGroup}>
                <h3 className={styles.groupTitle}>Организатор</h3>
                {getMyOrganizedEvents().map(event => {
                  const organizer = users.find(u => u.id === event.organizerId);
                  return <Event key={event.id} event={event} organizer={organizer} onParticipationChange={fetchEvents} />;
                })}
              </div>
            )}

            {getMyParticipatedEvents().length > 0 && (
              <div className={styles.eventGroup}>
                <h3 className={styles.groupTitle}>Участник</h3>
                {getMyParticipatedEvents().map(event => {
                  const organizer = users.find(u => u.id === event.organizerId);
                  return <Event key={event.id} event={event} organizer={organizer} onParticipationChange={fetchEvents} />;
                })}
              </div>
            )}

            {getMyOrganizedEvents().length === 0 && getMyParticipatedEvents().length === 0 && (
              <EmptyState message="Ничего не найдено по выбранным фильтрам" />
            )}
          </>
        ) : (
          getFilteredEvents().length > 0 ? (
            getFilteredEvents().map(event => {
              const organizer = users.find(u => u.id === event.organizerId);
              return <Event key={event.id} event={event} organizer={organizer} onParticipationChange={fetchEvents} />;
            })
          ) : (
            <EmptyState message="Ничего не найдено по выбранным фильтрам" />
          )
        )}
      </div>
      <CreateEventModal isOpen={isOpenCreateEventModal} onClose={() => setIsOpenCreateEventModal(false)} onEventCreated={fetchEvents} />
    </>
  );
};

export default EventsList;
