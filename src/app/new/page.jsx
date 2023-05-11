'use client';
import { useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

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
    <div className="flex justify-center items-centerh-full">
      <form onSubmit={onSubmit} className="bg-gray-700 p-10">
        <h2>New Task</h2>
        <input
          className="bg-gray-800 py-3 px-4 mb-2 block focus:outline-none w-full"
          placeholder="Write a title"
          autoFocus
          name="title"
          {...register('title', { required: true })}
        />
        {errors.title && <span  className='block text-red-400 mb-2'>This field is required</span>}
        <textarea
          className="bg-gray-800 py-3 px-4 mb-2 block focus:outline-none w-full"
          placeholder="Write a description"
          {...register('description', { required: true })}
          name="description"
        />
        {errors.description && <span  className='block text-red-400 mb-2'>This field is required</span>}
        <button className='bg-green-500 hover:bg-green-400 py-2 px-4
         rounded-sm disabled:opacity-30'>Save</button>
      </form>
    </div>
  );
};
export default TaskFormPage;
