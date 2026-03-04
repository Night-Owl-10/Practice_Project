import {Edit, Delete} from 'lucide-react'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type Tasks =  {
    _id: number;
    task: string;
    status: string;
  }

type TaskListProps = {
  setEditTask: React.Dispatch<React.SetStateAction<Tasks | null>>;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

function TaskList({ setEditTask, refetch, setRefetch }: TaskListProps) {
  const [taskList, setTaskList] = useState<Tasks[]>([]);

  const { user } = useContext(AuthContext)!;

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', { withCredentials: true });
        setTaskList(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, [refetch || user]);

    function handleEdit(id: number) {
      const taskToEdit = taskList.find(task => task._id === id);
      if (taskToEdit) {
        setEditTask(taskToEdit);
      }
    }

    async function handleDelete(id: number) {
      try { 
        const response = await axios.delete(`http://localhost:5000/api/tasks/${id}`, { withCredentials: true });
        if (response.status === 200) {
          toast.success("Task deleted successfully");
          setRefetch(prev => !prev);
        } else {
          toast.error(response.data.message || "Error deleting task");
        }
      }
        catch (error) {
          toast.error("Error deleting task");
        }
      }

  return (
    <>
      { 
        taskList.map((task) => (
          <div key={task._id} className={clsx("w-full flex justify-between border border-b-2 shadow-md rounded-lg p-4", task.status === "completed" ? "border-green-500 shadow-green-200" : "border-red-500 shadow-red-200")}>
            <p className="w-[80%]">{task.task}</p>
            <div className="w-[20%] flex gap-2 justify-end items-center">
          <button onClick={() => handleEdit(task._id)} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-300 cursor-pointer flex items-center">
            <Edit size={20} />
          </button>
          <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors duration-300 cursor-pointer flex items-center">
            <Delete size={20} />
          </button>
          </div>
          </div>
          ))
      }
  </>
  )
}

export default TaskList