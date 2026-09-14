import { beforeEach, describe, expect, it, vi } from "vitest";

import { COLOR_SCHEME_SCRIPT } from "@/components/system-color-scheme";

function stubMatchMedia(prefersDark: boolean) {
  let matches = prefersDark;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();

  const media = {
    get matches() {
      return matches;
    },
    media: "(prefers-color-scheme: dark)",
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.add(listener);
    },
    removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.delete(listener);
    },
    dispatchEvent: vi.fn(),
  };

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => {
      if (query.includes("prefers-color-scheme: dark")) return media;
      return {
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    }),
  });

  return {
    setPrefersDark(next: boolean) {
      matches = next;
      for (const listener of listeners) {
        listener({ matches: next } as MediaQueryListEvent);
      }
    },
  };
}

function expectColorScheme(dark: boolean) {
  expect(document.documentElement.classList.contains("dark")).toBe(dark);
  expect(document.documentElement.style.colorScheme).toBe(dark ? "dark" : "light");
}

describe("COLOR_SCHEME_SCRIPT", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "";
  });

  // eslint-disable-next-line no-implied-eval -- executes the shipped script verbatim, as the browser would
  const runScript = () => new Function(COLOR_SCHEME_SCRIPT)();

  it("leaves .dark off when the OS prefers light", () => {
    stubMatchMedia(false);
    runScript();

    expectColorScheme(false);
  });

  it("adds .dark when the OS prefers dark", () => {
    stubMatchMedia(true);
    runScript();

    expectColorScheme(true);
  });
});
