import React, { useState, useEffect } from 'react';
import './Card.css';

//component
import Aux from '../../hoc/Auxi/Auxi';
import Modal from '../../components/Modal/Modal';

//router
import { useHistory } from 'react-router-dom';

const Card = (props) => {
    const history = useHistory();
    const { pathname } = history.location;
    const [state, setState] = useState({
        pokemonInfo: {},
        loaded: false
    })

    useEffect(() => {
        fetchData();
    }, [props.pokemon.id]);

    const fetchData = () => {
        fetch(props.pokemon.url || `https://pokeapi.co/api/v2/pokemon/${props.pokemon.id}`)
        .then((res) => res.json())
            .then((response) => {
                setState({
                    pokemonInfo: response,
                    pokemonSprites: response.sprites.front_default,
                    loaded: true,
                })
            });
    }

    const handleCardClicked = (e, id, name) => {
        e.stopPropagation()
        if(props.value != 0 && pathname !== '/catch-random-pokemon') {
            let value = pathname === '/my-pokemon-list'? 0 : 1
            history.push(`/pokemon-detail?id=${id}&name=${name}&value=${value}`)
        }
    }

    let layout = state.loaded
    ? pathname !== '/' && pathname !== '/my-pokemon-list'
        ? <Aux>
            <div className="textCapitalize">
                Type(s): {state.pokemonInfo.types[1]
                    ? state.pokemonInfo.types[0].type.name + ' &  ' + state.pokemonInfo.types[1].type.name
                    : state.pokemonInfo.types[0].type.name}
            </div>
            <div className="textCapitalize">
                Move(s): {state.pokemonInfo.moves[0]? state.pokemonInfo.moves.map(res => res.move.name).join(', ') : '-'}
            </div>
            <div>Height: {state.pokemonInfo.height / 10}m</div>
            <div>Weight: {state.pokemonInfo.weight / 10}kg</div>
        </Aux>
        : null
    : null
    let pokemonList = state.loaded
    ? <div className={'pokemonCard ' + state.pokemonInfo.types[0].type.name} onClick={(e) => handleCardClicked(e, state.pokemonInfo.id, props.pokemon.name)}>
        <h5 className="textCapitalize">{props.pokemon.name? props.pokemon.name : state.pokemonInfo.name}</h5>
        <img src={state.pokemonSprites} alt={'Picture of ' + props.pokemon.name} />
        { layout }
        { props.value == 1? <Modal pokemon={state.pokemonInfo}/> : null }
    </div>
    : <div className="pokemonCard">
        <p>Loading...</p>
    </div>

    return (
        <Aux>
            { pokemonList }
        </Aux>
    );
}


export default Card;
