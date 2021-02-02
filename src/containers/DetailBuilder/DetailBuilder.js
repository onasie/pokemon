import React from 'react';

//components
import Card from '../../components/Card/Card';
import Aux from '../../hoc/Auxi/Auxi';

//router
import { useHistory } from 'react-router-dom';

const DetailBuilder = (props) => {
    const history = useHistory();
    const { pathname } = history.location;

    const queryString = require('query-string');
    const parsed = queryString.parse(props.location.search);
    const name = parsed['name'];
    const id = parsed['id'];
    const value = parsed['value'];

    const pokemon = {'name': name, 'id': id, 'value': value};

    let layout = pathname === '/catch-random-pokemon'
    ? <Card key={1} id={1} pokemon={{url: `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 898 + 1)}`}} value={1}/>
    : <Card key={name} id={id} pokemon={pokemon} value={value}/>

    return (
        <Aux>
            { layout }
        </Aux>
    );
}

export default DetailBuilder;