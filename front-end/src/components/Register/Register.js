import React, { useState } from 'react';
import './Register.css'


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
        <div className="heh">
            <img className="background blur" src='shutterstock_1155881311_FEAT.jpg' alt='login background'></img>
            <h3>Registration</h3>
            <form onSubmit={retrieve} action='http://localhost:2000/register' method='POST' encType="multipart/form-data">
                <label>Firstname</label>
                <input onChange={e=>setFirstname(e.target.value)} value={firstname} name='firstname' placeholder='Firstname'></input>
                <label>Lastname</label>
                <input onChange={e=>setLastname(e.target.value)} value={lastname} name='lastname' placeholder='Lastname'></input>
                <label>E-mail</label>
                <input onChange={e=>setEmail(e.target.value)} value={email} name='email' placeholder='E-mail'></input>
                <label>Mobile phone</label>
                <input onChange={e=>setMobile(e.target.value)} value={mobile} name='mobile' placeholder='Mobile phone'></input>
                <label>Birth date</label>
                <input onChange={e=>setBirthdate(e.target.value)} value={birthdate} name='birthdate' placeholder='Birth date'></input>
                <label>Gendre</label>
                <input onChange={e=>setGendre(e.target.value)} value={gendre} name='gendre' placeholder='Gendre'></input>
                <label>Address</label>
                <input onChange={e=>setAddress(e.target.value)} value={address} name='address' placeholder='Address'></input>
                <label>City</label>
                <input onChange={e=>setCity(e.target.value)} value={city} name='city' placeholder='City'></input>
                <label>Postal Code</label>
                <input onChange={e=>setPostalcode(e.target.value)} value={postalcode} name='postalcode' placeholder='Postal Code'></input>
                <label>Password</label>
                <input onChange={e=>setPassword(e.target.value)} value={password} name='password' placeholder='Password'></input>
                <label>Confirm Password</label>
                <input placeholder='Confirm Password' ></input>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Register;