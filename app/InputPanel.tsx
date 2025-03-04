import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import useSimulationStore from "./hooks/useSimulationStore";

const InputPanel = () => {
  const {
    objectX,
    setObjectX,
    objectHeight,
    setObjectHeight,
    focalPoint,
    setFocalPoint,
    showLightRay,
    setShowLightRay,
    canvasWidth,
    showLabel,
    setShowLabel,
  } = useSimulationStore();
  return (
    <div className="w-full p-4 bg-white border rounded-lg shadow-md ">
      {/* Left Side - Object Distance & Focal Length */}
      <h2 className="text-xl font-semibold">Simulation Controls</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
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
          <div className="flex gap-1 items-center">
            <label>Show Light Ray</label>
            <Switch
              defaultChecked={true}
              checked={showLightRay}
              onCheckedChange={(checked) => setShowLightRay(checked)}
            />
          </div>
          <div className="flex gap-1 items-center">
            <label>Show Label</label>
            <Switch
              defaultChecked={true}
              checked={showLabel}
              onCheckedChange={(checked) => setShowLabel(checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
