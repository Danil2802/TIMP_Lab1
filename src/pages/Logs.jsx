import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const response = await axios.get('http://localhost:3001/logs');
    setLogs(response.data);
  };

  return (
    <div>
      <h1>Журнал изменений</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Действие</th>
            <th>Время</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.action}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
