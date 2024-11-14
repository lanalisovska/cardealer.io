import { useFetchData } from '@/hooks/useFetchData';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Link from 'next/link';
import { API, YEARS_LIST } from '@/constants';
import Loader from '@/components/Loader';
import ErrorComponent from '@/components/Error';

export default function Home() {
  const [selectedMake, setSelectedMake] = useLocalStorage('selectedMake', '');
  const [selectedYear, setSelectedYear] = useLocalStorage('selectedYear', '');

  const { data: makes, loading, error } = useFetchData(`${API}/vehicles/GetMakesForVehicleType/car?format=json`);

  if (loading) return <Loader />
  if (error) return <ErrorComponent error={error}/>

  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-4xl font-bold text-center text-foreground mb-6">Car Dealer App</h1>
      <div className="mb-6">
        <label className="block text-lg text-white-700 mb-2">Select Vehicle Make:</label>
        <select
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          className="w-full p-3 border border-white-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="">Select Make</option>
          {makes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-lg text-white-700 mb-2">Select Model Year:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full p-3 border border-white-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="">Select Year</option>
          {YEARS_LIST.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <Link href={selectedMake && selectedYear ? `/res/${selectedMake}/${selectedYear}` : '#'}>
        <button
          className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transform transition-all duration-200 hover:bg-blue-700 ${!selectedMake || !selectedYear ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!selectedMake || !selectedYear}
        >
          Next
        </button>
      </Link>
    </div>
  );
}
