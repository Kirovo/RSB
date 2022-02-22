import React, { useEffect, useContext, useState } from 'react';
import Post from './Post/Post';
import styles from './Activities.module.css'
import TokenContext from '../../../contexts/tokenContext';
import ModalContext from '../../../contexts/modalContext';
import RefreshContext from '../../../contexts/refreshContext';
import { Index, Delete } from '../../../api/activity';

function Activities() {

    const ctxto = useContext(TokenContext)
    const ctxmo = useContext(ModalContext)
    const ctxre = useContext(RefreshContext)

    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [reactions , setReactions] = useState([])





    const indexElements = async ()=>{
        const idx1 = await Index('posts')
        const idx2 = await Index('comments')
        const idx3 = await Index('reactions')

        setPosts(idx1)
        setComments(idx2)
        setReactions(idx3)

    }
    
    const deletePost = async (id) => {
        await Delete(id)
        ctxre.Refresh(true)

    }


    useEffect(()=>{
        indexElements()
    }, [ctxre.refresh]);


    return (
        <div className={styles.body}>
            <div className={styles.blockinfo}>Activities</div>
            <div className={styles.cPost}>
                <button onClick={ctxmo.createPostModal} type="button">New Post</button>
            </div>
            <div className={styles.contentContainer}>
                {posts ? (
                    <div className={styles.content}>    
                        {posts.map((post, index) => (
                            <Post key={index} token={ctxto.token} post={post} comments={comments} deletePost={()=>deletePost(post.id)} reactions={reactions}/>
                            ))}
                    </div>
                ):(
                    <div>No posts</div>
                    
                )}
            </div>

        </div>
    )
}

export default Activities;