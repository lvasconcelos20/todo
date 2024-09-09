import styled from "styled-components";
import Button from '@mui/material/Button';

export const Container = styled.div`
    display: flex;
    background-color: #1E1E26;
    min-width: 95vw;
    min-height: 100vh;
    justify-content: center;
    align-items: center; 
    font-family: 'Inter', sans-serif;
   
`;

export const Navbar = styled.div` 
    width: 7vw;
    margin-top: 9px;
    background: #1A1A21;
    border-radius: 4px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    position: absolute;

`;

export const ContentArea = styled.div`
    display: flex; 
    justify-content: space-between;
    width: 50vw;
    background: #16161C;
    border-radius: 8px;
    max-height: 80vh; 
  
`;

export const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    width: 18vw;
    align-items: center;
    background: #1A1A21;
    border-radius: 8px;
    align-items: center;
    justify-content: space-evenly;
    height: 60vh;
`;

export const Profile = styled.div` 
  font-family: 'Inter', sans-serif;
    font-weight: 700;  
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center; 
    margin-top: 60px;
    h2 {
        margin-top: 20px; 
        font-size: 20px;
        color: #F9F9F9;
    }
    
`;

export const FooterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  
    color: #FFFFFF;

`;

export const Text = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
 

    h2 {
        font-size: 17px;
        font-weight: 600;
        margin: 0; 
    }

    p {
        font-size: 15px;
        margin: 0;
    }

    img {
        width: 30px;
        height: 30px;
    }
   
`;

export const ButtonStyled = styled(Button)`
    color: white !important;
    .MuiButton-startIcon {
        color: white;
    }
`;

export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    padding: 20px;
    border-radius: 8px;
    gap: 20px;
    overflow-y: auto;
`;

export const TaskHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
        color: #FFFFFF;
        font-size: 24px;
    }
`;

export const AddTaskButton = styled.button`
     background: linear-gradient(135deg, #FF7E7E, #D44CF6);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    border: none;
    cursor: pointer;
    cursor: pointer;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

