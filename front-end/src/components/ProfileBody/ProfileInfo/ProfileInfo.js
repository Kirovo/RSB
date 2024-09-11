import React from 'react';
import styles from './ProfileInfo.module.css'


function ProfileInfo() {



    return (
        <div className={styles.body}>
            <div className={styles.blockinfo}>ProfileInfo</div>
            <div className={styles.bgPicture}>
                <img className={styles.image} src="tree-736885__480.jpg" alt="backgroundImage"></img>
                <div className={styles.profile_container}>
                <div className={styles.fullname}>François Weryha</div>
                    <div className={styles.pPicture}>
                        <input className={styles.cover2} />
                        <img className={styles.profile} src="work-in-progress.jpg" alt="profileImage"></img>
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
        </div>
    )
}

export default ProfileInfo;