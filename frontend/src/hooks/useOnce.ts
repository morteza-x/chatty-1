import { useEffect, useRef } from "react";

export function useOnce(callback:() => any) {
  const ref = useRef(true);

  useEffect(() => {
    if (ref.current) {
      callback();
      ref.current = false
    }
  }, [callback]);
}