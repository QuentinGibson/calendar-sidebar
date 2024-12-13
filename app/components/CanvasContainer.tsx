"use client"

import { useEffect, useRef } from 'react';
import CustomCanvas from './CustomCanvas';
import { useParams, usePathname } from 'next/navigation';
import { Canvas, FabricImage } from 'fabric';
import CanvasMenu from './CanvasMenu';
import CanvasFooter from './CanvasFooter';
import { ClientUploadedFileData } from 'uploadthing/types';

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

  const handleImageUpload = (res: ClientUploadedFileData<{ uploadedBy: string }>[]) => {
    const fabricCanvas = fabricCanvasRef.current
    const containerElement = containerRef.current;
    if (!fabricCanvas || !containerElement) return

    const containerWidth = containerElement.clientWidth;
    const containerHeight = containerElement.clientHeight;
    const uploadedImage = res[0]
    const imgElement = new Image()

    imgElement.src = uploadedImage.appUrl


    imgElement.onload = () => {
      const fabricImageLayer = new FabricImage(imgElement, {
        width: imgElement.naturalWidth,
        height: imgElement.naturalHeight,
        scaleX: containerWidth / BACKGROUND_WIDTH,
        scaleY: containerHeight / BACKGROUND_HEIGHT,
        left: 0,
        top: 0
      })
      fabricCanvas.add(fabricImageLayer)
      fabricCanvas.centerObject(fabricImageLayer)
    }
  }

  const saveStateToLocalStorage = () => {
    if (!fabricCanvasRef.current) return
    localStorage.setItem(
      `canvas-${index}`,
      JSON.stringify(fabricCanvasRef.current.toJSON())
    );
  }

  const deleteAllLocalStorage = () => {
    localStorage.clear()
    window.location.reload()
  }

  const deleteIndexLocalStorage = () => {
    if (!fabricCanvasRef.current) return
    localStorage.removeItem(`canvas-${index}`)
    window.location.reload()
  }

  const clearImages = () => {
    const fabricCanvas = fabricCanvasRef.current
    if (!fabricCanvas) return

    const fabricObjects =  fabricCanvas.getObjects()

    for (let object of fabricObjects) {
      fabricCanvas.remove(object)
    }
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
      fabricCanvasRef.current.renderAndReset()
      fabricCanvasRef.current.on('object:modified', saveStateToLocalStorage);

    }

    const isSavedVersion = () => {
      const localCanvas = localStorage.getItem(`canvas-${index}`);
      return !!localCanvas
    }

    backgroundImageElement.onload = async () => {
      console.log("Onload firing")
      if (!fabricCanvasRef.current) {
        initFabricCanvas();
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

  const months = [
    "Janurary",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  const month = months[index]

  return (
    <>
      <CanvasMenu
        handleSave={saveStateToLocalStorage}
        handleIndexReset={deleteIndexLocalStorage}
        handleFileUpload={handleImageUpload}
        handleImageRemove={clearImages}
      />
      <CanvasFooter handleReset={deleteAllLocalStorage} />
      <div className="flex flex-col gap-2 w-full justify-center items-center h-full relative">
        <h1 className='text-white text-4xl font-semibold'>
          {month}
        </h1>
        <div className='min-h-[500px] aspect-[59/50] z-10 rounded-lg'>
          <CustomCanvas containerRef={containerRef} canvasRef={canvasRef} />
        </div>
      </div>
    </>
  )
}