'use client'

import { Canvas } from "fabric"
import { createContext, useRef } from "react"

interface FabricCanvasProviderProps {
  children: React.ReactNode
  fabricCanvas: any
  index: number
}

interface FabricCanvasContextType {
  saveStateToLocalStorage: () => void
  fabricCanvas: Canvas | null
}

const FabricCanvasContext = createContext<FabricCanvasContextType>({saveStateToLocalStorage: () => {}, fabricCanvas: null})

export function FabricCanvasProvider({children, fabricCanvas, index}: FabricCanvasProviderProps) {
  const saveStateToLocalStorage = () => {
    if (fabricCanvas.current) {
      localStorage.setItem(`canvasState-${index}`, JSON.stringify(fabricCanvas.current.toJSON()))
    }
  }

  const fabricCanvasRef = useRef(null)
  return (
    <FabricCanvasContext.Provider value={{ saveStateToLocalStorage, fabricCanvas: fabricCanvasRef.current }}>
      {children}
    </FabricCanvasContext.Provider>
  )
}
