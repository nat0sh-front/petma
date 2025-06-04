import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../OrderCard/OrderCard';
import styles from './OrderHistory.module.scss';
import { AuthContext } from '../../context/AuthContext';
import EmptyState from '../EmptyState/EmptyState';

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const userId = user?.id;

  useEffect(() => {
    console.log('userId', userId);
    if (!userId) return;

    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rides`, {
          params: { ownerId: userId }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке заказов:', error);
      } 
    };

    fetchUserOrders();
  }, [userId]);

  return (
    <div className={styles.orderHistory}>
      {orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      ) : (
        <EmptyState message="У вас пока нет заказов" />
      )}
    </div>
  );
};

export default OrderHistory;
