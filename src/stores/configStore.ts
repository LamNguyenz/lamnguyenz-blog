import { atom } from "nanostores";

interface IConfig {
  theme: string;
}

const initialConfig: IConfig = {
  theme: "dark",
};

// Create the store with initial values
export const configStore = atom<IConfig>(initialConfig);

// Helper functions
export const updateStyle = (updates: Partial<IConfig>) => {
  configStore.set({ ...configStore.get(), ...updates });
};

// Optional: Add persistence
export const initializeStore = () => {
  const config = localStorage !== undefined && localStorage.getItem("config");

  if (config) {
    configStore.set(JSON.parse(config));
  } else {
    updateStyle(initialConfig);
  }

  // Save to localStorage when updated
  configStore.listen((value) => {
    typeof localStorage !== "undefined" &&
      localStorage.setItem("config", JSON.stringify(value));
  });
};
