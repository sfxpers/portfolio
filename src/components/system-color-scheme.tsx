import { ScriptOnce } from "@tanstack/react-router";
import { useEffect } from "react";

const PREFERS_DARK = "(prefers-color-scheme: dark)";

// The pre-paint script must reference only globals and the function's own params:
// minifiers rename module bindings, which would dangle in the serialized source.
function applySystemColorScheme(query: string) {
  const root = document.documentElement;
  const dark = window.matchMedia(query).matches;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
}

export const COLOR_SCHEME_SCRIPT = `(function(){try{(${applySystemColorScheme.toString()})(${JSON.stringify(PREFERS_DARK)})}catch(e){}})();`;

/**
 * Syncs the `.dark` class and `color-scheme` on `<html>` with the OS preference.
 * Renders a one-shot SSR script so the class is set before paint (no FOUC).
 */
export function SystemColorScheme() {
  useEffect(() => {
    applySystemColorScheme(PREFERS_DARK);
    const media = window.matchMedia(PREFERS_DARK);
    const onChange = () => applySystemColorScheme(PREFERS_DARK);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return <ScriptOnce>{COLOR_SCHEME_SCRIPT}</ScriptOnce>;
}
