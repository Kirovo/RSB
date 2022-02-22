import React from 'react';
import Post from './Post/Post';
import styles from './MissionsQuicky.module.css'

function MissionsQuicky() {
    return (
        <div className={styles.body}>
            <div className={styles.blockinfo}>MissionsQuicky</div>
            <Post />
        </div>
    )
}

export default MissionsQuicky;