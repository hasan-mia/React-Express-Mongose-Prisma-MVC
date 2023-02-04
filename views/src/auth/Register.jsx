import { Button, Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Register() {
    const [active, setActive] = useState(true);
    const activeHandler = () => {
        setActive(!active);
    };
    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-center text-xl py-1">Register</h2>
            <div className="flex flex-col gap-2">
                <Input label="Email/User" />
                <Input
                    label="Password"
                    icon={active ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    onClick={activeHandler}
                />
                <Button color="green">Submit</Button>
            </div>
            <div className="flex flex-row pt-1">
                <p>Already have an account?</p> &nbsp;
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Register;
