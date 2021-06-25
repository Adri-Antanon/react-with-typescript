import React, { FormEvent, useRef, useState } from "react";

type FormElement = FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

const App = (): JSX.Element => {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];

    setTasks(newTasks);
  };

  const toggleDoneTask = (index: number) => {
    const newTasks: ITask[] = [...tasks];

    newTasks[index].done = !newTasks[index].done;

    setTasks(newTasks);
  };

  const removeTask = (index: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  autoFocus
                  ref={taskInput}
                />
                <div className="d-grid col-12 mx-auto">
                  <button className="btn btn-success mt-2" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, index: number) => (
            <div key={index + ""} className="card card-body mt-2">
              <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h2>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleDoneTask(index)}
                >
                  {t.done ? "✔" : "✗"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(index)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
