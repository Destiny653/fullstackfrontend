'use client'
import React, { useEffect, useReducer, useState } from 'react'
import { Dbnavigation, Dbtemplate } from '@/app/components/Dbtemplate/Dbtemplate';
import '../gentem.css';
import { IoMdAdd } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
      
    const [data, setData] = useState({});
    const [department, setDepartment] = useState({})
    const navigation = useRouter()


    if (typeof window !== 'undefined') {
        !window.localStorage.getItem('token') ? window.location.href = '/' : ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        console.log('Data', data); 

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
                alert(request.message); 
                if(typeof window !== 'undefined'){
                   window.localStorage.setItem("departmentId", request.data._id)
                }
                navigation.push('/dashboard/level')
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
                            <form onSubmit={handleSubmit} className='form-reg w-[40%] flex flex-col justify-center items-center gap-[20px]  box-border px-[20px] '>
                                <h1 className='text-[#2196f3] text-[27px] font-[600] absolute top-[20px] left-[60px]'>Department</h1>
                               
                                <label htmlFor="options">
                                    <span className='text-[#000]'>Department</span>
                                    <select className='text-[#000] outline-none py-[9px] border-[1px] px-[20px] rounded-[10px] w-[350px]' name="role" id="role"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                    >
                                        <option value="" disabled>Select department</option>
                                        <option value="Web developement">Web developement</option>
                                        <option value="Cyber security">Cyber security</option>
                                        <option value="Digital marketting">Digital marketting</option>
                                        <option value="Graphic designing">Graphic designing</option>
                                    </select>
                                </label>
                                <button type="submit" className='btn-opt text-[#fff] bg-[#2196f3] px-[20px] py-[10px] rounded-[7px] absolute bottom-[60px] right-[30px]'
                                    onClick={() => setData({
                                        department: department, 
                                        branch: 'departments',
                                        path: 'create'
                                    })}
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
