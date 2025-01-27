import mongoose, { model, Schema } from 'mongoose';

export const AppointmentSchema = model('Appointment', new Schema({
  clientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  date: { 
    type: Date,
    default: Date.now,
    required: true 
  },
  duration: { 
    type: Number, 
    required: true 
  },
}));