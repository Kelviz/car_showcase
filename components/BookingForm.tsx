"use client"
import { useState, useEffect } from 'react'
import Image from "next/image";
import { FaUser } from 'react-icons/fa';
import { Fragment } from "react";
import { useRouter } from "next/navigation"
import {
        Dialog,
        DialogPanel,
        Transition,
        TransitionChild,

} from "@headlessui/react";
import { isAuthenticated } from '@/utils/auth';
import { bookCar } from '@/utils';
import { CarProps } from "@/types";
import CustomButton from './CustomButton';

interface CarDetailsProps {
        isBookingOpen: boolean;
        closeModal: () => void;
        car: CarProps;
}

const BookingForm = ({ isBookingOpen, closeModal, car }: CarDetailsProps) => {
        const { city_mpg, year, make, model, transmission, drive, daily_rent, available, id } = car;
        const [startDate, setStartDate] = useState<string>("");
        const [endDate, setEndDate] = useState<string>("");
        const [totalPrice, setTotalPrice] = useState<number>(0);
        const [numDays, setNumDays] = useState<number>(0);
        const router = useRouter();

        const availability = available ? "Yes" : "No"

        const calculateDays = (start: string, end: string) => {
                const startDt = new Date(start);
                const endDt = new Date(end);
                const differenceInTime = endDt.getTime() - startDt.getTime();
                const differenceInDays = differenceInTime / (1000 * 3600 * 24);
                return differenceInDays + 1; // Including both start and end date
        };


        useEffect(() => {
                if (startDate && endDate) {
                        const days = calculateDays(startDate, endDate);
                        setNumDays(days);
                        setTotalPrice(days * daily_rent);
                }
        }, [startDate, endDate, daily_rent]);


        const handleBooking = async () => {
                const bookingData = {
                        start_date: startDate,
                        end_date: endDate,
                        total_price: totalPrice,
                        car_make: make,
                        car_model: model,
                        car: id,
                        status: "Pending",
                }

                const response = await bookCar(bookingData)
                const userIsAuthenticated = await isAuthenticated()

                if (userIsAuthenticated) {
                        if (response.status === 'success') {
                                const dataId = response.data.id
                                router.push(`/bookings/confirmation/${dataId}`);
                        } else if (response === 'unauthorized') {
                                await isAuthenticated()
                                await bookCar(bookingData)
                                console.log("error", response)
                        }

                } else {
                        router.push('/login')
                }

        }




        return (
                <>
                        <Transition appear show={isBookingOpen} as={Fragment}>
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
                                                                <DialogPanel className="relative w-full max-w-lg max-h-[90vh]
                                                                        overflow-y-auto transform rounded-2xl
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


                                                                        <div className="flex flex-col gap-2 text-white">
                                                                                <h2 className='w-full text-center text-white font-bold text-[20px]'>Book Your Car</h2>
                                                                                <h2 className='text-23 font-bold'>Car: {make} {model}</h2>
                                                                                <h2 className='text-23 font-bold'>Total Price: <strong>${totalPrice.toFixed(2)}</strong></h2>
                                                                                <h2 className='text-23 font-bold'>Available: {availability}</h2>
                                                                                <form className='w-full flex flex-col'>

                                                                                        <div className='w-full flex-between'>

                                                                                                <div>
                                                                                                        <label className="block text-white mb-2" htmlFor="startDate">
                                                                                                                Start Date
                                                                                                        </label>
                                                                                                        <input
                                                                                                                type="date"
                                                                                                                id="startDate"
                                                                                                                value={startDate}
                                                                                                                onChange={(e) => setStartDate(e.target.value)}
                                                                                                                className="w-full px-4 py-2 rounded border text-black border-gray-300"
                                                                                                                required
                                                                                                        />
                                                                                                </div>


                                                                                                <div>
                                                                                                        <label className="block text-white mb-2" htmlFor="endDate">
                                                                                                                End Date
                                                                                                        </label>
                                                                                                        <input
                                                                                                                type="date"
                                                                                                                id="endDate"
                                                                                                                value={endDate}
                                                                                                                onChange={(e) => setEndDate(e.target.value)}
                                                                                                                className="w-full px-4 py-2 rounded border text-black border-gray-300"
                                                                                                                required
                                                                                                        />
                                                                                                </div>




                                                                                        </div>

                                                                                        <CustomButton
                                                                                                title="Book Now"
                                                                                                containerStyles='w-auto py-[16px] rounded-full bg-white mt-[2rem]'
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

export default BookingForm