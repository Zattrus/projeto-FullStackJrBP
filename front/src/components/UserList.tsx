import { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../ultils/api";


interface Client {
  _id: string;
  name: string;
  role: string;
}

export interface UserListProps {
  clients: Client[];
}

export function UserList({ clients }: UserListProps) {
  const [userList, setUserList] = useState<Client[]>(clients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState("CLIENTE");

  useEffect(() => {
    setUserList(clients);
  }, [clients]);

  const addUser = async () => {
    if (!newUserName.trim()) {
      alert("O nome do usuário não pode estar vazio.");
      return;
    }

    try {
      const response = await api.post("/users", {
        name: newUserName,
        role: newUserRole,
      });
      alert("Usuário criado com sucesso!");
      setNewUserName("");
      setNewUserRole("CLIENTE");
      setIsModalOpen(false);
      fetchUsers();
      clients.push(response.data);
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUserList(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await api.delete(`/users/${id}`);
      alert("Usuário deletado com sucesso!");
      fetchUsers();
    } catch (error) {
      console.error(console.log(error));
    }
  };


  return (
    <Container>
      <List>
        {userList.map((user) => (
          <ListItem key={user._id}>
            {user.name} - {user.role}
            <DeleteButton onClick={() => deleteUser(user._id)}>Excluir</DeleteButton>
          </ListItem>
        ))}
      </List>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h2>Cadastrar Usuário</h2>
            <label>
              Nome:
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </label>
            <label>
              Role:
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
              >
                <option value="CLIENTE">CLIENTE</option>
                <option value="CORRETOR">CORRETOR</option>
              </select>
            </label>
            <Button onClick={addUser}>Salvar</Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
          </ModalContent>
        </Modal>
      )}
      <Button onClick={() => setIsModalOpen(true)}>Adicionar Usuário</Button>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;

  &:hover {
    background-color: darkred;
  }
`