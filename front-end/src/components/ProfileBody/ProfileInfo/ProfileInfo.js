import React, { useContext } from 'react';
import styles from './ProfileInfo.module.css'
import AuthContext from '../../../contexts/authContext.js';
import axios from 'axios';

function ProfileInfo(props) {

    const ctxau = useContext(AuthContext)

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        e.preventDefault()

        if (file) {

            const formData = new FormData();
            formData.append('file', file)
            formData.append('id_profile', props.profile.id)

            await axios.put(`http://localhost:2000/attachment/profile`, formData,
                {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${ctxau.token}`
                    }
                }
            )
        }
    }

    const uploadBackgroundImage = async (e) => {
        e.preventDefault()
        const file = e.target.files[0];

        if (file) {

            const formData = new FormData();
            formData.append('file', file)
            formData.append('id_profile', props.profile.id)

            await axios.put(`http://localhost:2000/attachment/profile/background`, formData,
                {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${ctxau.token}`
                    }
                }
            )
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.blockinfo}>ProfileInfo</div>
            <div className={styles.bgPicture}>
            <input className={styles.browser3} type="file" name="background" onChange={uploadBackgroundImage} />
                {props.profile.id ?
                    <img className={styles.image} src={'http://localhost:2000/attachment/profile/background/' + props.profile.id} alt="backgroundImage"></img>
                    :
                    <div className={styles.image}></div>
                }
                <div className={styles.profile_container}>
                <div className={styles.fullname}>{props.profile.firstname} {props.profile.lastname}</div>
                    <div className={styles.pPicture}>
                        <input className={styles.cover2} />
                        {props.profile.id ?
                            <img className={styles.profile} src={'http://localhost:2000/attachment/profile/' + props.profile.id} alt="profileImage"></img>
                            :
                            <div className={styles.profile}></div>
                        }
                        <input className={styles.browser2} type="file" name="photo" onChange={uploadImage} />

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