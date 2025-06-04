import React from 'react';
import styles from './ZootaxiRules.module.scss';

const ZootaxiRules = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Правила перевозки животных</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Ветеринарные документы и прививки</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            Желательно иметь при себе ветеринарный паспорт с отметками о прививках (особенно от бешенства).
          </li>
          <li className={styles.listItem}>
            Животное должно быть здоровым и активным. Больные или стрессовые животные к перевозке не допускаются.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Подготовка питомца к поездке</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Выгуляйте животное за 30–60 минут до поездки.</li>
          <li className={styles.listItem}>Избегайте плотного кормления перед поездкой. Воду можно взять с собой.</li>
          <li className={styles.listItem}>Возьмите любимую игрушку или подстилку питомца для комфорта.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Снаряжение и упаковка</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Маленьких животных перевозите в переноске.</li>
          <li className={styles.listItem}>Крупные собаки — только на поводке и в наморднике.</li>
          <li className={styles.listItem}>Защитите салон чехлом или покрывалом.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Посадка и высадка</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Питомец должен быть под контролем при посадке/высадке.</li>
          <li className={styles.listItem}>Не перевозите животное на переднем сиденье.</li>
          <li className={styles.listItem}>Держите питомца на поводке до выхода из автомобиля.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Санитарные требования</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Животное должно быть чистым, без паразитов и сильного запаха.</li>
          <li className={styles.listItem}>В случае загрязнения клиент обязан произвести уборку.</li>
          <li className={styles.listItem}>
            При необходимости химчистки расходы возмещаются владельцем животного.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Что запрещено</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Нельзя перевозить животных без переноски/намордника.</li>
          <li className={styles.listItem}>Запрещены агрессивные и больные животные.</li>
          <li className={styles.listItem}>Опасные и экзотические питомцы не перевозятся.</li>
        </ul>
      </section>
    </div>
  );
};

export default ZootaxiRules;
