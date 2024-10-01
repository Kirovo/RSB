import React, { useEffect, useContext, useState, useCallback } from 'react';
//import { useParams } from 'react-router-dom';
import LeftPartTBD from './LeftPartTBD/LeftPartTBD';
import RightPartTBD from './RightPartTBD/RightPartTBD'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Header from './Header/Header';
import './ProfileBody.css'
import Modal from './Modal/Modal'
import Post from './Post/Post';
import ModalContext from '../../contexts/modalContext';
import RefreshContext from '../../contexts/refreshContext';
import { Show } from '../../api/activity';
import WorkInProgress from '../../common/WorkInProgress/WorkInProgress';
import { useParams } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
function ProfileBody() {
    // const { encodedUsername, encryptedId } = useParams(); // Get the parameters from the URL

    // Decode the username and decrypt the user ID
    // const username = decodeURIComponent(encodedUsername);
    // const userId = atob(encryptedId); // Base64 decoding for demonstration

    const { profileid } = useParams()
    console.log('useParams', profileid)

    const ctxau = useContext(AuthContext)
    const ctxre = useContext(RefreshContext)

    const [modal, setModal] = useState(undefined)
    const [error, setError] = useState(false)
    const [posts, setPosts] = useState([])
    const [profile, setProfile] = useState([])

    const indexElements = useCallback(async () => {
        try{
        console.log('token', ctxau.token)
        const profile = await Show('profile', profileid, ctxau.token);
        const post = profile[0].post;
        console.log('profile', profile)
        setPosts(post);
        setProfile(profile[0]);
        }
        catch(error){
            setError(true)
        }
    }, [ctxau.token, profileid]);

    useEffect(() => {
        indexElements();
    }, [indexElements,ctxre.refresh]);

    if (!error){
    return (
        <ModalContext.Provider value={{
            modal: modal,
            closeModal: () => { setModal(undefined) },
            createPostModal: () => { setModal('createPost') }
        }}>
            <div className="view1">
                {console.log('ProfileBody')}
                {modal ? (<Modal />) : (<></>)}
                <Header />

                <div className='body1'>
                    <LeftPartTBD />
                    <div className="center" id="scrollbar1">
                        <ProfileInfo profile={profile} /> {/* username={username} userId={userId} Pass the username and userId */}
                        <div className='cPost border-radius border-shadow'>
                            <div className='newpost-container'>
                                <button id='create-post' className='newpost-button' onClick={() => { setModal('createPost') }} type="button">New Post</button>
                            </div>
                            <WorkInProgress />
                        </div>
                        {posts ? (
                            posts.map((post, index) => (
                                <Post key={index} token={ctxau.token} post={post} comments={post.comment} reactions={post.reaction} />
                            ))
                        ) : (
                            <>No posts</>

                        )}
                    </div>
                    {console.log('profile', profile)}
                    <RightPartTBD profile={profile} />
                </div>
            </div>
        </ModalContext.Provider>    
    )}
    else {
        return <></>
    }
}

export default ProfileBody;