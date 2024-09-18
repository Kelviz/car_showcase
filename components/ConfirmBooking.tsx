"use client"
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"
import { FaUser } from 'react-icons/fa';
import { Fragment } from "react";
import {
        Dialog,
        DialogPanel,
        Label,
        Transition,
        TransitionChild,
} from "@headlessui/react";
import { UserDataProps } from "@/types";
import { confirmBooking } from "@/utils";
import { isAuthenticated } from "@/utils/auth";
import CustomButton from "./CustomButton";

interface ConfirmBookingProps {
        isOpen: boolean;
        closeModal: () => void;
        bookingId: number;
}

const ConfirmBooking = ({ isOpen, closeModal, bookingId }: ConfirmBookingProps) => {
        const [email, setEmail] = useState<string>("")

        const router = useRouter();

        const handleBooking = async () => {
                const bookingData = {
                        booking_id: bookingId,
                        email: email,

                }

                const response = await confirmBooking(bookingData)
                const userIsAuthenticated = await isAuthenticated()

                if (userIsAuthenticated) {
                        if (response.status === 'success') {
                                const authorization_url = response.authorization_url
                                router.push(authorization_url);
                        } else if (response === 'unauthorized') {
                                await isAuthenticated()
                                await confirmBooking(bookingData)
                                const authorization_url = response.authorization_url
                                router.push(authorization_url);
                                console.log("error", response)
                        }

                } else {
                        router.push('/login')
                }

        }



        return (
                <>
                        <Transition appear show={isOpen} as={Fragment}>
                                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                                        <TransitionChild
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0"
                                                enterTo="Opacity-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                        >
                                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                                        </TransitionChild>

                                        <div className="fixed inset-0 overflow-y-auto">
                                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                                        <TransitionChild
                                                                as={Fragment}
                                                                enter="ease-out duration-300"
                                                                enterFrom="opacity-0 scale-95"
                                                                enterTo="Opacity-100 scale-100"
                                                                leave="ease-in duration-200"
                                                                leaveFrom="opacity-100 scale-100"
                                                                leaveTo="opacity-0 scale-95"
                                                        >
                                                                <DialogPanel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl
                                                                bg-primary-black-100 text-left shadow-xsl transition-all p-6 flex flex-col">
                                                                        <button type="button" onClick={closeModal}
                                                                                className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                                                                        >
                                                                                <Image
                                                                                        src="/close.svg"
                                                                                        alt="close"
                                                                                        width={20}
                                                                                        height={20}
                                                                                        className="object-contain"
                                                                                />
                                                                        </button>


                                                                        <div className="flex-1 text-white flex flex-col gap-2">
                                                                                <h2 className="font-bold text-[20px]">Confirm Booking</h2>
                                                                                <form className="w-full flex flex-col items-center gap-3 mt-4">
                                                                                        <input
                                                                                                type="text"
                                                                                                name="email"
                                                                                                value={email}
                                                                                                placeholder="Enter email to confirm booking"
                                                                                                onChange={(e) => { setEmail(e.target.value) }}
                                                                                                className="w-full px-4 py-2 rounded border text-black border-gray-300"




                                                                                        />

                                                                                        <CustomButton
                                                                                                title="Confirm"
                                                                                                containerStyles='w-auto py-[16px] rounded-full bg-white'
                                                                                                textStyles="text-primary-blue text-[14px] leading-[17px] font-bold"
                                                                                                handleClick={handleBooking}

                                                                                        />



                                                                                </form>



                                                                        </div>
                                                                </DialogPanel>
                                                        </TransitionChild>
                                                </div>
                                        </div>
                                </Dialog>
                        </Transition>
                </>
        )
}

export default ConfirmBooking