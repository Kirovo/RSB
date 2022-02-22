import React, { useState } from 'react';

function Comment(props) {

    const [comment, setComment] = useState()

    const commentFilter = () => {
        console.log(comment)
        const newcomment = props.comment.filter(comment => comment.id_post === props.id_post)
        setComment(newcomment) // create a new array for the post designated by the id

        if (comment !== [])
            {
                return (
                    <div>
                        {comment.map(comment => 
                            <div key={comment.id}>{comment.content}</div>)}
                    </div>
            )
        }

        else{
            return(<div>Be the first to give a comment on this post !</div>)
        }
    }

    return (
        <>
            {commentFilter}
        </>
    )

}

export default Comment;