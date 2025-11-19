import { useDroppable } from '@dnd-kit/core';
import { PropsWithChildren } from 'react';

interface Props {
  id: string;
  className?: string;
}

export function DroppableColumn({ id, children, className }: PropsWithChildren<Props>) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`min-w-xs rounded-lg border p-4 shadow-sm transition-colors ${
        isOver ? 'bg-muted' : 'bg-background'
      } ${className}`}
    >
      {children}
    </div>
  );
}
