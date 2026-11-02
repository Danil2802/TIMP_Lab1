import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SecuritySystemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [system, setSystem] = useState({ name: '', productionId: '', orderNumber: '' });
  const [productions, setProductions] = useState([]);

  useEffect(() => {
    fetchProductions();
    if (id) {
      fetchSystem();
    }
  }, [id]);

  const fetchProductions = async () => {
    const response = await axios.get('http://localhost:5000/productions');
    setProductions(response.data);
  };

  const fetchSystem = async () => {
    const response = await axios.get(`http://localhost:5000/securitySystems/${id}`);
    setSystem(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:5000/securitySystems/${id}`, system);
      await axios.post('http://localhost:5000/logs', {
        action: `Отредактирована система безопасности с ID: ${id}`,
        timestamp: new Date().toISOString(),
      });
    } else {
      const response = await axios.post('http://localhost:5000/securitySystems', system);
      await axios.post('http://localhost:5000/logs', {
        action: `Добавлена система безопасности с ID: ${response.data.id}`,
        timestamp: new Date().toISOString(),
      });
    }
    navigate('/security-systems');
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h1>{id ? 'Редактировать систему безопасности' : 'Добавить систему безопасности'}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Название системы:</label>
            <input
              type="text"
              value={system.name}
              onChange={(e) => setSystem({ ...system, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Производство:</label>
            <select
              value={system.productionId || ''}
              onChange={(e) => setSystem({ ...system, productionId: e.target.value })}
              required
            >
              <option value="">Выберите производство</option>
              {productions.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.name} (ID: {prod.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Порядковый номер:</label>
            <input
              type="number"
              min="1"
              step="1"
              value={system.orderNumber || ''}
              onChange={(e) => setSystem({ ...system, orderNumber: e.target.value })}
              required
            />
          </div>

          <button type="submit">{id ? 'Сохранить' : 'Добавить'}</button>
        </form>
      </div>
    </div>
  );
};

export default SecuritySystemForm;
