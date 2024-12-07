'use client'

import { useRef, useEffect } from 'react';
import { Canvas, FabricImage, Rect } from 'fabric';
import { usePathname } from 'next/navigation';

const BACKGROUND_WIDTH = 1872;
const BACKGROUND_HEIGHT = 1570;

export default function CustomCanvas({ index }) {

  const fabricCanvasRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null)

  const pathname = usePathname();

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
      if (!fabricCanvasRef.current) {
        fabricCanvasRef.current = new Canvas(canvasRef.current, {
          width: containerWidth,
          height: containerHeight,
          backgroundImage: new FabricImage(backgroundImageElement, {
            scaleX: containerWidth / BACKGROUND_WIDTH,
            scaleY: containerHeight / BACKGROUND_HEIGHT,
          }),
        });
      }
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
      localStorage.setItem(`canvas-${index}`, JSON.stringify(fabricCanvasRef.current.toJSON()));
    }

    const isSavedVersion = () => {
      const localCanvas = localStorage.getItem(`canvas-${index}`);
      return !!localCanvas
    }


    backgroundImageElement.onload = async () => {
      console.log("Onload firing")
      if (!fabricCanvasRef.current) {
        initFabricCanvas();
        addRectangle();
      }

      if (isSavedVersion()) {
        await fabricCanvasRef.current.loadFromJSON(localStorage.getItem(`canvas-${index}`)).then(canvas => {
          canvas.requestRenderAll();
        })
      }
    }


    return () => {
      disposeCanvas();
    };
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[500px] rounded-lg aspect-[59/50]"
    >
      <div className="relative">
        <canvas className='' ref={canvasRef} />
      </div>
    </div>
  )

}