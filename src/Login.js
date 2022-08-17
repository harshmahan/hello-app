import React from 'react'
import { Button } from '@mui/material'
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

const Login = () => {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error) => alert.log(error)); 
    };
  return (
    <div className='login bg-[#f8f8f8] h-[100vh] w-[100vw] grid place-content-center'>
        <div className="login__container p-[100px] text-center bg-white rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px]">
            <img className='object-contain mx-auto h-[100px] mb-[40px]' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/640px-WhatsApp.svg.png" alt="" />
            <div className="login__text">
                <h1 className='font-bold text-2xl'>Sign in to HelloApp</h1>
            </div>

            <Button className='mt-[50px] capitalize bg-[#0a8d48] text-white' type="submit" onClick={signIn}>Sign In With Google</Button>
        </div>
    </div>
  )
}

export default Login