import React from 'react';
import './NavigationItem.css';

//router
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
    const { link, search } = props;

    return (
        <li className="nav-item">
            <NavLink 
                to={{
                    pathname: link, 
                    hash: props.hash, 
                    search: search }}
                exact={props.exact}
                onClick={props.clicked}
                className={"nav-link"}>{props.children}</NavLink>
        </li>
    );
}

export default navigationItem;