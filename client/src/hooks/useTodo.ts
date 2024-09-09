import { useState, useCallback } from "react";
import { Todo } from "@/src/services/interface/types";
import { useTodoActions } from "@/src/api/api";

export function useTodo() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const { createTodo, deleteTodo } = useTodoActions();

  const addTask = useCallback(async (data: Omit<Todo, "id">) => {
    try {
      const newTodo = await createTodo(data);
      if (newTodo) {
        setTasks(tasks => [...tasks, newTodo]);
      }
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
    }
  }, [createTodo]);

  const removeTask = useCallback(async (id: number) => {
    const success = await deleteTodo(id);
    if (success) {
      setTasks(tasks => tasks.filter(task => task.id !== id));
    }
  }, [deleteTodo]);

  const toggleTaskDone = useCallback((taskId: number) => {
    setTasks(tasks => tasks.map(task =>
      task.id === taskId ? { ...task, done: !task.done } : task
    ));
  }, []);

  return {
    tasks,
    addTask,
    removeTask,
    toggleTaskDone,
  };
}