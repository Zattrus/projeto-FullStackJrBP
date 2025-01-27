/* eslint-disable @typescript-eslint/no-explicit-any */
// import AppointmentForm from '../components/AppointmentForm';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import AppointmentList from '../components/AppointmentList.tsx';
import AppointmentForm from '../components/AppointmentsForm.tsx';
import { UserList } from '../components/UserList.tsx';
import { api } from "../ultils/api.ts";

interface Client {
  _id: string;
  name: string;
  role: string;
}


export function MainPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  useEffect(() => {
    api.get('/users').then((response) => {
      setClients(response.data);
    });
    api.get('/appointments').then((response) => {
      setAppointments(response.data);
    });
  }, []);

  return (
    <PageContainer>
      <Title>Sistema de Agendamentos</Title>
      <Grid>
        <Column>
          <UserList clients={clients} />
        </Column>
        <Column>
          <AppointmentForm users={clients} fetchAppointments={fetchAppointments} />
          <AppointmentList users={clients} fetchAppointments={fetchAppointments} appointments={
            appointments.map((appointment) => ({
              _id: appointment._id,
              clientId: appointment.clientId,
              userName: clients.find((name) => name._id === appointment.clientId)?.name ?? 'CLIENTE',
              date: appointment.date,
              duration: appointment.duration,
            }))
          } />
        </Column>
      </Grid>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  margin: 10px;
  padding: 10px;
  overflow: hidden;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Column = styled.div`
`

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`