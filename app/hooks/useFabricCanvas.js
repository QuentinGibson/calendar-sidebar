'use client'
import { Canvas, FabricImage, Rect } from 'fabric';
import { useEffect, useRef } from 'react';

const BACKGROUND_WIDTH = 1872;
const BACKGROUND_HEIGHT = 1570;

// interface useFabricCanvasProps {
//   canvasRef: React.RefObject<HTMLCanvasElement>;
//   containerRef: React.RefObject<HTMLDivElement>;
// }

export function useFabricCanvas({ canvasRef,  containerRef } ) {
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const backgroundImageElement = new Image(BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
    backgroundImageElement.src = "/background/Couple%20Calendar%20Background%20Template%20Black.png";

    const disposeCanvas = () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
      }
    }

    const initFabricCanvas = () => {
      fabricCanvasRef.current = new Canvas(canvasRef.current, {
        width: containerWidth,
        height: containerHeight,
        backgroundImage: new FabricImage(backgroundImageElement, {
          scaleX: containerWidth / BACKGROUND_WIDTH,
          scaleY: containerHeight / BACKGROUND_HEIGHT,
        }),
      });
    fabricCanvasRef.current.on('object:modified', saveStateToLocalStorage);
    }

    const addRectangle = () => {
      const rect = new Rect({
        width: 100,
        height: 100,
        fill: 'red',
        left: 100,
        top: 100,
      });

      fabricCanvasRef.current.add(rect);
    }

    const saveStateToLocalStorage = () => {
      localStorage.setItem('canvas', JSON.stringify(fabricCanvasRef.current.toJSON()));
    }


    backgroundImageElement.onload = () => {
      initFabricCanvas();
      addRectangle();
    }


    return () => {
      disposeCanvas();
    };
  }, []);
}

