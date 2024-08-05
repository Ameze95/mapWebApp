// src/components/Map/Map.tsx
import React, { useState, useEffect } from 'react';
import ReactMapGL, { NavigationControl, FullscreenControl, GeolocateControl, ScaleControl, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import FloatingButton from './FloatingButton';
import ContributionModal from './ContributionModal';
import InfoModal from './InfoModal';
import './Map.css'; // Importar los estilos

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const SERVER_URL = 'http://192.168.1.211:5000'; // Reemplaza con la dirección IP de tu máquina de desarrollo

interface Contribution {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const [viewState, setViewState] = useState({
    latitude: 41.45,
    longitude: 2.217,
    zoom: 6.99,
  });

  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<{ latitude: number; longitude: number } | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  useEffect(() => {
    if (isAdding) {
      setMarkerPosition({ latitude: viewState.latitude, longitude: viewState.longitude });
    }
  }, [viewState, isAdding]);

  useEffect(() => {
    fetch(`${SERVER_URL}/contributions`)
      .then(response => response.json())
      .then(data => setContributions(data));
  }, []);

  const handleAddContribution = () => {
    setIsAdding(true);
    setMarkerPosition({ latitude: viewState.latitude, longitude: viewState.longitude });
  };

  const handleConfirmContribution = () => {
    setIsModalOpen(true);
    setIsAdding(false);
  };

  const handleModalSubmit = (data: { title: string; description: string }) => {
    const newContribution = { ...markerPosition, ...data } as Contribution;
    const updatedContributions = [...contributions, newContribution];
    setContributions(updatedContributions);
    setMarkerPosition(null);

    // Guardar en json-server
    fetch(`${SERVER_URL}/contributions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContribution),
    });

    console.log('Contribución guardada:', newContribution);
  };

  const handleMarkerClick = (contribution: Contribution) => {
    setSelectedContribution(contribution);
    setIsInfoModalOpen(true);
  };

  return (
    <div className="relative w-full h-full">
      <ReactMapGL
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: '100%', height: 'calc(100vh - 64px)' }} // Ajusta la altura del mapa
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
        <GeolocateControl position="top-right" />
        <ScaleControl position="bottom-left" />
        {isAdding && (
          <Marker latitude={viewState.latitude} longitude={viewState.longitude}>
            <div className="mapboxgl-marker"></div>
          </Marker>
        )}
        {contributions.map((contribution, index) => (
          <Marker key={index} latitude={contribution.latitude} longitude={contribution.longitude}>
            <div
              className="mapboxgl-marker"
              onClick={() => handleMarkerClick(contribution)}
            ></div>
          </Marker>
        ))}
      </ReactMapGL>
      <FloatingButton onClick={handleAddContribution} />
      {isAdding && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            onClick={handleConfirmContribution}
          >
            OK
          </button>
        </div>
      )}
      <ContributionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
      {selectedContribution && (
        <InfoModal
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          contribution={selectedContribution}
        />
      )}
    </div>
  );
};

export default Map;
