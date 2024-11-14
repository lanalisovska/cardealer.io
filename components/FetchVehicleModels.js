import React, { useState, useEffect } from 'react';
import { API } from '@/constants';
import ErrorComponent from './Error';
import Loader from './Loader';

export default function FetchVehicleModels({ makeId, year }) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchModels() {
      if (!makeId || !year) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setModels(result.Results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, [makeId, year]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <div>
      {models.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {models.map((model) => (
            <div
              key={model.Model_ID}
              className="p-6 border rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-white-300">
                {model.Make_Name} {'  '}
                {model.Model_Name}
              </h2>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No models found for this make and year.</p>
      )}
    </div>
  );
}
