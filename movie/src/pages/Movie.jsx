// Importa os hooks 
import { useEffect, useState } from "react";

// Importa o hook useParams do react-router-dom para acessar parâmetros da URL
import { useParams } from "react-router-dom";

// Importa ícones da biblioteca react-iconsbs 
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";


import MovieCard from "../components/MovieCard";

import "./Movie.css";

// Recupera a URL base dos filmes do arquivo .env usando Vite
const moviesURL = import.meta.env.VITE_API;

// Recupera a chave da API do arquivo .env
const apiKey = import.meta.env.VITE_API_KEY;

// Define o componente Movie
const Movie = () => {
  // Extrai o parâmetro id da URL que será usado para buscar o filme
  const { id } = useParams();

  // Define o estado do filme inicialmente nulo
  const [movie, setMovie] = useState(null);

  // Função assíncrona que busca os dados do filme na API
  const getMovie = async (url) => {
    // Faz a requisição HTTP (GET) para a URL da API
    const res = await fetch(url);

    // Converte a resposta em JSON
    const data = await res.json();

    //  Depuração
    console.log(data);

    // Atualiza o estado movie com os dados recebidos
    setMovie(data);
  };

  // Função que formata números para valores em dólar
  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // Hook useEffect executado apenas uma vez ao montar o componente
  useEffect(() => {
    // Monta a URL da API com o id do filme e a chave da API
    const movieUrl = `${moviesURL}${id}?api_key=${apiKey}`;

    // Chama a função para buscar os dados do filme
    getMovie(movieUrl);
  }, []); // Array vazio: executa apenas na primeira renderização

  
  return (
    <div className="movie-page">
      {/* Renderiza o conteúdo apenas se o filme já tiver sido carregado */}
      {movie && (
        <>
          {/* Componente que mostra o card do filme*/}
          <MovieCard movie={movie} showLink={false} />

          {/* Exibe o slogan do filme se existir */}
          <p className="tagline">{movie.tagline}</p>

          {/* Bloco de informação: Orçamento */}
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>

          {/* Bloco de informação: Receita */}
          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>

          {/* Bloco de informação: Duração */}
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>

          {/* Bloco de informação: Descrição */}
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
