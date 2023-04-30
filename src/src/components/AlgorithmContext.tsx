import { createContext } from "react";

export const AlgorithmContext = createContext<
  ["KMP" | "BM", (alg: "KMP" | "BM") => void]
>({} as any);
