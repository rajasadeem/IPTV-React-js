import React, { useState } from "react";

const useValidation = () => {
    const [errors, setErrors] = useState({})

    const emailValidation = (e) => {
        const { value, name } = e.target;

        if (value
            ?.toLowerCase()
            ?.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            setErrors((prev) => ({ ...prev, [name]: "" }));

        }
        else {
            setErrors((prev) => ({ ...prev, [name]: "Please enter a valid email address." }));

        }
    }

    const nameValidation = (e) => {
        const { value, name } = e.target
        if(value.length < 2) {
            setErrors((prev) => ({ ...prev, [name]: "Name must have more than 2 characters"}))
        }
        else if(value.length > 20) {
            setErrors((prev) => ({ ...prev, [name]: "Name can't have more than 20 characters"}))
        }
        else if (value
            ?.toLowerCase()
            ?.match(
                /^[a-zA-Z0-9_ ]+$/
            )) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
        else {
            setErrors((prev) => ({ ...prev, [name]: "Name cannot include special characters." }));
        }
    }

    const passwordValidation = (e) => {
        const { value, name } = e.target;
        if (value.length < 6) {
            setErrors((prev) => ({ ...prev, [name]: "Use 6 characters or more for your password" }));
        }
        if(value.length > 12) {
            setErrors((prev) => ({ ...prev, [name]: "Password cannot includes more than 12 characters"}))
        }
        if (value.length >= 6 ) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    }

    const seriesNameValidation = (e) => {
        const { name, value } = e.target
        if(value?.length > 30){
            setErrors((prev) => ({ ...prev, [name]: "Name cannot have more than 30 characters"}))
        }
        else if(value?.length < 2) {
            setErrors((prev) => ({...prev, [name]: "Name cannot have less than 2 characters"}))
        }
        else {
            setErrors((prev) => ({...prev, [name]: ""}))
        }
    }

    const seriesDescriptionValidation = (e) => {
        const { name, value } = e.target
        if(value?.length > 200){
            setErrors((prev) => ({ ...prev, [name]: "Description cannot have more than 200 characters"}))
        }
        else if(value?.length < 2) {
            setErrors((prev) => ({...prev, [name]: "Description cannot have less than 2 characters"}))
        }
        else {
            setErrors((prev) => ({...prev, [name]: ""}))
        }
    }


    return {
        emailValidation,
        nameValidation,
        passwordValidation,
        errors,
        setErrors,
        seriesNameValidation,
        seriesDescriptionValidation
    }
}

export default useValidation