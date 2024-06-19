import React, { useContext, useState } from 'react';
import './Post.css'
import axios from 'axios'
import RefreshContext from '../../../contexts/refreshContext';

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
        <div className='border-radius border-shadow post' key={props.post.id}>
            <div className='sender-header'>
                <div className='sender-profile'></div>
                <button className='close-button' onClick={deletePost}>&#x2715;</button>
            </div>
            <h2 className='topic'>{props.post.topic}</h2>
            <img className='post' src={'http://localhost:2000/attachment/'+ props.post.id} alt={props.post.path}/>
            {/* To resetup on back-end & refactor to consider all doc types see ref i navigator favorites*/}
                <div className='reaction'>
                    <button id_post={props.post.id} onClick={reacting}>Like &#128077;</button>
                    <div className='reaction-number-box'>
                    {props.reactions ? (
                        (props.reactions.filter(reaction => reaction.id_post === props.post.id).length !== 0) ? (

                        
                            <label>&#128077; {props.reactions.filter(reaction => reaction.id_post === props.post.id).length}</label>
                        
                    ):(
                        <></>
                    )
                    ):(
                        <></>
                    )}

                    </div>
                </div>
            <div>


            <div >
                {props.comments ? (
                    (props.comments.filter(comment => comment.id_post === props.post.id).length !== 0)  ? (
                    
                        <div>
                            {props.comments.filter(comment => comment.id_post === props.post.id).map(comment => (
                                <div className='comments' key={comment.id}>
                                    <div>{comment.content}</div>
                                    <button className='close-button' id_post={comment.id_post} id_comment={comment.id} onClick={deleteCom} type="button">&#x2715;</button>
                                </div>
                            ))}                      
                        </div>
                    ):(
                        <></>
                        )
                ):(<></>)
                }
                    
            </div>
            <form className='create-comment' id_post={props.post.id} onSubmit={commenting}>
                <input value={comment} onChange={e => setComment(e.target.value)} placeholder='Comment'></input>
                <button>Send</button>
            </form>
            </div>
        </div>
    )
}

export default Post;