"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface Props {
    lat?: number;
    lng?: number;
}

export default function MapComponent({ lat = 40.35156, lng = 49.83206 }: Props) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }
        if ((mapRef.current as any)._leaflet_id) {
            (mapRef.current as any)._leaflet_id = null;
        }
        import("leaflet").then((L) => {
            if (!mapRef.current) return;
            const map = L.map(mapRef.current, {
                center: [lat, lng],
                zoom: 17,
                zoomControl: false,
                scrollWheelZoom: true,
                dragging: true,
                attributionControl: false,
            });
            L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    maxZoom: 20,
                    tileSize: 512,
                    zoomOffset: -1,
                }
            ).addTo(map);

            const icon = L.divIcon({
                className: "",
                html: `<div style="
                    width: 16px;
                    height: 16px;
                    background: #1360E4;
                    border: 3px solid #fff;
                    border-radius: 50%;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                "></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8],
            });

            L.marker([lat, lng], { icon }).addTo(map);

            requestAnimationFrame(() => {
                map.invalidateSize();
            });

            mapInstanceRef.current = map;
        });

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [lat, lng]);

    return (
        <div style={{ width: "100%", height: "240px" }}>
            <div
                ref={mapRef}
                style={{
    width: "100%",
    height: "240px",
    filter: "grayscale(0.7) hue-rotate(180deg) saturate(0.3) brightness(1.1) opacity(0.9)",
                }}
            />
        </div>
    );
}