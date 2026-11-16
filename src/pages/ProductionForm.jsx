import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [production, setProduction] = useState({ name: '', type: '', location: '' });

  useEffect(() => {
    if (id) {
      fetchProduction();
    }
  }, [id]);

  const fetchProduction = async () => {
    // ИЗМЕНЕНО ЗДЕСЬ
    const response = await axios.get(`http://217.71.129.139:6420/productions/${id}`);
    setProduction(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (id) {
      // ИЗМЕНЕНО ЗДЕСЬ
      await axios.put(`http://217.71.129.139:6420/productions/${id}`, production);
      // ИЗМЕНЕНО ЗДЕСЬ
      await axios.post('http://217.71.129.139:6420/logs', {
        action: `Отредактировано производство с ID: ${id}`,
        timestamp: new Date().toISOString(),
      });
    } else {
      // ИЗМЕНЕНО ЗДЕСЬ
      const response = await axios.post('http://217.71.129.139:6420/productions', production);
      // ИЗМЕНЕНО ЗДЕСЬ
      await axios.post('http://217.71.129.139:6420/logs', {
        action: `Добавлено производство с ID: ${response.data.id}`,
        timestamp: new Date().toISOString(),
      });
    }
    navigate('/productions'); 
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h1>{id ? 'Редактировать производство' : 'Добавить производство'}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Название:</label>
            <input
              type="text"
              value={production.name}
              onChange={(e) => setProduction({ ...production, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Тип продукции (например, Молочное):</label>
            <input
              type="text"
              value={production.type}
              onChange={(e) => setProduction({ ...production, type: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Локация:</label>
            <input
              type="text"
              value={production.location}
              onChange={(e) => setProduction({ ...production, location: e.target.value })}
              required
            />
          </div>
          <button type="submit">{id ? 'Сохранить' : 'Добавить'}</button>
        </form>
      </div>
    </div>
  );
};

export default ProductionForm;
