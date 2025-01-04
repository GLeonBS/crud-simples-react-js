import GlobalStyle from './styles/global'
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import Form from './components/Form';
import Grid from './components/Grid';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try{
      const res = await axios.get("http://localhost:8800");
      
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    }catch(err){
      toast.error("Erro ao buscar usuários");
    }
  };

    useEffect(() => {
      getUsers();
    }, [setUsers]);

  return (
    <>
    <Container>
      <Title>USUÁRIOS</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
    </Container>
    <ToastContainer autoClose={3000} />
    <GlobalStyle />
    
    </>
  );
}

export default App;
