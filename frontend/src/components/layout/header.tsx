import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useTaskModalStore } from '@/stores';
import { ThemeToggle } from '@/components/theme';

const NAV_LINKS = [
  {
    to: '/issues',
    label: 'Тикеты',
    activeMatcher: (isActive: boolean) => isActive,
  },
  {
    to: '/boards',
    label: 'Проекты',
    activeMatcher: () => location.pathname.startsWith('/boards'),
  },
];

export function Header() {
  const { openModal } = useTaskModalStore();

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b px-2 py-3 shadow-sm sm:px-4">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="" className="text-2xl font-bold hover:underline">
          Подземелье тикетов
        </NavLink>

        <nav className="hidden text-lg font-semibold md:flex md:gap-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `hover:text-primary transition-colors hover:underline ${
                  link.activeMatcher(isActive) ? 'text-primary' : 'text-muted-foreground'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button onClick={() => openModal(null, 'default')}>Создать тикет</Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 max-w-full p-4">
              <SheetTitle>Меню</SheetTitle>

              <div className="mt-2 flex flex-col text-lg font-semibold">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `hover:text-primary my-2 transition-colors hover:underline ${
                        link.activeMatcher(isActive) ? 'text-primary' : 'text-muted-foreground'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}

                <Button
                  onClick={() => openModal(null, 'default')}
                  className="text-md mt-4 w-full p-4"
                >
                  Создать тикет
                </Button>
              </div>
            </SheetContent>

            <SheetDescription className="sr-only">Меню для мобильных устройств</SheetDescription>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
