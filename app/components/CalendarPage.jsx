import CanvasContainer from './CanvasContainer';

export default async function Calendar() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Create Your Calendar
      </h1>
      <CanvasContainer />
    </div>
  );
}
