import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { doObjToFormData } from "../helpers/helpers";
import http from "../helpers/http";
import IsFormProcessingSpinner from "./isFormProcessingSpinner";
import Text from "./text";
import toast from "react-hot-toast";
export default function Newsletter() {
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();
    const [isProcessing, setIsProcessing] = useState(false);
    const watchAllFields = watch()
    const handleSubscribe = async (frmData) => {
        setIsProcessing(true);
        const response = await http
            .post(
                '/save-newsletter',
                doObjToFormData(frmData)
            )
            .then((response) => response.data)
            .catch((error) => error);
        setIsProcessing(false);
        if (response?.validation_error) {
            toast.error(<Text string={response?.validation_error} />);
        }
        else if (response?.status === 1) {
            toast.success(response?.msg)
            setTimeout(() => {
                reset()
            }, 1000);
        }
        else {
            toast.error(<Text string={response?.msg} />);
        }
    };
    return <>
        <div className="in_col">
            <h4>
                Signup for Newsletters
            </h4>
            <div className="subscribe">
                <p>Stay up to date with the latest news and deals!</p>
                <form onSubmit={handleSubmit(handleSubscribe)}>
                    <input type="text" className="input" name="" placeholder={"Enter your email address"} defaultValue={watchAllFields?.email} {...register("email", {
                        required: "Email is required.",
                        pattern: {
                            value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Please enter a valid email",
                        },
                    })} />
                    <button type="submit" disabled={isProcessing}>
                        <img src="/images/send.png" />
                        <IsFormProcessingSpinner isProcessing={isProcessing} />
                    </button>
                </form>
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                />
            </div>
        </div>
    </>;
}
