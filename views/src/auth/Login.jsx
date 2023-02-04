import { Button, Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Login() {
    const [active, setActive] = useState(true);
    const activeHandler = () => {
        setActive(!active);
    };
    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-center text-xl py-1">Login</h2>
            <div className="flex flex-col gap-2">
                <Input label="Email/User" />
                <Input
                    label="Password"
                    icon={active ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    onClick={activeHandler}
                />
                <Button color="green">Login</Button>
            </div>
            <div className="flex flex-row pt-1">
                <p>Need an account?</p> &nbsp;
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
}

export default Login;
