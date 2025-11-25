import { TPriority } from '@/types';
import { SignalLow, SignalMedium, SignalHigh } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function Priority({ priority }: { priority: TPriority }) {
  let priorityJsx = <></>;
  if (priority === 'Low') {
    priorityJsx = (
      <div className="text-primary/80 inline-flex h-full items-center rounded-lg bg-green-500 px-2 py-1 text-sm">
        <SignalLow className="text-primary/80 mb-1" />
        <span>Низкий</span>
      </div>
    );
  }
  if (priority === 'Medium') {
    priorityJsx = (
      <div className="text-primary/80 inline-flex h-full items-center rounded-lg bg-yellow-500 px-2 py-1 text-sm">
        <SignalMedium className="text-primary/80 mb-1" />
        <span>Средний</span>
      </div>
    );
  }
  if (priority === 'High') {
    priorityJsx = (
      <div className="text-primary/80 inline-flex h-full items-center rounded-lg bg-red-500 px-2 py-1 text-sm">
        <SignalHigh className="text-primary/80 mb-1" />
        <span>Высокий</span>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{priorityJsx}</TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-md">Приоритет</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
