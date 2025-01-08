"use client";
import "maplibre-gl/dist/maplibre-gl.css";
import Map from "react-map-gl/maplibre";

interface MapProps {
    longitude?: number;
    latitude?: number;
    zoom?: number;
}

// const mapStyleURL = `https://api.maptiler.com/maps/streets/style.json?key=${process.env.NEXT_PUBLIC_MAPLIBRE_API_KEY}`;
const USCoords = { longitude: -98.5795, latitude: 39.8283, zoom: 3 };

const Maplibre = ({ longitude, latitude, zoom }: MapProps) => {
    const initViewState = {
        longitude: longitude || USCoords.longitude,
        latitude: latitude || USCoords.latitude,
        zoom: zoom || USCoords.zoom,
    };

    return (
        <Map
            initialViewState={initViewState}
            style={{ width: 800, height: 600 }}
            mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        />
    );
};

export default Maplibre;
