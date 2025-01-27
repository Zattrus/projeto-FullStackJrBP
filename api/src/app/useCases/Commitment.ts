import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { AppointmentSchema } from "../models/AppointmentSchema";

class commitment {
  async list(req: Request, res: Response) {
    try {
      const appointments = await AppointmentSchema.find();

      res.json(appointments);
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async createAppointment(req: Request, res: Response) {
    try {
      const { clientId, corretorId, date, duration } = req.body;

      if (duration < 30 || duration > 120) {
        res.status(400).json({ error: "Duração inválida" });
        return;
      }

      const startTime = new Date(date);
      const endTime = new Date(date);
      endTime.setMinutes(startTime.getMinutes() + duration);
      const conflict = await AppointmentSchema.exists({
        corretorId,
        date: {
          $lt: endTime,
          $gte: startTime
        }
      });
      if (conflict) {
        res.status(409).json({ error: "Este Corretor está ocupado neste horário" });
        return;
      }

      const appointment = new AppointmentSchema({ clientId, corretorId, date: startTime, duration });
      await appointment.save();
      res.status(201).json(appointment);
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  }

  async deleteAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        res.status(404).json({ error: "Agendamento não encontrado" });
      }
      await AppointmentSchema.findByIdAndDelete(id);

      res.sendStatus(204);
    } catch (error) {
      res.sendStatus(500)
    }
  }
}
export default new commitment()