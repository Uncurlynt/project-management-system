import { NotFoundIcon } from '@/components/icons';
import { NavLink } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="mt-52 flex h-full w-full flex-col items-center justify-center gap-2 p-4">
      <div className="w-[300px]">
        <NotFoundIcon />
      </div>
      <h2>Страница не найдена</h2>
      <NavLink to="/" className="text-lg hover:underline">
        Вернуться
      </NavLink>
    </div>
  );
}
