import React, { useState } from 'react';
import styles from './Register.module.css'
function Register() {

    const [firstname, setFirstname]= useState('')
    const [lastname, setLastname]= useState('')  
    const [email, setEmail]= useState('')  
    const [mobile, setMobile]= useState('')  
    const [birthdate, setBirthdate]= useState('')  
    const [gendre, setGendre]= useState('')  
    const [address, setAddress]= useState('')  
    const [city, setCity]= useState('')  
    const [postalcode, setPostalcode]= useState('')  
    const [password, setPassword]= useState('')  
    
    const retrieve = (e) => {
        // e.preventDefault()
        console.log(firstname)
    }

    return (
        <div className={styles.hh}>
            <h3>Registration</h3>
            <form onSubmit={retrieve} action='http://localhost:2000/register' method='POST' encType="multipart/form-data">
                <label>Firstname</label>
                <input onChange={e=>setFirstname(e.target.value)} value={firstname} name='firstname'></input>
                <label>Lastname</label>
                <input onChange={e=>setLastname(e.target.value)} value={lastname} name='lastname'></input>
                <label>e-mail</label>
                <input onChange={e=>setEmail(e.target.value)} value={email} name='email'></input>
                <label>Mobile phone</label>
                <input onChange={e=>setMobile(e.target.value)} value={mobile} name='mobile'></input>
                <label>Birth date</label>
                <input onChange={e=>setBirthdate(e.target.value)} value={birthdate} name='birthdate'></input>
                <label>Gendre</label>
                <input onChange={e=>setGendre(e.target.value)} value={gendre} name='gendre'></input>
                <label>Address</label>
                <input onChange={e=>setAddress(e.target.value)} value={address} name='address'></input>
                <label>City</label>
                <input onChange={e=>setCity(e.target.value)} value={city} name='city'></input>
                <label>Postal Code</label>
                <input onChange={e=>setPostalcode(e.target.value)} value={postalcode} name='postalcode'></input>
                <label>Password</label>
                <input onChange={e=>setPassword(e.target.value)} value={password} name='password'></input>
                <label>Confirm Password</label>
                <input></input>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Register;