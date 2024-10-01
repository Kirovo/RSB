import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../../contexts/authContext';
import styles from './RightPartTBD.module.css'
import axios from '../../../axios';
import { useNavigate } from 'react-router-dom'; // Add this import
import RefreshContext from '../../../contexts/refreshContext';

function MissionsQuicky(props) {
    const ctxau = useContext(AuthContext)
    const ctxre = useContext(RefreshContext)

    const [friendsList, setFriendsList] = useState([])
    const [friendsRequest, setFriendsRequest] = useState([])
    const [pendingRequest, setPendingRequest] = useState([])
    const [suggestedProfiles, setSuggestedProfiles] = useState([])
    const navigate = useNavigate(); // Add this line



    const getFriendsRequestProfileList = async () => {
        try {
            const response = await axios.get(`/friends/request/${props.profile.id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${ctxau.token}`
                    }
                }
            )
            console.log('response', response)
            setFriendsRequest(response.data)

        }
        catch (error) {
            console.error('Login error:', error);
        }
    }

    const getPendingRequestProfileList = async () => {
        try {
            const response = await axios.get(`/friends/pending/${props.profile.id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${ctxau.token}`
                    }
                }
            )
            console.log('response', response)
            setPendingRequest(response.data)

        }
        catch (error) {
            console.error('Login error:', error);
        }
    }

    const getFriendsProfileList = async () => {
        try {
            const response = await axios.get(`/friends/${props.profile.id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${ctxau.token}`
                    }
                }
            )
            console.log('response', response)
            setFriendsList(response.data)

        }
        catch (error) {
            console.error('Login error:', error);
        }
    }

    const getSuggestedProfileList = async () => {
        try {
            const response = await axios.get(`friends/suggested/${props.profile.id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${ctxau.token}`
                    }
                }
            )
            console.log('response', response)
            setSuggestedProfiles(response.data)

        }
        catch (error) {
            console.error('Login error:', error);
        }
    }

    useEffect(() => {
        if (props.profile.id) {
            getFriendsRequestProfileList();
            getPendingRequestProfileList();
            getFriendsProfileList();
            getSuggestedProfileList();
        }
    }, [props.profile.id, ctxre.refresh]);


    const handleProfileClick = (friendId) => {
        navigate(`/${friendId}`); // Adjust the route as needed
    };

    const handleAddFriend = async (profileId, friendId) => {
        try {
            const response = await axios.post('/friend', { id_profile: profileId, id_friend: friendId, status: 'request' }, {
                headers: {
                    'Authorization': `Bearer ${ctxau.token}`
                }
            });
            console.log('Friend added:', response.data.id_friend);
            ctxre.Refresh()
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    const handleFriendAccept = async (profileId, friendId) => {
        try {
            const response = await axios.put(`/friend/accept/${friendId}/${profileId}`, {
                headers: {
                    'Authorization': `Bearer ${ctxau.token}`
                }
            });
            console.log('Friend added:', response.data.id_friend);
            ctxre.Refresh()
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    const handleRemoveFriend = async (profileId, friendId) => {
        try {
            await axios.delete(`/friend/${profileId}/${friendId}`, {
                headers: {
                    'Authorization': `Bearer ${ctxau.token}`
                }
            });
            ctxre.Refresh()
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.blockinfo}>MissionsQuicky</div>
            <div className='in-progress-body'>
                <div className='in-progress-container'>
                    {friendsRequest ? (
                        friendsRequest.map((friend, index) => (
                            <div
                                key={index}
                                className={styles.profileItem}>
                                <span onClick={() => handleProfileClick(friend.id)} style={{ cursor: 'pointer' }}>{friend.firstname} {friend.lastname}</span>
                                <button onClick={() => handleFriendAccept(props.profile.id, friend.id)} className={styles.addButton}>Accept</button>
                                <button onClick={() => handleRemoveFriend(props.profile.id, friend.id)} className={styles.removeButton}>Refuse</button>

                            </div>
                        ))
                    ) : (
                        <div>No friends</div>
                    )}
                </div>
                <div className='in-progress-container'>
                    {friendsList ? (
                        friendsList.map((friend, index) => (
                            <div
                                key={index}
                                className={styles.profileItem}>
                                <span onClick={() => handleProfileClick(friend.id)} style={{ cursor: 'pointer' }}>{friend.firstname} {friend.lastname}</span>
                                <button onClick={() => handleRemoveFriend(props.profile.id, friend.id)} className={styles.removeButton}>Remove</button>
                            </div>
                        ))
                    ) : (
                        <div>No friends</div>
                    )}
                </div>
                <div className='in-progress-container'>
                    {pendingRequest ? (
                        pendingRequest.map((friend, index) => (
                            <div
                                key={index}
                                className={styles.profileItem}>
                                <span onClick={() => handleProfileClick(friend.id)} style={{ cursor: 'pointer' }}>{friend.firstname} {friend.lastname}</span>
                                <button onClick={() => handleRemoveFriend(props.profile.id, friend.id)} className={styles.cancelButton}>Cancel Friend Request</button>

                            </div>
                        ))
                    ) : (
                        <div>No friends</div>
                    )}
                </div>
                <div className='in-progress-container'>
                    {suggestedProfiles ? (
                        suggestedProfiles.map((friend, index) => (
                            <div
                                key={index}
                                className={styles.profileItem}>
                                <span onClick={() => handleProfileClick(friend.id)} style={{ cursor: 'pointer' }}>{friend.firstname} {friend.lastname}</span>
                                <button onClick={() => handleAddFriend(props.profile.id, friend.id)} className={styles.addButton}>Add</button>
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