import React from 'react';
import styles from './Menu.module.css'

function Menu() {
    return (
        
            <div className = {styles.header}>
                <div>Home</div>
                <div>Missons</div>
                <div>Events</div>
                <div>Your Page</div>
            </div>

    )
}

export default Menu;