'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Canvas, FabricImage } from 'fabric';

const BACKGROUND_WIDTH = 1872;
const BACKGROUND_HEIGHT = 1570;

export function ImageUploader({ handleImageSelect }) {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const containerRef = useRef(null)

  useEffect(() => {
    // Initialize Fabric canvas
    if (canvasRef.current && !fabricCanvasRef.current && imagePreview) {
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      fabricCanvasRef.current = new Canvas(canvasRef.current, {
        width: containerWidth,
        height: containerHeight,
        backgroundImage: new FabricImage("test-background", {
          scaleX: containerWidth / BACKGROUND_WIDTH,
          scaleY: containerHeight / BACKGROUND_HEIGHT,
        }),
      });
    }

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [imagePreview]);

  const loadImageToCanvas = async (imageSrc) => {
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

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    fabricCanvasRef.current = new Canvas(canvasRef.current);
    setImagePreview(URL.createObjectURL(file));
    if (file && file.type.startsWith('image/')) {
      const imgUrl = URL.createObjectURL(file)
      loadImageToCanvas(imgUrl);
    };
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[500px] border-2 border-dashed rounded-lg p-4 aspect-[59/50]"
    >
      {
        containerRef.current && (
          <img id="test-background" className='hidden' src="/background/Couple%20Calendar%20Background%20Template%20Black.png" alt="" />
        )
      }
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {!imagePreview ? (
        <div className="flex flex-col items-center justify-center h-full">
          <Button onClick={() => fileInputRef.current?.click()}>
            Choose Image
          </Button>
        </div>
      ) : (
        <div className="relative">
          <canvas className='' ref={canvasRef} />
        </div>
      )}
    </div>
  );
}
