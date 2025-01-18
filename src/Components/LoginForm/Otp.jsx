import { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import "./LoginForm.css";
const Otp = () => {
    const [otp, setOtp] = useState('');

    const handleConfirm = (e) => {
        e.preventDefault();
        console.log('OTP submitted:', otp);
    };

    return (
        <div className='SignUp'>
            <form className="Form 2xl:w-[534px] lg:w-[426px] lg:float-end lg:h-full" onSubmit={handleConfirm}>
                <h2>Enter OTP</h2>
                <p className="form-para fp1">Enter the 6-digit code sent to tony*****@email.com</p>
                <input
                    className="focus:ring-blue-500 input-custom"
                    type="text"
                    placeholder="Enter the code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <Link to="/ResetPassword">
                    <Button type="submit" className="sub-button mt-4">
                        Confirm
                    </Button>
                </Link>
                <div className="mt-12 md:mt-5 xl:mt-12 lg:mt-6">
                    <p className="para-18-500 text-center">
                        Remembered your password?{' '}
                        <span className="font-bold duration-300 hover:text-gray-200 cursor-pointer">
                            <Link to="/">Sign in</Link>
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Otp;
