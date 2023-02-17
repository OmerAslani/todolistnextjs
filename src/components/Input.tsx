import { ITask } from "@/pages";
import { Dispatch, SetStateAction, useState } from "react";

interface IProps {
  setTasks: Dispatch<SetStateAction<ITask[]>>;
}

const Input = ({ setTasks }: IProps) => {
  const [inputValue, setInputValue] = useState("");
  const addNewTask = () => {
    const newTask: ITask = {
      id: Math.floor(Math.random() * 100000),
      value: inputValue,
      isCompleted: false,
    };
    setTasks((prev) => {
      return [...prev, newTask];
    });
    setInputValue("")
  };

  return (
    <div className="w-full h-10 bg-white rounded-2xl flex focus-within:outline focus-within:outline-2">
      <input
        type="text"
        placeholder="Add task"
        className=" h-full rounded-2xl px-3 grow focus:outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addNewTask();
          }
        }}
      />
      <button
        className="h-full bg-primary rounded-2xl text-white capitalize px-6"
        onClick={addNewTask}
      >
        Click me
      </button>
    </div>
  );
};

export default Input;
