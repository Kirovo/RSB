import React from 'react';
import LeftPartTBD from './LeftPartTBD/LeftPartTBD';
import Activities from './Activities/Activities';
import MissionsQuicky from './MissionsQuicky/MissionsQuicky';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import styles from './ProfileBody.module.css'

function ProfileBody(props) {
    return (
        <div className={styles.body}>
        <LeftPartTBD />
        <div className={styles.center}>
        <ProfileInfo />
        <Activities />
        </div>
        <MissionsQuicky />
        </div>
    )
}

export default ProfileBody;