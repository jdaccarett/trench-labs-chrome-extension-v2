import { useMemo } from "react";
import { URLParams } from "../types";

export function useURLParams(): URLParams {
  return useMemo(() => {
    const url = window.location.href;
    const isAxiom = url.includes("axiom.trade/meme/");
    const isBullX = url.includes("neo.bullx.io/terminal");

    let address: string | undefined;
    let creatorCA: string | undefined;

    if (isAxiom) {
      address = url.split("meme/")[1]?.split("?")[0];
    } else if (isBullX) {
      const params = new URLSearchParams(window.location.search);
      address = params.get("address") || undefined;
      creatorCA = params.get("creatorCA") || undefined;
    }

    return {
      address,
      creatorCA,
      isValidPage: isAxiom || isBullX,
    };
  }, [window.location.href]);
}
