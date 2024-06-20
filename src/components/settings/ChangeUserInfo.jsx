import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useState } from 'react'

import { useAxios } from "../../hooks/AxiosInterceptor"
import { useAuth } from '../../hooks/AuthProvider'

import '../../styles/settings/ChangeUserInfo.css'

const validationSchema = yup.object({
    username:    yup.string().required('This field is required')
                    .max(30, 'Can\'t be more than 30 characters long'),
    firstName:   yup.string().required('This field is required')
                    .max(30, 'Can\'t be more than 30 characters long'),
    lastName:    yup.string().required('This field is required')
                    .max(30, 'Can\'t be more than 30 characters long'),
    email:       yup.string().required('This field is required')
                    .email('Invalid format, expected \'@\'')
})

const ChangeUserInfo = ({closeModal}) => {
    const axiosInstance = useAxios()
    const auth = useAuth()
    
    const [errorMessage, setErrorMessage] = useState('')

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            username: auth.user.username,
            firstName: auth.user.firstName,
            lastName: auth.user.lastName,
            email: auth.user.email,
        }
    })

    const onSubmit = async (data) => {
        try {
            setErrorMessage('')
            await axiosInstance.put(`http://localhost:5000/userInfo`, {
                updates: {
                    username:  data.username,
                    firstName: data.firstName,
                    lastName:  data.lastName,
                    email:     data.email
                }
            })
            closeModal()
            auth.logOut()
        }
        catch(error) {
            if (error.response.status === 400) {
                setErrorMessage(`*${error.response.data.message}`)
            }
            console.log(error)
        }
    }

    return (
        <div className="modal--bg">
            <form onSubmit={handleSubmit(onSubmit)} className='form--container'>
                <div className='changeUserInfo--input--fields'>
                    <label htmlFor='username--field'>Change Username</label>
                    <input
                        type='text'
                        id='username--field'
                        {...register('username')}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                    <label htmlFor='firstName--field'>Change First Name</label>
                    <input
                        type='text'
                        id='firstName--field'
                        {...register('firstName')}
                    />
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                    <label htmlFor='lastName--field'>Change Last Name</label>
                    <input
                        type='text'
                        id='lastName--field'
                        {...register('lastName')}
                    />
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                    <label htmlFor='email--field'>Change Email</label>
                    <input
                        type='email'
                        id='email--field'
                        {...register('email')}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                {errorMessage !== '' && <h5 style={{color: "red", margin: "0"}}>{errorMessage}</h5>}
                <div className="modal--options">
                    <button className="cancel--post" type='button' onClick={closeModal}>Cancel</button>
                    <button className="submit--post" type="submit">Save changes</button>
                </div>
            </form>
        </div>
      )
}

export default ChangeUserInfo