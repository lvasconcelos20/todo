import { useState } from 'react';
import axios from 'axios';
import { Todo } from '../services/interface/types'; 
import { User } from '../services/interface/types'; 

interface LoginResponse {
    token: string | null;
    username: string | null;
}

interface UserActions {
    register: (user: Omit<User, 'id'>) => Promise<boolean>;
    login: (email: string, password: string) => Promise<LoginResponse>;
    loading: boolean;
    error: string | null;
}

export const useTodoActions = ():  {
    createTodo: (todo: Omit<Todo, 'id'>) => Promise<Todo | null>;
    deleteTodo: (id: number) => Promise<boolean>;
    fetchTodos: (page: number) => Promise<Todo[]>;
    loading: boolean;
    error: string | null;
} => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Função para criar uma nova tarefa
    const createTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/', todo);
            return response.data;
        } catch (error) {
            setError('Failed to create Todo');
            console.error(error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Função para deletar uma tarefa
    const deleteTodo = async (id: number): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`http://127.0.0.1:8000/api/${id}/`);
            return true;
        } catch (error) {
            setError('Failed to delete Todo');
            console.error(error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Função para buscar tarefas paginadas (para infinite scroll)
    const fetchTodos = async (page: number): Promise<Todo[]> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/todos/?page=${page}`);
            return response.data;
        } catch (error) {
            setError('Failed to fetch Todos');
            console.error(error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { createTodo, deleteTodo, fetchTodos, loading, error };
};

export const useUserActions = (): UserActions => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (user: Omit<User, 'id'>): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://127.0.0.1:8000/users/', user);
            return response.status === 201;
        } catch (error) {
            setError('Failed to register user');
            console.error("Erro ao cadastrar usuário:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string): Promise<LoginResponse> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://127.0.0.1:8000/user/login', { email, password });
            const { access_token, username } = response.data;
            return { token: access_token, username: username };
        } catch (error) {
            setError('Falha ao realizar login');
            console.error("Erro ao fazer login:", error);
            return { token: null, username: null };
        } finally {
            setLoading(false);
        }
    };

    return { register, login, loading, error };
};