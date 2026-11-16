import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Productions = () => {
  const [productions, setProductions] = useState([]);
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem('userRole') === 'admin';

  useEffect(() => {
    fetchProductions();
  }, []);

  const fetchProductions = async () => {
    // ЗАМЕНА 1
    const response = await axios.get('http://217.71.129.139:6420/productions');
    setProductions(response.data);
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;

    // ЗАМЕНА 2
    await axios.delete(`http://217.71.129.139:6420/productions/${id}`);
    
    // ЗАМЕНА 3
    await axios.post('http://217.71.129.139:6420/logs', {
      action: `Удалено производство с ID: ${id}`,
      timestamp: new Date().toISOString(),
    });
    
    fetchProductions();
  };

  return (
    <div className="container">
      <h1>Производства пищевой промышленности</h1>
      
      {isAdmin && (
        <button onClick={() => navigate('/productions/add')}>
          Добавить производство
        </button>
      )}

      <table>
        <thead>
          <tr>
            {isAdmin && <th>ID</th>}
            <th>Название</th>
            <th>Тип продукции</th>
            <th>Локация</th>
            {isAdmin && <th>Действия</th>}
          </tr>
        </thead>
        <tbody>
          {productions.map((prod) => (
            <tr key={prod.id}>
              {isAdmin && <td>{prod.id}</td>}
              <td>{prod.name}</td>
              <td>{prod.type}</td>
              <td>{prod.location}</td>
              
              {isAdmin && (
                <td>
                  <button onClick={() => navigate(`/productions/edit/${prod.id}`)}>
                    Редактировать
                  </button>
                  <button onClick={() => handleDelete(prod.id)}>
                    Удалить
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productions;

