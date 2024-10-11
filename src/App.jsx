import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Times from "./components/Times";
import Jogadores from "./components/Jogadores";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redireciona o caminho "/" para "/times" */}
        <Route path="/" element={<Navigate to="/times" />} />
        
        {/* Define a rota para a página de times */}
        <Route path="/times" element={<Times />} />
        
        {/* Define a rota para exibir os jogadores de um time */}
        <Route path="/jogadores/:id_time" element={<Jogadores />} />
      </Routes>
    </Router>
  );
};

export default App;
