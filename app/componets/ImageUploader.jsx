'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Canvas, FabricImage } from 'fabric';

export function ImageUploader({ onImageSelect, monthNumber, base64Image }) {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    // Initialize Fabric canvas
    if (canvasRef.current && !fabricCanvasRef.current) {
      fabricCanvasRef.current = new Canvas(canvasRef.current, {
        width: 500,
        height: 500,
        backgroundColor: '#f0f0f0',
      });

    }

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [imagePreview]);

  // useEffect(() => {
  //   if (base64Image && base64Image.startsWith('data:image/')) {
  //     loadImageToCanvas(base64Image);
  //   }
  // }, [base64Image]);


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
    const scale = Math.min(
      (canvas.width - 100) / img.width,
      (canvas.height - 100) / img.height
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
    fabricCanvasRef.current.add(img);
    fabricCanvasRef.current.centerObject(img)

  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    fabricCanvasRef.current = new Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      backgroundColor: '#f0f0f0',
    });
    setImagePreview(URL.createObjectURL(file));
    if (file && file.type.startsWith('image/')) {
      const imgUrl = URL.createObjectURL(file)
        loadImageToCanvas(imgUrl);
      };
    }

  return (
    <div
      className="relative w-full min-h-[500px] border-2 border-dashed rounded-lg p-4"
    >
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
          <canvas ref={canvasRef} />
        </div>
      )}
    </div>
  );
}
