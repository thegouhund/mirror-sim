import { create } from "zustand";

type SimulationState = {
  objectX: number;
  setObjectX: (value: number) => void;
  objectHeight: number;
  setObjectHeight: (value: number) => void;
  focalPoint: number;
  setFocalPoint: (value: number) => void;
  showLightRay: boolean;
  setShowLightRay: (value: boolean) => void;
  showLabel: boolean;
  setShowLabel: (value: boolean) => void;
  canvasWidth: number;
  canvasHeight: number;
  objectYOffset: number;
};

const useSimulationStore = create<SimulationState>((set) => ({
  objectX: -150,
  setObjectX: (value) => set({ objectX: value }),
  objectHeight: 150,
  setObjectHeight: (value) => set({ objectHeight: value }),
  focalPoint: -150,
  setFocalPoint: (value) => set({ focalPoint: value }),
  showLightRay: true,
  setShowLightRay: (value) => set({ showLightRay: value }),
  showLabel: true,
  setShowLabel: (value) => set({ showLabel: value }),
  canvasWidth: 1280,
  canvasHeight: 720,
  objectYOffset: 210,
}));

export default useSimulationStore;
