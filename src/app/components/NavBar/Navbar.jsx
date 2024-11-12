import React from 'react';
import './navbar.css';
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { SlHeart } from "react-icons/sl";
import { VscSearch } from "react-icons/vsc";

export default function Navbar() {
    return (
        <div className='nav-p box-border my-1'>
             <section className='nav-menu w-full box-border b-[#40abdd4d]'>
                <section className='flex gap-[8px]'>
                    <div className='flex flex-col box-border py-[3px] justify-evenly items-center w-[46px] h-[42px] bg-[#8d5f0b56]  rounded-md'>
                        <section className='h-[3px] w-[32px] rounded-xl bg-white' ></section>
                        <section className='h-[3px] w-[28px] rounded-xl bg-white' ></section>
                        <section className='h-[3px] w-[32px] rounded-xl bg-white' ></section>
                    </div>
                    <h1 className='text-[27px] font-[600]'>GENI~I</h1>
                </section>
                <section className=' flex justify-center relative box-border'>
                    <input className='border w-[80%] py-[12px] px-[20px] rounded-lg placeholder:text-[14px] ' type="text" placeholder='Search products...'  />
                    <VscSearch className='absolute box-border p-[5px] right-[11%] top-[15%] h-[30px] w-[30px] text-[#000] text-[30px] rounded-full bg-[#8d5f0b56]' />
                </section>
                <section className='flex justify-between '>
                    <div className='flex justify-center items-center gap-[4px]'>
                        <section className='flex justify-center items-center h-12 w-12 bg-[#8d5f0b56]  rounded-lg'>
                            <CiUser className='w-[60%] h-[60%] ' color="#000" />
                        </section>
                        <section>
                            <ul className='text-[14px]'>
                                <li>Hello...</li>
                                <li>Sign in or Register</li>
                            </ul>
                        </section>
                    </div>
                    <div className='flex justify-center items-center relative bg-[#8d5f0b56] h-12 w-12 rounded-lg'> 
                        <span className='w-[45%] h-[47%] text-[13px] flex justify-center items-center rounded-full absolute top-[-15%] left-[60%] text-[#fff] bg-[#7bce5bf6]'>15</span>
                        <CiShoppingCart className='w-[60%] h-[60%] ' color="#000" />
                    </div>
                    <div className='flex justify-center relative items-center bg-[#8d5f0b56] h-12 w-12 rounded-lg'>
                        <span className='w-[45%] h-[47%] text-[13px] flex justify-center items-center rounded-full absolute top-[-15%] left-[60%] text-[#fff] bg-[red]'>10</span>
                        <SlHeart className='w-[47%] h-[47%] ' color="#000" />
                    </div>
                </section>
            </section>
            <section className='nav-link-b'>
                <nav className='nav-link-c w-full'>
                    <ul className='nav-link-p flex gap-[20px] items-center box-border py-[10px]'>
                        <button className='bg-[#8d5f0b56] text-white rounded-md px-[20px] py-[12px]'>All Categories</button>
                        <li><a href="/">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="/dashboard/create">Dashboard</a></li>
                    </ul>
                    <p className='text-[#8d600bb9]'>+237-675-456-389</p>
                </nav>
            </section>
           
        </div>
    )
}
