import { useRouter } from "next/navigation";
import { useTasks } from "../context/TaskContext";

const TaskCard = ({ task }) => {
  const router = useRouter();
  const { deleteTask } = useTasks();
  return (
    <div
      key={task.id}
      style={{ background: "#202020", color: "white" }}
      onClick={() => router.push(`/edit/${task.id}`)}
    >
      <h1>{task.title}</h1>
      <button
        onClick={(e) => {
          e.stopPropagation();
          const accept = window.confirm("are you sure");
          if (accept) deleteTask(task.id);
        }}
      >
        Delete
      </button>
      <p>{task.description}</p>
    </div>
  );
};
export default TaskCard;
