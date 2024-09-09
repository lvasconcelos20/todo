import styled from 'styled-components';

export const TaskContainer = styled.div`
  display: flex;
  
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #1e1e1e; 
  border-radius: 8px;
  margin-bottom: 10px;

`;

export const TaskTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #e91e63; 
`;

export const TaskDescription = styled.p`
 margin: 0;
  font-size: 14px;
  color: #b0b0b0;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  margin-top: 5px; /* Pequeno espaçamento superior para separar do título */
`;

export const DeleteIcon = styled.div`
 
  cursor: pointer;
  color: #b0b0b0; 
  &:hover {
    color: #e91e63; 
  }
`;
