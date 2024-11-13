'use client'
import React, { useEffect, useState } from 'react'
import { Dbnavigation, Dbtemplate } from '@/app/components/Dbtemplate/Dbtemplate';
import '../gentem.css';
import { IoMdAdd } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [email, setEmail] = useState('');
    const [level, setLevel] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submit, setSubmit] = useState(false); 
    const [data, setData] = useState({});
    const navigation = useRouter() 

    const department = typeof window !== 'undefined' && window.localStorage.getItem('departmentId')
    const instructor = typeof window !== 'undefined' && window.localStorage.getItem('instructorId')

    console.log( 'DI', department, instructor);
    

    if(!department){
        navigation.push('/dashboard/department')
    }

    if(!instructor){
        navigation.push('/dashboard/instructor')
    }




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.local.NEXTAUTH_URL}/api/` + data.branch + '/' + data.path, {
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
                typeof window !== "undefined" &&  window.localStorage.setItem('levelId', request.data._id)  
                alert(request.message);
                navigation.push('/dashboard/course')
            }

        } catch (error) {
            console.error(error);
            alert('Error occurred please provide the neccessary', error);

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

                        <form onSubmit={handleSubmit} className='form-reg flex flex-col justify-center gap-[6%] items-center w-[800px] h-[100%] box-border px-[20px]' action="http://localhost:3000/auth/register" method='post'>
                            <h1 className='text-[#2196f3] text-[27px] font-[600] absolute top-[20px] left-[60px]'>Register</h1>
                            <div className='flex justify-center items-center gap-[8%] w-full'>
                                <label htmlFor="first-name">
                                    <span className='text-[#000]'>Start date</span>
                                    <input type="date" id="first-name" name="first-name" placeholder="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                </label>
                                <label htmlFor="last-name">
                                    <span className='text-[#000]'>End date</span>
                                    <input type="date" id="last-name" name="last-name" placeholder="data" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                </label>
                            </div>
                            <div className='flex justify-center gap-[0%] items-center w-[100%]'>
                                <label htmlFor="options">
                                    <span className='text-[#000]'>Role</span>
                                    <select className='text-[#000] outline-none py-[9px] border-[1px] px-[20px] rounded-[10px] w-[350px]' name="role" id="role"
                                        value={level}
                                        onChange={(e) => setLevel(e.target.value)}
                                    >
                                        <option value="" disabled>Select Role</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                </label>
                            </div>
                            <button type="submit" className='btn-opt absolute right-[70px] bottom-[40px] text-[#fff] bg-[#2196f3] px-[20px] py-[10px] rounded-[7px]'
                                onClick={() => setData({
                                    level_start_date: startDate,
                                    level_end_date: endDate,
                                    instructor: instructor,
                                    department: department,
                                    level: level,
                                    path: 'create',
                                    branch: 'levels'
                                })
                                }
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </section>
            </section>
        </div>
    )
}
