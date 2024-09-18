import React from 'react'

interface ResponseMessageProps {
        message: string | null;
        containerStyle: string | null;
}

const ResponseMessage = ({ message, containerStyle }: ResponseMessageProps) => {
        return (
                <>

                        {message && (

                                <div className={`flex flex-center w-[30%] p-3 h-[60px] text-center bg-white ${containerStyle}`}>
                                        <p>{message}</p>
                                </div>

                        )}
                </>

        )
}

export default ResponseMessage