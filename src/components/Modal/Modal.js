import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import './Modal.css';

//component
import Aux from '../../hoc/Auxi/Auxi';

//router
import { useHistory } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { handleAddMyPokemon, handleRemoveMyPokemon } from '../../redux/action/globalFunctionAction';

const ModalLayout = (props) => {
    const pokemon = props.pokemon;
    const history = useHistory();
    const { pathname } = history.location;

    const [showModal, setShow] = useState(false);
    const [state, setState] = useState({
        fields: {},
        errors: {}
    })

    const handleValidation = () => {
        let fields = state.fields;
        let errors = {};
        let formIsValid = true;

        if(!fields["name"]){
            formIsValid = false;
            errors["name"] = "Name cannot be empty";
        }

        if(typeof fields["name"] !== "undefined"){
            if(props.pokemonList? props.pokemonList.find(res => res.name.toLowerCase() === fields["name"].toLowerCase()) : !fields["name"]){
               formIsValid = false;
               errors["name"] = "You already use this name";
            }        
        }

       setState(prevState => ({
            ...prevState,
            errors
        }))
        
       return formIsValid;
   }

   const handleChange = (field, e) => {
        e.stopPropagation();  
        e.preventDefault();    
        let fields = state.fields;
        fields[field] = e.target.value;
        setState(prevState => ({
            ...prevState,
            fields
        }))
    }

    //All Pokemon Layout
    const handleShow = (e) => {
        e.stopPropagation()
        e.preventDefault()
        if (Math.random() < 0.5){ 
            setState({
                fields: {},
                errors: {}
            })
            setShow(true) }
        else { 
            alert('Oops... you failed caught the pokemon')
            window.location.reload() }
    }

    const handleKeepClicked = (e) => {
        e.stopPropagation()
        e.preventDefault();
        if (handleValidation()) {
            props.handleAddPokemon(pokemon, state.fields["name"])
            setShow(false)
            setState({
                fields: {},
                errors: {}
            })
            window.location.reload()
        }
    }

    //My Pokemon Layout
    const handleReleaseClicked = (e) => {
        e.stopPropagation()
        e.preventDefault()
        props.handleRemovePokemon(pokemon.name)
        // window.location.reload()
    }

    let button = pathname === '/pokemon-detail' || pathname === '/catch-random-pokemon'
    ? <Button variant="primary" className="button" onClick={(e) => handleShow(e)}>
        Catch
    </Button>
    : ( pathname === '/my-pokemon-list'
        ? <Button variant="primary" className="button" onClick={(e) => handleReleaseClicked(e)}>
            Release
        </Button>
        : null
    )

    const handleEnterInput = (e) => {
        if (e.keyCode == 13) {
            handleKeepClicked(e)
        } 
    }

    return (
        <Aux>
            { button }
            <Modal show={showModal} onHide={() => ( setShow(false), window.location.reload()) }>
                <Modal.Header closeButton>
                    <Modal.Title>Yeay! You got a pokemon</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label className="col-form-label">Name</label>
                                <input
                                    refs="name" 
                                    type="text" 
                                    className="form-control textCapitalize"
                                    placeholder={pokemon.name}
                                    onKeyDown={(e) => handleEnterInput(e)}
                                    onChange={(e) => handleChange("name", e)} 
                                    value={state.fields["name"] || ''}
                                    autoComplete="on" />
                                <span style={{color: "red"}}>{state.errors["name"]}</span>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => ( setShow(false), window.location.reload() )}>
                            Release
                        </Button>
                        <Button variant="primary" onClick={(e) => handleKeepClicked(e)}>
                            Keep
                        </Button>
                </Modal.Footer>
            </Modal>
        </Aux>
    );
}

const mapStateToProps = (state) => {
    return {
        pokemonList: state.pokemonList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleAddPokemon: (data, name) => dispatch(handleAddMyPokemon(data, name)),
        handleRemovePokemon: (name) => dispatch(handleRemoveMyPokemon(name))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalLayout);