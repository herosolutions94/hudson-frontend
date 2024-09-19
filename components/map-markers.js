import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicmVudGFybyIsImEiOiJjbHh1YjU2bmwwYjZwMmtwcjB1Y2kxbmV6In0.db1gogw23APoy0VgRQGGoQ';

const MapMarkersContain = ({ markers }) => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        // Set default map center and zoom
        const defaultCenter = [12.4924, 41.8902]; // Default to some location, e.g., Rome, Italy
        const defaultZoom = 5;

        // Initialize map
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/rentaro/cm05bhipn00fq01pdbbfafpf6',
            center: markers.length > 0 ? [parseFloat(markers[0][1]), parseFloat(markers[0][0])] : defaultCenter,
            zoom: markers.length > 0 ? 9 : defaultZoom, // Zoom in on markers or default zoom
        });

        if (markers.length > 0) {
            // Create bounds object to adjust map to fit all markers
            const bounds = new mapboxgl.LngLatBounds();

            // Loop through markers array and add each marker to the map
            markers.forEach(([latitude, longitude]) => {
                const lat = parseFloat(latitude);
                const lng = parseFloat(longitude);

                new mapboxgl.Marker()
                    .setLngLat([lng, lat])
                    .addTo(map);

                // Extend the bounds to include each marker's coordinates
                bounds.extend([lng, lat]);
            });

            // Adjust the map to fit all markers within the view
            map.fitBounds(bounds, {
                padding: 50, // padding around the markers (optional)
            });
        }

        return () => map.remove(); // Cleanup map on component unmount
    }, [markers]); // Re-run when markers change

    return <div ref={mapContainerRef} id="map" style={{ width: '100%', height: '500px' }} />;
};

export default MapMarkersContain;
