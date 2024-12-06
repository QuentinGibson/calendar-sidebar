'use client'

import {useFabricCanvas} from '../hooks/useFabricCanvas';
import { useRef } from 'react';

export default function CustomCanvas({index}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null)

  useFabricCanvas({ canvasRef, containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[500px] border-2 border-dashed rounded-lg p-4 aspect-[59/50]"
    >
      <p>{index}</p>
      <div className="relative">
        <canvas className='' ref={canvasRef} />
      </div>
    </div>
  )

}