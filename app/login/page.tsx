"use client"
import { useState, useEffect } from "react";
import { AuthForm, CustomButton, ResponseMessage } from "@/components";
import { useRouter } from "next/navigation"
import Link from "next/link";

import { loginUser, isAuthenticated } from "@/utils/auth";


const page = () => {

        const [formValues, setFormValues] = useState({
                email: '',
                password: '',
                last_name: '',
                first_name: '',
                phone: ''
        });

        const [message, setMessage] = useState<string | null>(null);
        const [containerStyle, setContainerStyle] = useState<string | null>(null);
        const [userIsAuthenticated, setUserIsAuthenticated] = useState(false)
        const router = useRouter();


        useEffect(() => {
                const checkAuthentication = async () => {
                        const getIsAuthenticated = await isAuthenticated()
                        if (getIsAuthenticated) {
                                setUserIsAuthenticated(true)
                                setTimeout(() => {
                                        router.push('/')
                                }, 1000)
                        } else {
                                setUserIsAuthenticated(false)
                        }

                }

                checkAuthentication();


        }, [])



        const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value } = e.target;
                setFormValues({
                        ...formValues,
                        [name]: value
                });
        };


        const handleUserLogin = async () => {
                const response = await loginUser(formValues);
                if (response.status === "success") {
                        setMessage(response.message)
                        setContainerStyle('border-t-[6px] border-green-500')
                        setTimeout(() => {
                                setMessage(null);
                                setContainerStyle(null)
                                router.push('/');
                        }, 1000);
                } else {
                        setMessage(response.error);
                        setContainerStyle('border-t-[6px] border-red-500')
                        setTimeout(() => {
                                setMessage(null);
                                setContainerStyle(null)
                        }, 1000)
                }
        }


        return (
                <>
                        {userIsAuthenticated ? (
                                <div className="login flex-center">
                                        <div className="w-[25%] h-[30vh] rounded-lg text-center shadow-lg bg-black p-3 flex-center">
                                                <p className="text-yellow-600 w-auto p-3">You Already Signed In</p>
                                        </div>
                                </div>
                        ) : (
                                <div className="login flex-center">
                                        <ResponseMessage message={message} containerStyle={containerStyle} />

                                        <div className="w-[370px] flex-center flex-col">
                                                <h1 className="text-4xl font-extrabold text-white">Sign In</h1>
                                                <AuthForm
                                                        type="email"
                                                        name="email"
                                                        value={formValues.email}
                                                        placeholder="Email"
                                                        handleOnchange={handleInputsChange}

                                                />
                                                <AuthForm
                                                        type="password"
                                                        name="password"
                                                        value={formValues.password}
                                                        placeholder="Password"
                                                        handleOnchange={handleInputsChange}

                                                />
                                                <div className="w-full flex items-end justify-end mt-4">
                                                        <Link
                                                                href="/register"
                                                                className="w-auto text-white"
                                                        >Register</Link>
                                                </div>

                                                <CustomButton
                                                        title="Sign In"
                                                        containerStyles='w-[40%] py-[18px] px-2 rounded-full shadow-lg border border-white mt-4'
                                                        textStyles="text-white text-[14px] leading-[17px] font-bold"
                                                        handleClick={handleUserLogin}

                                                />


                                        </div>


                                </div>

                        )}
                </>

        )
}

export default page