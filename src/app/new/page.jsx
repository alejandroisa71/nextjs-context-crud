"use client";
import { useEffect, useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { useRouter } from "next/navigation";

function Page({ params }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const { createTask, tasks } = useTasks();
  const router = useRouter();
  console.log(params);

  // console.log(tasks)
  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(task.title, task.description);
    router.push("/");
  };

  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((task) => task.id === params.id);
      if (taskFound) {
        console.log(taskFound.title);
        console.log(taskFound.description);

        setTask(taskFound.title, taskFound.description);
      }
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Write a title"
        onChange={handleChange}
        value={task.title}  
      />
      <textarea
        name="description"
        placeholder="Write a description"
        onChange={handleChange}
        value={task.description}
      />
      <button>Save</button>
    </form>
  );
}
export default Page;
