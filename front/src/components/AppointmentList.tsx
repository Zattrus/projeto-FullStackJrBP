import moment from "moment"
import type React from "react"
import styled from "styled-components"
import { api } from "../ultils/api"

interface Appointment {
  _id: string
  clientId: string
  userName: string
  date: string
  duration: string
}

interface User {
  _id: string
  name: string
}

interface AppointmentListProps {
  appointments: Appointment[],
  users: User[],
  fetchAppointments: () => void
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, fetchAppointments }) => {

  const formatDuration = (minutes: string) => {
    const duration = moment.duration(minutes, 'minutes');
    const hours = Math.floor(duration.asHours());
    const mins = duration.minutes();
    return `${hours}:${mins < 10 ? '0' : ''}${mins}`;
  };

  const onDelete = (id: string) => {
    api.delete(`/appointments/${id}`).then(() => {
      alert('Agendamento excluído com sucesso!');
      fetchAppointments();
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <ListContainer>
      <h2>Lista de Agendamentos</h2>
      <List>
        {appointments.map((appointment) => (
          <ListItem key={appointment._id}>
            <AppointmentInfo>
              <UserName>{appointment.userName}</UserName>
              <DateTime>
                {moment(appointment.date).format('DD-MM-YYYY')}
                {" - "}
                {formatDuration(appointment.duration)}
              </DateTime>
              <DeleteButton onClick={() => onDelete(appointment._id)}>Excluir</DeleteButton>
            </AppointmentInfo>
          </ListItem>
        ))}
      </List>
    </ListContainer>
  )
}

export default AppointmentList

const ListContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`

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

const AppointmentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const UserName = styled.span`
  font-weight: bold;
`

const DateTime = styled.span`
  color: #666;
  margin-left: 10px;
`

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