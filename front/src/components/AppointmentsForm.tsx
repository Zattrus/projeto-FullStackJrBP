/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components';
import { api } from '../ultils/api';

interface User {
  _id: string
  name: string
  role: string
}
interface AppointmentFormProps {
  users: User[],
  fetchAppointments: () => void
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ users, fetchAppointments }) => {
  const [clientId, setClientId] = useState<string>();
  const [corretorId, setCorretorId] = useState<string>();
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formattedDate = moment.utc(date).toISOString().replace('.000Z', 'Z');
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = moment.duration({ hours, minutes }).asMinutes();

    try {
      await api.post('/appointments', {
        clientId: clientId,
        corretorId: corretorId,
        date: formattedDate,
        duration: totalMinutes.toString(),
      });
      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
    alert('Agendamento criado com sucesso!');
  };


  const generateTimeOptions = () => {
    const options = [];
    const start = 30;
    const end = 120;
    for (let i = start; i <= end; i += 30) {
      const hours = Math.floor(i / 60);
      const minutes = i % 60;
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      options.push(timeString);
    }
    return options;
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Select value={clientId} onChange={(e) => setClientId(e.target.value)} required>
          <option value={''} disabled selected>Selecione um Cliente</option>
          {users
            .filter((user) => user.role === 'CLIENTE')
            .map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
        </Select>
        <Select value={corretorId} onChange={(e) => setCorretorId(e.target.value)} required>
          <option value={''} disabled selected>Selecione um Corretor</option>
          {users
            .filter((user) => user.role === 'CORRETOR')
            .map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
        </Select>
        <Input type="date" value={moment(date).format("YYYY-MM-DD")} onChange={(e) => setDate(e.target.value)} required />
        <Select value={time} onChange={(e) => setTime(e.target.value)} required>
          <option value={''} disabled selected>Selecione um tempo de duração</option>
          {generateTimeOptions().map((timeOption) => (
            <option key={timeOption} value={timeOption}>
              {timeOption}
            </option>
          ))}
        </Select>
        <Button
          type="submit"
        >
          Criar Agendamento
        </Button>
      </Form>
    </Container>
  );
};
export default AppointmentForm;

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`