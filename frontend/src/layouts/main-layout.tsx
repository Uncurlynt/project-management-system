import { Header } from '@/components/layout';
import { Outlet } from 'react-router';
import { TaskModal } from '@/components/tasks';
import { Toaster } from '@/components/ui/sonner';

export function MainLayout() {
  return (
    <>
      <Header />
      <main className="mx-2 my-4 sm:mx-4">
        <div className="container mx-auto">
          <Outlet />
        </div>

        <TaskModal />
        <Toaster position="top-center" />
      </main>
    </>
  );
}
