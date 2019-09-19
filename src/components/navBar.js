import React from 'react';

const NavBar = (props) => (
    <nav className={'navbar navbar-light bg-light'}>
            <a className={'font navbar-brand'} href="http://localhost:3000/">Home</a>
            <a className={'navbar-brand'} href="#">Employers</a>
            <a className={'navbar-brand'} href="#">Tasks</a>

    </nav>
);
export default NavBar;