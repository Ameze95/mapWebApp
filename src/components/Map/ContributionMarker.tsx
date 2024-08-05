// src/components/Map/ContributionMarker.tsx
import React from 'react';
import { Marker } from 'react-map-gl';

interface ContributionMarkerProps {
  latitude: number;
  longitude: number;
}

const ContributionMarker: React.FC<ContributionMarkerProps> = ({ latitude, longitude }) => {
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <div className="bg-red-500 p-2 rounded-full"></div>
    </Marker>
  );
};

export default ContributionMarker;