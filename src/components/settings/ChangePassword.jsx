import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import { useAxios } from "../../hooks/AxiosInterceptor"
import { useAuth } from '../../hooks/AuthProvider'
import '../../styles/settings/ChangePassword.css'

const validationSchema = yup.object({
    oldPassword:    yup.string().required('This field is required'),
    newPassword:    yup.string().required('This field is required')
                            .min(7, 'Password must be at least 7 characters long')
                            .max(15,'Password can\'t be more than 15 characters long'),
    newPassConfirm: yup.string().required('This field is required')
                            .min(7, 'Password must be at least 7 characters long')
                            .max(15,'Password can\'t be more than 15 characters long')                        
                            .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    
})

const ChangePassword = ({closeModal}) => {
    const auth = useAuth()
    const axiosInstance = useAxios()

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = async (data) => {
        try {
            await axiosInstance.put(`http://localhost:5000/userInfo/password`, {
                oldPassword:    data.oldPassword,
                newPassword:    data.newPassword
            })
            closeModal()
            auth.logOut()
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="modal--bg">
            <form onSubmit={handleSubmit(onSubmit)} className='form--container'>
                <div className='changePass--input--fields'>
                    <label htmlFor='oldPassword--field'>Current Password</label>
                    <input
                        type='password'
                        id='oldPassword--field'
                        {...register('oldPassword')}
                    />
                    {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
                    <label htmlFor='newPassword--field'>New Password</label>
                    <input
                        type='password'
                        id='newPassword--field'
                        {...register('newPassword')}
                    />
                    {errors.newPassword && <p>{errors.newPassword.message}</p>}
                    <label htmlFor='newPassConfirm--field'>Confirm New Password</label>
                    <input
                        type='password'
                        id='newPassConfirm--field'
                        {...register('newPassConfirm')}
                    />
                    {errors.newPassConfirm && <p>{errors.newPassConfirm.message}</p>}
                </div>
                <div className="modal--options">
                    <button className="cancel--post" type='button' onClick={closeModal}>Cancel</button>
                    <button className="submit--post" type="submit">Save changes</button>
                </div>
            </form>
        </div>
      )
}

export default ChangePassword