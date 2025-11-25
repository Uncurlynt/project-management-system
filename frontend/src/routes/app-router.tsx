import { BrowserRouter, Routes, Route } from 'react-router';
import { MainLayout } from '@/layouts/main-layout';
import { HomePage, TasksPage, BoardsPage, BoardPage, NotFoundPage } from '@/pages';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="issues" element={<TasksPage />} />
          <Route path="boards" element={<BoardsPage />} />
          <Route path="board/:id" element={<BoardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
