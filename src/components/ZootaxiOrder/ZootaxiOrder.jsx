import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderInfo from '../OrderInfo/OrderInfo';
import ZootaxiMap from '../ZootaxiMap/ZootaxiMap';
import styles from './ZootaxiOrder.module.scss';

const ZootaxiOrder = ({ order, onCancel, onFinish }) => {
  const [routeInfo, setRouteInfo] = useState({ distance: 0, price: 0 });
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    // Загружаем случайного водителя
    const fetchRandomDriver = async () => {
      try {
        const response = await axios.get('http://localhost:3001/drivers');
        const drivers = response.data;
        const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
        setDriver(randomDriver);
      } catch (error) {
        console.error('Ошибка при загрузке водителей:', error);
      }
    };

    fetchRandomDriver();

    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 10000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  const handleDistanceAndPriceCalculated = async (data) => {
    setRouteInfo(data);
    try {
      await axios.patch(`http://localhost:5000/rides/${order.id}`, {
        distance: data.distance,
        price: data.price,
      });
      console.log('Данные маршрута обновлены в json-server', data);
    } catch (error) {
      console.error('Ошибка при сохранении в json-server:', error);
    }
  };

  return (
    <div className={styles.zootaxiOrder}>
      <ZootaxiMap
        from={order.from}
        to={order.to}
        onDistanceAndPriceCalculated={handleDistanceAndPriceCalculated}
      />
      {driver && (
        <OrderInfo
          order={order}
          driver={driver}
          onCancel={onCancel}
          distance={routeInfo.distance}
          price={routeInfo.price}
        />
      )}
    </div>
  );
};

export default ZootaxiOrder;
