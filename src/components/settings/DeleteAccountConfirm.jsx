import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useState } from 'react'

import { useAuth } from '../../hooks/AuthProvider'
import { useAxios } from "../../hooks/AxiosInterceptor"
import '../../styles/settings/DeleteAccountConfirm.css'

const validationSchema = yup.object({
    password: yup.string().required('This field is required')
})

const DeleteAccountConfirm = ({closeModal}) => {
    const auth = useAuth()
    const axiosInstance = useAxios()
    const [errorMessage, setErrorMessage] = useState('')

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = async (data) => {
        try {
            setErrorMessage('')
            await axiosInstance.delete(`http://localhost:5000/register?password=${data.password}`)
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
                <h2>Careful! This action cannot be undone!</h2>
                <div className='delete--account--input--fields'>
                    <label htmlFor='delete--account--password--auth'>Enter your password</label>
                    <input
                        type='password'
                        id='delete--account--password--auth'
                        {...register('password')}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                {errorMessage !== '' && <h5 style={{color: "red", margin: "0"}}>{errorMessage}</h5>}
                <div className="modal--options">
                    <button className="cancel--post" type='button' onClick={closeModal}>Cancel</button>
                    <button className="submit--post" type="submit">Confirm</button>
                </div>
            </form>
        </div>
      )
}

export default DeleteAccountConfirm