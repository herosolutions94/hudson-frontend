import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cmsFileUrl } from '../helpers/helpers';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapMarkersContain = ({ portfolio }) => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const defaultCenter = [12.4924, 41.8902]; // Default to some location, e.g., Rome, Italy
        const defaultZoom = 5;

        // Initialize the map
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
            center: portfolio.length > 0 ? [parseFloat(portfolio[0].longitude), parseFloat(portfolio[0].latitude)] : defaultCenter,
            zoom: portfolio.length > 0 ? 9 : defaultZoom,
        });

        if (portfolio.length > 0) {
            const bounds = new mapboxgl.LngLatBounds();

            portfolio.forEach((item, index) => {
                const lat = parseFloat(item.latitude);
                const lng = parseFloat(item.longitude);

                // Create the SVG marker
                const markerElement = document.createElement('div');
                markerElement.innerHTML = `
                    <svg display="block" height="41px" width="27px" viewBox="0 0 27 41">
                        <defs>
                            <radialGradient id="shadowGradient">
                                <stop offset="10%" stop-opacity="0.4"></stop>
                                <stop offset="100%" stop-opacity="0.05"></stop>
                            </radialGradient>
                        </defs>
                        <ellipse cx="13.5" cy="34.8" rx="10.5" ry="5.25" fill="url(#shadowGradient)"></ellipse>
                        <path fill="#3FB1CE" d="M27,13.5C27,19.07 20.25,27 14.75,34.5C14.02,35.5 12.98,35.5 12.25,34.5C6.75,27 0,19.22 0,13.5C0,6.04 6.04,0 13.5,0C20.96,0 27,6.04 27,13.5Z"></path>
                        <path opacity="0.25" d="M13.5,0C6.04,0 0,6.04 0,13.5C0,19.22 6.75,27 12.25,34.5C13,35.52 14.02,35.5 14.75,34.5C20.25,27 27,19.07 27,13.5C27,6.04 20.96,0 13.5,0ZM13.5,1C20.42,1 26,6.58 26,13.5C26,15.9 24.5,19.18 22.22,22.74C19.95,26.3 16.71,30.14 13.94,33.91C13.74,34.18 13.61,34.32 13.5,34.44C13.39,34.32 13.26,34.18 13.06,33.91C10.28,30.13 7.41,26.31 5.02,22.77C2.62,19.23 1,15.95 1,13.5C1,6.58 6.58,1 13.5,1Z"></path>
                        <circle fill="white" cx="13.5" cy="13.5" r="5.5"></circle>
                    </svg>
                `;

                // Set the marker using the SVG
                const marker = new mapboxgl.Marker(markerElement)
                    .setLngLat([lng, lat])
                    .addTo(map);

                // Create a popup for the marker
                const popup = new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`
                        <div className="item custom_pointer">
            <div className="inner" style="position:relative;">
                <a href=${"/portfolio/" + item?.slug} style="position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;"></a>
                <div className="image" 
                style="width: 100%;
                position: relative;
                background: #fff;
                padding: 0;
                padding-bottom: 50%;
                overflow: hidden;
                box-shadow: none;
                border-radius: 0;
                -webkit-border-radius: 0;
                -moz-border-radius: 0;
                -ms-border-radius: 0;
                -o-border-radius: 0;"
                >
                    <Image src=${cmsFileUrl(item?.image, 'portfolio')} width={1000} height={1000} alt=${item?.title} style="display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    transition: all ease 0.5s;"/>
                    <span className="label_type capitalize" style="position: absolute;
                    top: 1rem;
                    left: 1rem;
                    z-index: 1;
                    background-color: #E6EDF3;
                    color: #000;
                    padding: 0.3rem 1rem;
                    font-size: 1.3rem;
                    border-radius: 4px;
                    -webkit-border-radius: 4px;
                    -moz-border-radius: 4px;
                    -ms-border-radius: 4px;
                    -o-border-radius: 4px;text-transform: capitalize;">${item?.platform}</span>
                </div>
                <div className="inner_cntnt" style="padding: 1rem;">
                    <h5>${item?.title}</h5>
                    <div className="location" style="display: flex;
                    -webkit-box-orient: vertical;
                    gap: 0.7rem;
                    margin-bottom: 1rem;">
                        <Image src="/images/map.svg" width={100} height={100} alt="" style="width: 1.8rem;
                        height: 1.8rem;
                        align-self: center;"/>
                        <span style="flex: 1 1;">${item?.address}</span>
                    </div>
                    <p style="margin-bottom: 0;">${item?.short_text}</p>
                </div>
            </div>
        </div>
                    `);

                // Open the popup when the marker is clicked
                markerElement.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent event from bubbling

                    const currentlyOpenedPopup = document.querySelector('.mapboxgl-popup');
                    if (currentlyOpenedPopup) {
                        currentlyOpenedPopup.remove();
                    }

                    popup.setLngLat([lng, lat]).addTo(map);
                });

                // Extend the bounds to include this marker's coordinates
                bounds.extend([lng, lat]);
            });

            // Adjust the map to fit all markers
            map.fitBounds(bounds, {
                padding: 50,
            });
        }

        // Cleanup function to remove the map on component unmount
        return () => map.remove();
    }, [portfolio]);

    return <div ref={mapContainerRef} id="map" style={{ width: '100%', height: '500px' }} />;
};

export default MapMarkersContain;
