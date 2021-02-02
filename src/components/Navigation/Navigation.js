import React, { useEffect } from 'react';
import './Navigation.css';

//components
import Aux from '../../hoc/Auxi/Auxi';
import NavigationItem from './NavigationItem/NavigationItem';

//redux
import { connect } from 'react-redux';
import { handleShowMyPokemon } from '../../redux/action/globalFunctionAction';

const Navigation = (props) => {
    useEffect(() => {
        handleShowTotal();
    }, []);

    const handleShowTotal = () => {
        const pokemon = JSON.parse(localStorage.getItem('pokemon'));
        if (pokemon) props.handleShowMyPokemon(pokemon)
    }

    return (
        <Aux>
            <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light toolbar">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-brand image">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Pok%C3%A9mon_GO_logo.svg/1200px-Pok%C3%A9mon_GO_logo.svg.png"/>
                </div>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <hr />
                    <ul className="navbar-nav">
                    <NavigationItem link="/" hash="" search="" exact>All Pokemon</NavigationItem>
                    <NavigationItem link="/my-pokemon-list" hash="" search="">My Pokemon</NavigationItem>
                    <NavigationItem link="/catch-random-pokemon" hash="" search="">Random Pokemon</NavigationItem>
                    </ul>
                    <hr/>
                </div>
                <div>Total Owned: {props.totalOwn.length}</div>
            </nav>
        </Aux>
    );
}


const mapStateToProps = (state) => {
    return {
        totalOwn: state.pokemonList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleShowMyPokemon: (data) => dispatch(handleShowMyPokemon(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);