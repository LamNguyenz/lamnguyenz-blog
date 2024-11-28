import { type StyleConfig, style } from "@/settings/config";
import { atom } from "nanostores";

// Create the store with initial values
export const styleStore = atom<StyleConfig>(style);

// Helper functions
export const updateStyle = (updates: Partial<StyleConfig>) => {
  styleStore.set({ ...styleStore.get(), ...updates });
};

// Optional: Add persistence
export const initializeStore = () => {
  // Load from localStorage if available
  const styleConfig =
    (typeof localStorage !== "undefined" && localStorage.getItem("style-config")) ||
    "{}";
  const config = JSON.parse(styleConfig);

  let theme = config?.theme || styleStore.get().theme;
  if (theme === "auto" || !theme) {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  updateStyle({ ...config, theme });

  // Save to localStorage when updated
  styleStore.listen((value) => {
    typeof localStorage !== "undefined" &&
      localStorage.setItem("style-config", JSON.stringify(value));
  });
};
