/* eslint-disable */
import ActionType from './globalActionType';

const globalState = {
    pokemonList: []
}

//Reducer
const rootReducer = (state = globalState, action) => {
    switch (action.type) {
        case ActionType.ADD_POKEMON:
            let oldPokemonList = JSON.parse(localStorage.getItem('pokemon'));

            if (!oldPokemonList) {
                oldPokemonList = []
            }
            
            oldPokemonList.push({id: action.data.id, name: action.name})
            localStorage.setItem('pokemon', JSON.stringify(oldPokemonList));

            return {
                ...state,
                pokemonList: oldPokemonList
            }

        case ActionType.SHOW_MY_POKEMON:
            return {
                ...state,
                pokemonList: action.data
            }

        case ActionType.REMOVE_POKEMON:
            const removePokemon = state.pokemonList.find(res => res.name.toLowerCase() === action.name.toLowerCase());
            state.pokemonList.splice(state.pokemonList.indexOf(removePokemon), 1);
            localStorage.setItem('pokemon', JSON.stringify(state.pokemonList));

            return {
                ...state,
                pokemonList: [...state.pokemonList]
            }

        default: return state;
    }
}

export default rootReducer;