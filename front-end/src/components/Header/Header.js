import React, { useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import styles from './Header.module.css'

function Header() {

    const ctxau = useContext(AuthContext)

    return (
        <div className={styles.hh}>
            Header
            <a href="http://localhost:3000/" style={ctxau.auth ? ({display : 'inline'}) : ({display : 'none'})} onClick={ctxau.logout}>Logout</a>
        </div>
    )
}

export default Header;