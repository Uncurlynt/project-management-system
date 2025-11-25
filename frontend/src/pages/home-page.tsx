import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-2xl font-bold tracking-tight sm:text-4xl">
          Добро пожаловать в подземелье тикетов
        </h1>

        <img
          src="/heart.png"
          alt="Top illustration"
          className="w-5 h-5 mx-auto mb-2"
        />

        <p className="text-muted-foreground text-md mx-auto max-w-2xl sm:text-xl">
          * ( Вы полны РЕШИМОСТИ )
        </p>

        <div className="mt-8 flex justify-center gap-4 max-sm:flex-col">
          <Button asChild>
            <Link to="/issues">Перейти к тикетам</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/boards">Перейти к проектам</Link>
          </Button>
        </div>
      </section>

      <div className="w-full flex justify-center">
        <img
          src="/flowey-dark.gif"
          alt="flowey dark"
          className="hidden dark:block max-w-full h-auto"
        />
        <img
          src="/flowey-light.gif"
          alt="flowey light"
          className="block dark:hidden max-w-full h-auto"
        />
      </div>
    </div>
  );
}
