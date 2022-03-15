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
        <div className={styles.post} key={props.post.id}>
            <div className='sender-header'>
                <div className='sender-profile'></div>
                <button className='close-button' onClick={deletePost}>&#x2715;</button>
            </div>
            <p>{props.post.topic}</p>
            <img className='post' src={'http://localhost:2000/attachment/'+ props.post.id} alt={props.post.path}/>
            {/* To resetup on back-end & refactor to consider all doc types see ref i navigator favorites*/}
                <div>
                    <button id_post={props.post.id} onClick={reacting}>ReactionTBD</button>
                    {(props.reactions) ? (
                        <label>{props.reactions.filter(reaction => reaction.id_post === props.post.id).length}</label>
                    ):(
                        <></>
                    )}
                </div>
            <div>


                <div>
                    {(props.comments) ? (
                        (props.comments.filter(comment => comment.id_post === props.post.id).length !== 0)  ? (
                        
                            <div>
                                {props.comments.filter(comment => comment.id_post === props.post.id).map(comment => (
                                    <div key={comment.id}>
                                        <div className='sender-header'>
                                            <div className='sender-profile'></div>
                                            <button className='close-button' id_post={comment.id_post} id_comment={comment.id} onClick={deleteCom} type="button">&#x2715;</button>
                                        </div>
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
                <form id_post={props.post.id} onSubmit={commenting}>
                    <label>Comment</label>
                    <input value={comment} onChange={e => setComment(e.target.value)}></input>
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Post;