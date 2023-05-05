import {useRouter} from 'next/navigation'

const TaskCard = ({ task }) => {
  const router = useRouter()
  return (
    <div key={task.id} style={{background:"#202020", color:"white"}}
    onClick={()=> router.push(`/edit/${task.id}`)}>
      <h1>{task.title}</h1>
      <button>Delete</button>
      <p>{task.description}</p>
    </div>
  );
};
export default TaskCard;
