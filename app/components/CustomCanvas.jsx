'use client'

import { useRef, useEffect } from 'react';
import { Canvas, FabricImage, Rect } from 'fabric';
import { usePathname } from 'next/navigation';


export default function CustomCanvas({containerRef, canvasRef}) {

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[500px] rounded-lg aspect-[59/50] z-10"
    >
      <div className="relative">
        <canvas className='' ref={canvasRef} />
      </div>
    </div>
  )

}