import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import { useAxios } from "../../hooks/AxiosInterceptor"

const validationSchema = yup.object({
    image: yup.mixed().required('Image is required').test('fileFormat', 'Unsupported file format', (value) => {
        return value && value.length > 0 && ['image/jpeg', 'image/png'].includes(value[0].type)
    })
})

const ChangeProfilePic = ({closeModal}) => {
    const axiosInstance = useAxios()

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = async (data) => {
        try {
            const formData = new FormData()
            formData.append('profilePic', data.image[0])

            await axiosInstance.put(`http://localhost:5000/profilePic`, formData)
            closeModal()
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="change--profilePic--modal--bg">
            <form onSubmit={handleSubmit(onSubmit)} className='form--container'>
                <div className='input--fields'>
                    <label>Choose a new profile picture</label>
                    <input
                        type='file'
                        className='file--label'
                        id='image'
                        accept='image/jpeg,image/png'
                        {...register('image')}
                    />
                    {errors.image && <p>{errors.image.message}</p>}
                </div>
                <div className="modal--options">
                    <button className="cancel--post" type='button' onClick={closeModal}>Cancel</button>
                    <button className="submit--post" type="submit">Save change</button>
                </div>
            </form>
        </div>
      )
}

export default ChangeProfilePic