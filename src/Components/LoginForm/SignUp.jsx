import { useState } from 'react';
import "./LoginForm.css";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import LogoIcon from '../Ui-Components/LogoIcon';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault(); // Prevent form submission

        // Check if password is less than 8 characters
        if (password.length < 8) {
            setPasswordError('Password should be at least 8 characters long.');
            return;
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }

        // Your sign-up logic here
    };

    return (
        <section className="SignUp">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-12 lg:col-span-6 xl:col-span-8">
                        <div className="flex flex-col justify-between h-full">
                            <div className='sm-hidden md:block lg:block mt-2 2xl:mt-3'>
                                <LogoIcon />
                            </div>
                            <div className="title-form sm-hidden lg:block">
                                <h3 className="font-black-48">Imagination Unbound</h3>
                                <p className="form-para">
                                    Aeon Protocol invites you to defy the ordinary. Experience the alchemy of art and AI as you convert thoughts into breathtaking imagery. Your canvas awaits beyond this gateway.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-12 lg:col-span-6 xl:col-span-4">
                        <form className="Form lg:h-[92vh] overflow-y-auto" onSubmit={handleSignUp}>
                            <h2>Sign Up</h2>
                            <p className="form-para fp1">Create your new account.</p>
                            <input className="focus:ring-blue-500 input-custom" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            <input className="focus:ring-blue-500 input-custom" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <input className="focus:ring-blue-500 input-custom" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <input className="focus:ring-blue-500 input-custom" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            {passwordError && <p className="text-red-500">{passwordError}</p>}
                            <p className="notice-text">Note: Password shouldn’t be less than 8 characters.</p>
                            <Button type="submit" className="sub-button">
                                Sign Up
                            </Button>
                            <div className="mt-10 md:mt-5 lg:mt-8 2xl:mt-12 ">
                                <p className="para-18-500 text-center">Already have an account? <span className="font-bold duration-300 hover:text-gray-200 cursor-pointer">
                                    <Link to="/">Sign in</Link>
                                </span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
