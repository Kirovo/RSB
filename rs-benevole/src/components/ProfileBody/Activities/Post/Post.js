import React, { useContext, useState } from 'react';
import styles from './Post.module.css'
import axios from 'axios'
import RefreshContext from '../../../../contexts/refreshContext';

function Post(props) {

    const [comment, setComment] = useState('');
    const ctxre = useContext(RefreshContext)

    const reacting = async (e) =>{
        e.preventDefault();

        const id_post = e.target.getAttribute('id_post')
        console.log(id_post)
        await axios.post(`http://localhost:2000/reaction`,
        {
            id_post:id_post
        },{
            headers: {
                'Authorization': props.token.data
            }
        })


        ctxre.Refresh()
    } 

    const commenting = async (e) => {

        e.preventDefault();
        const id_post = e.target.getAttribute('id_post')

        await axios.post('http://localhost:2000/comment', {
            id_post:id_post,
            content: comment
        },{
            headers: {
                'Authorization': props.token.data
            }
        })
        setComment('')
        ctxre.Refresh()
    }

    const deleteCom = async (e)=> {
        const id_post = e.target.getAttribute('id_post')
        const id_comment = e.target.getAttribute('id_comment')

        await axios.delete(`http://localhost:2000/comment?id_post=${id_post}&id_comment=${id_comment}`, {
        },{
            headers: {
                'Authorization': props.token.data
            }
        })
        ctxre.Refresh()

    }

    const deletePost = async (e) => {
        props.deletePost(e.currentTarget.key)
        
    }



    return (
        <div key={props.post.id}>
            <button onClick={deletePost} type="button">&times;</button>
            <p>{props.post.topic}</p>
            <img className={styles.postImage} src={'http://localhost:2000/attachment/'+ props.post.id} alt={props.post.path}/>
            {/* To resetup on back-end & refactor to consider all doc types see ref i navigator favorites*/}
            <div>
                <form id_post={props.post.id} onSubmit={commenting}>
                    <label>Comment</label>
                    <input value={comment} onChange={e => setComment(e.target.value)}></input>
                    <button>Send</button>
                </form>
                <div>
                    <button id_post={props.post.id} onClick={reacting}>ReactionTBD</button>
                    {(props.reactions) ? (
                        <label>{props.reactions.filter(reaction => reaction.id_post === props.post.id).length}</label>
                    ):(
                        <></>
                    )}
                    
                </div>
                <div>
                    {(props.comments) ? (
                        (props.comments.filter(comment => comment.id_post === props.post.id).length !== 0)  ? (
                        
                            <div>
                                {props.comments.filter(comment => comment.id_post === props.post.id).map(comment => (
                                    <div key={comment.id}>
                                        <button id_post={comment.id_post} id_comment={comment.id} onClick={deleteCom} type="button">&times;</button>
                                        <div>{comment.content}</div>
                                    </div>
                                ))}                      
                            </div>
                        ):(
                            <div>Be the first to give a comment on this post !</div>
                            )
        	        ):(<div>Be the first to give a comment on this post !</div>)
                    }
                     
                </div>
            </div>
        </div>
    )
}

export default Post;