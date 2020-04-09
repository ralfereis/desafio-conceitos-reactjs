import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
            
      id: "039420da-701e-4c35-b446-d39a68509e18",
      title: `New repository title ${Date.now()}`,
      url: "https://github.com/ralreis/desafio-conceitos-node.git",
      techs: ["NodeJS", "ReactJS", "React Native"],
      likes: 0,

    });

    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">        
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)}
      </ul>     
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
