'use client';
import { useTasks } from '../context/TaskContext';
import TaskCard from '@/components/TaskCard';

const Page = () => {
  const { tasks } = useTasks();
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
};
export default Page;
