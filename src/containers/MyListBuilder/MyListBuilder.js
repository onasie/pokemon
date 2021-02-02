import React from 'react';
import './MyListBuilder.css';

//component
import Card from '../../components/Card/Card';

//redux
import { connect } from 'react-redux';

const MyListBuilder = (props) => {
    let myListLayout = props.pokemonList.length !== 0
    ? props.pokemonList.map((pokemon, index) => (
        <Card key={index + 1} id={index + 1} pokemon={pokemon} value={1}/> ))
    : <div>You haven't caught any pokemon</div>

    return (
        <div className="resultCards">
            { myListLayout } 
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        pokemonList: state.pokemonList
    }
}

export default connect(mapStateToProps, null)(MyListBuilder);