// components/Map.js
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapContain = ({ latitude, longitude }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (latitude && longitude) {
      // Initialize map centered at provided latitude and longitude
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: process.env.NEXT_PUBLIC_MAPBOX_STYLE, // stylesheet location
        center: [longitude, latitude], // center at provided longitude and latitude
        zoom: 14, // starting zoom
      });

      // Add a marker at the provided location
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);

      return () => map.remove();
    }
  }, [latitude, longitude]); // Re-run when latitude or longitude changes

  return <div ref={mapContainerRef} id="map" style={{ width: '100%', height: '500px' }} />;
};

export default MapContain;
