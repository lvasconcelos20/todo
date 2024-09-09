import React from "react";
import { Todo } from "@/src/services/interface/types";
import TaskItem from "./TaskItem";


interface TaskListProps {
  tasks: Todo[];
  onDeleteTask: (id: number) => void;
  onToggleTaskDone: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onToggleTaskDone }) => {
  return (
    <>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          taskId={task.id}
          title={task.title}
          description={task.description}
          onDelete={() => onDeleteTask(task.id)}
          done={task.done}
          onToggleDone={onToggleTaskDone}
        />
      ))}
    </>
  );
};

export default TaskList;
