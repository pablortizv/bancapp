"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';

function RegisterPage() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const router = useRouter();
    const onSubmit = handleSubmit(async data => {
        if(data.password !== data.confirmPassword){
            alert("Contraseñas no coinciden")
        }else if(data.password.length < 7) {
            alert("La contraseña debe mínimo 8 dígitos")
        } else {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password
                }),
                headers: {
                    'Content-Type': 'aplication/json'
                }
            })
            
            if(res.ok){     
                router.push('/auth/login')
            }
        }
        
        
    })
    return (
        <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
            <form onSubmit={onSubmit} className='w-1/2 sm:w-1/4'>
                <h1 className='text-slate-200 font-bold text-3xl mb-4'>
                    Registro
                </h1>

                <label htmlFor='username' className='text-slate-300 mb-2 block text-sm' >Usuario</label>
                <input type="text"
                    {...register("username", {
                        required: {
                            value: true,
                            message: "Campo obligatorio"
                        },
                        
                    })}
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                    placeholder='Usuario'
                />
                {
                    errors.username && (
                        <span 
                            className='text-red-500 text-sm'
                            >{errors.username.message}</span>
                            )
                }
                <label htmlFor='email' className='text-slate-300 mb-2 block text-sm' >Correo</label>
                <input type="email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Campo obligatorio"
                        },
                    })}
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                    placeholder='Correo'
                />
                {
                    errors.email && (
                        <span 
                            className='text-red-500 text-sm'
                            >{errors.email.message}</span>
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
                <label htmlFor='confirmPassword' className='text-slate-300 mb-2 block text-sm' >Confirmar contraseña</label>
                <input type="password"
                    {...register("confirmPassword", {
                        required: {
                            value: true,
                            message: "Campo obligatorio"
                        },
                    })}
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                    placeholder='********'
                />
                {
                    errors.confirmPassword && (
                        <span 
                            className='text-red-500 text-sm'
                            >{errors.confirmPassword.message}</span>
                            )
                }
                <button 
                    className='w-full bg-blue-500 text-white p-3 rounded-lg mt-2'>
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterPage