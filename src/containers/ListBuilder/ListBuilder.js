import React, { useState, useEffect } from 'react';
import './ListBuilder.css';

//components
import Card from '../../components/Card/Card';
import Aux from '../../hoc/Auxi/Auxi';

//bootstrap
import { Button } from "react-bootstrap";

const ListBuilder = () => {
  const [pokemonList, setPokemonList] = useState([]);

  const [state, setState] = useState({
    offset: 0,
    limit: 20
  })
  
  useEffect(() => {
    console.log('useEffect')
    fetchData();
    console.log('state.offset', state.offset)
    console.log('state.limit', state.limit)
  }, [state]);

  const fetchData = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon??offset=${state.offset}&limit=${state.limit}`)
    .then((res) => res.json())
      .then((response) => {
        setPokemonList(response.results);
      })
  }

  const handleNext = () => {
    setState({
      offset: state.limit,
      limit: state.limit + 20 >= 898? 898 : state.limit + 20
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
      { state.limit != 898?
          <div className="button">
            <Button variant="primary" onClick={handleNext}>
                Next
            </Button>
          </div> : null }
    </Aux>
  );
}

export default ListBuilder;
