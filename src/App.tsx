import './App.scss';
import {FiSearch} from 'react-icons/fi';
import {useState} from 'react';
import api from '../src/services/api';

function App(): JSX.Element {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if(input === '') {
      alert("Preencha algum CEP");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }catch {
      alert("Ops, erro ao buscar");
      setInput("");
    }
  }

  return (
    <div className="search">
      <h1 className='search__teste'>Buscador CEP</h1>
      <div className="search__input-wrapper">
        <input 
        type="text"
        className="search__input"
        placeholder='Digite o CEP'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button className="search__button">
          <FiSearch size={20} color="white" className='search__icon' onClick={handleSearch}/>
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <div className="search__data-wrapper">
          <div className="search__data">CEP: {cep.cep}</div>
          <div className="search__data">{cep.logradouro}</div>
          <div className="search__data">Bairro: {cep.bairro}</div>
          <div className="search__data">Cidade: {cep.localidade} - {cep.uf}</div>
        </div>
      )}
    </div>
  )
}

export default App
