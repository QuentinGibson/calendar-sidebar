"use client"

import { useEffect, useRef } from 'react';
import { Canvas, FabricImage, FabricText } from 'fabric';
import CanvasMenu from '@/components/CanvasMenu';
import CanvasFooter from '@/components/CanvasFooter';
import UserOptions from '@/components/UserOptions';
import { ClientUploadedFileData } from 'uploadthing/types';
import { useCalendarStore } from '@/app/utils/calendarStore';
import { useQuoteStore } from '@/app/utils/quoteStore';
import { usePartnerStore } from '@/app/utils/usePartnerStore';
import { backgrounds, useBackgroundStore } from '@/app/utils/backgroundStore';
import { months } from '@/app/utils/helpers';

const BACKGROUND_WIDTH = 1872;
const BACKGROUND_HEIGHT = 1570;

export default function CanvasContainer() {
  const monthIndex = useCalendarStore(state => state.monthIndex)

  const month = months[monthIndex]

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null)

  const setFabricCanvas = useCalendarStore((state) => state.setFabricCanvas)
  const getFabricCanvas = useCalendarStore((state) => state.getFabricCanvas)

  const getText = useQuoteStore((store) => store.getText)
  const setText = useQuoteStore((store) => store.setText)
  const getFabricQuote = useQuoteStore((store) => store.getFabricQuote)
  const setFabricQuote = useQuoteStore((store) => store.setFabricQuote)

  const getFabricNames = usePartnerStore((state) => state.getFabricNames)
  const setFabricNames = usePartnerStore((state) => state.setFabricNames)

  const firstPartnerName = usePartnerStore((state) => state.firstPartner)
  const secondPartnerName = usePartnerStore((state) => state.secondPartner)
  const backgroundColor = useBackgroundStore((state) => state.getMonthBackground(monthIndex))

  const setBackgroundImageElement = useCalendarStore((state) => state.setBackgroundImageElement)
  const getBackgroundImageElement = useCalendarStore((state) => state.getBackgroundImageElement)

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
      `canvas-${monthIndex}`,
      JSON.stringify(fabricCanvas.toJSON())
    );
  }

  // const deleteAllLocalStorage = () => {
  //   localStorage.clear()
  //   window.location.reload()
  // }

  // const deleteIndexLocalStorage = () => {
  //   const fabricCanvas = getFabricCanvas()
  //   if (!fabricCanvas) return
  //   localStorage.removeItem(`canvas-${monthIndex}`)
  //   window.location.reload()
  // }

  const clearImages = () => {
    const fabricCanvas = getFabricCanvas()
    if (!fabricCanvas) return

    const fabricObjects = fabricCanvas.getObjects("image")

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

    let backgroundImageElement = getBackgroundImageElement()
    if (!backgroundImageElement) {
      setBackgroundImageElement(new Image(BACKGROUND_WIDTH, BACKGROUND_HEIGHT))
      backgroundImageElement = getBackgroundImageElement()
    };
    if (!backgroundImageElement) return
    backgroundImageElement.src = backgrounds[backgroundColor]

    const disposeCanvas = () => {
      const fabricCanvas = getFabricCanvas()
      if (fabricCanvas) {
        fabricCanvas.dispose();
      }
    }

    const initFabricCanvas = () => {
      let fabricCanvas = getFabricCanvas()
      setFabricCanvas(new Canvas(canvasElement, {
        width: containerWidth,
        height: containerHeight,
        backgroundImage: new FabricImage(backgroundImageElement, {
          scaleX: containerWidth / BACKGROUND_WIDTH,
          scaleY: containerHeight / BACKGROUND_HEIGHT,
        }),
      }));
      fabricCanvas = getFabricCanvas()

      addNames()
      addFabricQuote()
      fabricCanvas?.requestRenderAll()
      fabricCanvas?.on('object:modified', saveStateToLocalStorage);
    }

    const addFabricQuote = () => {
      const fabricCanvas = getFabricCanvas()
      setText("Testing")
      const text = getText()
      if (!fabricCanvas) return


      setFabricQuote(new FabricText(text, {
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
      setFabricNames(new FabricText(`${firstPartnerName} & ${secondPartnerName}`, {
        fontSize: 32,
        fontWeight: "bold",
        selectable: false,
        hasControls: false,
        left: 100,
        top: 10,
      }))

      const fabricNames = getFabricNames()
      if (!fabricNames) return

      fabricCanvas.add(fabricNames)
      fabricCanvas.centerObjectH(fabricNames)
    }


    backgroundImageElement.onload = async () => {
      const fabricCanvas = getFabricCanvas()
      console.log("Onload firing")
      initFabricCanvas();

      // const isSavedVersion = () => {
      //   const localCanvas = localStorage.getItem(`canvas-${index}`);
      //   return !!localCanvas
      // }

      // if (isSavedVersion() && fabricCanvas) {
      //   const storageItem = localStorage.getItem(`canvas-${index}`)
      //   if (!fabricCanvas || !storageItem) return

      //   await fabricCanvas.loadFromJSON(storageItem)
      // }

      fabricCanvas?.requestRenderAll();

    }

    return () => {
      disposeCanvas();
    };
  }, [monthIndex, backgroundColor]);


  return (
    <div className='grid calendar-container h-screen'>
      <CanvasMenu
        handleSave={saveStateToLocalStorage}
        handleIndexReset={() => { console.log("To be implemented") }}
        handleFileUpload={handleImageUpload}
        handleImageRemove={clearImages}
      />
      <div className="flex flex-col gap-2 w-full justify-center items-center relative grid-canvas">
        <h1 className='text-white text-4xl font-semibold'>
          {month}
        </h1>
        <div className='min-h-[500px] aspect-[59/50] z-10 rounded-lg'>
          <div
            ref={containerRef}
            className="relative w-full h-full "
          >
            <div className="relative">
              <canvas className='' id="fabric-canvas" ref={canvasRef} />
            </div>
          </div>
        </div>
      </div>
      <UserOptions />
      <CanvasFooter />
    </div>
  )
}