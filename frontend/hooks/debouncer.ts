import { log } from "console";
import { useEffect, useMemo, useState } from "react";

export function useDebounder(value: string, delay: number) {
  const [v, setV] = useState("");



  useEffect(() => {
   const tId= setTimeout(() => {
        setV(value);
      }, delay)
    return () => {
      clearTimeout(tId);

      return;
    };
  }, [delay, value]);
  return v;
}
