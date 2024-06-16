import React from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import {useAxios} from '../../hooks/AxiosInterceptor'
import '../../styles/post/NewPostForm.css'

const validationSchema = yup.object({
    text: yup.string(),
    image: yup.mixed().required('Image is required').test('fileFormat', 'Unsupported file format', (value) => {
        return value && value.length > 0 && ['image/jpeg', 'image/png'].includes(value[0].type)
    })
})


const NewPostForm = ({closeModal}) => {
    const axiosInstance = useAxios()

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = async (data) => {
        try {
            const formData = new FormData()
            formData.append('image', data.image[0])
            formData.append('text', data.text)

            await axiosInstance.post(`http://localhost:5000/posts`, formData)
            closeModal()
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="newPost--modal--bg">
            <form onSubmit={handleSubmit(onSubmit)} className='form--container'>
                <div>
                    <input
                        type='file'
                        className='file--label'
                        id='image'
                        accept='image/jpeg,image/png'
                        {...register('image', { required: 'Image is required' })}
                    />
                    {errors.image && <p>{errors.image.message}</p>}
                </div>
                <div>
                    <textarea
                    {...register('text')}
                        placeholder='Add your caption...'
                    />
                    {errors.text && <p>{errors.text.message}</p>}
                </div>
                <div id="modal--options">
                    <button className="cancel--post" type='button' onClick={closeModal}>Cancel</button>
                    <button className="submit--post" type="submit">Create Post</button>
                </div>
            </form>
        </div>
      )
}

export default NewPostForm