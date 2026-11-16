import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SecuritySystems = () => {
  const [systems, setSystems] = useState([]);
  const [productions, setProductions] = useState([]); 
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem('userRole') === 'admin';

  useEffect(() => {
    fetchSystems();
    fetchProductions();
  }, []);

  const fetchSystems = async () => {
    // ЗАМЕНА 1
    const response = await axios.get('http://217.71.129.139:6420/securitySystems');
    setSystems(response.data);
  };

  const fetchProductions = async () => {
    // ЗАМЕНА 2
    const response = await axios.get('http://217.71.129.139:6420/productions');
    setProductions(response.data);
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    
    // ЗАМЕНА 3
    await axios.delete(`http://217.71.129.139:6420/securitySystems/${id}`);
    // ЗАМЕНА 4
    await axios.post('http://217.71.129.139:6420/logs', {
      action: `Удалена система безопасности с ID: ${id}`,
      timestamp: new Date().toISOString(),
    });
    fetchSystems();
  };

  return (
    <div className="container">
      <h1>Системы безопасности</h1>
      
      {isAdmin && (
        <button onClick={() => navigate('/security-systems/add')}>Добавить систему</button>
      )}

      <table>
        <thead>
          <tr>
            {isAdmin && <th>ID</th>}
            <th>Название</th>
            <th>Производство</th>
            <th>Порядковый номер</th>
            {isAdmin && <th>Действия</th>}
          </tr>
        </thead>
        <tbody>
          {systems.map((system) => (
            <tr key={system.id}>
              {isAdmin && <td>{system.id}</td>}
              <td>{system.name}</td>

              <td>{productions.find((p) => p.id === system.productionId)?.name || 'Не указано'}</td>
   
              <td>{system.orderNumber}</td>
   
              {isAdmin && (
                <td>
                  <button onClick={() => navigate(`/security-systems/edit/${system.id}`)}>Редактировать</button>
                  <button onClick={() => handleDelete(system.id)}>Удалить</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SecuritySystems;



