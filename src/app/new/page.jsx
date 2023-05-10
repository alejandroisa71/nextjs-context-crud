'use client';
import { useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {toast} from 'react-hot-toast'

const TaskFormPage = ({ params }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { tasks, createTask, updateTask } = useTasks();
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data);
      toast.success('task updated successfully');
    } else {
      createTask(data.title, data.description);
      toast.success('task created successfully');
    }
    router.push('/');
  });

  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((task) => task.id === params.id);
      if (taskFound) {
        setValue('title', taskFound.title);
        setValue('description', taskFound.description);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="Write a title"
        autoFocus
        name='title'
        {...register('title', { required: true })}
      />
      {errors.title && <span>This field is required</span>}
      <textarea
        placeholder="Write a description"
        {...register('description', { required: true })}
        name='description'
      />
      {errors.description && <span>This field is required</span>}
      <button>Save</button>
    </form>
  );
};
export default TaskFormPage;
