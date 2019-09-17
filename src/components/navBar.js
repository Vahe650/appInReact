import React from 'react';

const NavBar = (props) => (
    <nav>
        <h2>{props.title}</h2>
        <ul>
            <li><a className={'font'} href="#">Home</a></li>
            <li><a href="#">Employers</a></li>
            <li><a href="#">Tasks</a></li>
        </ul>
    </nav>
);
export default NavBar;