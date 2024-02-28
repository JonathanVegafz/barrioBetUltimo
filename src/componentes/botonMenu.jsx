import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function BotonMenu({texto, onClick, isActive = false}) {

    return ( <>
         <li className={`${isActive ? 'activo' : 'desactivado'}`} onClick={onClick}><NavLink className={"elementoLink" } >{texto}</NavLink></li>
    </> );
}

export default BotonMenu;