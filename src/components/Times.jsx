// src/components/Times.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Times.css";
import cartolaLogo from "./cartola-logo.png";

const Times = () => {
  const [times, setTimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTimes, setFilteredTimes] = useState([]);

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await fetch("https://api.cartola.globo.com/clubes");
        const data = await response.json();
        const timesArray = Object.values(data); // Converte o objeto em array
        setTimes(timesArray); // Armazena todos os times
        setFilteredTimes(timesArray); // Inicializa com todos os times
      } catch (error) {
        console.error("Erro ao buscar os times:", error);
      }
    };

    fetchTimes();
  }, []);

  useEffect(() => {
    const results = times.filter((time) =>
      time.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTimes(results);
  }, [searchTerm, times]);

  return (
    <div className="times-container">
      <header className="header">
        <img src={cartolaLogo} alt="Cartola FC" className="cartola-logo" />
        <div className="search-container">
          <input
            type="text"
            placeholder="Digite o nome do time"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={() => {}} className="search-button">
            Buscar
          </button>
        </div>
      </header>
      <div className="times-list">
        {filteredTimes.length > 0 ? (
          filteredTimes.map((time) => {
            const escudoUrl = time.escudos["60x60"]; // Acesse a URL do escudo
            return (
              <div key={time.id} className="time-card">
                <img
                  src={escudoUrl}
                  alt={time.nome}
                  className="time-logo"
                />
                <Link to={`/jogadores/${time.id}`} className="time-info">
                  <h3>{time.nome}</h3>
                  <p>{time.apelido}</p>
                </Link>
              </div>
            );
          })
        ) : (
          <p>Nenhum time encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Times;
