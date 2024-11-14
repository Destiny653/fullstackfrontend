'use client'
import { Dbnavigation, Dbtemplate } from '@/app/components/Dbtemplate/Dbtemplate'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import '../gentem.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [email, setEmail] = useState('')
    const [validate, setValidate] = useState(false)
    const [validate2, setValidate2] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [getOtp, setGetOtp] = useState('')
    const [data, setData] = useState({})
    const navigation = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`https://fullstackbackend-1-3kv9.onrender.com/api/admins/` + data.path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const request = await response.json()
            console.log('Response:', response);
            console.log('Request:', request);

            if (!response.ok) {
                setValidate2(false)
                alert(request.message)
            } else {
                alert(request.message)

                if (data.path == "reset-password" && response.ok) {
                    navigation.push('/')
                }
                window.localStorage.setItem('otp', request.otp.code)
                setEmail('')
                setValidate(true)
                if (confirmPassword && response.ok && typeof window !== 'undefined') {
                    window.location.href = 'https://dashboard-m2bd.onrender.com/dashboard/login'
                }
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }


    const handelNext = () => {

        if (validate2) {
            return (

                <form onSubmit={handleSubmit} className='form-reg w-[40%] flex flex-col justify-center items-center gap-[20px]  box-border px-[20px] ' action="http://localhost:3000/api/auth/student" method='post'>
                    <h1 className='text-[#2196f3] text-[27px] font-[600] absolute top-[20px] left-[60px]'>Student Register</h1>
                    <label htmlFor="password">
                        <span className='text-[#000]'>Password</span>
                        <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <label htmlFor="confirmPassword">
                        <span className='text-[#000]'>Confirm Password</span>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </label>
                    <button type="submit" className='btn-opt text-[#fff] bg-[#2196f3] px-[20px] py-[10px] rounded-[7px] absolute bottom-[60px] right-[30px]'
                        onClick={() => {
                            setData({
                                password: password,
                                confirmPassword: confirmPassword,
                                code: window.localStorage.getItem('otp'),
                                path: 'reset-password'
                            })
                        }}
                    >
                        Submit
                    </button>
                </form>


            )
        }

        if (validate) {
            return (

                <form onSubmit={handleSubmit} className='form-reg w-[40%] flex flex-col justify-center items-center gap-[20px]  box-border px-[20px] ' action="http://localhost:3000/api/auth/student" method='post'>
                    <h1 className='text-[#2196f3] text-[27px] font-[600] absolute top-[20px] left-[60px]'>Student Register</h1>
                    <div className='text-[#000]'>
                        <p>Input your otp code as seen below:</p>
                        <p className='py-[9px] font-[600] text-center'>{window.localStorage.getItem('otp')}</p>
                    </div>
                    <label htmlFor="otp">
                        <span className='text-[#000]'>OTP</span>
                        <input type="text" id="otp" name="otp" placeholder="Otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </label>
                    <button type="submit" className='btn-opt text-[#fff] bg-[#2196f3] px-[20px] py-[10px] rounded-[7px] absolute bottom-[60px] right-[30px]'
                        onClick={() => {
                            setData({
                                code: otp,
                                email: window.localStorage.getItem('email'),
                                path: 'verify-otp'
                            });
                            setValidate2(true)
                        }}
                    >
                        Submit
                    </button>
                </form>


            )
        }
    }

    return (
        <div className='flex w-full h-[100vh]'> 
            <section className='w-[100%] bg-black text-[#fff] flex flex-col gap-[10px]'> 
                <section className='flex w-full flex-col justify-center items-center  h-[100vh] box-border p-[px]'>
                    <div className='flex justify-center items-center relative bg-[#fff] h-[500px] w-[900px] rounded-[15px] box-border py-[30px]'>
                        <section className=' w-[50%] h-[300px] bg-[gray] rounded-[15px] overflow-hidden'>
                            <Image className=' w-full h-full' src={'/images/course.jpg'} alt='course management image' width={400} height={400} />
                        </section>
                        {
                            !validate ?
                                <form onSubmit={handleSubmit} className='form-reg w-[40%] flex flex-col justify-center items-center gap-[20px]  box-border px-[20px] ' action="http://localhost:3000/api/auth/student" method='post'>
                                    <h1 className='text-[#2196f3] text-[27px] font-[600] absolute top-[20px] left-[60px]'>Student Register</h1>
                                    <label htmlFor="email">
                                        <span className='text-[#000]'>Email</span>
                                        <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </label>
                                    <button type="submit" className='btn-opt text-[#fff] bg-[#2196f3] px-[20px] py-[10px] rounded-[7px] absolute bottom-[60px] right-[30px]'

                                        onClick={() => {
                                            window.localStorage.setItem('email', email);
                                            setData({
                                                email: email,
                                                path: 'forgot-password'
                                            })
                                        }}
                                    >
                                        Submit
                                    </button>
                                </form>
                                :
                                handelNext()  // Show the next form based on the validate state.
                        }
                    </div>
                </section>
            </section>
        </div>
    )
}
