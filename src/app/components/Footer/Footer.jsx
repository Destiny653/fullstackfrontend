import React from 'react';
import './footer.css'

export default function Footer() {
    return (
        <div className='t-[30px] px-[2%] border-t box-border pt-[50px] text-[white] bg-[#010111]'>
            <section className='flex justify-between items-cente h-[300px]'>
                <ul className='footer-links-p flex justify-evenly gap-[9px]'>
                    <li className='font-[600]'><span className='text-[#eccd94]'>Information</span>
                        <ul className=' font-[400] text-[14px] pt-3'>
                            <li className='my-[10%]'>
                                <a href='#'>About Us</a>
                            </li>
                            <li>
                                <a href='#'>Press</a>
                            </li>
                            <li className='my-[10%]'>
                                <a href='#'>Contact Us</a>
                            </li>
                        </ul>
                    </li>
                    <li className='font-[600]'><span className='text-[#eccd94]'>My Account</span>
                        <ul className=' font-[400] text-[14px]  pt-3'>
                            <li className='my-[10%]'>
                                <a href='#'>Orders</a>
                            </li>
                            <li className='my-[10%]'>
                                <a href='#'>Credit Cards</a>
                            </li>
                            <li className='my-[10%]'>
                                <a href='#'>Addresses</a>
                            </li>
                        </ul>
                    </li>
                    <li className='font-[600] '><span className='text-[#eccd94]'>Categories</span>
                        <ul className=' font-[400] text-[14px] pt-3'>
                            <li className='my-[10%]'>
                                <a href='#'>Feeding Gadgets</a>
                            </li>
                            <li className='my-[10%]'>
                                <a href='#'>Clothing</a>
                            </li>
                            <li className='my-[10%]'>
                                <a href='#'>Mother Wear</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div>
                    <h1 className='text-[27px] text-[#eccd94]'>GENI~I</h1>
                    <p className='font-[400] text-[14px] my-[6%]'>+880 1234 567890</p>
                    <p className='font-[400] text-[14px] my-[6%] text-[#eccd94]'>geni-i@gmail.com</p>
                    <p className='font-[400] text-[14px] my-[6%]'>Tuesday - Saturday: 8:00am - 5:00pm</p>
                </div>
            </section>
            <footer className='border-t box-border py-[15px]'>
                <p className='font-[300] text-[14px]'>Copyright 2024. All rights reserved.</p>
            </footer>
        </div>
    )
}
