"use client"
import { useState, useEffect, Fragment } from 'react';
import { FaUser } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from "next/navigation"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { fetchBookings, fetchUser } from '@/utils';
import { isAuthenticated } from '@/utils/auth';
import { CustomButton, BookingCard } from '@/components';
import { bookingOptions } from '@/constants';
import { BookingProps, UserDataProps } from "@/types"
import ProfileDetails from '@/components/ProfileDetails';


const page = () => {
        const [bookings, setBookings] = useState<BookingProps[]>([])
        const [profile, setProfile] = useState<UserDataProps | null>(null)
        const [selected, setSelected] = useState(bookingOptions[0])
        const [userIsAuthenticated, setUserIsAuthenticated] = useState(false)
        const [isOpen, setIsOpen] = useState(false)

        const isDataEmpty = !Array.isArray(bookings) || bookings.length < 1 || !bookings;
        const router = useRouter();


        useEffect(() => {
                const checkAuthentication = async () => {
                        const getIsAuthenticated = await isAuthenticated()
                        if (getIsAuthenticated) {
                                setUserIsAuthenticated(true)
                                handleBookingOnchange(bookingOptions[0])
                                const getUser = await fetchUser()
                                if (getUser) {
                                        setProfile(getUser)
                                } else {
                                        console.log("User not Found!")
                                }

                        } else {
                                setUserIsAuthenticated(false)
                                router.push('/login')
                        }
                }

                checkAuthentication();


        }, [])


        const handleBookingOnchange = async (e: { title: string }) => {
                const getbookings = await fetchBookings(e.title)
                if (getbookings === "unauthorized") {
                        const getIsAuthenticated = await isAuthenticated()
                        if (getIsAuthenticated) {
                                const getbookings = await fetchBookings(e.title)
                                console.log("booking", getbookings)
                                setBookings(getbookings.data)
                        }

                } else {
                        const getbookings = await fetchBookings(e.title)
                        console.log("booking", getbookings)
                        setBookings(getbookings.data)
                }

        }


        return (

                <div className='booking'>
                        <div className='w-full relative mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
                                <div className='booking-heading'>
                                        <div className='booking-heading__cover'>

                                                <div className='w-full text-center flex-col flex-center '>
                                                        <p className='text-[18px] sm:text-[14px] lg:text-[28px] text-white'>Your Journey Starts Here</p>
                                                        <p className='text-[16px] sm:text-[13px] lg:text-[20px] text-primary-blue'>Book Your Perfect Ride Today</p>

                                                </div>
                                                <div className='w-full flex-between'>
                                                        <Image src="/booking-bg-1.png"
                                                                alt='Car 1'
                                                                width={300}
                                                                height={300}
                                                                className='object-contain booking-heading__img h-[190px]' />

                                                        <Image src="/booking-bg-2.png"
                                                                alt='Car 2'
                                                                width={300}
                                                                height={300}
                                                                className='object-contain booking-heading__img  h-[190px]' />

                                                        <Image src="/booking-bg-3.png"
                                                                alt='Car 3'
                                                                width={300}
                                                                height={300}
                                                                className='object-contain booking-heading__img h-[190px]' />
                                                </div>







                                        </div>
                                </div>

                        </div>




                        <div className="w-full flex flex-col sm:px-16 px-6 py-4">
                                <h2 className='font-bold text-white text-[25px]'>Bookings</h2>
                                <div className="w-full flex-between mt-6">
                                        <div className="w-fit">
                                                <Listbox
                                                        value={selected}
                                                        onChange={(e) => { setSelected(e); handleBookingOnchange(e) }}
                                                >
                                                        <div className="relative w-fit z-10">
                                                                <ListboxButton className="custom-filter__btn">
                                                                        <span className='block truncate'>{selected.title}</span>

                                                                        <Image
                                                                                src="/chevron-up-down.svg"
                                                                                width={20}
                                                                                height={20}
                                                                                className='ml-4 object-contain'
                                                                                alt='chevron up down'
                                                                        />

                                                                </ListboxButton>
                                                                <Transition
                                                                        as={Fragment}
                                                                        leave='transition ease-in duration-100'
                                                                        leaveFrom='opacity-100'
                                                                        leaveTo='opacity-0'
                                                                >
                                                                        <ListboxOptions
                                                                                className="custom-filter__options"
                                                                        >
                                                                                {bookingOptions.map((option) => (
                                                                                        <ListboxOption
                                                                                                key={option.title}
                                                                                                value={option}
                                                                                                className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}
                                                                                        >
                                                                                                {({ selected }) => (
                                                                                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                                                                {option.title}
                                                                                                        </span>
                                                                                                )}

                                                                                        </ListboxOption>
                                                                                ))}

                                                                        </ListboxOptions>

                                                                </Transition>

                                                        </div>
                                                </Listbox>

                                        </div>
                                        <div className='w-[50%] flex justify-end relative'>
                                                <div className='w-[40px] h-[40px] bg-white rounded-full flex-center'
                                                        onClick={() => setIsOpen(true)}

                                                >
                                                        <FaUser />
                                                </div>

                                                <ProfileDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} profile={profile} />

                                        </div>


                                </div>

                                <div className='w-full flex flex-col mt-6'>
                                        {!isDataEmpty ? (
                                                <>
                                                        <table className="w-full text-left text-sm font-light">
                                                                <thead className="border-b border-gray-700 bg-primary-black text-white">
                                                                        <tr>

                                                                                <th scope="col" className="text-[13px] lg:font-medium px-2 py-4">Car Name</th>
                                                                                <th scope="col" className="text-[13px] lg:font-medium px-2 py-4">Start Date</th>
                                                                                <th scope="col" className="text-[13px] lg:font-medium px-2 py-4">End Date</th>
                                                                                <th scope="col" className="text-[13px] lg:font-medium px-2 py-4">Price</th>
                                                                                <th scope="col" className="text-[13px] lg:font-medium px-2 py-4">Status</th>

                                                                        </tr>
                                                                </thead>
                                                                <tbody className="text-white">
                                                                        {bookings?.map((booking) => (
                                                                                <BookingCard booking={booking} />
                                                                        ))}


                                                                </tbody>
                                                        </table>

                                                </>
                                        ) : (
                                                <div className='w-full text-center flex-center mt-4'>
                                                        <p className='text-white text[20px] font-bold'>No booking found!</p>
                                                </div>
                                        )}

                                </div>

                        </div>


                </div>

        )
}

export default page