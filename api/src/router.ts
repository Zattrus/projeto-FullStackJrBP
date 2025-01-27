import { Router } from "express";
import Commitment from "./app/useCases/Commitment";
import User from "./app/useCases/User";



export const router = Router();

// Criar Novo Usuário
router.post('/users', User.createUser);

// Obter Todos os Usuários
router.get('/users', User.listUsers);

//Deletar Usuário
router.delete('/users/:id', User.deleteUser);

// Lista compromissos	
router.get('/appointments', Commitment.list);

// Criar compromisso
router.post('/appointments', Commitment.createAppointment);

//Deletar compromisso
router.delete('/appointments/:id', Commitment.deleteAppointment);