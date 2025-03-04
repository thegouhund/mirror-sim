import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import React from "react";

interface InputPanelProps {
  objectX: number;
  setObjectX: (x: number) => void;
  objectHeight: number;
  setObjectHeight: (height: number) => void;
  focalPoint: number;
  setFocalPoint: (x: number) => void;
  canvasWidth: number;
}

const InputPanel: React.FC<InputPanelProps> = ({
  objectX,
  setObjectX,
  objectHeight,
  setObjectHeight,
  focalPoint,
  setFocalPoint,
  canvasWidth,
}) => {
  return (
    <div className="w-full p-4 bg-white border rounded-lg shadow-md grid grid-cols-2 gap-4">
      {/* Left Side - Object Distance & Focal Length */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Simulation Controls</h2>
        
        {/* Object Distance */}
        <div className="flex gap-2 items-center">
          <p>Object Distance:</p>
          <input
            type="text"
            value={objectX}
            onChange={(e) => setObjectX(parseInt(e.target.value) || 0)}
            className="w-14 p-1 border rounded focus:outline-none text-center"
          />
          <p>Units</p>
        </div>
        <Slider
          min={-canvasWidth}
          max={canvasWidth}
          value={[objectX]}
          onValueChange={(value) => setObjectX(value[0])}
          className="w-full"
        />

        {/* Focal Length */}
        <div className="flex gap-2 items-center">
          <p>Focal Length:</p>
          <input
            type="text"
            value={focalPoint}
            onChange={(e) => setFocalPoint(parseInt(e.target.value) || 0)}
            className="w-14 p-1 border rounded focus:outline-none text-center"
          />
          <p>Units</p>
        </div>
        <Slider
          min={-canvasWidth}
          max={canvasWidth}
          value={[focalPoint]}
          onValueChange={(value) => setFocalPoint(value[0])}
          className="w-full"
        />
      </div>

      {/* Right Side - Object Height */}
      <div className="flex flex-col gap-4">
        {/* Object Height */}
        <div className="flex gap-2 items-center">
          <p>Object Height:</p>
          <input
            type="text"
            value={objectHeight}
            onChange={(e) => setObjectHeight(parseInt(e.target.value) || 0)}
            className="w-14 p-1 border rounded focus:outline-none text-center"
          />
          <p>Units</p>
        </div>
        <Slider
          min={-canvasWidth}
          max={canvasWidth}
          value={[objectHeight]}
          onValueChange={(value) => setObjectHeight(value[0])}
          className="w-full"
        />
      </div>
    </div>
  );
};
// create a concave mirror simulation web app. canvas in the middle 16:9 ratio. panel under canvas inside are inputs related to mirror simulation

export default InputPanel;
