import React from 'react';
import styles from './Menu.module.css'

function Menu() {
    return (
        
            <ul className = {styles.header}>
                <li>Home</li>
                <li>Missons</li>
                <li>Events</li>
                <li>Your Page</li>
            </ul>

    )
}

export default Menu;