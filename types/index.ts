import { MouseEventHandler, ChangeEventHandler } from "react";

export interface customButtonProps{
        title: string;
        containerStyles?: string;
        handleClick?: MouseEventHandler<HTMLButtonElement>;
        btnType?: "button" | "submit";
        textStyles?: string;
        rightIcon?: string;
        isDisabled?: boolean;
}

export interface authInputProps{
        type: string;
        name: string;
        value: string;
        placeholder: string;
        handleOnchange?: ChangeEventHandler<HTMLInputElement>;
}


export interface SearchManufacturerProps {
        manufacturer: string;
        setManufacturer: (manufacturer: string) => void;
}

export interface verifyPaymentProps {
        reference: string | null;
}

export interface CarProps{
        id: number;
        city_mpg: number;
        class: string;
        combination_mpg: number;
        cylinders: number;
        displacement: number;
        drive: string;
        fuel_type: string;
        highway_mpg: number;
        make: string;
        model: string;
        transmission: string;
        year: number;
        daily_rent: number;
        available: boolean;
        image: string | null;
}


export interface FilterProps {
        manufacturer: string;
        year: number;
        fuel: string;
        limit: number;
        model: string;
}

export interface UserDataProps{
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        phone: string;
}

export interface BookingProps{
        car: string;
        start_date: string;
        end_date: string;
        total_price: string;
        status: string;
        car_make: string;
        car_model: string;
}

export interface bookingDataProps{
        start_date: string;
        end_date: string;
        total_price: number;
        car_make: string;
        car_model: string;
        car: number;
        status: string;
}

export interface ConfirmBookingProps{
        booking_id: number;
        email: string;
}

export interface OptionProps{
        title: string;
        value: string;
}

export interface CustomFilterProps {
        title: string;
        options: OptionProps[];
}

export interface BookingFilterProps {
        options: string;
        handleBookingOnchange?: ChangeEventHandler<HTMLSelectElement>;

}

export interface ShowMoreProps {
        pageNumber: number;
        isNext: boolean;
}