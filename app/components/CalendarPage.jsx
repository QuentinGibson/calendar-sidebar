import CanvasContainer from './CanvasContainer';
import { FabricCanvasProvider } from './FabricCanvasProvider';

export default async function Calendar() {
  return (
    <div className="container h-screen">
      <FabricCanvasProvider>
        <CanvasContainer />
      </FabricCanvasProvider>
    </div>
  );
}
