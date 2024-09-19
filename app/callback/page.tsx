"use client";
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { verifyPayment } from '@/utils';
import { isAuthenticated } from '@/utils/auth';
import { useSearchParams } from 'next/navigation';

const Page = () => {
        const [success, setSuccess] = useState(false);
        const [message, setMessage] = useState<string>("");
        const [reference, setReference] = useState<string | null>(null);
        const searchParams = useSearchParams();

        useEffect(() => {
                if (typeof window !== 'undefined') {
                        const ref = searchParams.get('reference');
                        setReference(ref);
                }
        }, [searchParams]);

        useEffect(() => {
                const checkPaymentStatus = async () => {
                        const getIsAuthenticated = await isAuthenticated();
                        if (getIsAuthenticated && reference) {
                                const paymentStatus = await verifyPayment(reference);

                                if (paymentStatus.status === 'success') {
                                        setSuccess(true);
                                        setMessage(paymentStatus.message);
                                } else if (paymentStatus.status === 'failed') {
                                        setSuccess(false);
                                        setMessage(paymentStatus.message);
                                }
                        } else {
                                console.log('User not authenticated');
                        }
                };

                if (reference) {
                        checkPaymentStatus();
                }
        }, [reference]);

        return (
                <div className='booking'>
                        <div className='w-full h-[100vh] flex-center'>
                                <div className='w-[30%] flex-center h-[20vh] p-4 bg-white shadow-lg rounded-lg text-center'>
                                        {success ? (
                                                <p className='text-green-600 font-bold text-[20px] flex-center flex-col'>
                                                        <FaCheckCircle style={{ color: 'green', fontSize: '50px' }} />
                                                        {message}
                                                </p>
                                        ) : (
                                                <p className='text-red-600 font-bold text-[20px]'>{message}</p>
                                        )}
                                </div>
                        </div>
                </div>
        );
};

export default Page;
