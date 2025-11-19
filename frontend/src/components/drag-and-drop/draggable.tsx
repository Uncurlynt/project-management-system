import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { PropsWithChildren, MouseEvent } from 'react';

interface Props {
  id: string | number;
  data?: Record<string, any>;
}

export const Draggable = ({ id, data, children }: PropsWithChildren<Props>) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id, data });

  const style: React.CSSProperties = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isDragging ? 10 : 'auto',
    boxShadow: isDragging ? '0 4px 10px rgba(0, 0, 0, 0.15)' : undefined,
    // borderRadius: '0.5rem',
    userSelect: 'none',
  };

  const handlePointerDown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (
      target.closest('button') ||
      target.closest('a') ||
      target.closest('input') ||
      target.closest('[data-no-drag]')
    ) {
      return;
    }

    listeners?.onPointerDown?.(e);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} onPointerDown={handlePointerDown}>
      {children}
    </div>
  );
};
