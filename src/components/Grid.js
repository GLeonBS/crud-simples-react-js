import React from "react";
import axios from "axios";
import styled from "styled-components";
import {FaTrash, FaEdit} from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Tr = styled.tr``;

const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none;"}
`;

const Td = styled.td`
    padding-top: 15px;
    text-align:  ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none;"}
`;


const Grid = ({ users, setUsers, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };


    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8800/${id}`)
        .then((response) => {
            const newArray = users.filter((item) => item.id !== id);

            setUsers(newArray);
            toast.success("Usuário deletado com sucesso!");
        })
        .catch((error) => {
            toast.error(error);
        });

        setOnEdit(null);
    };
    
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th onlyWeb>Fone</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i) => (
                    <Tr key={i}>
                        <Td width="30%">{item.nome}</Td>
                        <Td width="30%">{item.email}</Td>
                        <Td onlyWeb width={"20%"}>
                            {item.fone}
                        </Td>
                        <Td alignCenter width={"5%"}>
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td alignCenter width={"5%"}>
                            <FaTrash onClick={() => handleDelete(item.id)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

export default Grid;