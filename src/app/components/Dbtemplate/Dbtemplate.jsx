import Image from 'next/image';
import React from 'react';
import './template.css'
import { LuLayoutDashboard } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { PiChalkboardTeacher } from "react-icons/pi";
import { GrUserAdmin } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoMdBook } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import Link from 'next/link';

export function Dbtemplate() {

  return (
    <div className='flex flex-col gap-[32px] relative h-[100%] box-border  py-[10px]'>
      <h1 className='font-[600] text-[20px] text-[#2196f3] text-center'>Course Management</h1>
      <ul className='nav-items flex flex-col text-[18px]'>
        <li>
          <LuLayoutDashboard className='text-[#000] text-center' />
          <span>Dashboard</span>
        </li>
        {/* <li>
          <PiStudent className='text-[#000] text-center' />
          <span>Students</span>
        </li> */}
        {/* <li>
          <PiChalkboardTeacher className='text-[#000] text-center' />
          <span>Instructors</span>
        </li> */}
        {/* <Link href={'/dashboard/admin'}>
          <li>
            <GrUserAdmin className='text-[#000] text-center' />
            <span>Admins</span>
          </li>
        </Link> */}
        {/* <li>
          <AiOutlineSchedule className='text-[#000] text-center' />
          <span>Schedule</span>
        </li> */}
        <Link href={'/'}>
          <li>
            <VscAccount className='text-[#000] text-center' />
            <span>Account</span>
          </li>
        </Link>
        <li>
          <IoNotificationsOutline className='text-[#000] text-center' />
          <span>Notifications</span>
        </li>
        <Link href={'/dashboard/listcourse'}>
          <li>
            <IoMdBook className='text-[#000] text-center' />
            <span>Courses</span>
          </li>
        </Link>
        <Link href={'/dashboard/users'}>
          <li>
            <VscAccount className='text-[#000] text-center' />
            <span>Users</span>
          </li>
        </Link>
        <li>
          <IoSettingsOutline className='text-[#000] text-center' />
          <span>settings</span>
        </li>
      </ul>
      <button className='btn-nav flex items-center justify-center gap-[5px] bg-[#2196f3] text-[#fff] rounded-[15px] px-[24px] py-[8px] absolute bottom-[20px] w-[150px]'
        onClick={() => {
          window.localStorage.removeItem('token')
        }}
      >
        <RiLogoutCircleRLine className='text-[#fff] text-center' />
        Logout
      </button>
    </div>
  )
}

export function Dbnavigation() {

  const data = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('data'))

  return (
    <div className='flex justify-evenly items-center mt-[15px]'>
      <div className='relative w-[50%]'>
        <input className='w-[100%] rounded-[30px] py-[8px] text-[#000] px-[40px] outline-none' type="search" name="search" />
        <IoSearchSharp className='text-[#888282d2] text-center absolute left-[10px] top-[25%] transform-[translateY(-50%)]' size={22} />
      </div>
      <section className='flex width-[20%] gap-[20px]'>
        <div className='relative flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#fff]'>
          <FaRegMessage className='text-[#000] text-center' size={18} />
          <span className='absolute bg-[green] px-[5px] text-[10px] py-[0] rounded-full top-[-1px] right-[-10]'>3</span>
        </div>
        <div className='relative flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#fff]'>
          <IoNotificationsOutline className='text-[#000] text-center' size={25} />
          <span className='absolute bg-[green] px-[5px] text-[10px] py-[0] rounded-full top-[-1px] right-[-10]'>3</span>
        </div>
        <div className='flex justify-center items-center gap-[5px]'>
          <section className=' text-[#2196f3] w-[40px] h-[40px] flex items-center justify-center font-[600] text-[20px] rounded-full bg-[#fff]'> 
            <span>{data?.name?.split("")[0].toUpperCase()}</span>
          </section>
          <section className='flex flex-col'>
            <strong>{data?.name}</strong>
            <span>{data?.mail}</span>
          </section>
        </div>
      </section>
    </div>
  )
}

