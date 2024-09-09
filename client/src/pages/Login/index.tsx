import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler, FieldErrors, Control } from "react-hook-form";
import { Container, Title, ContentArea, ContainerInput, Input, Button, ErrorMessage, LinkText } from './styles';
import { useUserActions } from "@/src/api/api";

interface LoginFormInputs {
  email: string;
  senha: string;
}

interface LoginProps {
  onLoginSuccess: (email: string, password: string, username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const { handleSubmit, control, formState: { errors } } = useForm<LoginFormInputs>();
  const { login, loading, error } = useUserActions();
  const router = useRouter();

  // Função auxiliar para armazenar dados no localStorage
  const storeUserData = useCallback((token: string, username: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }, []);

  // Função para lidar com o submit do formulário
  const onSubmit: SubmitHandler<LoginFormInputs> = useCallback(async (data) => {
    const { email, senha } = data;
    const response = await login(email, senha);

    if (response.token && response.username) {
      storeUserData(response.token, response.username);
      if (onLoginSuccess) {
        onLoginSuccess(email, senha, response.username);
      }
      router.push('/home'); // Navega para a tela principal após o login
    } else {
      console.error("Erro ao fazer login");
    }
  }, [login, onLoginSuccess, storeUserData, router]);


  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }, []);

  // Função para lidar com o clique no link de cadastro
  const handleCadastroClick = useCallback(() => {
    router.push('/cadastro');
  }, [router]);

  return (
    <Container>
      <ContentArea>
        <Title>do it!</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ContainerInput>
            <FormInput 
              label="Email" 
              name="email" 
              type="email"
              control={control} 
              errors={errors.email} 
            />
            <FormInput 
              label="Senha" 
              name="senha" 
              type="password"
              control={control} 
              errors={errors.senha} 
            />
            <Button style={{ marginTop: '10px' }} type="submit" disabled={loading}>
              {loading ? 'Carregando...' : 'Continuar'}
            </Button>
            <LinkText onClick={handleCadastroClick}>
              Não possui conta? Faça o Cadastro aqui
            </LinkText>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </ContainerInput>
        </form>
      </ContentArea>
    </Container>
  );
};

interface FormInputProps {
  label: string;
  name: keyof LoginFormInputs; 
  control: Control<LoginFormInputs>;
  type?: string;
  errors?: FieldErrors<LoginFormInputs>;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, control, type = "text", errors }) => (
  <>
    <label>{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input 
          {...field}
          type={type}
          placeholder={label}
          required
        />
      )}
    />
    {errors?.[name]?.message && <ErrorMessage>{errors[name]?.message?.toString()}</ErrorMessage>}
  </>
);

export default Login;
