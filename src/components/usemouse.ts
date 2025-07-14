/**
 * useMouse钩子函数
 * 用于跟踪鼠标在元素上的相对位置
 */

import { useEffect, useRef, useState } from 'react';


export function useMouse(): [{ elementX: number | null; elementY: number | null }, React.RefObject<HTMLDivElement>] {
  const [mousePosition, setMousePosition] = useState<{ elementX: number | null; elementY: number | null }>({
    elementX: null,
    elementY: null
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMousePosition({
          elementX: event.clientX - rect.left,
          elementY: event.clientY - rect.top
        });
      }
    };

    const handleMouseLeave = () => {
      setMousePosition({
        elementX: null,
        elementY: null
      });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return [mousePosition, ref as React.RefObject<HTMLDivElement>];
}