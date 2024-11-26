// Define the type for better TypeScript support
type ColorOption =
  | "blue"
  | "indigo"
  | "violet"
  | "magenta"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "moss"
  | "green"
  | "emerald"
  | "aqua"
  | "cyan";

type NeutralOption = "sand" | "gray" | "slate";
type ThemeOption = "dark" | "light";

export interface StyleConfig {
  theme: ThemeOption;
  neutral: NeutralOption;
  primary: ColorOption;
  secondary: ColorOption;
}

export const style: StyleConfig = {
  theme: "dark",
  neutral: "gray",
  primary: "red",
  secondary: "blue",
};
