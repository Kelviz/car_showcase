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
                <header className='w-full absolute z-10'>

                        <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 relative'>
                                <Link href="/" className='flex justify-center items-center p-2 bg-white' >
                                        <Image src="/logo.svg"
                                                alt='Car Hub Logo'
                                                width={118}
                                                height={18}
                                                className='object-contain lg:w-[150px] w-[100px]' />
                                </Link>


                                {userIsAuthenticated ? (
                                        <>
                                                <div className="w-[30%] p-2 hidden lg:flex justify-end items-center gap-3">
                                                        <Link href="/bookings" className="bg-black text-white bg-opacity-30 lg:text-[14px] text-[12px] lg:w-[150px] w-[120px] text-center font-bold p-2  rounded-full">Bookings</Link>

                                                        <CustomButton
                                                                title="Sign Out"
                                                                containerStyles='lg:w-[150px] w-[120px] bg-black bg-opacity-30 px-3 py-5 border-none rounded-full border border-white'
                                                                textStyles="text-white lg:text-[14px] text-[12px] leading-[17px] font-bold"
                                                                handleClick={handleUserLogout}

                                                        />



                                                </div>


                                                <FcMenu className="text-[35px] lg:hidden text-white" onClick={handleMenue} />
                                                {showMenu && (
                                                        <div className="absolute lg:hidden right-[3.5rem] bg-primary-black p-2 top-[4rem] w-[34%]  flex flex-col">
                                                                <Link href='/bookings' className="text-white text-[18px] font-bold my-2" onClick={() => setShowMenu(false)}>Bookings</Link>

                                                                <p
                                                                        onClick={handleUserLogout}
                                                                        className="text-white text-[18px] font-bold my-2"


                                                                >Sign Out</p>

                                                        </div>
                                                )}
                                        </>

                                ) : (

                                        <Link href="/login" className='text-primary-blue rounded-full bg-white min-w-[130px] text-center p-3'>Sign In</Link>
                                )}


                        </nav>

                </header>

        )
}

export default Navbar