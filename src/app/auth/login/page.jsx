"use client"
import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function LoginPage() {
  const [error, setError] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter()

  const onSubmit = handleSubmit( async data => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    } )
    if(res.error) {
      setError(res.error)
    } else{
      router.refresh()
      router.push('/')
    }
    
})

  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <form onSubmit={onSubmit} className='w-1/2 sm:w-1/4'>
        <h1 className='text-slate-200 font-bold text-3xl mb-4'>
          Incio de sesión
        </h1>
        {error && (
          <p className='bg-red-500 text-white p-2 rounded text-sm'>{error}</p>
        )}
        <label htmlFor='email' className='text-slate-300 mb-2 block text-sm' >Correo</label>
        <input type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Campo obligatorio"
            },

          })}
          className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
          placeholder='user@email.com'
        />
        {
          errors.Email && (
            <span
              className='text-red-500 text-sm'
            >{errors.Email.message}</span>
          )
        }
        <label htmlFor='password' className='text-slate-300 mb-2 block text-sm' >Contraseña</label>
        <input type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Campo obligatorio"
            },
          })}
          className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
          placeholder='********'
        />
        {
          errors.password && (
            <span
              className='text-red-500 text-sm'
            >{errors.password.message}</span>
          )
        }
        <button
          className='w-full bg-blue-500 text-white p-3 rounded-lg mt-2'>
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}

export default LoginPage