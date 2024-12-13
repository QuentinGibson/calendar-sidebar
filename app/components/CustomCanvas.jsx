export default function CustomCanvas({containerRef, canvasRef}) {
  return (
    <div
      ref={containerRef}
      className="relative w-full h-full "
    >
      <div className="relative">
        <canvas className='' ref={canvasRef} />
      </div>
    </div>
  )

}