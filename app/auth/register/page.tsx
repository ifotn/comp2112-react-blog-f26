'use client';

import PageTitle from "@/app/components/pageTitle";
import { useForm, Controller } from "react-hook-form";

interface RegisterFormData {
    username: string;
    password: string;
    confirm: string;
}

export default function Register() {

    // set up react-hook-form
    const { register, control, handleSubmit, setError, formState: { errors, isSubmitSuccessful }} = useForm<RegisterFormData>({
        defaultValues: {
            username: '',
            password: '',
            confirm: ''
        }
    });

    const onSubmit = async (data: RegisterFormData) => {
        console.log(`Submitted: `, data);
    }

    return (
        <main>
            <PageTitle title="Register" />
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="username">Username:</label>
                    <input {...register("username", { required: "Username is required" })} type="email" />
                    {errors.username && <span className="error">{errors.username.message}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password:</label>
                    <input type="password" {...register("password", { required: "Password is required" })} />
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input
                        type="password"
                        {...register("confirm", {
                            required: "Password Confirmation is required"  })}
                    />
                    {errors.confirm && <span className="error">{errors.confirm.message}</span>}
                </fieldset>
                <button>Register</button>
            </form>
        </main>
    );
}