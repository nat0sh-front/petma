import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../OrderCard/OrderCard';
import styles from './OrderHistory.module.scss';
import { AuthContext } from '../../context/AuthContext';
import EmptyState from '../EmptyState/EmptyState';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // NEW

  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rides`, {
          params: { ownerId: userId }
        });

        // задержка 1.5 секунды
        setTimeout(() => {
          setOrders(response.data);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Ошибка при загрузке заказов:', error);
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [userId]);

  const renderSkeleton = () => (
    <>
      {Array(2).fill(0).map((_, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            background: '#fff',
            borderRadius: 12,
            marginBottom: 12,
            border: '1px solid #e0e0e0'
          }}
        >
          <div style={{ display: 'flex', gap: 10 }}>
            <Skeleton circle width={50} height={50} />
            <div>
              <Skeleton width={200} height={16} style={{ marginBottom: 6 }} />
              <Skeleton width={140} height={14} />
              <Skeleton width={100} height={12} style={{ marginTop: 6 }} />
            </div>
          </div>
          <Skeleton width={100} height={36} borderRadius={8} />
        </div>
      ))}
    </>
  );

  return (
    <div className={styles.orderHistory}>
      {loading ? (
        renderSkeleton()
      ) : orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      ) : (
        <EmptyState message="У вас пока нет заказов" />
      )}
    </div>
  );
};

export default OrderHistory;
