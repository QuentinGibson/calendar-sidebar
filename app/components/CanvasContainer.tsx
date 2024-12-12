"use client"
import { useEffect, useRef } from 'react';
import CustomCanvas from './CustomCanvas';
import { useParams, usePathname } from 'next/navigation';
import { Canvas, FabricImage, Rect } from 'fabric';
import CanvasMenu from './CanvasMenu';
import CanvasFooter from './CanvasFooter';

const BACKGROUND_WIDTH = 1872;
const BACKGROUND_HEIGHT = 1570;

export default function CanvasContainer() {
  const params = useParams()
  const monthStr = params.month as string
  const index = parseInt(monthStr)


  const fabricCanvasRef = useRef<Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null)

  const pathname = usePathname();

  const saveStateToLocalStorage = () => {
    if (!fabricCanvasRef.current) return
    localStorage.setItem(
      `canvas-${index}`,
      JSON.stringify(fabricCanvasRef.current.toJSON())
    );
  }

  const deleteAllLocalStorage = () => {
    localStorage.clear()
  }

  const deleteIndexLocalStorage = () => {
    if (!fabricCanvasRef.current) return
    localStorage.removeItem(`canvas-${index}`)
    window.location.reload()
  }

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const containerElement = containerRef.current;
    const canvasElement = canvasRef.current
    const containerWidth = containerElement.clientWidth;
    const containerHeight = containerElement.clientHeight;

    const backgroundImageElement = new Image(BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
    backgroundImageElement.src = "/background/Couple%20Calendar%20Background%20Template%20Black.png";



    const disposeCanvas = () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
      }
    }

    const initFabricCanvas = () => {
      if (!fabricCanvasRef.current) {
        fabricCanvasRef.current = new Canvas(canvasElement, {
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
      if (!fabricCanvasRef.current) return
      const rect = new Rect({
        width: 100,
        height: 100,
        fill: 'red',
        left: 100,
        top: 100,
      });

      fabricCanvasRef.current.add(rect);
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
        const storageItem = localStorage.getItem(`canvas-${index}`)
        if (!fabricCanvasRef.current || !storageItem) return

        await fabricCanvasRef.current.loadFromJSON(storageItem).then((canvas: any) => {
          canvas.requestRenderAll();
        })
      }
    }


    return () => {
      disposeCanvas();
    };
  }, [pathname]);

  return (
    <div className="grid gap-6 w-full justify-center items-center h-full">
      <CanvasMenu handleSave={saveStateToLocalStorage} handleIndexReset={deleteIndexLocalStorage} />
      <CanvasFooter handleReset={deleteAllLocalStorage} />
      <CustomCanvas containerRef={containerRef} canvasRef={canvasRef}/>
    </div>
  )
}