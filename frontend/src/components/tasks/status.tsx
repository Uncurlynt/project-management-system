import { TStatus } from '@/types';
import { FileText, RefreshCcw, Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function Status({ status }: { status: TStatus }) {
  let statusJsx = <></>;
  if (status === 'Backlog') {
    statusJsx = (
      <div className="text-primary/80 inline-flex h-full items-center rounded-lg bg-gray-400/50 px-2 py-1 text-sm">
        <FileText className="text-primary/80 mr-1" />
        <span>To do</span>
      </div>
    );
  }
  if (status === 'InProgress') {
    statusJsx = (
      <div className="text-primary/80 inline-flex h-full items-center rounded-lg bg-gray-400/50 px-2 py-1 text-sm">
        <RefreshCcw className="text-primary/80 mr-1" />
        <span>В процессе</span>
      </div>
    );
  }
  if (status === 'Done') {
    statusJsx = (
      <div className="text-primary/80 inline-flex h-full items-center rounded-lg bg-gray-400/50 px-2 py-1 text-sm">
        <Check className="text-primary/80 top-1 mr-1 flex items-center" />
        <span>Сделано</span>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{statusJsx}</TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-md">Статус тикета</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
