import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { NavigationControl, FullscreenControl, GeolocateControl, ScaleControl, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import supercluster from 'supercluster';
import ContributionModal from './ContributionModal';
import InfoModal from './InfoModal';
import './Map.css'; // Importar los estilos
import { supabase } from '../../../supabase/supabaseClient'; // Asegúrate de tener configurado el cliente de Supabase
import { useAuth } from '../../../supabase/AuthContext'; // Asegúrate de tener configurado el contexto de autenticación


const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface Contribution {
  id: string;
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
  const [clusters, setClusters] = useState<any[]>([]);
  const mapRef = useRef<any>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (isAdding) {
      setMarkerPosition({ latitude: viewState.latitude, longitude: viewState.longitude });
    }
  }, [viewState, isAdding]);

  useEffect(() => {
    // Obtener contribuciones desde Supabase
    const fetchContributions = async () => {
      const { data, error } = await supabase
        .from('contributions')
        .select('*');

      if (error) {
        console.error('Error al cargar las contribuciones:', error);
      } else {
        console.log('Contributions loaded:', data);
        setContributions(data);
      }
    };

    fetchContributions();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getMap().getBounds().toArray().flat();
      const index = new supercluster({
        radius: 75,
        maxZoom: 16,
      });
      index.load(
        contributions.map(contribution => ({
          type: 'Feature',
          properties: { cluster: false, contributionId: contribution.id },
          geometry: {
            type: 'Point',
            coordinates: [contribution.longitude, contribution.latitude],
          },
        }))
      );
      const clusters = index.getClusters(bounds, Math.round(viewState.zoom));
      setClusters(clusters);
    }
  }, [contributions, viewState]);

  const handleAddContribution = () => {
    setIsAdding(true);
    setMarkerPosition({ latitude: viewState.latitude, longitude: viewState.longitude });
  };

  const handleConfirmContribution = () => {
    setIsModalOpen(true);
    setIsAdding(false);
  };

  const handleModalSubmit = async (data: { user: string; title: string; description: string }) => {
    const user = supabase.auth.user();
    if (!user) {
      console.error('No hay usuario autenticado');
      return;
    }

    const newContribution = {
      user_id: user.id,
      title: data.title,
      description: data.description,
      latitude: markerPosition?.latitude!,
      longitude: markerPosition?.longitude!,
    };

    const { data: insertedData, error } = await supabase
      .from('contributions')
      .insert([newContribution]);

    if (error) {
      console.error('Error al añadir la contribución:', error);
    } else {
      console.log('Contribución añadida:', insertedData);
      setContributions([...contributions, ...insertedData]);
      setMarkerPosition(null);
    }
  };

  const handleMarkerClick = (contributionId: string) => {
    const contribution = contributions.find(c => c.id === contributionId);
    if (contribution) {
      setSelectedContribution(contribution);
      setIsInfoModalOpen(true);
    }
  };

  const renderClusterMarker = (cluster: any, index: any) => {
    const [longitude, latitude] = cluster.geometry.coordinates;
    const { cluster: isCluster, point_count: pointCount } = cluster.properties;

    if (isCluster) {
      return (
        <Marker key={`cluster-${cluster.id}`} latitude={latitude} longitude={longitude}>
          <div
            className="cluster-marker"
            style={{
              width: `${25 + (pointCount / contributions.length) * 20}px`,
              height: `${25 + (pointCount / contributions.length) * 20}px`,
            }}
            onClick={() => {
              const newZoomLevel = Math.min(viewState.zoom + 2, 20); // Ensure the zoom level does not exceed 20
              setViewState({
                ...viewState,
                latitude,
                longitude,
                zoom: newZoomLevel,
              });
            }}
          >
            {pointCount}
          </div>
        </Marker>
      );
    }

    return (
      <Marker key={`contribution-${cluster.properties.contributionId}`} latitude={latitude} longitude={longitude}>
        <div
          className="mapboxgl-marker-saved"
          onClick={() => handleMarkerClick(cluster.properties.contributionId)}
        ></div>
      </Marker>
    );
  };

  return (
    <div className="relative w-full h-full">
      <ReactMapGL
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        ref={mapRef}
        style={{ width: '100%', height: 'calc(100vh - 64px)' }} // Ajusta la altura del mapa
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <GeolocateControl position="top-right" />
        {isAdding && (
          <Marker latitude={viewState.latitude} longitude={viewState.longitude}>
            <div className="mapboxgl-marker-adding"></div>
          </Marker>
        )}
        {clusters.map((cluster, index) => renderClusterMarker(cluster, index))}
      </ReactMapGL>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        {isAdding ? (
          <button
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            onClick={handleConfirmContribution}
          >
            OK
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
            onClick={handleAddContribution}
          >
            + Contribute
          </button>
        )}
      </div>
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