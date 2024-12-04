import loadImageToCanvas from '../utils/loadImageToCanvas';

export default function handleFileSelect(event, fabricCanvasRef) {
  const file = event.target.files[0];
  fabricCanvasRef.current = new Canvas(canvasRef.current);

  if (file && file.type.startsWith('image/')) {
    const imgUrl = URL.createObjectURL(file)
    loadImageToCanvas(imgUrl);
  };
}