"use client"
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import { fetchBookingDetail } from '@/utils'
import { isAuthenticated } from '@/utils/auth'
import Image from 'next/image'
import { BookingProps } from '@/types'
import { BookingCard, CustomButton, ConfirmBooking } from '@/components'



const page = ({ params, }: { params: { bookingId: number } }) => {
        const [booking, setBooking] = useState<BookingProps | null>(null)
        const [userIsAuthenticated, setUserIsAuthenticated] = useState(false)
        const [isOpen, setIsOpen] = useState(false)
        const bookingId = params.bookingId

        const router = useRouter();

        const carImage = booking?.car_details?.image
        const carAvailable = booking?.car_details?.available === true ? 'Yes' : 'No'


        useEffect(() => {
                const checkAuthentication = async () => {
                        const getIsAuthenticated = await isAuthenticated()
                        if (getIsAuthenticated) {
                                setUserIsAuthenticated(true)
                                const getBooking = await fetchBookingDetail(bookingId)
                                if (getBooking.status === 'success') {
                                        setBooking(getBooking.data)
                                }


                        } else {
                                setUserIsAuthenticated(false)
                                router.push('/login')
                        }
                }

                checkAuthentication();


        }, [bookingId])



        return (
                <div className='booking padding-x mt-[3rem]'>

                        <div className='w-full   flex lg:flex-row md:flex-row  flex-col-reverse justify-between items-start'>

                                <div className='lg:w-[40%] md:w-[45%] w-full lg:mt-0 mt-9  rounded-lg shadow-lg flex flex-col  bg-primary-black p-6'>
                                        <div className='flex justify-between gap-2'>
                                                <h2 className='font-bold text-white'>Pick-Up Time</h2>
                                                <p className='text-gray-200'>{booking?.start_date}</p>
                                        </div>

                                        <div className='flex mt-6 justify-between  gap-2'>
                                                <h2 className='font-bold text-white'>Drop-Off Time</h2>
                                                <p className='text-gray-200'>{booking?.end_date}</p>
                                        </div>

                                        <div className='flex mt-6 justify-between  gap-2'>
                                                <h2 className='font-bold text-white'>Price</h2>
                                                <p className='text-gray-200'>{booking?.total_price}</p>
                                        </div>

                                        <div className='flex mt-6 justify-between  gap-2'>
                                                <h2 className='font-bold text-white'>Available</h2>
                                                <p className='text-gray-200'>{carAvailable}</p>
                                        </div>

                                        <div className='flex mt-6 justify-between  gap-2'>
                                                <h2 className='font-bold text-white'>Status</h2>
                                                <p className='text-gray-200'>{booking?.status}</p>
                                        </div>

                                        {booking?.status === 'Pending' && (
                                                <CustomButton
                                                        title="Confirm Booking"
                                                        containerStyles='bg-primary-blue rounded-full  min-w-[130px] text-center p-3 mt-[3rem]'
                                                        textStyles="text-white text-[14px] font-bold"
                                                        handleClick={() => setIsOpen(true)}

                                                />

                                        )}

                                </div>


                                <div className='lg:w-[50%] md:w-[45%] w-full flex flex-col gap-4'>
                                        <h2 className='text-white p-2 text-[25px] font-bold'>{booking?.car_make} {booking?.car_model}</h2>

                                        {carImage && (
                                                <Image src={carImage} alt={booking?.car_make} width={900} height={500} />

                                        )}

                                        <div className='w-full flex flex-wrap justify-start text-gray-200'>
                                                <p className='w-auto p-2 flex gap-2'><span className='font-bold'>city_mpg:</span><span className='text-gray-400'>{booking?.car_details?.city_mpg}</span></p>
                                                <p className='w-auto p-2 flex gap-2'><span className='font-bold'>car_class:</span><span className='text-gray-400'>{booking?.car_details?.car_class}</span></p>
                                                <p className='w-auto p-2 flex gap-2'><span className='font-bold'>combination_mpg:</span><span className='text-gray-400'>{booking?.car_details?.combination_mpg}</span></p>
                                                <p className='w-auto p-2 flex gap-2'><span className='font-bold'>cylinders:</span><span className='text-gray-400'>{booking?.car_details?.cylinders}</span></p>
                                                <p className='w-auto p-2 flex gap-2'><span className='font-bold'>displacement:</span><span className='text-gray-400'>{booking?.car_details?.displacement}</span></p>
                                                <p className='w-auto p-2 flex gap-2'><span className='font-bold'>drive:</span><span className='text-gray-400'>{booking?.car_details?.drive}</span></p>
                                                <p className='w-auto p-2 flex gap-2'><span className='font-bold'>fuel_type:</span><span className='text-gray-400'>{booking?.car_details?.fuel_type}</span></p>
                                                <p className='w-auto p-2 flex gap-2'><span className='font-bold'>highway_mpg:</span><span className='text-gray-400'>{booking?.car_details?.highway_mpg}</span></p>
                                                <p className='w-auto p-2 flex gap-2'><span className='font-bold'>transmission:</span><span className='text-gray-400'>{booking?.car_details?.transmission}</span></p>
                                                <p className='w-auto p-2 flex gap-2'><span className='font-bold'>year:</span><span className='text-gray-400'>{booking?.car_details?.year}</span></p>

                                        </div>








                                </div>




                        </div>



                        <div className='w-full flex-center flex-col mt-[10rem] sm:px-16 px-6'>



                                <ConfirmBooking isOpen={isOpen} closeModal={() => setIsOpen(false)} bookingId={bookingId} />


                        </div>

                </div>
        )
}

export default page