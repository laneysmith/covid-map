import ReactDOM from 'react-dom';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import fetchData from '../../api/fetchData';
import { generateColorScales } from '../../utils';
import { CASES, DEATHS } from '../../constants';
import { Header } from '../Header';
import { Legend } from '../Legend';
import { Popup } from '../Popup';
import './_map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const COUNTIES_SOURCE = 'counties';
const COUNTIES_LAYER = 'counties-layer';
const ANIMATION_SPEED = 500; // in milliseconds

const App = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 })); // TODO: fix the popup implementation
  const animationTimer = useRef(null);

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isMapStyleLoaded, setIsMapStyleLoaded] = useState(false);
  const isMapReady = isMapLoaded && isMapStyleLoaded;

  const [data, setData] = useState(null);
  const [allDates, setAllDates] = useState([]);
  const [allFips, setAllFips] = useState(null);
  const [colorScales, setColorScales] = useState({ [CASES]: [], [DEATHS]: [] });

  const [animate, setAnimate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedVariable, setSelectedVariable] = useState(CASES);

  // request covid data on mount
  useEffect(() => {
    async function fetchCovidData() {
      try {
        const response = await fetchData();
        const { data, maxCases, maxDeaths } = response;
        setData(data);
        setAllDates(Object.keys(data));
        setColorScales({
          [CASES]: generateColorScales(maxCases, CASES),
          [DEATHS]: generateColorScales(maxDeaths, DEATHS),
        });
        const allDates = Object.keys(data);
        const mostRecentDate = allDates[allDates.length - 1];
        setSelectedDate(mostRecentDate);
        setAllFips(Object.keys(data[mostRecentDate]));
      } catch {}
    }
    fetchCovidData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // initialize map on mount
  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-100, 42],
      zoom: 3.5,
    })
      .addControl(new mapboxgl.NavigationControl(), 'bottom-right')
      .on('style.load', async () => setIsMapStyleLoaded(true))
      .on('load', async () => {
        mapRef.current.addSource(COUNTIES_SOURCE, {
          type: 'vector',
          url: 'mapbox://mapbox.82pkq93d',
          promoteId: { original: 'FIPS' },
        });

        mapRef.current.on('mouseenter', COUNTIES_LAYER, (e) => {
          if (e.features.length) {
            mapRef.current.getCanvas().style.cursor = 'crosshair';
          }
        });

        mapRef.current.on('mouseleave', COUNTIES_LAYER, () => {
          mapRef.current.getCanvas().style.cursor = '';
          popUpRef.current.remove();
        });

        mapRef.current.on('mousemove', COUNTIES_LAYER, (e) => {
          if (e.features.length) {
            const { lat, lng } = e.lngLat;
            const feature = e.features[0];
            const popupNode = document.createElement('div');
            ReactDOM.render(<Popup feature={feature} />, popupNode);
            popUpRef.current.setLngLat([lng, lat]).setDOMContent(popupNode).addTo(mapRef.current);
          }
        });

        setIsMapLoaded(true);
      });

    return () => mapRef.current.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // wait for data, selectedDate, map, and map styles to fully load before adding data to map
  useEffect(() => {
    if (!data || !allFips || !isMapReady) {
      return;
    }

    allFips.forEach((fips) => {
      const detail = data[selectedDate][fips];
      mapRef.current.setFeatureState(...createSetFeatureStateArgs(fips, detail));
    });

    mapRef.current.addLayer(
      {
        id: COUNTIES_LAYER,
        type: 'fill',
        source: COUNTIES_SOURCE,
        'source-layer': 'original',
        paint: {
          'fill-outline-color': 'rgba(0,0,0,0.5)',
          'fill-color': createFillColorArgs(selectedVariable, colorScales),
        },
      },
      'waterway-label'
    );
  }, [data, allFips, isMapReady]); // eslint-disable-line react-hooks/exhaustive-deps

  // adjust color scale when switching between 'cases' & 'deaths'
  useEffect(() => {
    if (!selectedVariable || !colorScales || !isMapReady) {
      return;
    }
    mapRef.current.setPaintProperty(
      COUNTIES_LAYER,
      'fill-color',
      createFillColorArgs(selectedVariable, colorScales)
    );
  }, [selectedVariable, colorScales, isMapReady]);

  // update map data when new date is selected
  useEffect(() => {
    if (!data || !allFips || !selectedDate || !isMapReady) {
      return;
    }
    allFips.forEach((fips) => {
      const detail = data[selectedDate][fips];
      mapRef.current.setFeatureState(...createSetFeatureStateArgs(fips, detail));
    });
  }, [data, allFips, selectedDate, isMapReady]);

  // start/stop animation
  const onChangeAnimate = (value) => {
    setAnimate(value);
    if (value === true) {
      animationTimer.current = setInterval(() => {
        setSelectedDate((prevDate) => {
          const currIndex = allDates.findIndex((val) => val === prevDate);
          const nextIndex = currIndex + 1 <= allDates.length - 1 ? currIndex + 1 : 0;
          return allDates[nextIndex];
        });
      }, ANIMATION_SPEED);
    } else {
      clearInterval(animationTimer.current);
    }
  };

  return (
    <div className="map-container" ref={mapContainerRef}>
      <Header selectedVariable={selectedVariable} selectedDate={selectedDate} />
      <Legend
        loaded={!!data && isMapReady}
        colorScales={colorScales}
        allDates={allDates}
        animate={animate}
        selectedVariable={selectedVariable}
        selectedDate={selectedDate}
        onChangeAnimate={onChangeAnimate}
        onChangeDate={setSelectedDate}
        onChangeVariable={setSelectedVariable}
      />
    </div>
  );
};

/**
 * Outputs the arguments for the setFeatureState method
 * @param {string} fips - fips #
 * @param {object} detail - cases & deaths
 */
const createSetFeatureStateArgs = (fips, detail) => {
  const cases = (detail && detail.cases) || 0;
  const deaths = (detail && detail.deaths) || 0;
  return [
    {
      source: COUNTIES_SOURCE,
      sourceLayer: 'original',
      id: fips,
    },
    {
      cases,
      deaths,
    },
  ];
};

/**
 * Outputs the 'paint.fill-color' expression for county polygons
 * based on the selected variable
 * @param {string} selectedVariable - 'cases' or 'deaths'
 * @param {object} colorScales
 */
const createFillColorArgs = (selectedVariable, colorScales) => [
  'case',
  ['==', ['feature-state', selectedVariable], null],
  'rgba(0,0,0,0.25)',
  ['==', ['feature-state', selectedVariable], 0],
  'rgba(0,0,0,0.25)',
  [
    'interpolate',
    ['linear'],
    ['feature-state', selectedVariable],
    ...colorScales[selectedVariable],
  ],
];

export default App;
