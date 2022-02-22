import React from 'react';
import styles from './ProfileInfo.module.css'

function ProfileInfo() {



    return (
        <div className={styles.body}>
            <div className={styles.blockinfo}>ProfileInfo</div>
            <div className={styles.bgPicture}>
                <input className={styles.cover} />
                <img className={styles.image} src="tree-736885__480.jpg" alt="backgroundImage"></img>
                <input className={styles.browser} type="file" name="photo" />
            </div>
            <div className={styles.profile_container}>
                <div className={styles.pPicture}>
                    <input className={styles.cover2} />
                    <img className={styles.profile} src="etretat.jpg" alt="profileImage"></img>
                    <input className={styles.browser2} type="file" name="photo" />

                </div>
                <div className={styles.menu_container}>
                    <ul className={styles.menu}>
                        <li>Menu1TBD</li>
                        <li>Menu2TBD</li>
                        <li>Menu3TBD</li>
                        <li>Menu4TBD</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;