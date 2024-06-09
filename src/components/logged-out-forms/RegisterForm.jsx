import {useForm} from 'react-hook-form'
import Input from './Input.jsx'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios'
import '../../styles/RegisterForm.css'

const validationSchema = yup.object({
    username:    yup.string().required('This field is required')
                            .max(30, 'Can\'t be more than 30 characters long'),
    firstName:   yup.string().required('This field is required')
                            .max(30, 'Can\'t be more than 30 characters long'),
    lastName:    yup.string().required('This field is required')
                            .max(30, 'Can\'t be more than 30 characters long'),
    email:       yup.string().required('This field is required')
                            .email('Invalid format, expected \'@\''),
    birthDate:   yup.date().nullable().required('This field is required'),

    password:    yup.string().required('This field is required')
                            .min(7, 'Password must be at least 7 characters long')
                            .max(15,'Password can\'t be more than 15 characters long'),
    passConfirm: yup.string().required('This field is required')
                            .min(7, 'Password must be at least 7 characters long')
                            .max(15,'Password can\'t be more than 15 characters long')                        
                            .oneOf([yup.ref('password'), null], 'Passwords must match')
}).required()

function RegisterForm() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues:{
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            birthDate: null,
            password: '',
            passConfirm: ''
        },
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = async data => { 
        try {
            const response = await axios.post('http://localhost:5000/register', {
                username:  data.username,
                password:  data.password,
                firstName: data.firstName,
                lastName:  data.lastName,
                email:     data.email,
                birthDate: data.birthDate
            })
            
            console.log(response)
        }
        catch (error) {
            console.log(error)
        }
    }
    
    return ( 
        <form className='register--form' onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="firstName" 
                inputContext="register"
                label="First Name"
                register={register}
                type="text"
                error={errors.firstName}
            />
            <Input
                name="lastName" 
                inputContext="register"
                label="Last Name"
                register={register}
                type="text"
                error={errors.lastName}
            />
            <Input
                name="email" 
                inputContext="register"
                label="Email"
                register={register}
                type="email"
                error={errors.email}
            />
            <Input
                name="birthDate" 
                inputContext="register"
                label="Birth Date"
                register={register}
                type="date"
                error={errors.birthDate}
            />
            <Input
                name="username" 
                inputContext="register"
                label="Username"
                register={register}
                type="text"
                error={errors.username}
            />
            <Input
                name="password" 
                inputContext="register"
                label="Password"
                register={register}
                type="password"
                error={errors.password}
            />
            <Input
                name="passConfirm" 
                inputContext="register"
                label="Confirm Password"
                register={register}
                type="password"
                error={errors.passConfirm}
            />
            <button className="submit--register" type="submit">Register</button>
        </form>
    )
}

export default RegisterForm