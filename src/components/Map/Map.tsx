import ReactDOM from 'react-dom';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import fetchData from '../../api/fetchData';
import { generateColorScales, createFillColorArgs, createSetFeatureStateArgs } from '../../utils';
import { CASES, DEATHS, ColorScales, Variable } from '../../types';
import { Header } from '../Header';
import { Legend } from '../Legend';
import { Popup } from '../Popup';
import './_map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const COUNTIES_SOURCE = 'counties';
const COUNTIES_LAYER = 'counties-layer';
const ANIMATION_SPEED = 500; // in milliseconds

const App = () => {
  const mapRef = useRef<HTMLElement | null>(null);
  const mapContainerRef = useRef<HTMLElement | null>(null);
  const popUpRef = useRef<HTMLElement>(new mapboxgl.Popup({ offset: 15, closeButton: false })); // TODO: fix the popup implementation
  const animationTimer = useRef<HTMLElement | null>(null);

  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [isMapStyleLoaded, setIsMapStyleLoaded] = useState<boolean>(false);
  const isMapReady = isMapLoaded && isMapStyleLoaded;

  const [data, setData] = useState<object | null>(null);
  const [allDates, setAllDates] = useState<string[]>([]);
  const [allFips, setAllFips] = useState(null);
  const [colorScales, setColorScales] = useState<ColorScales>({ [CASES]: [], [DEATHS]: [] });

  const [animate, setAnimate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedVariable, setSelectedVariable] = useState<Variable>(CASES);

  // request covid data on mount
  useEffect(() => {
    async function fetchCovidData() {
      try {
        const response = await fetchData();
        const { data, maxCases, maxDeaths } = response;
        setData(data);
        setAllDates(Object.keys(data));
        setColorScales({
          [CASES]: generateColorScales(maxCases),
          [DEATHS]: generateColorScales(maxDeaths),
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
      center: [-100, 39],
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

    allFips.forEach((fips: string) => {
      const detail = data[selectedDate][fips];
      mapRef.current.setFeatureState(...createSetFeatureStateArgs(fips, detail, COUNTIES_SOURCE));
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
    allFips.forEach((fips: string) => {
      const detail = data[selectedDate][fips];
      mapRef.current.setFeatureState(...createSetFeatureStateArgs(fips, detail));
    });
  }, [data, allFips, selectedDate, isMapReady]);

  // start/stop animation
  const onChangeAnimate = (value: boolean) => {
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

export default App;
