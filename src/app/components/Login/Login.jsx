'use client'
import { Dbnavigation, Dbtemplate } from '@/app/components/Dbtemplate/Dbtemplate'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import '../../dashboard/gentem.css';
import { useRouter } from 'next/navigation'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submit, setSubmit] = useState(false)
    const navigation = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }
        try {
            const response = await fetch('https://dashboard-m2bd.onrender.com/api/admins/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const request = await response.json()
            console.log("Request data: ", request);

            if (!response.ok) {
                alert(request.message)
            }
            localStorage.setItem('token', request.token)
            localStorage.setItem('name', request.user.first_name)
            if(request.token){
                navigation.push('/dashboard/course')
            }
            alert(request.message)
            setSubmit(true)
            setEmail('')
            setPassword('')
        } catch (error) {
            console.error('Error :', error)
            alert('Error in registration ' + error)
        }
    }

    if (typeof window !== 'undefined' && !window.localStorage.getItem('token') == "") {
        return (
            <div className='flex w-full h-[100vh]'>
                <section className='w-[17%] bg-[#ffffff57]'>
                    <Dbtemplate />
                </section>
                <section className='w-[83%] bg-black text-[#fff] flex flex-col gap-[10px]'>
                    <Dbnavigation />
                    <section className='box-border px-[30px] flex justify-between items-center'>
                        <h2 className='text-[#2196f3] font-[600] text-[24px]'>Adim Dashboard</h2>
                        {/* <div className='flex gap-[20px] justify-evenly'>
                            <Link href={'/dashboard/admin'}>
                                <button className='btn-opt-nav text-[#000] bg-[#fffffff6] px-[20px] py-[6px] rounded-[20px]'>
                                    <IoMdAdd size={20} />
                                    Add new user
                                </button>
                            </Link>
                            <Link href={'/dashboard/course'}>
                                <button className='btn-opt-nav text-[#000] bg-[#fffffff6] px-[20px] py-[6px] rounded-[20px]'>
                                    <IoMdAdd size={20} />
                                    Add new Course
                                </button>
                            </Link>
                        </div> */}
                    </section>
                    <section className='flex w-full flex-col justify-center items-center h-[100vh] box-border p-[px]'>
                        <div className='flex justify-evenly items-center relative bg-[#fff] h-[500px] w-[900px] rounded-[15px] box-border py-[30px]'>
                            <section className=' w-[50%] h-[300px] bg-[gray] rounded-[15px] overflow-hidden'>
                                <Image className=' w-full h-full' src={'/images/course.jpg'} alt='course management image' width={400} height={400} />
                            </section>
                            <section className=' flex flex-col gap-[15px] justify-center items-center rounded-[15px] overflow-hidden'>
                                <div className='w-[200px] h-[200px] flex flex-col gap-[20px] items-center justify-center rounded-full bg-[#2196f3] text-[#fff]'>
                                    <h1 className='text-[100px] font-[700]'>
                                        {typeof window == 'undefined' && window.localStorage.getItem('name')?.split("")[0].toUpperCase()}
                                    </h1>
                                </div>
                                <p className='text-[30px] font-[600] text-[#000]'>Welcome {window.localStorage.getItem('name')}</p>
                            </section>
                        </div>
                    </section>
                </section >
            </div >
        )
    }

    return (
        <div className='flex w-full h-[100vh]'> 
            <section className='w-[100%] bg-black text-[#fff] flex justify-center items-center'>    
                <section className='flex w-full flex-col justify-center items-center h-[100vh] box-border p-[px]'>
                    <div className='flex justify-center items-center relative bg-[#fff] h-[500px] w-[900px] rounded-[15px] box-border py-[30px]'>
                        <section className=' w-[50%] h-[300px] bg-[gray] rounded-[15px] overflow-hidden'>
                            <Image className=' w-full h-full' src={'/images/course.jpg'} alt='course management image' width={400} height={400} />
                        </section>
                        <form onSubmit={handleSubmit} className='form-reg w-[40%] flex flex-col justify-center items-center gap-[20px]  box-border px-[20px] ' action="http://localhost:3000/api/auth/student" method='post'>
                            <h1 className='text-[#2196f3] text-[27px] font-[600] absolute top-[20px] left-[60px]'>Student Register</h1>
                            <label htmlFor="email">
                                <span className='text-[#000]'>Email</span>
                                <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </label>
                            <label className='flex flex-col' htmlFor="password">
                                <span className='text-[#000]'>Password</span>
                                <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                            <p className='text-[blue]'>Forgot password? <Link href={'/dashboard/resetpassword'}>Reset password</Link></p>
                            <button type="submit" className='btn-opt text-[#fff] bg-[#2196f3] px-[20px] py-[10px] rounded-[7px] absolute bottom-[60px] right-[30px]'>
                                Submit
                            </button>
                        </form>
                    </div>
                </section>
            </section >
        </div >
    )
}
