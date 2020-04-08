import ReactDOM from 'react-dom';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';

import fetchData from './api/fetchData';
import Popup from './components/Popup';
import Legend from './components/Legend';
import { generateColorScales } from './utils';
import { CASES, DEATHS } from './constants';
import './App.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const COUNTIES_SOURCE = 'counties';
const COUNTIES_LAYER = 'counties-layer';

const App = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isMapStyleLoaded, setIsMapStyleLoaded] = useState(false);
  const [data, setData] = useState(null);
  const [variable, setVariable] = useState(CASES);
  const colorScales = useMemo(() => {
    if (!data) {
      return { [CASES]: [], [DEATHS]: [] };
    }
    return {
      [CASES]: generateColorScales(data, CASES),
      [DEATHS]: generateColorScales(data, DEATHS),
    };
  }, [data]);

  // request covid data on mount
  useEffect(() => {
    async function fetchCovidData() {
      const response = await fetchData();
      setData(response);
    }
    fetchCovidData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // initialize map on mount
  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-100, 42],
      zoom: 3,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    mapRef.current.on('style.load', async () => setIsMapStyleLoaded(true));

    mapRef.current.on('load', async () => {
      mapRef.current.addSource(COUNTIES_SOURCE, {
        type: 'vector',
        url: 'mapbox://mapbox.82pkq93d',
        promoteId: { original: 'FIPS' },
      });

      mapRef.current.on('mouseenter', COUNTIES_LAYER, (e) => {
        if (e.features.length) {
          mapRef.current.getCanvas().style.cursor = 'pointer';
        }
      });

      mapRef.current.on('mouseleave', COUNTIES_LAYER, () => {
        mapRef.current.getCanvas().style.cursor = '';
      });

      mapRef.current.on('click', COUNTIES_LAYER, (e) => {
        popUpRef.current.remove();
        if (e.features.length) {
          const { lat, lng } = e.lngLat;
          const feature = e.features[0];
          const popupNode = document.createElement('div');
          ReactDOM.render(<Popup feature={feature} />, popupNode);
          popUpRef.current.setLngLat([lng, lat]).setDOMContent(popupNode).addTo(mapRef.current);
          // popUpRef.current
          // .setLngLat([lng, lat])
          // .setDOMContent(createPopupNode(feature))
          // .addTo(mapRef.current);
        }
      });

      setIsMapLoaded(true);
    });

    return () => mapRef.current.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // wait for data, map, and map styles to fully load before adding data to map
  useEffect(() => {
    if (!data || !isMapLoaded || !isMapStyleLoaded) {
      return;
    }

    data.forEach((row) => {
      const { fips, cases, deaths } = row;
      mapRef.current.setFeatureState(
        {
          source: COUNTIES_SOURCE,
          sourceLayer: 'original',
          id: fips,
        },
        {
          cases: parseInt(cases),
          deaths: parseInt(deaths),
        }
      );
    });

    mapRef.current.addLayer(
      {
        id: COUNTIES_LAYER,
        type: 'fill',
        source: COUNTIES_SOURCE,
        'source-layer': 'original',
        paint: {
          'fill-outline-color': 'rgba(0,0,0,0.5)',
          'fill-color': [
            'interpolate',
            ['linear'],
            ['feature-state', variable],
            ...colorScales[variable],
          ],
          'fill-opacity': ['case', ['==', ['feature-state', variable], null], 0.2, 0.75],
        },
      },
      'waterway-label'
    );
  }, [data, isMapLoaded, isMapStyleLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // adjust color scale when switching between 'cases' & 'deaths'
  const changeVariable = (variable) => {
    setVariable(variable);
    mapRef.current.setPaintProperty(COUNTIES_LAYER, 'fill-color', [
      'interpolate',
      ['linear'],
      ['feature-state', variable],
      ...colorScales[variable],
    ]);
  };

  return (
    <div className="map-container" ref={mapContainerRef}>
      <Legend
        selected={variable}
        onChangeVariable={changeVariable}
        loaded={!!data && isMapLoaded && isMapStyleLoaded}
        colorScales={colorScales}
      />
    </div>
  );
};

export default App;
