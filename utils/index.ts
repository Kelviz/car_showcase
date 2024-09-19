import { FilterProps, bookingDataProps, ConfirmBookingProps, verifyPaymentProps} from "@/types";


export const calculateCarRent = (city_mpg: number, year: number) => {
        const basePricePerDay = 50; // Base rental price per day in dollars
        const mileageFactor = 0.1; // Additional rate per mile driven
        const ageFactor = 0.05; // Additional rate per year of vehicle age
      
        // Calculate additional rate based on mileage and age
        const mileageRate = city_mpg * mileageFactor;
        const ageRate = (new Date().getFullYear() - year) * ageFactor;
      
        // Calculate total rental rate per day
        const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
      
        return rentalRatePerDay.toFixed(0);
      };



export async function fetchCars(filters: FilterProps) {
        const { manufacturer, year, model, limit, fuel } = filters;
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${apiBaseUrl}/api/v1/cars/?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel=${fuel}`, {   
                headers: {
                        'Cache-Control': 'no-store',
                      },            
        });

        const result = await response.json();
        return result.data;
}


export async function fetchBookings(title: string) {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
        const currentBookingUrl = `${apiBaseUrl}/api/v1/bookings/current_bookings/`
        const expiredBookingUrl = `${apiBaseUrl}/api/v1/bookings/expired_bookings/`
        const access_token = localStorage.getItem('access_token');

        if (title === "current") {
                const response = await fetch(currentBookingUrl, {
                        method: "GET",
                        headers: {
                                'Authorization': `Bearer ${access_token}`,
                                'Content-Type': 'application/json',
                        }
                })

                if (response.status === 200) {
                        const data = await response.json()
                        console.log("my data:", data)
                        return data;
                }

                else if (response.status === 401) {
                        const data = "unauthorized"
                        console.log("unauthorized request")
                        return data
                }


        } else if (title === "expired") {
                
                const response = await fetch(expiredBookingUrl, {
                        method: "GET",
                        headers: {
                                'Authorization': `Bearer ${access_token}`,
                                'Content-Type': 'application/json',
                        }
                })

                if (response.status === 200) {
                        const data = await response.json()
                        console.log("my data:", data)
                        return data;
                }

                else if (response.status === 401) {
                        const data = "unauthorized"
                        return data
                }

        }
}



export async function fetchUser() {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiBaseUrl}/api/v1/users/me/`
        const access_token = localStorage.getItem('access_token')

        try {
                const response = await fetch(url, {
                        method: "GET",
                        headers: {
                                "Authorization": `Bearer ${access_token}`,
                                "Content-Type": 'application/json',
                        }
               })

                if (response.ok) {
                        const result = await response.json()
                        return result.data
                } else {
                        console.log("error fetching user")
                }
                
        } catch (error) {
                console.log(error)
        }

}


export async function bookCar(bookingData: bookingDataProps) {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiBaseUrl}/api/v1/bookings/`
        const access_token = localStorage.getItem('access_token')
        try {
                const response = await fetch(url, {
                        method: "POST",
                        body: JSON.stringify({...bookingData }),
                        headers: {
                                "Authorization": `Bearer ${access_token}`,
                                "Content-Type": 'application/json'
                        }
                })

                if (response.ok) {
                        const result = await response.json()
                        console.log('result data:', result)
                        return result

                } else if (response.status === 401) {
                        console.log("User Not Authenticated")
                        const data = "unauthorized"
                        return data
                }
                
        } catch (error) {
                console.log("error", error)
        }


        
}


export async function fetchBookingDetail(bookingId: number) {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiBaseUrl}/api/v1/bookings/${bookingId}/`
        const access_token = localStorage.getItem('access_token')

        try {
                const response = await fetch(url, {
                        method: "GET",
                        headers: {
                                "Content-Type": 'application/json',
                                "Authorization": `Bearer ${access_token}`
                        }
                })

                if (response.ok) {
                        const result = await response.json()
                        return result
                }else if (response.status === 401) {
                        console.log("User Not Authenticated")
                        const data = "unauthorized"
                        return data
                }
                
        } catch (error) {
                console.log("error", error)
        }
}

export async function confirmBooking(bookingConfirmationData: ConfirmBookingProps) {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiBaseUrl}/api/payment/initiate/`
        const access_token = localStorage.getItem('access_token')

        try {
                const response = await fetch(url, {
                        method: "POST",
                        body: JSON.stringify({...bookingConfirmationData}),
                        headers: {
                                "Content-Type": 'application/json',
                                "authorization": `Bearer ${access_token}`

                        }
                }
                )

                if (response.ok) {
                        const result = await response.json()
                        console.log("result", result)
                        return result
                }


                
        } catch (error) {
                console.log("error", error)
        }
        
}




export async function verifyPayment(reference: string | null) {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiBaseUrl}/api/payment/verify/`
        const access_token = localStorage.getItem('access_token')

        try {
                const response = await fetch(url, {
                        method: "POST",
                        body: JSON.stringify({reference}),
                        headers: {
                                "Content-Type": 'application/json',
                                "authorization": `Bearer ${access_token}`

                        }
                }
                )

                if (response.ok) {
                        const result = await response.json()
                        console.log("result", result)
                        return result
                }


                
        } catch (error) {
                console.log("error", error)
        }
        
}








export const updateSearchParams = (type: string, value: string) => {
        
        const searchParams = new URLSearchParams(window.location.search);

        searchParams.set(type, value)

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`

        return newPathname
}
