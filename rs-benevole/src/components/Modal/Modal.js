import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from './Modal.module.css'
import axios from 'axios';
import TokenContext from '../../contexts/tokenContext';
import ModalContext from '../../contexts/modalContext';
import RefreshContext from '../../contexts/refreshContext';

function Modal(){

    const ctxto = useContext(TokenContext)
    const ctxmo = useContext(ModalContext)
    const ctxre = useContext(RefreshContext)

    const [text, setText] = useState('')
    const [file, setFile] = useState()
    const inputRef = useRef()


    const givenFile = e => {
        setFile(e.target.files[0])
    }

    const cSend = async (e) => {
        e.preventDefault()

        const url = 'http://localhost:2000/post';

        const formData = new FormData();
            formData.append('file',file)
            formData.append('topic',text)

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': ctxto.token.data
            }
        }
        await axios.post(url,formData,config)
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
                        <div tabIndex='0' onKeyDown={onKeyDownHandler} id="myModal" className={styles.modalContainer}>
                        <div onClick={ctxmo.closeModal} className={styles.modal}></div>
                            <div className={styles.modalContent}>
                                <button onClick={ctxmo.closeModal} type="button">&times;</button>
                                <form onSubmit={cSend} action="http://localhost:2000/post" method="POST" encType="multipart/form-data">
                                    <div>
                                        <label>Your text</label>
                                        <input ref={inputRef}  name='topic' value={text} onChange={e=> setText(e.target.value)} />
                                        <label>Add a photo</label>
                                        <input type='file' name='file' id='custom-file' onChange={givenFile} />
                                    </div>
                                    <div>
                                        <button onClick={cSend}>Send</button>
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