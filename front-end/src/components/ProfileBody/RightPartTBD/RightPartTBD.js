import React, {useEffect, useState, useContext} from 'react';
import TokenContext from '../../../contexts/tokenContext';
import styles from './RightPartTBD.module.css'
import axios from '../../../axios';
import { useNavigate } from 'react-router-dom'; // Add this import

function MissionsQuicky(props) {
    const ctxto = useContext(TokenContext)
    const [friends, setFriends] = useState([])
    const navigate = useNavigate(); // Add this line

    const getProfileList = async () => {
        try {
            const response = await axios.get('/profiles',
                {
                    headers: {
                        'Authorization': `Bearer ${ctxto.token}`
                    }
                }
            )
            console.log('response', response)
            setFriends(response.data)
            
        }
        catch (error){
            console.error('Login error:', error);
        }
    }

    useEffect(() => {
        getProfileList();
    },[]);

    const handleProfileClick = (friendId) => {
        navigate(`/${friendId}`); // Adjust the route as needed
    };

    return (
        <div className={styles.body}>
            <div className={styles.blockinfo}>MissionsQuicky</div>
            <div className='in-progress-body'>
            <div className='in-progress-container'>
            {friends ? (
                friends.map((friend, index) => (
                    <div 
                        key={index} 
                        className={styles.profileItem}
                        style={{ cursor: 'pointer' }}>
                         <span onClick={() => handleProfileClick(friend.id)}>{friend.firstname} {friend.lastname}</span>
                         {props.profile.friend && props.profile.friend.length > 0 && !props.profile.friend.some(f => f.id_friend === friend.id) && (
                             <button className={styles.addButton}>Add</button>
                         )} 
                    </div>
                ))
            ) : (
                <div>No friends</div>
            )}
            </div>
            </div>
        </div>
    )
}

export default MissionsQuicky;