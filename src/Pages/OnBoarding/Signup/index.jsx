import React, { useState } from 'react'
import InputField from '../../../Components/InputField'
import Button from '../../../Components/button'
import { useNavigate } from 'react-router-dom'
import useSignup from './helper'

const Signup = () => {

    const {
        errors,
        signupData,
        onChangeHandler,
        onSubmit,
        disbledValidation,
        loading
    } = useSignup()

    const { first_name, last_name, email, password } = signupData
    const navigate = useNavigate()

    return (
        <div className={`w-full bg-slate-100 flex justify-center items-center h-screen bg-cover`}>
            <div className='bg-white w-[27rem] h-[32rem] px-20 rounded-2xl flex justify-center items-center  shadow-2xl'>
                <div className=' w-[25rem] h-[27rem] flex flex-col  '>
                    <div className='flex justify-center items-center flex-col'>
                        <h1 className='font-bold text-xl text-black'>
                            Register
                        </h1>
                        <p className='text-xs text-slate-600'>
                            Getting started in easy
                        </p>
                    </div>
                    <div className='mt-5'>
                        <InputField
                            name={"first_name"}
                            label={"First Name:"}
                            placeholder={"raja"}
                            type={"text"}
                            className={"mb-2"}
                            value={first_name}
                            onChange={onChangeHandler}
                            error={errors.first_name}
                        />
                        <InputField
                            name={"last_name"}
                            label={"Last Name:"}
                            type={"text"}
                            placeholder={"sadeem"}
                            className={"mb-2"}
                            value={last_name}
                            onChange={onChangeHandler}
                            error={errors.last_name}
                        />
                        <InputField
                            name={"email"}
                            label={"Email:"}
                            placeholder={"example@gmail.com"}
                            type={"email"}
                            className={"mb-2"}
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
                            disabled={disbledValidation}
                            loading={loading}
                            onClick={() => {
                                onSubmit()
                            }}>
                            Register
                        </Button>
                    </div>
                    <div className='text-xs text-slate-600 mt-5 flex justify-center'>
                        <p>
                            Already have an account?
                        </p>
                        <p className='underline text-blue-800 ml-1 cursor-pointer' onClick={() => navigate("/login")}>
                            LOGIN
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup