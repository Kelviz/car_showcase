"use client";

import { Suspense, useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import { verifyPayment } from '@/utils';
import { isAuthenticated } from '@/utils/auth';

function PaymentStatus() {
        const [success, setSuccess] = useState(false);
        const [message, setMessage] = useState<string>("");
        const searchParams = useSearchParams();
        const reference = searchParams.get('reference');

        useEffect(() => {
                const checkPaymentStatus = async () => {
                        const getIsAuthenticated = await isAuthenticated();
                        if (getIsAuthenticated) {
                                if (reference) {
                                        const paymentStatus = await verifyPayment(reference);

                                        if (paymentStatus.status === 'success') {
                                                setSuccess(true);
                                                setMessage(paymentStatus.message);
                                        } else if (paymentStatus.status === 'failed') {
                                                setSuccess(false);
                                                setMessage(paymentStatus.message);
                                        }
                                }
                        } else {
                                console.log('User not authenticated');
                        }
                };

                checkPaymentStatus();
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
}

export default function Page() {
        return (
                <Suspense fallback={<div>Loading...</div>}>
                        <PaymentStatus />
                </Suspense>
        );
}
