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
    // const [register, setRegister] = useState({
    //     first_name: '',
    //     last_name: '',
    //     email: '',
    //     role: '',
    //     password: '',
    //     confirm_password: ''
    // })
    // const [admin, setAdmin] = useState({
    //     tel: '',
    //     email: ''
    // })
    // const [student, setStudent] = useState({
    //     enrollement_date: '',
    //     level: '',
    //     email: ''
    // })
    // const [instructor, setInstructor] = useState({
    //     department: '',
    //     email: ''
    // })


    // const handleChange =(e)=>{
    //     const {name,value} = e.target
    //     setRegister({
    //         ...register,
    //         [name]: value
    //     })
    //     setStudent({
    //         ...student,
    //         [name]:value
    //     })
    //     setInstructor({
    //         ...instructor,
    //         [name]:value
    //     })
    // }

    //  if(typeof window !== 'undefined'){
    //     !window.localStorage.getItem('token')?  window.location.href = '/' : ''
    //  }

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
               !data.path == "admin" ? navigation.push('/dashboard/department') : navigation.push('/dashboard/users')

               if(data.path == "student"){
                typeof window !== 'undefined' && window.localStorage.setItem('studentId', request.user._id)
               }
               if(data.path == "instructor"){
                typeof window !== 'undefined' && window.localStorage.setItem('instructorId', request.user._id)
               }
            }

        } catch (error) {
            console.error(error);
            alert('Error occurred', error);

        }
    }


    const handleRole = () => {
        let selectedRole;
        switch (role) {
            case 'Student':
                selectedRole = role;
                break;
            case 'Instructor':
                selectedRole = role;
                break;
            case 'Admin':
                selectedRole = role;
                break;
            default:
                selectedRole = 'no log';
        }

        if (selectedRole == 'Student') {
            return (
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
            )
        }
        if (selectedRole == 'Instructor') {
            return (
                <div className='flex justify-evenly items-center gap-[1px] w-full'>
                    <section className=' w-[50%] h-[300px] bg-[gray] rounded-[15px] overflow-hidden'>
                        <Image className=' w-full h-full' src={'/images/course.jpg'} alt='course management image' width={400} height={400} />
                    </section>
                    <form onSubmit={handleSubmit} className='form-reg w-[40%] flex flex-col justify-center items-center gap-[20px]  box-border px-[20px] ' action="http://localhost:3000/api/auth/instructor" method='post'>
                        <h1 className='text-[#2196f3] text-[27px] font-[600] absolute top-[20px] left-[60px]'>Instructor Register</h1>
                        <label htmlFor="enrollement data">
                            <span className='text-[#000]'>Years of experience</span>
                            <input className='text-[#000] outline-none py-[9px] border-[1px] px-[20px] rounded-[10px] w-[350px]' type="number" id="experience" name="number" placeholder="years of experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
                        </label>
                        <button type="submit" className='btn-opt text-[#fff] bg-[#2196f3] px-[20px] py-[10px] rounded-[7px] absolute bottom-[60px] right-[30px]'
                            onClick={() => setData({
                                years_of_experience: experience,
                                email: localStorage.getItem('regemail'),
                                path: 'instructor',
                                branch: 'users'
                            })}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )
        }
        if (selectedRole == 'Admin') {
            return (
                <div className='flex justify-evenly items-center gap-[1px] w-full'>
                    <section className=' w-[50%] h-[300px] bg-[gray] rounded-[15px] overflow-hidden'>
                        <Image className=' w-full h-full' src={'/images/course.jpg'} alt='course management image' width={400} height={400} />
                    </section>
                    <form onSubmit={handleSubmit} className='form-reg w-[40%] flex flex-col justify-center items-center gap-[20px]  box-border px-[20px] ' action="http://localhost:3000/api/auth/admin" method='post'>
                        <h1 className='text-[#2196f3] text-[27px] font-[600] absolute top-[20px] left-[60px]'>Admin Register</h1>
                        <label htmlFor="Phone">
                            <span className='text-[#000]'>Phone</span>
                            <input className='text-[#000] outline-none py-[9px] border-[1px] px-[20px] rounded-[10px] w-[350px]' type="text" id="phone" name="phone" placeholder="Phone" value={tel} onChange={(e) => setTel(e.target.value)} />
                        </label>
                        <label htmlFor="options">
                            <span className='text-[#000]'>Permission</span>
                            <select className='text-[#000] outline-none py-[9px] border-[1px] px-[20px] rounded-[10px] w-[350px]' name="role" id="role"
                                value={admin}
                                onChange={(e) => setAdmin(e.target.value)}
                            >
                                <option value="" disabled>Select permissionb</option>
                                <option value="manage_users">Manage courses</option>
                                <option value="manage_courses">Manage users</option>
                            </select>
                        </label>
                        <button type="submit" className='btn-opt text-[#fff] bg-[#2196f3] px-[20px] py-[10px] rounded-[7px] absolute bottom-[60px] right-[30px]'
                            onClick={() => setData({
                                tel: tel,
                                email: localStorage.getItem('regemail'),
                                permissions: admin,
                                path: 'admin',
                                branch: 'users'
                            })}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )
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
                        {
                            !submit ?
                                <form onSubmit={handleSubmit} className='form-reg flex flex-col justify-center gap-[6%] items-center w-[800px] h-[100%] box-border px-[20px]' action="http://localhost:3000/auth/register" method='post'>
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
                                :
                                handleRole()
                        }
                    </div>
                </section>
            </section>
        </div>
    )
}
