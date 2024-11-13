'use client'
import React, { useEffect, useState } from 'react'
import { Dbnavigation, Dbtemplate } from '@/app/components/Dbtemplate/Dbtemplate';
import '../gentem.css';
import { IoMdAdd } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [experience, setExperience] = useState('');
    const [tel, setTel] = useState('');
    const [enrollementDate, setEnrollementDate] = useState('');
    const [submit, setSubmit] = useState(false);
    const [data, setData] = useState({});
    const [admin, setAdmin] = useState('')
    const [isClient, setIsClient] = useState(false);
    const navigation = useRouter()

    useEffect(() => {
        setIsClient(true)
        const localdata = localStorage.getItem('data')
        !localdata.token && navigation.push('/')
    })


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Data', data);
        console.log('Info log', {
            path: data.path,
            branch: data.branch,
            data: data,
            email: email,
        });

        try {
            const response = await fetch(`https://fullstackbackend-1-3kv9.onrender.com/api/` + data.branch + '/' + data.path, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const request = await response.json()


            if (!response.ok) {
                console.log('Error occurred while registering, error: ' + request.message)
                alert('Error occurred while registering, error: ' + request.message);
            } else {
                if (role === "Student" && isClient) {
                    // Ensure window is defined and safely set localStorage item
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('studentId', request.user._id);
                        navigation.push('/dashboard/student');
                    }
                }
                if (role === "Instructor" && isClient) {
                    // Ensure window is defined and safely set localStorage item
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('instructorId', request.user._id)
                        navigation.push('/dashboard/department')
                    }
                }
                alert(request.message);

            }

        } catch (error) {
            console.error(error);
            alert('Error occurred', error);

        }
    }


    return (
        <div className='flex w-full h-[100vh]'>
            <section className='w-[17%] bg-[#ffffff57]'>
                <Dbtemplate />
            </section>
            <section className='w-[83%] bg-black text-[#fff] flex flex-col gap-[10px]'>
                <Dbnavigation />
                <section className='box-border px-[30px] flex justify-between items-center'>
                    <h2 className='text-[#2196f3] font-[600] text-[24px]'>Adim Dashboard</h2>
                    <div className='flex gap-[20px] justify-evenly'>
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
                    </div>
                </section>
                <section className='flex justify-center items-center h-[100vh]'>
                    <div className='flex justify-center items-center relative bg-[#fff] h-[500px] w-[900px] rounded-[15px] box-border py-[30px]'>
                        <form onSubmit={handleSubmit} className='form-reg flex flex-col justify-center gap-[6%] items-center w-[800px] h-[100%] box-border px-[20px]'>
                            <h1 className='text-[#2196f3] text-[27px] font-[600] absolute top-[20px] left-[60px]'>Register</h1>
                            <div className='flex justify-center items-center gap-[8%] w-full'>
                                <label htmlFor="first-name">
                                    <span className='text-[#000]'>First Name</span>
                                    <input type="text" id="first-name" name="first-name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </label>
                                <label htmlFor="last-name">
                                    <span className='text-[#000]'>Last Name</span>
                                    <input type="text" id="last-name" name="last-name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </label>
                            </div>
                            <div className='flex justify-center items-center gap-[8%] w-full'>
                                <label htmlFor="email">
                                    <span className='text-[#000]'>Email</span>
                                    <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </label>
                                <label htmlFor="password">
                                    <span className='text-[#000]'>Password</span>
                                    <input type="password" id="password" name="password" placeholder="*****" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                </label>
                            </div>
                            <div className='flex justify-center gap-[0%] items-center w-[100%]'>
                                <label htmlFor="confirm-password">
                                    <span className='text-[#000]'>Confirm Password</span>
                                    <input type="password" id="confirm-password" name="confirm-password" placeholder="*****" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                                </label>
                                <label htmlFor="options">
                                    <span className='text-[#000]'>Role</span>
                                    <select className='text-[#000] outline-none py-[9px] border-[1px] px-[20px] rounded-[10px] w-[350px]' name="role" id="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="" disabled>Select Role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Student">Student</option>
                                        <option value="Instructor">Instructor</option>
                                    </select>
                                </label>
                            </div>
                            <button type="submit" className='btn-opt absolute right-[70px] bottom-[40px] text-[#fff] bg-[#2196f3] px-[20px] py-[10px] rounded-[7px]'
                                onClick={() => setData({
                                    first_name: firstName,
                                    last_name: lastName,
                                    email: email,
                                    role: role,
                                    password: password,
                                    confirm_password: confirmPassword,
                                    path: 'register',
                                    branch: 'admins'
                                })
                                }
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </section>
            </section>
        </div>
    )
}
