import styled from "styled-components";

// Variáveis de cores e tamanhos
const colors = {
  background: "#1E1E26",
  contentBackground: "#16161C",
  inputBackground: "#2b2b2b",
  white: "#ffffff",
  grey: "#666",
  error: "red",
  gradientStart: "#ff6a00",
  gradientEnd: "#ee0979"
};

const sizes = {
  borderRadius: "8px",
  containerWidth: "60vw",
  inputWidth: "30vw",
  buttonWidth: "18vw",
  titleFontSize: "30px",
  inputFontSize: "14px",
  buttonFontSize: "1rem",
  errorFontSize: "0.875rem"
};

export const Container = styled.div`
  display: flex;
  background-color: ${colors.background};
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${sizes.containerWidth};
  background: ${colors.contentBackground};
  border-radius: ${sizes.borderRadius};
  height: 60vh;
`;

export const Title = styled.h1`
  color: ${colors.white};
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: ${sizes.titleFontSize};
`;

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  label {
    color: ${colors.white};
    font-size: ${sizes.inputFontSize};
    margin-bottom: 6px;
    align-self: flex-start;
  }
`;

export const Input = styled.input`
  background-color: ${colors.inputBackground};
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  height: 3vh;
  color: ${colors.white};
  font-size: ${sizes.inputFontSize};
  width: ${sizes.inputWidth};

  &::placeholder {
    color: ${colors.grey};
  }
`;

export const Button = styled.button`
  background: linear-gradient(90deg, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%);
  border: none;
  width: ${sizes.buttonWidth};
  border-radius: 5px;
  height: 5vh;
  font-size: ${sizes.buttonFontSize};
  color: ${colors.white};
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, ${colors.gradientEnd} 0%, ${colors.gradientStart} 100%);
  }
`;

export const ErrorMessage = styled.span`
  color: ${colors.error};
  font-size: ${sizes.errorFontSize};
  margin-top: -10px;
  margin-bottom: 10px;
  align-self: flex-start;
`;
export const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
  margin-top: 10px;
`;