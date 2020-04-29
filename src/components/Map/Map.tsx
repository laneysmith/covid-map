import ReactDOM from 'react-dom';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Map, Popup as PopupType } from 'mapbox-gl';

import fetchData from '../../api/fetchData';
import { createFeatureIdentifier, createFillColorArgs, createSetFeatureState } from '../../utils';
import { Variable, FipsStats } from '../../types';
import { Header } from '../Header';
import { Legend } from '../Legend';
import { Popup } from '../Popup';
import useFetchDataReducer from '../../hooks/useFetchDataReducer';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import useInterval from '../../hooks/useInterval';
import './_map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const COUNTIES_SOURCE = 'counties';
const COUNTIES_LAYER = 'counties-layer';

const App = () => {
  const mapRef = useRef<Map | null>();
  const mapContainerRef = useRef<HTMLDivElement>(document.createElement('div'));
  // TODO: fix the popup implementation
  const popUpRef = useRef<PopupType>(new mapboxgl.Popup({ offset: 15, closeButton: false }));

  const [error, setError] = useState<boolean>(false);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [isMapStyleLoaded, setIsMapStyleLoaded] = useState<boolean>(false);
  const isMapReady: boolean = isMapLoaded && isMapStyleLoaded;
  const [animate, setAnimate] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedVariable, setSelectedVariable] = useState<Variable>(Variable.CASES);

  const {
    data,
    datesList,
    fipsList,
    colorScales,
    mostRecentDate,
    dispatchFetchDataRequest,
    dispatchFetchDataSuccess,
    dispatchFetchDataFailure,
  } = useFetchDataReducer();

  // request covid data on mount
  useEffect(() => {
    async function fetchCovidData() {
      dispatchFetchDataRequest();
      try {
        const response = await fetchData();
        const data = await response.json();
        dispatchFetchDataSuccess(data);
      } catch (error) {
        dispatchFetchDataFailure(error);
        setError(true);
      }
    }
    fetchCovidData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (mostRecentDate) {
      setSelectedDate(mostRecentDate);
    }
  }, [mostRecentDate]);

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
        mapRef?.current
          ?.addSource(COUNTIES_SOURCE, {
            type: 'vector',
            url: 'mapbox://mapbox.82pkq93d',
            promoteId: { original: 'FIPS' },
          })
          .addLayer(
            {
              id: COUNTIES_LAYER,
              type: 'fill',
              source: COUNTIES_SOURCE,
              'source-layer': 'original',
              paint: {
                'fill-outline-color': 'rgba(0,0,0,0.5)',
                'fill-color': 'rgba(0,0,0,0.25)',
              },
            },
            'waterway-label'
          )
          .on('mouseenter', COUNTIES_LAYER, (e) => {
            if (e.features && e.features.length && mapRef.current) {
              mapRef.current.getCanvas().style.cursor = 'crosshair';
            }
          })
          .on('mouseleave', COUNTIES_LAYER, () => {
            if (mapRef.current) {
              mapRef.current.getCanvas().style.cursor = '';
            }
            popUpRef.current.remove();
          })
          .on('mousemove', COUNTIES_LAYER, (e) => {
            if (e.features && e.features.length) {
              const { lat, lng } = e.lngLat;
              const feature = e.features[0];
              const popupNode = document.createElement('div');
              ReactDOM.render(<Popup feature={feature} />, popupNode);
              if (mapRef.current) {
                popUpRef.current
                  .setLngLat([lng, lat])
                  .setDOMContent(popupNode)
                  .addTo(mapRef.current);
              }
            }
          });
        setIsMapLoaded(true);
      });

    return () => mapRef?.current?.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // wait for data, selectedDate, map, and map styles to fully load before adding data to map
  useEffect(() => {
    if (!data || !fipsList || !isMapReady || !selectedDate) {
      return;
    }

    fipsList.forEach((fips: string) => {
      const detail: FipsStats = data[selectedDate][fips];
      mapRef?.current?.setFeatureState(
        createFeatureIdentifier(fips, COUNTIES_SOURCE),
        createSetFeatureState(detail)
      );
    });
  }, [isMapReady, data, fipsList]); // eslint-disable-line react-hooks/exhaustive-deps

  // adjust color scale when switching between 'cases' & 'deaths'
  useDidMountEffect(() => {
    if (isMapReady && data) {
      mapRef?.current?.setPaintProperty(
        COUNTIES_LAYER,
        'fill-color',
        createFillColorArgs(selectedVariable, colorScales)
      );
    }
  }, [isMapReady, data, selectedVariable]);

  // update map data when new date is selected
  useDidMountEffect(() => {
    if (isMapReady && data && mapRef?.current?.getLayer(COUNTIES_LAYER)) {
      fipsList.forEach((fips: string) => {
        const detail: FipsStats = data[selectedDate][fips];
        mapRef?.current?.setFeatureState(
          createFeatureIdentifier(fips, COUNTIES_SOURCE),
          createSetFeatureState(detail)
        );
      });
    }
  }, [isMapReady, data, selectedDate]);

  // start/stop animation
  useInterval(() => {
    setSelectedDate((prevDate) => {
      const currIndex = datesList.findIndex((val: string) => val === prevDate);
      const nextIndex = currIndex + 1 <= datesList.length - 1 ? currIndex + 1 : 0;
      return datesList[nextIndex];
    });
  }, animate);

  return (
    <div className="map-container" ref={mapContainerRef}>
      <Header selectedVariable={selectedVariable} selectedDate={selectedDate} error={error} />
      <Legend
        loaded={!!data && isMapReady}
        colorScales={colorScales}
        datesList={datesList}
        animate={animate}
        selectedVariable={selectedVariable}
        selectedDate={selectedDate}
        onChangeAnimate={setAnimate}
        onChangeDate={setSelectedDate}
        onChangeVariable={setSelectedVariable}
      />
    </div>
  );
};

export default App;
