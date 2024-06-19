import React, { useContext } from 'react';
import AuthContext from '../../../contexts/authContext';
import Menu from './Menu/Menu';
import styles from './Header.module.css'

function Header() {

    const ctxau = useContext(AuthContext)

    return (
        <div className={styles.hh}>
            <div className={styles.header1}>
                <a href="http://localhost:3000/" style={ctxau.auth ? ({display : 'inline'}) : ({display : 'none'})} onClick={ctxau.logout}>Logout</a>
            </div>
            <Menu />
        </div>
    )
}

export default Header;