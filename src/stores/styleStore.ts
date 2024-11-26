import { atom } from "nanostores";
import { type StyleConfig, style } from "@/settings/config";

// Create the store with initial values
export const styleStore = atom<StyleConfig>(style);

// Helper functions
export const updateStyle = (updates: Partial<StyleConfig>) => {
  styleStore.set({ ...styleStore.get(), ...updates });
};

// Optional: Add persistence
export const initializeStore = () => {
  // Load from localStorage if available
  const saved = localStorage.getItem("style-config");
  if (saved) {
    styleStore.set(JSON.parse(saved));
  }

  // Save to localStorage when updated
  styleStore.listen((value) => {
    localStorage.setItem("style-config", JSON.stringify(value));
  });
};
