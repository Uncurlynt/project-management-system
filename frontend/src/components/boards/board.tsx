import { IBoard } from '@/types';
import { NavLink } from 'react-router';

export function Board({ id, name, description, taskCount }: IBoard) {
  return (
    <NavLink
      className="hover:bg-foreground/10 flex w-full justify-between gap-1 rounded-sm border-2 p-3 transition max-sm:flex-col sm:items-end"
      to={`/board/${String(id)}`}
      state={{ name }}
    >
      <div>
        <p className="text-base font-bold sm:text-lg">{name}</p>
        <p className="text-muted-foreground line-clamp-3 text-sm">{description}</p>
      </div>

      <p className="text-muted-foreground text-xs">
        Кол-во тикетов: <span className="font-bold">{taskCount}</span>
      </p>
    </NavLink>
  );
}
