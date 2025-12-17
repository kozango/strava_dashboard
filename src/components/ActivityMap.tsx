import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import polyline from '@mapbox/polyline';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { StravaActivity } from '../types/strava';

// Fix Leaflet default icon issue with Webpack/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface ActivityMapProps {
  activities: StravaActivity[];
}

const SPORT_COLORS: Record<string, string> = {
  Ride: '#FC4C02',
  Run: '#2D9CDB',
  TrailRun: '#27AE60',
  Hike: '#8B4513',
  Walk: '#95A5A6',
  Swim: '#3498DB',
  VirtualRide: '#E74C3C',
  VirtualRun: '#9B59B6',
  AlpineSki: '#1ABC9C',
  BackcountrySki: '#16A085',
  Snowboard: '#E67E22',
};

// Component to fit map to bounds
const FitBounds: React.FC<{ bounds: L.LatLngBoundsExpression | null }> = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);

  return null;
};

export const ActivityMap: React.FC<ActivityMapProps> = ({ activities }) => {
  const [decodedRoutes, setDecodedRoutes] = useState<
    Array<{ id: number; coordinates: L.LatLngExpression[]; activity: StravaActivity }>
  >([]);

  useEffect(() => {
    const routes = activities
      .filter(activity => activity.map?.summary_polyline)
      .map(activity => {
        const coords = polyline.decode(activity.map!.summary_polyline!);
        return {
          id: activity.id,
          coordinates: coords.map(([lat, lng]: [number, number]) => [lat, lng] as L.LatLngExpression),
          activity,
        };
      })
      .filter(route => route.coordinates.length > 0);

    setDecodedRoutes(routes);
  }, [activities]);

  const bounds = useMemo(() => {
    if (decodedRoutes.length === 0) return null;

    const allCoords = decodedRoutes.flatMap(route => route.coordinates);
    if (allCoords.length === 0) return null;

    return L.latLngBounds(allCoords);
  }, [decodedRoutes]);

  const center: L.LatLngExpression = useMemo(() => {
    if (decodedRoutes.length > 0 && decodedRoutes[0].coordinates.length > 0) {
      return decodedRoutes[0].coordinates[0];
    }
    return [35.6762, 139.6503]; // Tokyo default
  }, [decodedRoutes]);

  const formatDistance = (meters: number) => (meters / 1000).toFixed(2);

  if (decodedRoutes.length === 0) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold mb-4">アクティビティマップ</h2>
        <div className="h-96 flex items-center justify-center text-gray-400">
          地図データのあるアクティビティがありません
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold mb-4">
        アクティビティマップ
        <span className="text-sm text-gray-400 ml-2">
          ({decodedRoutes.length}件のルート)
        </span>
      </h2>
      <div className="h-[600px] rounded-lg overflow-hidden">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {decodedRoutes.map((route) => {
            const color = SPORT_COLORS[route.activity.sport_type] || '#FC4C02';
            return (
              <React.Fragment key={route.id}>
                <Polyline
                  positions={route.coordinates}
                  color={color}
                  weight={3}
                  opacity={0.7}
                >
                  <Popup>
                    <div className="text-sm">
                      <h3 className="font-semibold text-base">{route.activity.name}</h3>
                      <p className="text-gray-600">
                        {route.activity.sport_type} •{' '}
                        {formatDistance(route.activity.distance)} km
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(route.activity.start_date).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                  </Popup>
                </Polyline>
                {route.coordinates.length > 0 && (
                  <Marker position={route.coordinates[0]}>
                    <Popup>
                      <div className="text-sm">
                        <strong>スタート:</strong> {route.activity.name}
                      </div>
                    </Popup>
                  </Marker>
                )}
              </React.Fragment>
            );
          })}
          <FitBounds bounds={bounds} />
        </MapContainer>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {Object.entries(SPORT_COLORS).map(([sportType, color]) => {
          const count = decodedRoutes.filter(
            r => r.activity.sport_type === sportType
          ).length;
          if (count === 0) return null;
          return (
            <div key={sportType} className="flex items-center gap-2 text-sm">
              <div
                className="w-4 h-1 rounded"
                style={{ backgroundColor: color }}
              />
              <span className="text-gray-300">
                {sportType} ({count})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
