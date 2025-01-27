import { Request, Response } from "express";
import { UserSchema } from "../models/UserSchema";

class User {
  async listUsers(req: Request, res: Response) {
    try {
      const users = await UserSchema.find();
      res.status(200).json(users);
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { name, role } = req.body

      if (!name) {
        res.status(400).json({ error: "Nome é obrigatório" });
      }

      if (!['CORRETOR', 'CLIENTE'].includes(role)) {
        res.status(400).json({ error: "Role inválido. Use 'Corretor' ou 'Cliente'" });
      }

      const user = await UserSchema.create({ name, role })

      res.status(201).json(user);
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ error: "Id é obrigatório" });
      }
      const user = await UserSchema.findByIdAndDelete(id);
      if (!user) {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.sendStatus(204);
    } catch (error) {
      res.sendStatus(500)
    }
  }
}

export default new User();