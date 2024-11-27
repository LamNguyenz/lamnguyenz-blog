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
export type ThemeOption = "dark" | "light" | "auto";

export interface StyleConfig {
  theme: ThemeOption;
  neutral: NeutralOption;
  primary: ColorOption;
  secondary: ColorOption;
}

export const style: StyleConfig = {
  theme: "dark",
  neutral: "sand",
  primary: "red",
  secondary: "blue",
};
