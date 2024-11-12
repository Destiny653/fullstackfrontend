'use client'
import { Dbnavigation, Dbtemplate } from '@/app/components/Dbtemplate/Dbtemplate'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import '../gentem.css';
import Link from 'next/link';
import { FaUserCircle } from "react-icons/fa";


export default function Page() {
    if(typeof window !== 'undefined'){
        !window.localStorage.getItem('token')?  window.location.href = '/' : ''
     }  


    const [data, setData] = useState([])
    const [iduser, setIduser] = useState('')
    // const dataUpdateU = {}
    // if(!dataUpdateU == {}){
    //     typeof window == 'undefined' && window.localStorage.setItem("dataUpdateU", JSON.stringify(dataUpdateU))
    // }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dashboard-m2bd.onrender.com/api/users')
                const request = await response.json()
                // console.log('Data fetched', request)
                // console.log('Data response', response)
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
            const response = await fetch(`https://dashboard-m2bd.onrender.com/api/users/delete/${iduser}`, {
                method: 'DELETE',
            })
            const request = await response.json()
            if (!response.ok) {
                alert(request.message)
            }
            alert(request.message)
        } catch (error) {
            alert('Error faild to delete user' + error.message)
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
                <section className='flex w-full flex-col  h-[100vh] box-border p-[px]'>
                    <ul className='ul-container font-[600]  w-full   bg-[#00000021] text-[#fff] border'>
                        <li className='py-[11px] bg-[#80808041]'>Name</li>
                        <li className='py-[11px] bg-[#80808041]'>Email</li>
                        <li className='py-[11px] bg-[#80808041]'>Role</li>
                        <li className='cursor-pointer py-[11px] bg-[#80808041]'>Update</li>
                        <li className='cursor-pointer py-[11px] bg-[#80808041]'>Delete</li>
                    </ul>
                    <div className='w-full' >
                        {
                            data.users?.map((item, index) => {
                                return (
                                    <ul key={item._id} className='ul-container w-full   bg-[#fff] text-[#000]'>
                                        <li className='profile'>
                                            <section className='flex justify-center items-center'>
                                                <FaUserCircle size={30} className='text-[#2196f3]' />
                                            </section>
                                            <section className='profile2 flex flex-col gap-[4px]'>
                                                <span className=''>{item.first_name}</span>
                                                <span className=''>{item.last_name}</span>
                                            </section>
                                        </li>
                                        <li className='py-[11px]'>{item.email}</li>
                                        <li className='py-[11px]'>{item.role}</li>
                                        <Link href={'dashboard/updateuser/?id=' + item._id}>
                                            <li className='py-[11px] ' onClick={()=>{ 
                                            }}><button className='btn-opt-nav'>Update</button></li>
                                        </Link>
                                        <li className='py-[11px] ' onClick={() => { deleteUser(); setIduser(item._id) }}> <button className='btn-opt-del'>Delete</button> </li>
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
