import { useState, useEffect } from 'react';
import { Task } from '@/components/tasks';
import { useLocation, useParams } from 'react-router';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';

import { DroppableColumn, Draggable } from '@/components/drag-and-drop';

import { updateTaskStatus } from '@/api';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useAppStore } from '@/stores';
import { TaskSkeleton } from '@/components/skeletons';

export function BoardPage() {
  const { boardTasks, fetchBoardTasks } = useAppStore();
  const { id } = useParams<{ id: string }>();
  const state = useLocation().state;
  const [isLoading, setIsLoading] = useState(true);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) return;

    const taskId = Number(active.id);
    const newStatus = over.id as 'Backlog' | 'InProgress' | 'Done';

    if (active.data.current?.status !== newStatus) {
      const controller = new AbortController();
      try {
        await updateTaskStatus(taskId, newStatus, { signal: controller.signal });
        await fetchBoardTasks(Number(id), controller);
      } catch (err) {
        console.error('Ошибка при обновлении:', err);
      }
    }
  };

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      await fetchBoardTasks(Number(id), controller);
      setIsLoading(false);
    }

    load();

    return () => {
      controller.abort();
    };
  }, [id, fetchBoardTasks]);

  const columns = {
    Backlog: boardTasks.filter((task) => task.status === 'Backlog'),
    InProgress: boardTasks.filter((task) => task.status === 'InProgress'),
    Done: boardTasks.filter((task) => task.status === 'Done'),
  };

  const columnLabels = {
    Backlog: 'To do',
    InProgress: 'В процессе',
    Done: 'Сделано',
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-lg font-bold hover:underline" href="/boards">
              Проекты
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-lg font-bold">{state?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="rounded-lg outline max-lg:overflow-x-scroll">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="grid grid-flow-col gap-4">
            {Object.entries(columns).map(([status, tasks]) => (
              <div key={status} id={status} className="flex h-full flex-col">
                <DroppableColumn id={status} className="flex h-full flex-col gap-3">
                  <h3 className="text-muted-foreground mb-3 text-lg font-semibold">
                    {columnLabels[status as keyof typeof columnLabels]}
                  </h3>
                  {isLoading ? (
                    [...Array(10)].map((_, index) => <TaskSkeleton key={index} />)
                  ) : tasks.length > 0 ? (
                    tasks.map((task) => (
                      <Draggable key={task.id} id={task.id} data={{ status: task.status }}>
                        <Task {...task} boardId={Number(id)} variant="compact" />
                      </Draggable>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">Нет задач</p>
                  )}
                </DroppableColumn>
              </div>
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}
