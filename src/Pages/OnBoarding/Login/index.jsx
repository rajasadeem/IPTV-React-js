import React from 'react'
import InputField from '../../../Components/InputField'
import Button from '../../../Components/button'
import { useNavigate } from 'react-router-dom'
import useLogin from './helper'

const Login = () => {

    const navigate = useNavigate()
    const {
        onChangeHandler,
        onSubmit,
        errors,
        loginData,
        loading,
        disbledValidation
    } = useLogin()
    const { email, password } = loginData

    return (
        <div className={`w-full bg-slate-100 flex justify-center items-center h-screen bg-cover`}>
            <div className='bg-white w-[27rem] h-[27rem] px-20 rounded-2xl flex justify-center items-center  shadow-2xl'>
                <div className=' w-[25rem] h-[24rem] flex flex-col'>
                    <div className='my-4 flex justify-center items-center flex-col bg-white'>
                        <h1 className='font-bold text-xl text-black'>
                            Welcome Back
                        </h1>
                        <p className='text-xs text-slate-600'>
                            Login in to your account
                        </p>
                    </div>
                    <div className='mt-8'>
                        <InputField
                            name={"email"}
                            label={"Email:"}
                            placeholder={"example@gmail.com"}
                            type={"email"}
                            className={"mb-4"}
                            value={email}
                            onChange={onChangeHandler}
                            error={errors.email}
                        />
                        <InputField
                            name={"password"}
                            label={"Password:"}
                            type={"password"}
                            placeholder={"******"}
                            value={password}
                            onChange={onChangeHandler}
                            error={errors.password}
                        />
                    </div>
                    <div className='bg-white flex justify-center  mt-10'>
                        <Button
                            loading={loading}
                            disabled={disbledValidation}
                            onClick={() => {
                                onSubmit()
                            }}>
                            Continue
                        </Button>
                    </div>
                    <div className='text-xs text-slate-600 mt-8 flex justify-center'>
                        <p>
                            Don't have an account?
                        </p>
                        <p className='underline text-blue-800 ml-1 cursor-pointer' onClick={() => navigate("/signup")}>
                            SIGNUP
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login