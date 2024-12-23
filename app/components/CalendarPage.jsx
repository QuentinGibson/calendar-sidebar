import CanvasContainer from './CanvasContainer';
import { FabricCanvasProvider } from './FabricCanvasProvider';

export default async function Calendar() {
  return (
    <div className="h-screen">
      <FabricCanvasProvider>
        <CanvasContainer />
      </FabricCanvasProvider>
    </div>
  );
}
