"use client"
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import { fetchBookingDetail } from '@/utils'
import { isAuthenticated } from '@/utils/auth'
import { BookingProps } from '@/types'
import { BookingCard, CustomButton, ConfirmBooking } from '@/components'



const page = ({ params, }: { params: { bookingId: number } }) => {
        const [booking, setBooking] = useState<BookingProps | null>(null)
        const [userIsAuthenticated, setUserIsAuthenticated] = useState(false)
        const [isOpen, setIsOpen] = useState(false)
        const bookingId = params.bookingId

        const router = useRouter();


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
                <div className='booking'>
                        <div className='w-full flex-center flex-col mt-[10rem] sm:px-16 px-6'>
                                <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b border-gray-700 bg-primary-black text-white">
                                                <tr>

                                                        <th scope="col" className="px-6 py-4">Car Name</th>
                                                        <th scope="col" className="px-6 py-4">Start Date</th>
                                                        <th scope="col" className="px-6 py-4">End Date</th>
                                                        <th scope="col" className="px-6 py-4">Price</th>
                                                        <th scope="col" className="px-6 py-4">Status</th>
                                                </tr>
                                        </thead>
                                        <tbody className="text-white">

                                                <BookingCard booking={booking} />

                                        </tbody>
                                </table>

                                <CustomButton
                                        title="Confirm Booking"
                                        containerStyles='bg-primary-blue rounded-full  min-w-[130px] text-center p-3 mt-[3rem]'
                                        textStyles="text-white text-[14px] font-bold"
                                        handleClick={() => setIsOpen(true)}

                                />


                                <ConfirmBooking isOpen={isOpen} closeModal={() => setIsOpen(false)} bookingId={bookingId} />


                        </div>

                </div>
        )
}

export default page