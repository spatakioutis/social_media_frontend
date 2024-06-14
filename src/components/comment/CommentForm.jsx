import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import '../../styles/CommentForm.css'

const validationSchema = yup.object({
    newComment: yup.string().required().max(300),
})

function CommentForm() {

    const {register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            newComment: ''
        }
    })

    const onSubmit = data => { 
        console.log(data)
    }

    return (
        <form className="comment--form" onSubmit={handleSubmit(onSubmit)}> 
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