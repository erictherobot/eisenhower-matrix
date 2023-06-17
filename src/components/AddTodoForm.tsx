import { useState } from "react";

type AddTodoFormProps = {
  onAddTodo: (title: string, quadrant: string) => void;
};

const AddTodoForm = ({ onAddTodo }: AddTodoFormProps) => {
  const [title, setTitle] = useState("");
  const [quadrant, setQuadrant] = useState("Do");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo(title, quadrant);
    setTitle("");
    setQuadrant("Do");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2 mr-2"
      />
      <select
        value={quadrant}
        onChange={(e) => setQuadrant(e.target.value)}
        className="border rounded p-2"
      >
        <option value="Do">Do</option>
        <option value="Decide">Decide</option>
        <option value="Delegate">Delegate</option>
        <option value="Delete">Delete</option>
      </select>
      <button className="bg-black text-white p-2 px-4 rounded ml-2">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
