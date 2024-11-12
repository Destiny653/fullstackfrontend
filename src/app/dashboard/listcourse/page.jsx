'use client'
import { Dbnavigation, Dbtemplate } from '@/app/components/Dbtemplate/Dbtemplate'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import '../gentem.css';
import Link from 'next/link';


export default function Page() {


    const [data, setData] = useState([])
    const [iduser, setIduser] = useState('')


    useEffect(() => {

        if (typeof window !== 'undefined') {
            !window.localStorage.getItem('token') ? window.location.href = '/' : ''
        }

        const fetchData = async () => {
            try {
                const response = await fetch('https://fullstackbackend-1-3kv9.onrender.com/api/courses/get')
                const request = await response.json()
                if (!response.ok) {
                    alert(request.message)
                }
                setData(request)
                return;
            } catch (error) {
                alert('Error faild to fetch data ' + error.message)
                return;
            }
        }
        fetchData();
        return;
    }, [data])

    const deleteUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/courses/delete/${iduser}`, {
                method: 'DELETE',
            })
            const request = await response.json()
            if (!response.ok) {
                alert(request.message)
            }
            alert(request.message)
        } catch (error) {
            alert('Error faild to delete user ' + error.message)
        }
    }

    // console.log("Data ", data);
    console.log("Data ", data.courses);


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
                <section className='flex w-full flex-col  h-[100vh] box-border p-[px]'>
                    <ul className='ul-container font-[600]  w-full bg-[#00000021] text-[#fff] border'>
                        <li className='py-[11px]'>Title</li>
                        <li className='py-[11px]'>Duration</li>
                        <li className='py-[11px]'>Department</li>
                        <li className='py-[11px]'>Level</li>
                        <li className='py-[11px]'>Start date</li>
                        <li className='py-[11px]'>End date</li>
                        <li className='cursor-pointer py-[11px]'>  Update</li>
                        <li className='cursor-pointer py-[11px]'>Delete</li>
                    </ul>
                    <div className='w-full' >
                        {
                            data.courses?.map((item, index) => {
                                return (
                                    <ul key={item._id} className='ul-container w-full   bg-[#fff] text-[#000] border'>
                                        <li className='py-[11px]'>{item.title}</li>
                                        <li className='py-[11px]'>{item.duration}</li>
                                        <li className='py-[11px]'>{item.level.department.department}</li>
                                        <li className='py-[11px]'>{item.level.level}</li>
                                        <li className='py-[11px]'>{item.level.level_start_date}</li>
                                        <li className='py-[11px]'>{item.level.level_end_date}</li>
                                        <Link href={'dashboard/updatecourse/?id=' + item._id}>
                                            <li className='py-[11px] btn-opt-nav' > Update </li>
                                        </Link>
                                        <li className='py-[11px] btn-opt-del' onClick={() => { deleteUser(); setIduser(item._id) }}> Delete </li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                </section>
            </section>
        </div>
    )
}
