"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import Link from 'next/link';
import Image from 'next/image';
import { FcMenu } from "react-icons/fc";
import { loginUser, isAuthenticated, logOut } from "@/utils/auth";
import { CustomButton } from "@/components";


const Navbar = () => {
        const [userIsAuthenticated, setUserIsAuthenticated] = useState(false)
        const [showMenu, setShowMenu] = useState(false)
        const router = useRouter();

        useEffect(() => {
                const checkAuthentication = async () => {
                        const getIsAuthenticated = await isAuthenticated()
                        if (getIsAuthenticated) {
                                setUserIsAuthenticated(true)
                        } else {
                                setUserIsAuthenticated(false)
                        }
                }

                checkAuthentication();


        }, [])


        const handleUserLogout = () => {
                if (userIsAuthenticated) {
                        logOut()
                        setUserIsAuthenticated(false)
                        router.push('/')

                }



        }

        const handleMenue = () => {
                if (showMenu) {
                        setShowMenu(false)
                } else {
                        setShowMenu(true)
                }
        }


        return (
                <header className='w-full'>

                        <nav className='max-w-[1440px] flex justify-between items-center px-2 lg:px-6 md:px-6 py-4 relative'>
                                <Link href="/" className='flex lg:w-[150px] lg:h-[110px] md:w-[120px] md:h-[90px]  w-[100px] h-[70px] justify-start items-start  rounded-md' >
                                        <Image src="/car-logo.png"
                                                alt='Car Hub Logo'
                                                width={300}
                                                height={200}
                                                className='object-contain w-full h-full' />
                                </Link>


                                {userIsAuthenticated ? (
                                        <>
                                                <div className="w-[30%] p-2 flex justify-end items-center gap-3">
                                                        <Link href="/bookings" className="bg-gray-700 text-white  lg:text-[14px] text-[12px] lg:w-[150px] w-[120px] text-center font-bold p-3  rounded-full">Bookings</Link>



                                                </div>



                                        </>

                                ) : (

                                        <Link href="/login" className='text-white font-bold rounded-full bg-gray-700 w-auto  text-center py-3 px-8 shadow-sm'>Sign In</Link>
                                )}


                        </nav>

                </header>

        )
}

export default Navbar