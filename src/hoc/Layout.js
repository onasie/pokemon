import React from 'react';
import './Layout.css';

//components
import Aux from './Auxi/Auxi';
import Navigation from '../components/Navigation/Navigation';

const Layout = (props) => {
    return (
        <Aux>
            <Navigation />
            <main className="main">
                {props.children}
            </main>
        </Aux>
    );
}

export default Layout;