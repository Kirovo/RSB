import React from 'react';
import styles from './Menu.module.css'

function Menu() {
    return (
        <div>
            <ul className = {styles.header}>
                <li>Home</li>
                <li>Missons</li>
                <li>Events</li>
                <li>Your Page</li>
            </ul>
        </div>
    )
}

export default Menu;