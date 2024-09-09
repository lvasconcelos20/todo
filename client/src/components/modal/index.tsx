import React, { useState } from "react";
import { Overlay, PopupContainer, CloseButton, Title, Input, TextArea, Button } from './styles';
import { Todo } from "@/src/services/interface/types"; 

interface PopupProps {
  onClose: () => void;
  onSubmit: (data: Omit<Todo, 'id'>) => void;  // Usando a interface Todo, omitindo 'id'
}

const Popup: React.FC<PopupProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [done, setDone] = useState(false); // Estado para a checkbox

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleDoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDone(e.target.checked);
  };

  const handleSubmit = () => {
    if (title && description) {
      onSubmit({
        title, 
        description,
        done, 
      });
      onClose();
    }
  };

  return (
    <Overlay>
      <PopupContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title >Criar tarefa</Title>
        <Input 
          type="text" 
          placeholder="Insira o título da tarefa" 
          value={title}
          onChange={handleTitleChange}
        />
        <TextArea 
          placeholder="Insira a descrição da tarefa" 
          rows={4} 
          value={description}
          onChange={handleDescriptionChange}
        />
        <div>
          
        </div>
        <Button onClick={handleSubmit}>Adicionar</Button>
      </PopupContainer>
    </Overlay>
  );
};

export default Popup;
