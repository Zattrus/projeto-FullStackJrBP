import { model, Schema } from "mongoose";

export const UserSchema = model('User', new Schema({
  name: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['CORRETOR', 'CLIENTE'], 
    required: true
   },
}));