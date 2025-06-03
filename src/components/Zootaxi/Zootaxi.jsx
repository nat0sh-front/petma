import { useState, useEffect } from 'react';
import ZootaxiForm from '../ZootaxiForm/ZootaxiForm';
import ZootaxiWaiting from '../ZootaxiWaiting/ZootaxiWaiting';
import ZootaxiOrder from '../ZootaxiOrder/ZootaxiOrder';
import styles from './Zootaxi.module.scss';
import ZootaxiEndScreen from '../ZootaxiEndScreen/ZootaxiEndScreen';

const Zootaxi = () => {
  const [step, setStep] = useState(null); // начальное значение null, чтобы подождать загрузку
  const [orderData, setOrderData] = useState(null);

  // Загружаем из localStorage только один раз при монтировании
  useEffect(() => {
    const savedStep = localStorage.getItem('zootaxiStep');
    const savedData = localStorage.getItem('zootaxiOrder');

    if (savedStep) setStep(parseInt(savedStep));
    else setStep(1); // если нет сохранённого шага — начинаем с первого

    if (savedData) setOrderData(JSON.parse(savedData));
  }, []);

  // Сохраняем текущий шаг в localStorage
  useEffect(() => {
    if (step !== null) {
      localStorage.setItem('zootaxiStep', step.toString());
    }
  }, [step]);

  // Сохраняем данные заказа
  useEffect(() => {
    if (orderData) {
      localStorage.setItem('zootaxiOrder', JSON.stringify(orderData));
    }
  }, [orderData]);

  // Пока step ещё не загружен — ничего не рендерим
  if (step === null) return null;

  return (
    <div className={styles.zootaxi}>
      {step === 1 && (
        <ZootaxiForm
          onNext={(data) => {
            setOrderData(data);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <ZootaxiWaiting
          onFinish={() => {
            setStep(3);
          }}
        />
      )}
      {step === 3 && (
        <ZootaxiOrder
        order={orderData}
        onFinish={() => {
          setStep(4);
        }}
        onCancel={() => {
        setOrderData(null);
        localStorage.removeItem('zootaxiOrder');
        setStep(1);
    }}/>
      )}
      {step === 4 && (
        <ZootaxiEndScreen onFinish={()=>{
          setStep(1);
          setOrderData(null);
          localStorage.removeItem('zootaxiOrder');
          localStorage.removeItem('zootaxiStep');
        }} />
      )}
    </div>
  );
};

export default Zootaxi;
