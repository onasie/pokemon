import React, { useState, useEffect } from 'react';
import './ListBuilder.css';

import Card from '../../components/Card/Card';
import Aux from '../../hoc/Auxi/Auxi';

const ListBuilder = () => {
  const [pokemonList, setPokemonList] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon??offset=${0}&limit=${20}`)
    .then((res) => res.json())
      .then((response) => {
        setPokemonList(response.results);
      })
  }

  let finalPokemonList = pokemonList
  ? pokemonList.map((pokemon, index) => (
      <Card key={pokemon.name} id={index + 1} pokemon={pokemon} /> ))
  : null
  
  return (
    <Aux>
      <div className="resultCards">
        { finalPokemonList }
      </div>
      <div>
        <button>Previous</button>
        <button>Next</button>
      </div>

    </Aux>
  );
}

export default ListBuilder;
