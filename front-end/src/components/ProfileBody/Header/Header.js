import React, { useContext } from 'react';
import AuthContext from '../../../contexts/authContext';
import Menu from './Menu/Menu';
import styles from './Header.module.css'
import axios from 'axios'
import RefreshContext from '../../../contexts/refreshContext'
function Header() {

    const ctxau = useContext(AuthContext)
    const ctxre = useContext(RefreshContext)

    const delete_profile = async () => {
        await axios.delete(`http://localhost:2000/user/${ctxau.profileId}`, 
            {
                headers: {
                    'Authorization': `Bearer ${ctxau.token}`
                }
            }
        )
        ctxre.Refresh()
    }

    
    return (
        <div className={styles.hh}>
            <div className={styles.header1}>
                <button onClick={ctxau.logout}>Logout</button>
                <button id='delete-profile' className='close-button' onClick={() => delete_profile()}>X</button>
            </div>
            <Menu />
        </div>
    )
}

export default Header;