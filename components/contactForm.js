import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { doObjToFormData } from "../helpers/helpers";
import http from "../helpers/http";
import IsFormProcessingSpinner from "./isFormProcessingSpinner";
import Text from "./text";
import toast from "react-hot-toast";

export default function ContactForm() {
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();
    const [isProcessing, setIsProcessing] = useState(false);
    const watchAllFields = watch()
    const handleSaveContact = async (frmData) => {
        setIsProcessing(true);
        const response = await http
            .post(
                '/save-contact-message',
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
        <form onSubmit={handleSubmit(handleSaveContact)}>
            <div className="row form_row">
                <div className="col-12">
                    <div className="txt_blk">
                        <input type="text" name="fname" className="input" placeholder="First Name" {...register("fname", {
                            pattern: {
                                value: /^[a-zA-Z][a-zA-Z ]*$/,
                                message: 'Invalid Value!',
                            },
                            required: 'Required'
                        })} />
                        <ErrorMessage
                            errors={errors}
                            name="fname"
                            render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                        />
                    </div>
                </div>
                <div className="col-12">
                    <div className="txt_blk">
                        <input type="text" name="lname" className="input" placeholder="Last Name" {...register("lname", {
                            pattern: {
                                value: /^[a-zA-Z][a-zA-Z ]*$/,
                                message: 'Invalid Value!',
                            },
                            required: 'Required'
                        })} />
                        <ErrorMessage
                            errors={errors}
                            name="lname"
                            render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                        />
                    </div>
                </div>
                <div className="col-12">
                    <div className="txt_blk">
                        <input type="text" name="email" className="input" placeholder="Email"  {...register("email", {
                            required: 'Required', pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
                                message: 'Invalid Email Format'
                            }
                        })} />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                        />
                    </div>
                </div>
                <div className="col-12">
                    <div className="txt_blk">
                        <input type="text" className="input" name="phone" placeholder="Phone Number" {...register("phone", {
                            required: "Required", pattern: {
                                value: /^[0-9-]+$/,
                                message: "Phone format is not valid!"
                            }
                        })} />
                        <ErrorMessage
                            errors={errors}
                            name="phone"
                            render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                        />
                    </div>
                </div>
                <div className="col-12">
                    <div className="txt_blk">
                        <input type="text" className="input" name="subject" placeholder="Subject" {...register("subject", { required: "Required" })} />
                        <ErrorMessage
                            errors={errors}
                            name="subject"
                            render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                        />
                    </div>
                </div>
                <div className="col-12">
                    <div className="txt_blk">
                        <textarea name="message" className="input" placeholder="Write your message" {...register("msg", { required: "Required" })}></textarea>
                        <ErrorMessage
                            errors={errors}
                            name="msg"
                            render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                        />
                    </div>
                </div>

            </div>
            <div className="btn_blk text-center" disabled={isProcessing}>
                <button className="site_btn">Submit <IsFormProcessingSpinner isProcessing={isProcessing} /></button>
            </div>
        </form>
    </>;
}
