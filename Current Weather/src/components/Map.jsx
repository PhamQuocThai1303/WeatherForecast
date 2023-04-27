import { MapContainer, TileLayer, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Map = () => {
    const { data } = useSelector((state) => state.weather)

    const lat = data.coord.lat
    const lon = data.coord.lon



    return (
        <MapContainer center={[lat, lon]} zoom={8} renderer={1} className="h-full w-full border-2 border-orange drop-shadow-lg rounded-md">
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution=' <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap</a>'
            />

            <Marker position={[lat, lon]} />
        </MapContainer>
    )
}

export default Map