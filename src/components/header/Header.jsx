import React from 'react';
import  Logo  from '../../assets/img/logo.png'

function Header(props) {
    return (
        <header>
           <div className="logo-container">
          
            <img src={Logo} alt="Logo de BraminFD" className='logo'/>
           
           </div>
        </header>
    );
}

export default Header;