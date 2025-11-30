import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icon
const defaultIcon = new L.Icon({
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// Simple fly-to logic
function FlyToDistrict({ warehouses, searchText }) {
    const map = useMap();

    useEffect(() => {
        if (!searchText) return;

        const text = searchText.toLowerCase();

        const match = warehouses.find((b) =>
            b.district.toLowerCase().includes(text)
        );

        if (!match) return;

        map.flyTo([match.latitude, match.longitude], 14, { duration: 1 });
    }, [searchText, warehouses, map]);

    return null;
}

const CoverageMap = ({ warehouses, searchText }) => {
    const bdCenter = [23.685, 90.3563]; // Bangladesh center

    return (
        <div className="w-full h-[600px] rounded-xl overflow-hidden shadow">
            <MapContainer
                center={bdCenter}
                zoom={8}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                <FlyToDistrict warehouses={warehouses} searchText={searchText} />

                {
                    warehouses.map((districtCenter, index) => <Marker
                        key={index}
                        position={[districtCenter.latitude, districtCenter.longitude]}>
                        {/* <Popup>{districtCenter.region} Regional Hub</Popup> */}
                        <Popup>
                            <b>{districtCenter.district}</b> <br />
                            Region: {districtCenter.region} <br />
                            Status: {districtCenter.status} <br />
                            <br />
                            Covered Areas:
                            <ul>
                                {districtCenter.covered_area.map((area, i) => (
                                    <li key={i}>{area}</li>
                                ))}
                            </ul>
                        </Popup>
                    </Marker>)
                }
            </MapContainer>
        </div>
    );
};

export default CoverageMap;
