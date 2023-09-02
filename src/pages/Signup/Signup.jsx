import './Signup.scss'
import { useState } from 'react'
import logo from '../../assets/logos/Foogle_logo.png'
import back from '../../assets/icons/back.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

export function Signup(){

    const [newAccount, setNewAccount] = useState(false)
    const [ loginData, setLoginData ] = useState({
        user: '',
        password: ''
    })

    const [ signupData, setSignupData ] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    function handleLoginChange(e){
        const { name, value } = e.target
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    function handleSignupChange(e){
        const { name, value } = e.target
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    function handleNewAccount(){
        setNewAccount(!newAccount)
    }

    function handleLogin(e){
        e.preventDefault()
        axios
            .post('http://localhost:2121/login', {
                username: loginData.user,
                email: loginData.user,
                password: loginData.password
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function handleSignup(e){
        e.preventDefault()
    }

    return (
        <main className='sign'>
            <Link to='/' className='sign__back-link'>
                <img src={back} alt="return arrow" className='sign__back' />
            </Link>
            <Link to='/' className='sign__back-link'>
                <img className='sign__logo' src={logo} alt="Foogle Logo" />
            </Link>
                {!newAccount ?
                <form className='sign__form' onSubmit={handleLogin}>
                    <h2 className='sign__form-title'>Login to your account</h2>
                    <input className='sign__input' type="text" name='user' value={loginData.user} onChange={handleLoginChange} placeholder="Email or Username" />
                    <input className='sign__input' type="password" name='password' value={loginData.password} onChange={handleLoginChange} placeholder="Password" />
                    <button className='sign__btn' type="submit">Login</button>
                </form>
                    :
                <form className='sign__form' onSubmit={handleSignup}>
                    <h2 className='sign__form-title'>Create a new account</h2>
                    <input className='sign__input' type="text" name='username' value={signupData.username} onChange={handleSignupChange} placeholder="Username" />
                    <input className='sign__input' type="text" name='email' value={signupData.email} onChange={handleSignupChange} placeholder="Email" />
                    <input className='sign__input' type="password" name='password' value={signupData.password} onChange={handleSignupChange} placeholder="Password" />
                    <input className='sign__input' type="password" name='confirmPassword' value={signupData.confirmPassword} onChange={handleSignupChange} placeholder="Confirm Password" />
                    <button className='sign__btn' type="submit">Create Account</button>
                </form>
                }
                {!newAccount ?
                <p>Don't have an account?<span className='sign__switch-form' onClick={handleNewAccount}> Sign up</span></p>
                :
                <p>Already have an account?<span className='sign__switch-form' onClick={handleNewAccount}> Login</span></p>
                }
        </main>
    )
}