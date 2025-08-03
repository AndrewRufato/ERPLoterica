import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Caixa from "./pages/caixa";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import PrivateRoute from './pages/components/PrivateRoute';
import MenuButton from "./pages/components/buttonMenu";
import Relatorio from "./pages/relatorio";
import Sair from './pages/sair';
import './App.css'

function App() {
  const [isNavHidden, setIsNavHidden] = useState(false);

  const toggleNavigation = () => {
    setIsNavHidden(!isNavHidden);
  };

  // Verifica se o token está presente
  const hasToken = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      {/* Exibe o menu somente se o token existir */}
      {hasToken && (
        <div
          id="menu-site"
          className={`menu-container ${isNavHidden ? "hidden" : ""}`}
        >
          {!isNavHidden && (
            <div id="navegacao" className="menu-navigation">
              <Link to="/caixa" className="menu-link">Caixa</Link>
              <Link to="/relatorio" className="menu-link">Relatorio</Link>
              <Link to="/sair" className="menu-link">Sair</Link>
              
            </div>
          )}
          <div className="coluna-btn">
            <MenuButton isHidden={isNavHidden} toggle={toggleNavigation} />
          </div>
        </div>
      )}

      {/* Rotas da aplicação */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/caixa"
          element={
            <PrivateRoute>
              <Caixa />
            </PrivateRoute>
          }
        />
         <Route
          path="/relatorio"
          element={
            <PrivateRoute>
              <Relatorio />
            </PrivateRoute>
          }
        />

        <Route path="/sair" element={<Sair />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
