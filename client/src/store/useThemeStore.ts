import { create } from "zustand";

export type Theme = "light" | "dark";

const STORAGE_KEY = "gw-dark"; // "1" = dark, "0" = light (kept for compatibility)

function getInitial(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "1") return "dark";
    if (stored === "0") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

function apply(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, theme === "dark" ? "1" : "0");
  } catch {
    /* storage unavailable */
  }
}

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: getInitial(),
  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    apply(next);
    set({ theme: next });
  },
  setTheme: (theme) => {
    apply(theme);
    set({ theme });
  },
}));