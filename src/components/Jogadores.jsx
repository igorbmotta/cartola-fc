// src/components/Jogadores.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Jogadores.css";
import cartolaLogo from "./cartola-logo.png"; // Importa a logo

const Jogadores = () => {
  const { id_time } = useParams();
  const [jogadores, setJogadores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJogadores, setFilteredJogadores] = useState([]);

  // Mapeamento de IDs para nomes das posições
  const posicoesMap = {
    1: "Goleiro",
    2: "Zagueiro",
    3: "Lateral",
    4: "Meia",
    5: "Atacante",
    6: "Técnico",
  };

  useEffect(() => {
    const fetchJogadores = async () => {
      try {
        const response = await fetch(`https://api.cartola.globo.com/atletas/mercado/${id_time}`);
        const data = await response.json();
        console.log("Jogadores:", data.atletas); // Log dos jogadores
        setJogadores(data.atletas);
        setFilteredJogadores(data.atletas);
      } catch (error) {
        console.error("Erro ao buscar os jogadores:", error);
      }
    };

    fetchJogadores();
  }, [id_time]);

  useEffect(() => {
    const results = jogadores.filter((jogador) =>
      jogador.apelido.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJogadores(results);
  }, [searchTerm, jogadores]);

  const defaultPlayerImage = "https://via.placeholder.com/220x220?text=No+Image";

  const handleSearch = () => {
    const results = jogadores.filter((jogador) =>
      jogador.apelido.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJogadores(results);
  };

  return (
    <div className="jogadores-container">
      <header className="header">
        <Link to="/times">
          <img src={cartolaLogo} alt="Cartola FC" className="cartola-logo" />
        </Link>
        <div className="search-container">
          <input
            type="text"
            placeholder="Digite o nome do jogador"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Buscar
          </button>
        </div>
      </header>

      <div className="jogadores-list">
        {filteredJogadores.map((jogador) => (
          <div key={jogador.atleta_id} className="jogador-card">
            <img
              src={
                jogador.foto && jogador.foto.includes("FORMAT")
                  ? jogador.foto.replace("FORMATO", "220x220")
                  : defaultPlayerImage
              }
              alt={jogador.apelido}
              className="jogador-foto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultPlayerImage;
              }}
            />
            <div className="jogador-info">
              <h3>{jogador.apelido}</h3>
              <p>Posição: {posicoesMap[jogador.posicao_id] || "Desconhecida"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jogadores;
