'use client'
import { Dbnavigation, Dbtemplate } from '@/app/components/Dbtemplate/Dbtemplate';
import React, { useReducer, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import '../gentem.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
    let levelId;
    if (typeof window !== 'undefined') {
        levelId = window.localStorage.getItem('levelId')
    }


    const [courseTitle, setCourseTitle] = useState('');
    const [duration, setDuration] = useState('');
    const navigation = useRouter()

    if(typeof window !== 'undefined'){
        const localdata =  JSON.parse(localStorage.getItem('data'))
        !localdata.token && navigation.push('/')
    } 
    if (!levelId) {
        navigation.push('/dashboard/level')
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            title: courseTitle,
            duration: duration,
            level: levelId
        }
        try {
            const response = await fetch(`https://fullstackbackend-1-3kv9.onrender.com/api/courses/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const request = await response.json()
            if (!response.ok) {
                alert('Failed to add course ' + request.message)
                return;
            } else {
                typeof window !== "undefined" && window.localStorage.removeItem('departmentId')
                typeof window !== "undefined" && window.localStorage.removeItem('instructorId')
                alert('Course added successfully')
                setCourseTitle('')
                navigation.push('/dashboard/listcourse')
            }
        } catch (error) {
            console.error(error)
            alert('Failed to add course', error)
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
                            <h1 className='text-[#2196f3] text-[27px] font-[600] absolute top-[20px] left-[60px]'>Register Course</h1>
                            <div className='flex justify-center items-center gap-[8%] w-full'>
                                <label htmlFor="course title">
                                    <span className='text-[#000]'>Title</span>
                                    <input type="text" id="course-title" name="course-title" placeholder="Course Title" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                                </label>
                                <label htmlFor="course title">
                                    <span className='text-[#000]'>Duration</span>
                                    <input type='datatime' id="duration" name="duration" placeholder="Course duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                                </label>
                            </div>
                            <button type="submit" className='btn-opt absolute right-[70px] bottom-[40px] text-[#fff] bg-[#2196f3] px-[20px] py-[10px] rounded-[7px]'>
                                Submit
                            </button>
                        </form>
                    </div>
                </section>
            </section>
        </div>
    )
}
