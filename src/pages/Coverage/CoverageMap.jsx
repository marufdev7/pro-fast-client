import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const CoverageMap = () => {
    const bdCenter = [23.685, 90.3563]; // Bangladesh center

    return (
        <div className="w-full h-[450px] rounded-xl overflow-hidden shadow">
            <MapContainer
                center={bdCenter}
                zoom={7}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[23.8103, 90.4125]}>
                    <Popup>Dhaka Regional Hub</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default CoverageMap;
