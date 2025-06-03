import { useEffect, useRef, useState } from 'react';
import styles from './ZootaxiMap.module.scss';

const ZootaxiMap = ({ from, to, onDistanceAndPriceCalculated }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);

  const ALMATY_BOUNDS = [
  [43.1, 76.7], // юго-запад
  [43.4, 77.1], // северо-восток
];

  const loadYmaps = () =>
    new Promise((resolve, reject) => {
      if (window.ymaps) {
        console.log('ymaps уже загружен, ждем ready');
        window.ymaps.ready(() => {
          console.log('ymaps ready');
          resolve();
        });
      } else {
        console.log('Загружаем скрипт ymaps...');
        const script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=ВАШ_API_КЛЮЧ';
        script.type = 'text/javascript';
        script.onload = () => {
          console.log('Скрипт ymaps загружен, ждем ready');
          window.ymaps.ready(() => {
            console.log('ymaps ready после загрузки скрипта');
            resolve();
          });
        };
        script.onerror = () => {
          console.error('Ошибка загрузки скрипта Яндекс.Карт');
          reject(new Error('Ошибка загрузки скрипта Яндекс.Карт'));
        };
        document.head.appendChild(script);
      }
    });

  const geocodeAddress = async (address) => {
  console.log(`Геокодируем адрес в Алматы: "${address}"`);
  if (!window.ymaps) {
    const errMsg = 'ymaps не загружен';
    console.error(errMsg);
    throw new Error(errMsg);
  }
  return new Promise((resolve, reject) => {
    window.ymaps.geocode(address, {
      boundedBy: ALMATY_BOUNDS,
      strictBounds: true,
      results: 1,
    }).then(
      (res) => {
        const firstGeoObject = res.geoObjects.get(0);
        if (firstGeoObject) {
          const coords = firstGeoObject.geometry.getCoordinates();
          console.log(`Координаты для "${address}" (Алматы):`, coords);
          resolve({ lat: coords[0], lng: coords[1] });
        } else {
          console.warn(`Адрес не найден в Алматы: "${address}"`);
          reject(new Error(`Адрес не найден в Алматы: "${address}"`));
        }
      },
      (err) => {
        console.error('Ошибка в ymaps.geocode:', err);
        reject(err);
      }
    );
  });
};

  useEffect(() => {
    if (!from || !to) {
      console.warn('Адреса "from" или "to" не заданы, пропускаем геокодирование');
      return;
    }

    let isCancelled = false;

    const geocode = async () => {
      try {
        await loadYmaps();

        // Чтобы избежать гонок и перегрузки сервиса
        await new Promise((res) => setTimeout(res, 200));

        const [fromCoord, toCoord] = await Promise.all([
          geocodeAddress(from).catch((err) => {
            console.error(`Ошибка геокодирования "from":`, err);
            return null;
          }),
          geocodeAddress(to).catch((err) => {
            console.error(`Ошибка геокодирования "to":`, err);
            return null;
          }),
        ]);

        if (!isCancelled) {
          if (fromCoord && toCoord) {
            setFromCoords(fromCoord);
            setToCoords(toCoord);
          } else {
            console.warn('Не удалось получить координаты для одного из адресов');
            setFromCoords(null);
            setToCoords(null);
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке ymaps или геокодировании:', error);
      }
    };

    geocode();

    return () => {
      isCancelled = true;
    };
  }, [from, to]);

useEffect(() => {
  if (!fromCoords || !toCoords || !mapContainerRef.current) {
    console.log('Координаты не готовы или контейнер не найден, пропускаем инициализацию карты');
    return;
  }

  if (mapRef.current) {
    mapRef.current.destroy();
    mapRef.current = null;
    console.log('Старая карта уничтожена');
  }

  try {
    const map = new window.ymaps.Map(mapContainerRef.current, {
      center: [fromCoords.lat, fromCoords.lng],
      zoom: 13,
      controls: ['zoomControl'],
    });

    window.ymaps.route(
      [
        [fromCoords.lat, fromCoords.lng],
        [toCoords.lat, toCoords.lng],
      ],
      {
        mapStateAutoApply: true,
        routingMode: 'auto',
        wayPointVisible: false,
      }
    ).then(
      (route) => {
        route.getPaths().each((path) => {
          path.options.set({
            strokeColor: '#4CAF50',
            opacity: 0.8,
            strokeWidth: 4,
          });
        });

        map.geoObjects.add(route);

        const placemarkOptions = {
          iconLayout: 'default#image',
          iconImageHref:
            'data:image/svg+xml;utf8,' +
            encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="42" viewBox="0 0 30 42" fill="none">
            <path fill="#4CAF50" d="M15 0C6.716 0 0 6.716 0 15c0 11.25 15 27 15 27s15-15.75 15-27c0-8.284-6.716-15-15-15z"/>
            <circle cx="15" cy="15" r="7" fill="white"/>
          </svg>
          `),
          iconImageSize: [30, 42],
          iconImageOffset: [-15, -42],
        };

        const startMarker = new window.ymaps.Placemark(
          [fromCoords.lat, fromCoords.lng],
          { hintContent: 'Откуда' },
          placemarkOptions
        );

        const endMarker = new window.ymaps.Placemark(
          [toCoords.lat, toCoords.lng],
          { hintContent: 'Куда' },
          placemarkOptions
        );

        map.geoObjects.add(startMarker);
        map.geoObjects.add(endMarker);

        // Расчёт длины маршрута
        const distanceInKm = parseFloat((route.getLength() / 1000).toFixed(2));
        console.log(`Длина маршрута: ${distanceInKm} км`);

        // Расчёт цены по формуле
        const price = Math.round(1500 + distanceInKm * 250);
        console.log(`Цена: ${price} ₸`);

        // Передаём данные в родителя через пропс, если есть
        if (onDistanceAndPriceCalculated) {
          onDistanceAndPriceCalculated({ distance: distanceInKm, price });
        }
      },
      (error) => {
        console.error('Ошибка построения маршрута:', error);
      }
    );

    mapRef.current = map;
    console.log('Карта и маршрут успешно созданы');
  } catch (err) {
    console.error('Ошибка при инициализации карты:', err);
  }
}, [fromCoords, toCoords]);



  return (
    <div
      ref={mapContainerRef}
      className={styles.map}
    />
  );
};

export default ZootaxiMap;
