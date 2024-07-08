import React from 'react';
import LeftPartTBD from './LeftPartTBD/LeftPartTBD';
import MissionsQuicky from './MissionsQuicky/MissionsQuicky';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Header from './Header/Header';
import './ProfileBody.css'
import Modal from './Modal/Modal'
import { useEffect, useContext, useState } from 'react';
import Post from './Post/Post';
import TokenContext from '../../contexts/tokenContext';
import ModalContext from '../../contexts/modalContext';
import RefreshContext from '../../contexts/refreshContext';
import { Index } from '../../api/activity';
import WorkInProgress from '../../common/WorkInProgress/WorkInProgress';



function ProfileBody(props) {


    const ctxto = useContext(TokenContext)
    const ctxre = useContext(RefreshContext)

    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [reactions , setReactions] = useState([])

    const [modal, setModal] = useState(undefined)




    const indexElements = async ()=>{
        const idx1 = await Index('post')
        const idx2 = await Index('comment')
        const idx3 = await Index('reaction')

        setPosts(idx1)
        setComments(idx2)
        setReactions(idx3)

    }
    



    useEffect(()=>{
        indexElements()
    }, [ctxre.refresh]);

    return (
        <ModalContext.Provider  value={{
            modal: modal,
            closeModal: ()=> {setModal(undefined)},
            createPostModal:()=> {setModal('createPost')}
            }}>
            <div className="view1">
            {modal ? (<Modal />) : (<></>)}
                <Header />

            <div className='body1'>
                <LeftPartTBD />
                <div className="center" id="scrollbar1">
                    <ProfileInfo />
                    <div className='cPost border-radius border-shadow'>
                        <div className='newpost-container'>
                            <button className='newpost-button' onClick={()=>{setModal('createPost')}} type="button">New Post</button>
                        </div>
                        <WorkInProgress />
                    </div>
                    {posts ? (
                            posts.map((post, index) => (
                                <Post key={index} token={ctxto.token} post={post} comments={comments} reactions={reactions}/>
                            ))
                    ):(
                        <>No posts</>
                        
                    )}
                </div>
                <MissionsQuicky />
            </div>
        </div>
        </ModalContext.Provider>
    )
}

export default ProfileBody;