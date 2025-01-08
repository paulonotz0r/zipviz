"use client";
import useDemographicsStore from "@/store/useDemographicsStore";
import MAPLIBRE_API_KEY from "@/utils/constants";
import { fetchAndCacheData } from "@/utils/fetchAndCacheData";
import { useCallback, useState } from "react";
import Map, {
    Layer,
    Source,
    ViewStateChangeEvent,
} from "react-map-gl/maplibre";

const mapStyle = `https://api.maptiler.com/maps/streets/style.json?key=${MAPLIBRE_API_KEY}`;

const MaplibreComponent = () => {
    const [viewport, setViewport] = useState({
        latitude: 37.8, // Default to center of US
        longitude: -96,
        zoom: 4,
    });

    const demographics = useDemographicsStore((state) => state.demographics);

    const handleViewportChange = (event: ViewStateChangeEvent) => {
        setViewport(event.viewState);
    };

    // Handle a user action to fetch data for a specific zip code
    const handleZipClick = useCallback(
        async (zip: string) => {
            await fetchAndCacheData(zip);
            const data = demographics[zip];
            console.log(`Demographics for zip ${zip}:`, data);
        },
        [demographics]
    );

    return (
        <Map
            {...viewport}
            onMove={handleViewportChange}
            style={{ width: "100%", height: "100vh" }}
            mapStyle={mapStyle}
        >
            <Source
                id="zip-boundaries"
                type="geojson"
                // data="/zip-code-boundaries.geojson"
                data="https://maplibre.org/maplibre-gl-js/docs/assets/us_states.geojson"
            >
                <Layer
                    id="zip-layer"
                    type="fill"
                    paint={{
                        "fill-color": "#888888",
                        "fill-opacity": 0.5,
                    }}
                    // onClick={(e) =>
                    //     handleZipClick(e.features[0].properties.zip)
                    // }
                />
            </Source>
        </Map>
    );
};

export default MaplibreComponent;
