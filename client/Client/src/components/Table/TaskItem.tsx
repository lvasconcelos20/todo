import React from 'react';
import { TaskContainer, TaskTitle, TaskDescription, DeleteIcon } from './styles';

interface TaskItemProps {
  taskId: number;
  title: string;
  description: string;
  done: boolean;
  onDelete: (taskId: number) => void; 
  onToggleDone: (taskId: number) => void; 
}

const TaskItem: React.FC<TaskItemProps> = ({ taskId, title, description, onDelete, done, onToggleDone }) => {
  return (
    <TaskContainer>
      <div>
        <TaskTitle style={{ textDecoration: done ? 'line-through' : 'none' }}>{title}</TaskTitle>
        <TaskDescription>{description}</TaskDescription>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="checkbox"
          checked={done}
          onChange={() => onToggleDone(taskId)}
        />
        <DeleteIcon onClick={() => onDelete(taskId)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </DeleteIcon>
      </div>
    </TaskContainer>
  );
};

export default TaskItem;
