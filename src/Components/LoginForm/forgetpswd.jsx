import { Button } from '@material-tailwind/react';
import { useState } from 'react';

import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const ForgetPassword = () => {
    const [email, setEmail] = useState('');

    const handleForgetPassword = (e) => {
        e.preventDefault();
        // Implement your forget password logic here
        console.log('Forget Password clicked with email:', email);
        // You can send an API request here to reset the password
    };

    return (
        <div className='SignUp'>
            <form className="Form 2xl:w-[534px] lg:w-[426px] lg:float-end lg:h-full" onSubmit={handleForgetPassword}>
                <h2>Forget Password</h2>
                <p className="form-para fp1">Enter your email to get password reset code.</p>
                <input
                    className="focus:ring-blue-500 input-custom"
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Link to="/otp">
                    <Button type="submit" className="sub-button  mt-4">
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

export default ForgetPassword;
