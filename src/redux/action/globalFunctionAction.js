import ActionType from '../reducer/globalActionType';

export const handleAddMyPokemon = (data, name) => dispatch => {
  dispatch({type: ActionType.ADD_POKEMON, data, name})
}

export const handleShowMyPokemon = (data) => dispatch => {
  dispatch({type: ActionType.SHOW_MY_POKEMON, data})
}

export const handleRemoveMyPokemon = (name) => dispatch => {
  dispatch({type: ActionType.REMOVE_POKEMON, name})
}