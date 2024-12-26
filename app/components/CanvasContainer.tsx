"use client"

import { useEffect, useRef } from 'react';
import CustomCanvas from './CustomCanvas';
import { useParams, usePathname } from 'next/navigation';
import { Canvas, FabricImage, FabricText } from 'fabric';
import CanvasMenu from './CanvasMenu';
import CanvasFooter from './CanvasFooter';
import UserOptions from './UserOptions';
import { ClientUploadedFileData } from 'uploadthing/types';
import { useCalendarStore } from '../utils/calendarStore';
import { useQuoteStore } from '../utils/quoteStore';
import { strictEqual } from 'assert';
import { getEventListeners } from 'events';

const BACKGROUND_WIDTH = 1872;
const BACKGROUND_HEIGHT = 1570;


export default function CanvasContainer() {
  const params = useParams()
  const monthStr = params.month as string
  const index = parseInt(monthStr)

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[index]


  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null)

  const setFabricCanvas = useCalendarStore((state) => state.setFabricCanvas)
  const getFabricCanvas = useCalendarStore((state) => state.getFabricCanvas)


  const getText = useQuoteStore((store) => store.getText)
  const setText = useQuoteStore((store) => store.setText)
  const getFabricQuote = useQuoteStore((store) => store.getFabricQuote)
  const setFabricQuote = useQuoteStore((store) => store.setFabricQuote)

  const pathname = usePathname();

  const firstPartnerName = useCalendarStore((state) => state.firstPartnerName)
  const secondPartnerName = useCalendarStore((state) => state.secondPartnerName)
  const backgroundImage = useCalendarStore((state) => state.monthlySettings[month].monthTheme)


  const handleImageUpload = (res: ClientUploadedFileData<{ uploadedBy: string }>[]) => {
    const containerElement = containerRef.current;
    const fabricCanvas = getFabricCanvas()
    if (!fabricCanvas || !containerElement) return

    clearImages()

    const uploadedImage = res[0]
    const imgElement = new Image()

    imgElement.src = uploadedImage.appUrl



    /**
     * After the image is loaded, create a new fabric image layer and
     * add it to the canvas. Center the image on the canvas and save the state
     * of the canvas to local storage.
     */
    imgElement.onload = () => {

      const containerWidthBoundry = containerElement.clientWidth - 200;
      const containerHeightBoundry = containerElement.clientHeight - 200;

      const scaleX = imgElement.naturalWidth > containerWidthBoundry ? containerWidthBoundry / imgElement.naturalWidth : 1;
      const scaleY = imgElement.naturalHeight > containerHeightBoundry ? containerHeightBoundry / imgElement.naturalHeight : 1;

      const scale = Math.min(scaleX, scaleY);

      const fabricImageLayer = new FabricImage(imgElement, {
        width: imgElement.naturalWidth,
        height: imgElement.naturalHeight,
        scaleX: scale,
        scaleY: scale,
        left: 0,
        top: 0
      })
      fabricCanvas.add(fabricImageLayer)
      fabricCanvas.centerObject(fabricImageLayer)
      saveStateToLocalStorage()
    }
  }

  const saveStateToLocalStorage = () => {
    const fabricCanvas = getFabricCanvas()
    if (!fabricCanvas) return
    localStorage.setItem(
      `canvas-${index}`,
      JSON.stringify(fabricCanvas.toJSON())
    );
  }

  const deleteAllLocalStorage = () => {
    localStorage.clear()
    window.location.reload()
  }

  const deleteIndexLocalStorage = () => {
    const fabricCanvas = getFabricCanvas()
    if (!fabricCanvas) return
    localStorage.removeItem(`canvas-${index}`)
    window.location.reload()
  }

  const clearImages = () => {
    const fabricCanvas = getFabricCanvas()
    if (!fabricCanvas) return

    const fabricObjects =  fabricCanvas.getObjects("image")

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
    backgroundImageElement.src = backgroundImage



    const disposeCanvas = () => {
      const fabricCanvas = getFabricCanvas()
      if (fabricCanvas) {
        fabricCanvas.dispose();
      }
    }

    const initFabricCanvas = () => {
      const fabricCanvas = getFabricCanvas()
      if (fabricCanvas) return

      const canvas = new Canvas(canvasElement, {
        width: containerWidth,
        height: containerHeight,
        backgroundImage: new FabricImage(backgroundImageElement, {
          scaleX: containerWidth / BACKGROUND_WIDTH,
          scaleY: containerHeight / BACKGROUND_HEIGHT,
        }),
      });
      setFabricCanvas(canvas)

      addNames()
      addFabricQuote()
      canvas.renderAndReset()
      canvas.on('object:modified', saveStateToLocalStorage);
    }

    const addFabricQuote = () => {
      const fabricCanvas = getFabricCanvas()
      setText("Testing")
      const text = getText()
      if (!fabricCanvas) return


      setFabricQuote( new FabricText(text, {
        fontSize: 32,
        fontWeight: "bold",
        selectable: false,
        hasControls: false,
        top: fabricCanvas.height - 55,
      }))

      const fabricQuote = getFabricQuote()
      if (!fabricQuote) return
      fabricCanvas.add(fabricQuote)
      fabricCanvas.centerObjectH(fabricQuote)
    }

    const addNames = () => {
      const fabricCanvas = getFabricCanvas()
      if (!fabricCanvas) return
      const fabricTextObject = new FabricText(`${firstPartnerName} & ${secondPartnerName}`, {
        fontSize: 32,
        fontWeight: "bold",
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockScalingFlip: true,
        lockSkewingX: true,
        lockSkewingY: true,
        selectable: false,
        hasControls: false,
        left: 100,
        top: 10,
      })

      fabricCanvas.add(fabricTextObject)
      fabricCanvas.centerObjectH(fabricTextObject)
    }

    const isSavedVersion = () => {
      const localCanvas = localStorage.getItem(`canvas-${index}`);
      return !!localCanvas
    }

    backgroundImageElement.onload = async () => {
      const fabricCanvas = getFabricCanvas()
      console.log("Onload firing")
      if (!fabricCanvas) {
        initFabricCanvas();
      }

      if (isSavedVersion() && fabricCanvas) {
        const storageItem = localStorage.getItem(`canvas-${index}`)
        if (!fabricCanvas || !storageItem) return

        await fabricCanvas.loadFromJSON(storageItem).then((canvas: any) => {
          canvas.requestRenderAll();
        })
      }
    }

    return () => {
      disposeCanvas();
    };
  }, [pathname]);


  return (
    <div className='grid calendar-container h-screen'>
      <CanvasMenu
        handleSave={saveStateToLocalStorage}
        handleIndexReset={deleteIndexLocalStorage}
        handleFileUpload={handleImageUpload}
        handleImageRemove={clearImages}
      />
      <div className="flex flex-col gap-2 w-full justify-center items-center relative grid-canvas">
        <h1 className='text-white text-4xl font-semibold'>
          {month}
        </h1>
        <div className='min-h-[500px] aspect-[59/50] z-10 rounded-lg'>
          <CustomCanvas containerRef={containerRef} canvasRef={canvasRef} />
        </div>
      </div>
      <UserOptions />
      <CanvasFooter handleReset={deleteAllLocalStorage} />
    </div>
  )
}