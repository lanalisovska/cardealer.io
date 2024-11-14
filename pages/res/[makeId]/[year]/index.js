import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';

const FetchVehicleModels = React.lazy(() => import('@/components/FetchVehicleModels'));

export default function ResultPage(par) {
  const router = useRouter();
  const { makeId, year } = router.query;

  return (
    <div className="p-4 bg-background min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-foreground">
        Vehicle Models for {year} {makeId}
      </h1>
      <button
        onClick={() => router.back()}
        className="mt-6 mb-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transform transition-all duration-200 hover:scale-105"
      >
        Back
      </button>

      <Suspense fallback={<Loader />}>
        <FetchVehicleModels makeId={makeId} year={year} />
      </Suspense>
    </div>
  );
}
