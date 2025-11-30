import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const CoverageMap = ({ warehouses }) => {
    const bdCenter = [23.685, 90.3563]; // Bangladesh center

    return (
        <div className="w-full h-[600px] rounded-xl overflow-hidden shadow">
            <MapContainer
                center={bdCenter}
                zoom={7}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

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
