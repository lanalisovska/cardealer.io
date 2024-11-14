import Image from 'next/image';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-[400px]">
      <Image  priority={true} alt="Loading..." src="/loader.gif" width={200} height={200} />
    </div>
  );
}