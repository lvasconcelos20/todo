import React, { useState } from "react";
import { useRouter } from 'next/router';
import { Container, Title, ContentArea, ContainerInput, Input, Button, ErrorMessage } from './styles';
import { useUserActions } from "@/src/api/api"; 
import { User } from "@/src/services/interface/types";

const Cadastro: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const { register, loading, error } = useUserActions(); 
    const router = useRouter();

    const handleSubmit = async () => {
        if (username && email && password && confirmPassword) {
            const userData: Omit<User, 'id'> = {    
                username,
                email,
                password,
                confirm_password: confirmPassword,
            };
    
            console.log("Dados enviados para o backend:", userData); // Adiciona um console.log para ver os dados que estão sendo enviados
    
            try {
                const success = await register(userData);
                if (success) {
                    console.log("Usuário cadastrado com sucesso");
                    setIsRegistered(true);  // Altera o estado para registrado
                    alert("Cadastro realizado com sucesso!"); // Exibe uma mensagem de alerta
                } else {
                    console.error("Erro ao cadastrar usuário");
                }
            } catch (error) {
                console.error("Erro durante o processo de cadastro:", error);
            }
        }
    };
    const handleButtonClick = () => {
        if (isRegistered) {
            router.push('../home'); 
        } else {
            handleSubmit(); 
        }
    };

    return (
        <Container>
            <ContentArea>
                <Title>Cadastro</Title>
                <form onSubmit={(e) => e.preventDefault()}>
                    <ContainerInput>
                        <Input 
                            type="text" 
                            placeholder="Nome"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input 
                            type="password" 
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input 
                            type="password" 
                            placeholder="Confirmar Senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button 
                            type="button" 
                            disabled={loading} 
                            onClick={handleButtonClick}
                        >
                            {loading ? 'Carregando...' : isRegistered ? 'Ir para Home' : 'Cadastrar'}
                        </Button>
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </ContainerInput>
                </form>
            </ContentArea>
        </Container>
    );
};

export default Cadastro;
