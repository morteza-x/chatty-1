import React, { ReactNode, useEffect, useState } from "react";

type TStep = {
  id: number,
  name: string,
  node: ReactNode,
}

interface TUseMultiStepProps {
  currentIndex: number,
  isFirst: boolean,
  isLast: boolean,
}

export default function useMultiStepsForm(steps: TStep[]=[]) {

  const [state, setState] = useState<TUseMultiStepProps>({
    currentIndex: 0,
    isFirst: false,
    isLast: false,
  });

  const next = () => {
    if (state.currentIndex < steps.length - 1) {
      setState((c:any) => ({
        ...c,
        currentIndex: c.currentIndex + 1,
      }));
    }
  } 

  const back = () => {
    if (state.currentIndex > 0) {
      setState((c:any) => ({
        ...c,
        currentIndex: c.currentIndex - 1,
      }))
    }
  }

  const goto = (stepIndex:number) => {
    setState((c:any) => ({
      ...c,
      currentIndex: stepIndex,
    }));
  }

  steps = steps.map((step:any) => {
    const newNode = React.cloneElement(step.node, {
      next, 
      back, 
      isFirst: state.isFirst,
      isLast: state.isLast,
    });
    return {
      id: step.id,
      name: step.name,
      node: newNode,
    };
  });

  useEffect(() => {
    setState((c:any) => ({
      ...c,
      isFirst: state.currentIndex === 0,
      isLast: state.currentIndex === (steps.length - 1),
    }));
  }, [state.currentIndex]);

  return {
    currentIndex: state.currentIndex,
    steps: steps,
    step: steps[state.currentIndex],
    next,
    back,
    goto,
    isFirst: state.isFirst,
    isLast: state.isLast,
  }
}