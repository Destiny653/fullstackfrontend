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
    const navigation = useRouter()

    const localdata = JSON.parse(typeof window !== 'undefined' && localStorage.getItem('data'))
    !localdata.token && navigation.push('/')
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // window.localStorage.setItem('regemail', email)

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
                alert(request.message); 
                    navigation.push('dashboard/users')
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
                        <div className='flex justify-evenly items-center gap-[1px] w-full'>
                            <section className=' w-[50%] h-[300px] bg-[gray] rounded-[15px] overflow-hidden'>
                                <Image className=' w-full h-full' src={'/images/course.jpg'} alt='course management image' width={400} height={400} />
                            </section>
                            <form onSubmit={handleSubmit} className='form-reg w-[40%] flex flex-col justify-center items-center gap-[20px]  box-border px-[20px] ' action="http://localhost:3000/api/auth/student" method='post'>
                                <h1 className='text-[#2196f3] text-[27px] font-[600] absolute top-[20px] left-[60px]'>Student Register</h1>
                                <label htmlFor="enrollement data">
                                    <span className='text-[#000]'>Enrollement Data</span>
                                    <input className='text-[#000] outline-none py-[9px] border-[1px] px-[20px] rounded-[10px] w-[350px]' type="date" id="enrollement data" name="enrollement data" placeholder="Enrollement Data" value={enrollementDate} onChange={(e) => setEnrollementDate(e.target.value)} />
                                </label>
                                <button type="submit" className='btn-opt text-[#fff] bg-[#2196f3] px-[20px] py-[10px] rounded-[7px] absolute bottom-[60px] right-[30px]'
                                    onClick={() => setData(
                                        {
                                            enrollement_date: enrollementDate,
                                            level: window.localStorage.getItem('levelId'),
                                            email: localStorage.clear('regemail'),
                                            path: 'student',
                                            branch: 'users'
                                        }
                                    )}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}
