import React, { useState, useRef, useEffect, useContext } from 'react';
import './Modal.css'
import axios from 'axios';
import AuthContext from '../../../contexts/authContext';
import ModalContext from '../../../contexts/modalContext';
import RefreshContext from '../../../contexts/refreshContext';

function Modal(){

    const ctxau = useContext(AuthContext)
    const ctxmo = useContext(ModalContext)
    const ctxre = useContext(RefreshContext)

    const [topic, setTopic] = useState('')
    const [file, setFile] = useState(undefined)
    const inputRef = useRef()


    const givenFile = e => {
        setFile(e.target.files[0])
    }

    const cSend = async (e) => {
        e.preventDefault()

        const newPost = await axios.post('http://localhost:2000/post',
            {
                topic :topic
            },            
            {   
                headers: {
                    'Authorization': `Bearer ${ctxau.token}`
                }
            }
        )

        if (file) {

            const formData = new FormData();
            formData.append('file',file)
            formData.append('id_post', newPost.data.id )

            await axios.post('http://localhost:2000/attachment/post', formData,            
                {   
                    headers: {
                        'Content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${ctxau.token}`
                    }
                }
            )
        }

        ctxmo.closeModal()
        ctxre.Refresh()
    }

    const onKeyDownHandler = (e) => {
        if(e.key === 'Escape'){
            ctxmo.closeModal()
        }
        else if (e.key === 'Enter'){
            cSend(e)
        }

    }
    useEffect(()=>{
        inputRef.current.focus()
    },[])

    const renderSwitch = (params) =>{
        switch (params){
            case 'createPost':

                return(
                        <div tabIndex='0' onKeyDown={onKeyDownHandler} className='modalContainer' >
                        <div onClick={ctxmo.closeModal} className="modal1"></div>
                            <div className="modalContent">
                                <div className='sender-header'>
                                    <div className='sender-profile'></div>
                                    <button onClick={ctxmo.closeModal} className='close-button' type="button">&#x2715;</button>
                                </div>
                                <form onSubmit={cSend}>
                                    <div>
                                        <label>Your topic</label>
                                        <input ref={inputRef} id='topic'  name='topic' value={topic} onChange={e=> setTopic(e.target.value)} />
                                        <label>Add a photo</label>
                                        <input type='file' name='file' id='custom-file' onChange={givenFile} />
                                    </div>
                                    <div>
                                        <button id='send' onClick={cSend}>Send</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                )
            default:
                return(
                    <>
                    </>
                )
            }
        }


            return (
                <>  
                {renderSwitch(ctxmo.modal)}        
                </>         
            )
}

export default Modal;