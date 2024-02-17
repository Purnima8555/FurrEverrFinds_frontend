import './css/LoginSignUp.css';
import { MdMail } from "react-icons/md";
import { FaUserAlt, FaLock, FaPhoneVolume } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {FaCircleArrowLeft} from "react-icons/fa6";

const LoginSignUp: React.FC = () => {
    const navigate = useNavigate();

    const [isActivePopup, setIsActivePopup] = useState(true);
    const [isRegisterFormActive, setIsRegisterFormActive] = useState(false);

    useEffect(() => {
        setIsActivePopup(true);
    }, []);

    const showLoginForm = () => {
        setIsActivePopup(true);
        setIsRegisterFormActive(false);
        reset();
    };

    const showRegisterForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setIsActivePopup(true);
        setIsRegisterFormActive(true);
        reset();
    };

    const saveData = useMutation({
        mutationKey: "SAVEDATA",
        mutationFn: (requestData: any) => {
            return axios.post("http://localhost:8080/users/save", requestData, {});
        },
        onSuccess: () => {
            showLoginForm();
        },
    });

    const onRegister = (values: any) => {
        saveData.mutate(values);
    };

    const loginUser = useMutation({
        mutationKey: "LOGINUSER",
        mutationFn: async (loginData: any) => {
            try {
                const response = await axios.post("http://localhost:8080/authenticate", loginData);
                const {token, userId, role} = response.data;

                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);

                if (role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }

                return response;
                } catch (error: any) {
                    console.error('Error Navigating:', error.message);
                }
        },
    });

    const handleLogin = async (values: any) => {
        try {
            await loginUser.mutateAsync(values);
        } catch (error) {
            alert(`Invalid credentials: ${error}`);
        }
    };

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    return (
        <>
            <header className="backbtn">
                <a onClick={() => navigate("/")}><i><FaCircleArrowLeft size="2rem" /></i> Go Back</a>
            </header>

            <div className={`wrapper ${isActivePopup ? 'active-popup' : ''} ${isRegisterFormActive ? 'active' : ''}`}>
                {isRegisterFormActive ? (
                    <div className="form-box register">
                        <h2>REGISTRATION</h2>
                        <form onSubmit={handleSubmit(onRegister)}>
                        <div className={"input-box"}>
                            <span className="icon"><FaUserAlt /></span>
                        <input type="text" required {...register("firstName")}/>
                            <label>First Name</label>
                        </div>
                        <div className={"input-box"}>
                            <span className="icon"><FaUserAlt /></span>
                        <input type="text" required {...register("lastName")}/>
                            <label>Last Name</label>
                        </div>
                        <div className={"input-box"}>
                            <span className="icon"><FaUserAlt /></span>
                        <input type="text" required {...register("username")}/>
                            <label>Username</label>
                        </div>
                        <div className={"input-box"}>
                            <span className="icon"><MdMail /></span>
                        <input type="email" required {...register("email")}/>
                            <label>Email</label>
                        </div>
                        <div className={"input-box"}>
                            <span className="icon"><FaPhoneVolume /></span>
                        <input type="text" pattern="[0-9]*" required {...register("mobileNo")}/>
                            <label>Mobile No.</label>
                        </div>
                        <div className={"input-box"}>
                            <span className="icon"><FaLock /></span>
                        <input type="password" required {...register("password")}/>
                            <label>Password</label>
                        </div>
                        <div className={"input-box"}>
                            <span className="icon"><FaLock /></span>
                        <input type="password" required {...register("cpassword")}/>
                            <label>Confirm Password</label>
                        </div>
                        <div className="register-btn">
                            <input type={"submit"} value={"Register"}/>
                        </div>

                        <div className="login-register">
                            <p>Already have an account?<a href=" " onClick={showLoginForm} className='login-link'>SignIn</a></p>
                        </div>
                    </form>
                </div>
            ) : (
                    <div className="form-box login">
                        <h2>LOGIN</h2>
                        <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="input-box">
                            <span className="icon"><FaUserAlt /></span>
                            <input type="text" required {...register("username")}/>
                            <label>Username</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><FaLock /></span>
                            <input type="password"  required {...register("password")}/>
                            <label>Password</label>
                        </div>
                        <div className="remember-forgot">
                            {/*<a onClick={() => {*/}
                            {/*    navigate("/forgotpwd") }}>Forgot Password?</a>*/}
                        </div>
                        <div className="login-btn">
                        <button type="submit">Login</button>
                        </div>

                        <div className="login-register">
                            <p>Don't have an account?<a href="/" onClick={showRegisterForm} className='register-link'>SignUp</a></p>
                        </div>
                    </form>
                </div>
            )}
        </div>

        </>
    );
};
export default LoginSignUp