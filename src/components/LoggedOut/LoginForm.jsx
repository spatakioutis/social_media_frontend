import {useForm} from 'react-hook-form'
import React, { useContext } from 'react';
import { TokenContext } from '../../contexts/TokenContext.jsx';
import Input from './Input.jsx'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios'
import '../../styles/LoginForm.css'


const validationSchema = yup.object({
    username: yup.string().required('This field is required'),
    password: yup.string().required('This field is required')
}).required()

function LoginForm() {

    const {updateToken} = useContext(TokenContext)

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues:{
            username: '',
            password: ''
        },
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = async (data) => { 
        try { 
            const response = await axios.post('http://localhost:5000/login', {
                username: data.username,
                password: data.password
            })
            
            if (response.status === 200) {
                updateToken(response.data.token)
            }
            else {
                console.log(response.message)
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    
    return ( 
        <form className='login--form' onSubmit={handleSubmit(onSubmit)}>
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
            <button className="submit--login" type="submit">Log In</button>
        </form>
    )
}

export default LoginForm