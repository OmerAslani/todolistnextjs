import { ITask } from "@/pages";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";

interface IProps {
  task: ITask;
  setTasks: Dispatch<SetStateAction<ITask[]>>;
}

const Task = ({ task, setTasks }: IProps) => {
  const [isTaskEditable, setIsTaskEditable] = useState(false);

  const handleDelete = () => {
    setTasks((prev) => {
      return prev.filter((el) => el.id !== task.id);
    });
  };
  const handleEdit: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();
    setIsTaskEditable(!isTaskEditable);
  };

  const onTaskClick = () => {
    setTasks((prev) => {
      return prev.map((el) => {
        if (el.id === task.id) {
          const editedTask = { ...task, isCompleted: !task.isCompleted };
          return editedTask;
        }
        return el;
      });
    });

    // setTasks(prev => prev.map(el => el.id === task.id ? {...task, isCompleted: !task.isCompleted} : el))
  };

  return (
    <li
      className={`w-full py-5 mt-3 text-xl font-semibold px-2 border-b border-gray-400 flex justify-between transition-all duration-300 ${
        task.isCompleted ? "text-gray-500 line-through" : ""
      }`}
      onClick={onTaskClick}
    >
      <input
        value={task.value}
        disabled={!isTaskEditable}
        className={`${isTaskEditable ? "" : "bg-transparent"}`}
        onChange={(e) =>
          setTasks((prev) =>
            prev.map((el) =>
              el.id === task.id ? { ...task, value: e.target.value } : el
            )
          )
        }
        onClick={(e) => {
          if (isTaskEditable) {
            e.stopPropagation();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsTaskEditable(false);
          }
        }}
      />
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="mr-2 cursor-pointer"
          onClick={handleEdit}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </li>
  );
};

export default Task;
