import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import '../../styles/comments/CommentForm.css'
import { useAxios } from '../../hooks/AxiosInterceptor'

const validationSchema = yup.object({
    newComment: yup.string().required().max(300)
})

const CommentForm = (props) => {

    const axiosInstance = useAxios()

    const {register, handleSubmit, reset} = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            newComment: ''
        }
    })

    const commentSubmit = async (data) => { 
        try {
            await axiosInstance.post('http://localhost:5000/comments', {
                postID: props.postID,
                text: data.newComment
            })
            props.refreshTrigger(prev => !prev)
            reset()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <form className="comment--form" onSubmit={handleSubmit(commentSubmit)}> 
            <textarea  
                    cols="30" 
                    rows="1"
                    placeholder="Add a caption..."
                    {...register('newComment')}
            ></textarea>
            <button 
                   className="submit--comment" 
                   type="submit"
            >
                Add
            </button>
        </form>
    )
}

export default CommentForm