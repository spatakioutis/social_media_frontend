import {useForm} from 'react-hook-form'
import React , { useState } from 'react'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import { useAuth } from '../../hooks/AuthProvider.jsx'
import Input from './Input.jsx'
import '../../styles/LoginForm.css'

const validationSchema = yup.object({
    username: yup.string().required('This field is required'),
    password: yup.string().required('This field is required')
}).required()

const LoginForm = () => {

    const auth = useAuth()
    const [errorText, setErrorText] = useState('')

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues:{
            username: '',
            password: ''
        },
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = async (data) => { 
        try { 
            await auth.logIn(data)
        }
        catch (error) {
            console.log(error)
            setErrorText(error.response.data.message)
           
        }
    }
    
    return ( 
        <>
            <form 
                className='login--form' 
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    name="username" 
                    inputContext="login"
                    label="Username"
                    register={register}
                    type="text"
                    error={errors.username}
                />
                <Input 
                    name="password"
                    inputContext="login"
                    label="Password"
                    register={register}
                    type="password"
                    error={errors.password}
                />
                <button 
                    className="submit--login" 
                    type="submit"
                >
                    Log In
                </button>
            </form>
            {errorText !== '' && 
                <h5 style={{color: 'red'}}>{errorText}</h5>
            }
        </>
    )
}

export default LoginForm