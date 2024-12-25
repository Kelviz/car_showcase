import { BookingProps } from "@/types"
import Link from "next/link";


const BookingCard = ({ booking }: { booking: BookingProps | null }) => {

        if (!booking) {
                return <div className="w-full mt-4">Loading...</div>;
        }

        const { car, start_date, end_date, total_price, status, car_make, car_model, id } = booking;



        return (
                <>
                        <div className="flex w-full justify-between bg-primary-black-100 rounded-md p-2 shadow-md items-center">
                                <div className="flex flex-col">
                                        <h3 className="text-white font-bold"><span>{car_make}</span> <span>{car_model}</span> <span className="text-gray-500"> - </span> <small className={status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}>{status}</small></h3>
                                        <p className="text-gray-200">&#8358; {total_price}</p>

                                </div>

                                <Link href={`/bookings/confirmation/${id}`} className="bg-white w-auto px-3 py-2 text-black rounded-lg">View</Link>




                        </div>

                </>
        )
}

export default BookingCard