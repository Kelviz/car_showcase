import { authInputProps } from '@/types';


const AuthForm = ({ type, name, value, placeholder, handleOnchange }: authInputProps) => {
        return (
                <div className="w-full mt-4 flex flex-col gap-4">
                        <input
                                type={type}
                                name={name}
                                value={value}
                                placeholder={placeholder}
                                className="auth__input"
                                onChange={handleOnchange}
                                required
                        />


                </div>
        )
}

export default AuthForm