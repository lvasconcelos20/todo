import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  font-family: 'Inter', sans-serif;
`;

export const PopupContainer = styled.div`
  background-color: #181818;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: #fff;
  font-family: 'Inter', sans-serif;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

export const Title = styled.h2`
  color: #ff66b2;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  margin-bottom: 20px;
  resize: none;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: none;
  background-image: linear-gradient(to right, #ff66b2, #ff7a59);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
`;