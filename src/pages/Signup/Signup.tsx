import './Signup.scss'
import logo from '../../assets/logos/Foogle_logo.png'
import back from '../../assets/icons/back.svg'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
declare const google: any;

interface ResponseData {
    clientId: string
    client_id: string
    credential: string
    select_by: string
}

export function Signup(){

    const navigate = useNavigate()

    const [newAccount, setNewAccount] = useState(false)
    const [ loginData, setLoginData ] = useState({
        email: '',
        password: ''
    })

    const [ signupData, setSignupData ] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [notification, setNotification] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState('')
    const [emailAlert, setEmailAlert] = useState(false)
    const [passwordAlert, setPasswordAlert] = useState(false)

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: '86418490564-bfs8k5fhkt99ee2bcj9q2cq7h7tv3adf.apps.googleusercontent.com',
            callback: handleCredentialResponse
        })

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            {theme: 'outline', size: 'large', text: 'continue_with', shape: 'circle'}
        )

        if(sessionStorage.getItem('token') === 'notVerified'){
            setNotification(true)
            setNotificationMessage('Thank you for verifying your email, please login')
        }
    }, [])

    async function handleCredentialResponse(response: ResponseData){
        const res = await axios.post(`${url}/login/token`, {
            token: response.credential
        })
        sessionStorage.setItem('token', res.data.token)
        navigate('/')
    }

    function handleNewAccount(){
        setNewAccount(!newAccount)
        setAlert(false)
        setAlertMessage('')
        setEmailAlert(false)
        setPasswordAlert(false)
    }

    function handleLoginChange(e: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    function handleSignupChange(e: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    const url = import.meta.env.VITE_API_URL

    async function handleLogin(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        try {
            const res = await axios.post(`${url}/login`, loginData)
            sessionStorage.setItem('token', res.data.token)
            navigate('/')
        }catch(err:any){
                setAlert(true)
                setAlertMessage(err.response.data)                
            }
    }

    async function handleSignup(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        if (!emailValidation()){
            setAlert(true)
            setEmailAlert(true)
            setAlertMessage('Please enter a valid email')
            return
        }else setEmailAlert(false)
        if (!passwordMatch()){
            setAlert(true)
            setPasswordAlert(true)
            setAlertMessage('Passwords do not match')
            return
        }else setPasswordAlert(false)
        try {
            const res = await axios.post(`${url}/signup`, {
                email: signupData.email,
                password: signupData.password
            })
            sessionStorage.setItem('token', res.data.token)
            setAlert(false)
            setNotification(true)
            setNotificationMessage('Verification email has been sent, please check your email')
            sessionStorage.setItem('token', 'notVerified')
        }catch(err:any){
            setAlert(true)
            setAlertMessage(err.response.data)
        }
    }

    function passwordMatch(){
        if(signupData.password === signupData.confirmPassword){
            return true
        } else {
            return false
        }
    }

    function emailValidation(){
        if (signupData.email.includes('@') && signupData.email.includes('.')){
            return true
        } else {
            return false
        }
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
                    <input className='sign__input' type="text" name='email' value={loginData.email} onChange={handleLoginChange} placeholder="johndoe@gmail.com" />
                    <input className='sign__input' type="password" name='password' value={loginData.password} onChange={handleLoginChange} placeholder="Password" />
                    <button className='sign__btn' type="submit">Login</button>
                </form>
                    :
                <form className='sign__form' onSubmit={handleSignup}>
                    <h2 className='sign__form-title'>Create a new account</h2>
                    <input className={`sign__input ${emailAlert ? 'sign__input-alert' : ''}`} type="text" name='email' value={signupData.email} onChange={handleSignupChange} placeholder="Email" />
                    <input className={`sign__input ${passwordAlert ? 'sign__input-alert' : ''}`} type="password" name='password' value={signupData.password} onChange={handleSignupChange} placeholder="Password" />
                    <input className={`sign__input ${passwordAlert ? 'sign__input-alert' : ''}`} type="password" name='confirmPassword' value={signupData.confirmPassword} onChange={handleSignupChange} placeholder="Confirm Password" />
                    <button className='sign__btn' type="submit">Create Account</button>
                </form>
                }
                {!newAccount ?
                <p>Don't have an account?<span className='sign__switch-form' onClick={handleNewAccount}> Sign up</span></p>
                :
                <p>Already have an account?<span className='sign__switch-form' onClick={handleNewAccount}> Login</span></p>
                }
                <div id='signInDiv'></div>
                {alert &&
                <p className='sign__alert'>{alertMessage}</p>
                }
                {notification &&
                <p className='sign__notification'>{notificationMessage}</p>
                }
        </main>
    )
}