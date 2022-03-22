import React from 'react';
import LeftPartTBD from './LeftPartTBD/LeftPartTBD';
import Activities from './Activities/Activities';
import MissionsQuicky from './MissionsQuicky/MissionsQuicky';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Header from './Header/Header';
import './ProfileBody.css'
import Modal from './Modal/Modal'
import { useState } from 'react';

import ModalContext from '../../contexts/modalContext';

function ProfileBody(props) {

    const [modal, setModal] = useState(undefined)
    return (
        <div className="view">
        <ModalContext.Provider  value={{
                modal: modal,
                closeModal: ()=> {setModal(undefined)},
                createPostModal:()=> {setModal('createPost')}
            }}>
            {modal ? (<Modal />) : (<></>)}
            <div className='header1'>
            <Header />
            </div>

            <div className='body1'>
                <LeftPartTBD />
                <div className="center">
                    <ProfileInfo />
                    <Activities />
                </div>
                <MissionsQuicky />
            </div>
        </ModalContext.Provider>
        </div>
    )
}

export default ProfileBody;