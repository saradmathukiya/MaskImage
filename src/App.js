import React, { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import "./App.css";

const ImageEditorPro = () => {
  const [image, setImage] = useState(null);
  const [brushSize, setBrushSize] = useState(10);
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const downloadMask = () => {
    const maskCanvas = canvasRef.current.canvasContainer.children[1];
    const maskContext = maskCanvas.getContext("2d");
    maskContext.globalCompositeOperation = "destination-over";
    maskContext.fillStyle = "black";
    maskContext.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

    const maskURL = maskCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "edited-mask.png";
    link.href = maskURL;
    link.click();
  };

  const resetCanvas = () => {
    canvasRef.current.clear();
  };

  const adjustBrushSize = (event) => {
    setBrushSize(event.target.value);
  };

  return (
    <div className="ImageEditorPro">
      <header>
        <h1>Artify: Precision Editor</h1>
        <p>Customize images effortlessly with our advanced editing tool.</p>
      </header>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="upload-input"
      />

      {image && (
        <div className="canvas-wrapper">
          <CanvasDraw
            ref={canvasRef}
            brushColor="#FFFFFF"
            brushRadius={brushSize}
            canvasWidth={500}
            canvasHeight={500}
            lazyRadius={0}
            hideGrid={true}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
            imgSrc={image}
          />
        </div>
      )}

      {image && (
        <div className="controls">
          <div className="brush-controller">
            <label htmlFor="brushSize">Brush Size: {brushSize}</label>
            <input
              type="range"
              id="brushSize"
              min="1"
              max="50"
              value={brushSize}
              onChange={adjustBrushSize}
            />
          </div>

          <button onClick={downloadMask} className="action-button save-button">
            Save Edits
          </button>
          <button onClick={resetCanvas} className="action-button reset-button">
            Reset Canvas
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageEditorPro;
