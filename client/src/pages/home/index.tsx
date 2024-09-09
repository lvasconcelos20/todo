"use client";
import React, { useState, useMemo, useEffect } from "react";
import dynamic from 'next/dynamic';
import {
  Container,
  Sidebar,
  Navbar,
  FooterContainer,
  Text,
  ButtonStyled,
  TableContainer,
  ContentArea,
  TaskHeader,
  AddTaskButton,
  Profile,
} from "./styles";
import Image from "next/image";
import Perfil from "../../assets/profile.png";
import Logo from "../../assets/logo.svg";
import TaskList from "@/src/components/Table/TaskList";
import Popup from "@/src/components/modal";
import { useRouter } from "next/navigation";
import { Todo } from "@/src/services/interface/types";
import { useTodoActions } from "@/src/api/api";
import "@/src/utils/chartSetup"; 

const DynamicProgressChart = dynamic(() => import('@/src/components/Grafico'), { ssr: false });

interface User {
  userName: string;
}

const ArrowBackIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z" />
  </svg>
);

const HomeScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [page, setPage] = useState(1); // Página atual para paginação
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento para o scroll infinito
  const [hasMore, setHasMore] = useState(true); // Controle para saber se há mais tarefas a carregar

  const { createTodo, deleteTodo, fetchTodos } = useTodoActions(); // Supondo que haja uma função fetchTodos na API para buscar mais tarefas
  const router = useRouter();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.done).length;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const data = useMemo(() => ({
    labels: [],
    datasets: [
      {
        data: [completedTasks, totalTasks - completedTasks],
        backgroundColor: ['#FF6384', '#E5E5E5'],
        hoverBackgroundColor: ['#FF6384', '#E5E5E5'],
        borderWidth: 0,
      },
    ],
  }), [completedTasks, totalTasks]);

  const options = useMemo(() => ({
    cutout: '80%',
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  }), []);

  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    if (storedUserName) {
      setUser({ userName: storedUserName });
    }
  }, []);

  // Função para buscar tarefas paginadas da API
  const fetchMoreTasks = async () => {
    if (isLoading || !hasMore) return; // Evita múltiplas chamadas enquanto carrega ou se não houver mais dados

    setIsLoading(true);
    try {
      const newTasks = await fetchTodos(page); // Supondo que fetchTodos seja uma função da API que aceita a página como parâmetro
      setTasks((prevTasks) => [...prevTasks, ...newTasks]); // Adiciona as novas tarefas à lista existente
      setHasMore(newTasks.length > 0); // Se o número de novas tarefas for zero, para de carregar mais
      setPage(page + 1); // Atualiza a página
    } catch (error) {
      console.error("Erro ao buscar mais tarefas:", error);
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  // Função para monitorar o scroll e carregar mais tarefas quando o usuário chegar ao fim da página
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        fetchMoreTasks(); // Chama a função de carregar mais tarefas
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Remove o listener quando o componente desmonta
  }, [page, hasMore, isLoading]);

  const handleDeleteTask = async (id: number) => {
    const success = await deleteTodo(id);
    if (success) {
      setTasks(tasks => tasks.filter(task => task.id !== id));
    }
  };

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleAddTodo = async (data: Omit<Todo, "id">) => {
    try {
      const newTodo = await createTodo(data);
      if (newTodo) {
        setTasks(tasks => [...tasks, newTodo]);
      }
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
    }
  };

  const handleBackClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/Login");
  };

  const handleToggleDone = (taskId: number) => {
    setTasks(tasks => tasks.map(task =>
      task.id === taskId ? { ...task, done: !task.done } : task
    ));
  };

  // Verifica se o usuário foi carregado
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <ContentArea>
        <Navbar>
          <ButtonStyled startIcon={<ArrowBackIcon />} onClick={handleBackClick}>
            Sair
          </ButtonStyled>
        </Navbar>

        <Sidebar>
          <Profile>
            <Image src={Perfil} alt="User Avatar" width={100} height={100} className="user-avatar" />
            <h2 style={{ color: '#F9F9F9'}}>Olá, {user.userName}</h2>
          </Profile>   
         
          <DynamicProgressChart 
              data={data} 
              options={options} 
              progressPercentage={progressPercentage}
              completedTasks={completedTasks}
              totalTaks={totalTasks}
          />
                    
          <FooterContainer>
            <Image src={Logo} alt="logo" width={38} height={38} />
            <Text>
              <h2>do it!</h2>
              <p>seu to do app favorito ;)</p>
            </Text>
          </FooterContainer>
        </Sidebar>

        <TableContainer>
          <TaskHeader>
            <h2>Minhas tasks</h2>
            <AddTaskButton onClick={togglePopup}>+</AddTaskButton>
          </TaskHeader>
          <TaskList 
            tasks={tasks} 
            onDeleteTask={handleDeleteTask} 
            onToggleTaskDone={handleToggleDone} 
          />
        </TableContainer>
      </ContentArea>

      {isPopupOpen && (
        <Popup onClose={togglePopup} onSubmit={handleAddTodo} />
      )}

      {isLoading && <p>Carregando mais tarefas...</p>}
      {!hasMore && <p>Não há mais tarefas a carregar.</p>}
    </Container>
  );
};

export default HomeScreen;
