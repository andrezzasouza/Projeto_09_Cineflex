import './session.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Seats from './Seats';

export default function Session () {

  const { idSession } = useParams();

  const [allSeats, setAllSeats] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([])
  const [username, setUsername] = useState("");
  const [userDocument, setUserDocument] = useState("");

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/showtimes/${idSession}/seats`
    );

    promise.then(res => {
      // console.log("resdata2", res.data);
      setAllSeats({...res.data});
    })

  }, []);

  if (allSeats === null) {
    return "Loading...";
  }

  function sendBuyerData() {
    //pegar dados pra envio
      //assentos

    const reservation = {
      // ids: [1, 2, 3],
      name: username,
      cpf: userDocument,
    };

    console.log(reservation)
    // mandar dados pro servidor

    // const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/seats/book-many', reservation)
    // limpar campos
    setUsername("");
    setUserDocument("");
      //limpa os assentos selecionados também ou não faz diferença?
    // ver como mandar os dados pra tela de confirmação
  }

  return (
    <div className="session-container">
      <div className="page-title">
        <h2>Selecione o(s) assento(s)</h2>
      </div>
      <div className="select-seat">
        {allSeats.seats.map((seat, index) =>
          <Seats 
            array={seat}
            key={index}
            state={setSelectedSeats}
          />
        )}
      </div>
      <div className="subtitles">
        <div>
          <div className="seat selected">
          </div>
          <p>Selecionado</p>
        </div>
        <div>
          <div className="seat available">
          </div>
          <p>Disponível</p>
        </div>
        <div>
          <div className="seat unavailable">
          </div>
          <p>Indisponível</p>
        </div>
      </div>
      <div className="insert-data">
        <p>
          Nome do comprador:
        </p>
        <input 
          type="text" 
          placeholder="Digite seu nome..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>
          CPF do comprador:
        </p>
        <input 
          type="text" 
          placeholder="Digite seu CPF..." 
          value={userDocument}
          onChange={(e) => setUserDocument(e.target.value)}
        />
      </div>
      <button 
        className="save-seats" 
        onClick={sendBuyerData}
      >
        Reservar assento(s)
      </button>
      <footer>
        <div className="selected-poster">
          <img 
            src={allSeats.movie.posterURL} 
            alt={`Poster do filme ${allSeats.movie.title}`} 
          />
        </div>
        <div>
          <p>
            {allSeats.movie.title}
          </p>
          <p>
            {allSeats.day.weekday} - {allSeats.name}
          </p>
        </div>
      </footer>
    </div>
  );
}