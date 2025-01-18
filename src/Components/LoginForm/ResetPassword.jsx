import './LoginForm.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passwordLengthValid, setPasswordLengthValid] = useState(true);

    const handleResetPassword = (e) => {
        e.preventDefault();
        // Check if the passwords match
        if (newPassword === confirmPassword) {
            setPasswordMatch(true); // Reset passwordMatch state

            // Check if the password meets the length requirement
            if (newPassword.length >= 8) {
                setPasswordLengthValid(true); // Reset passwordLengthValid state

                // Implement your logic here to handle resetting the password
                console.log('New Password:', newPassword);
                console.log('Confirm Password:', confirmPassword);
                // You can send an API request here to reset the password
            } else {
                setPasswordLengthValid(false);
            }
        } else {
            setPasswordMatch(false);
        }
    };

    return (
        <div className='SignUp'>
            <form className="Form 2xl:w-[534px] lg:w-[426px] lg:float-end lg:h-full" onSubmit={handleResetPassword}>
                <h2>Reset Password</h2>
                <p className="form-para fp1">Enter your new password below.</p>
                <input
                    className="focus:ring-blue-500 input-custom"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    className="focus:ring-blue-500 input-custom"
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <p className='notice-text'>Note: Password shouldn’t be less than 8 characters.</p>
                {!passwordMatch && <p className="text-red-500">Passwords do not match.</p>}
                {!passwordLengthValid && <p className="text-red-500">Password must be at least 8 characters long.</p>}
                <Button type="submit" className="sub-button  mt-4">
                    Save
                </Button>
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

export default ResetPassword;
