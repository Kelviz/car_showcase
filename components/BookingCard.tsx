import { BookingProps } from "@/types"


const BookingCard = ({ booking }: { booking: BookingProps | null }) => {

        if (!booking) {
                return <tr className="w-full mt-4"><td>Loading...</td></tr>;
        }

        const { car, start_date, end_date, total_price, status, car_make, car_model } = booking;



        return (
                <>
                        <tr className="border-b border-gray-700 bg-primary-black-100">
                                <td className="whitespace-wrap px-2 py-4 text-[11px] lg:font-medium flex gap-1 flex-col lg:flex-row"><span>{car_make}</span> <span>{car_model}</span></td>
                                <td className="whitespace-wrap px-2 py-4 text-[11px] lg:font-medium">{start_date}</td>
                                <td className="whitespace-wrap px-2 py-4 text-[11px] lg:font-medium">{end_date}</td>
                                <td className="whitespace-wrap px-2 py-4 text-[11px] lg:font-medium">{total_price}</td>
                                <td className="whitespace-wrap px-2 py-4 text-[11px] lg:font-medium">{status}</td>


                        </tr>

                </>
        )
}

export default BookingCard