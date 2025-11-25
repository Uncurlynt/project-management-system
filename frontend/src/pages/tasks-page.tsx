import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '@/stores';
import { Task } from '@/components/tasks';
import { TaskSkeleton } from '@/components/skeletons';
import { TaskSearchFilters } from '@/components/search';

export function TasksPage() {
  const { tasks, fetchTasks } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: '',
    status: 'all',
    project: 'all',
  });

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setIsLoading(true);
      await fetchTasks(controller);
      setIsLoading(false);
    }
    load();
    return () => controller.abort();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        filters.searchTerm === '' ||
        task.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        task.assignee?.fullName?.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesStatus = filters.status === 'all' || task.status === filters.status;

      const matchesProject = filters.project === 'all' || String(task.boardId) === filters.project;

      return matchesSearch && matchesStatus && matchesProject;
    });
  }, [tasks, filters]);

  const projectOptions = [...new Map(tasks.map((t) => [t.boardId, t.boardName]))].map(
    ([id, name]) => ({
      id: String(id),
      name: name || `Проект №${id}`,
    })
  );
  const statuses = [...new Set(tasks.map((task) => task.status))];

  return (
    <div className="flex flex-col gap-6">
      <TaskSearchFilters onChange={setFilters} statuses={statuses} projects={projectOptions} />
      <div className="flex flex-col gap-3">
        {isLoading ? (
          [...Array(10)].map((_, index) => <TaskSkeleton key={index} />)
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <Task key={task.id} {...task} />)
        ) : (
          <div className="text-muted-foreground py-8 text-center">Ничего не нашлось :(</div>
        )}
      </div>
    </div>
  );
}
