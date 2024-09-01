import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    background-color: #1E1E26;
    width: 100%;
    min-height: 100vh;
    justify-content: center;
    align-items: center; 
    padding: 20px;
    font-family: 'Inter', sans-serif;

`
export const ContentArea = styled.div`
    display: flex; 
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 60vw;
    background: #16161C;
    border-radius: 8px;
    height: 70vh;
    max-height: 80vh; 
`
export const Title = styled.h1`
    color:  #ffffff;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 42px;
    line-height: 51px;
`
export const ContainerInput = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    label {
        color: #fff;
        font-size: 1rem;
        margin-bottom: 8px;
        align-self: flex-start;
    }

`

export const Input = styled.input`
    background-color: #2b2b2b;
    border: none;
    border-radius: 5px;
    padding: 12px;
    margin-bottom: 20px;
    color: #fff;
    font-size: 1rem;
    width:30vw;

    
    &::placeholder {
        color: #666;
    }
`


export const Button = styled.button `
    background: linear-gradient(90deg, #ff6a00 0%, #ee0979 100%);
    border: none;
    width: 20vw;
    border-radius: 5px;
    padding: 15px;
    font-size: 1rem;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%);
    }
` 
export const ErrorMessage = styled.span`
    color: red;
    font-size: 0.875rem;
    margin-bottom: 10px;
    align-self:center;
    margin-top: 10px;
`;

export const LinkText = styled.span`
    color: #ffffff;
    text-align: center;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 15px;
    text-decoration: underline;

    &:hover {
        color: #ff6a00;
    }
`;