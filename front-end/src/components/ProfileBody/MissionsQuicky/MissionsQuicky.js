import React from 'react';
import styles from './MissionsQuicky.module.css'
import WorkInProgress from '../../../common/WorkInProgress/WorkInProgress';

function MissionsQuicky() {
    return (
        <div className={styles.body}>

            <div className={styles.blockinfo}>MissionsQuicky</div>
            <WorkInProgress/>
        </div>
    )
}

export default MissionsQuicky;