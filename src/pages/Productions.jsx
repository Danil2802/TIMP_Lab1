import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const response = await axios.get('http://localhost:5000/events');
    setEvents(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/events/${id}`);
    await axios.post('http://localhost:5000/logs', {
      action: `Удалено мероприятие с ID: ${id}`,
      timestamp: new Date().toISOString(),
    });
    fetchEvents();
  };

  return (
    <div className="container">
      <h1>Мероприятия</h1>
      <button onClick={() => navigate('/events/add')}>Добавить мероприятие</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Дата</th>
            <th>Место</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.location}</td>
              <td>
                <button onClick={() => navigate(`/events/edit/${event.id}`)}>Редактировать</button>
                <button onClick={() => handleDelete(event.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Events;
