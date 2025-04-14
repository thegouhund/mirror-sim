import { create } from "zustand";

type SimulationState = {
  objectName: string;
  setObjectName: (value: string) => void;
  objectX: number;
  setObjectX: (value: number) => void;
  objectHeightMultiplier: number;
  setObjectHeightMultiplier: (value: number) => void;
  focalPoint: number;
  setFocalPoint: (value: number) => void;

  isConvex: boolean;
  setIsConvex: (value: boolean) => void;
  showLightRay: boolean;
  setShowLightRay: (value: boolean) => void;
  showLabel: boolean;
  setShowLabel: (value: boolean) => void;
  canvasWidth: number;
  canvasHeight: number;
};

const useSimulationStore = create<SimulationState>((set) => ({
  objectName: "triangle",
  setObjectName: (value) => set({ objectName: value }),
  objectX: -350,
  setObjectX: (value) => set({ objectX: value }),
  objectHeightMultiplier: 1,
  setObjectHeightMultiplier: (value) => set({ objectHeightMultiplier: value }),
  focalPoint: -150,
  setFocalPoint: (value) => set({ focalPoint: value }),
  isConvex: false,
  setIsConvex: (value) => set({ isConvex: value }),
  showLightRay: true,
  setShowLightRay: (value) => set({ showLightRay: value }),
  showLabel: true,
  setShowLabel: (value) => set({ showLabel: value }),
  canvasWidth: 1280,
  canvasHeight: 720,
}));

export default useSimulationStore;
