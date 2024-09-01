export interface Todo {
    id: number;
    title: string;
    description: string;
    done: boolean;
}


export interface User {
    id: number;
    username: string;
    email: string;
    password: string; 
    confirm_password: string;
    is_active?: boolean;
}

