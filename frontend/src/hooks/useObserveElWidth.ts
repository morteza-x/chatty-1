import { useEffect, useRef } from "react";

export const useObserveElWidth = (
  element: any,
  func: (a:any) => any
) => {
  // if (!element) {
  //   console.log('EMPY-----------------')
  //   return;
  // };
  const resizeObserverRef:any = useRef(null);
  
  resizeObserverRef.current = new ResizeObserver((entries:any) => {
    const entry = entries[0];
    const newWidth = entry.contentRect.width;
    func(newWidth);
  });

  useEffect(() => {
    if (!element || !resizeObserverRef?.current) return;
    resizeObserverRef.current.observe(element);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    }
  }, [element, resizeObserverRef]);
  
  return {
    //resizeObserverRef,
  };
};