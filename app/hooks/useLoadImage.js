
export default async function loadImageToCanvas(fabricCanvasRef, imageSrc) {
  if (!fabricCanvasRef.current) {
    console.log('Canvas is not initialized');
    return;
  }

  // Remove existing objects
  fabricCanvasRef.current.clear();

  // Create a new Image from URL
  const img = await FabricImage.fromURL(imageSrc);

  // Scale image to fit canvas while maintaining aspect ratio
  const canvas = fabricCanvasRef.current;
  const scaleX = (canvas.width - 200) / img.width
  const scaleY = (canvas.height - 200) / img.height
  const scale = Math.min(
    scaleX,
    scaleY
  );


  // Set image properties
  img.set({
    scaleX: scale,
    scaleY: scale,
    cornerSize: 12,
    cornerStyle: 'circle',
    cornerColor: '#2196F3',
    cornerStrokeColor: '#ffffff',
    transparentCorners: false,
    borderColor: '#2196F3',
    borderScaleFactor: 2,
    padding: 5,
    rotatingPointOffset: 40,
  });

  img.on('modified', () => {
    const updatedWidth = img.getScaledWidth();
    const updatedHeight = img.getScaledHeight();
    const updatedLeft = img.left;
    const updatedTop = img.top;

    const canvasHeight = fabricCanvasRef.current.height;
    const canvasWidth = fabricCanvasRef.current.width;
    // Calculate normalized positions from edges
    const normalizedLeft = Math.min(Math.max(
      updatedLeft / canvasWidth,
      0
    ), 1);

    const normalizedTop = Math.min(Math.max(
      updatedTop / canvasHeight,
      0
    ), 1);

    // Scale to background dimensions
    const scaledLeft = Math.round(normalizedLeft * BACKGROUND_WIDTH);
    const scaledTop = Math.round(normalizedTop * BACKGROUND_HEIGHT);

    console.log('Updated dimensions:', {
      scaledLeft, // Will be between 0-1872
      scaledTop,  // Will be between 0-1570
      width: updatedWidth / scale,
      height: updatedHeight / scale,
      scale: scale,
    });
  })

  fabricCanvasRef.current.add(img);
  fabricCanvasRef.current.centerObject(img)

};