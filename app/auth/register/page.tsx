'use client';

import PageTitle from "@/app/components/pageTitle";
import { useForm, Controller } from "react-hook-form";

interface RegisterFormData {
    username: string;
    password: string;
    confirm: string;
}

const getPasswordStrength = (password: string) => {
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        digit: /\d/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    const passed = Object.values(checks).filter(Boolean).length;

    // password strength defaults to Weak
    let label: string = "Weak";

    if (passed == 4) label = "Medium";
    if (passed == 5) label = "Strong";

    return { label, passed, checks };
};

export default function Register() {

    // set up react-hook-form
    const { register, control, handleSubmit, watch, setError, formState: { errors, isSubmitSuccessful }} = useForm<RegisterFormData>({
        defaultValues: {
            username: '',
            password: '',
            confirm: ''
        }
    });

    // password watcher
    const password: string = watch("password") || "";
    const { label, checks } = getPasswordStrength(password);

    const validatePassword = (value: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        return passwordRegex.test(value) || "Must be 8+ chars with 1 uppercase, 1 lowercase, 1 number, and 1 special character";
    };

    const onSubmit = async (data: RegisterFormData) => {
        console.log(`Submitted: `, data);

        try {
            // set up json payload
            const payload = {
                username: data.username,
                password: data.password
            }

            // get api domain from .env ; ! at the end is just a null check
            const apiDomain: string = process.env.NEXT_PUBLIC_API_DOMAIN!;

            // make post request to server API to try registering new user
            const response: Response = await fetch(`${apiDomain}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // interpret api response
            const apiResponse: any = await response.json();
            console.log(apiResponse);

            if (apiResponse.success === false) {
                setError("username", {
                    type: "api",
                    message: apiResponse.msg || "Registration Failed"
                });
            }
            else {
                alert("Registration Successful!  Use the Login link above.");
            }
        }
        catch (error: unknown) {
            console.log(error);
        }
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
                <fieldset className="password-fieldset">
                    <label htmlFor="password">Password:</label>
                    <div className="password-row">
                        {/* left column */}
                        <div className="flex-1">
                            <input type="password" {...register("password", { required: "Password is required" })}
                               />
                            {errors.password && <span className="error">{errors.password.message}</span>}
                            <div className="strength-bar">
                                <div className={`strength-fill ${
                                    label == "Weak" ? "strength-weak" 
                                        : label == "Medium" ? "strength-medium"
                                        : "strength-strong"
                                }`}></div>
                            </div>
                            <p className="strength-label">Strength: {label}</p>
                        </div>
                        {/* end left column */}
                        {/* right column */}
                        <ul className="password-checklist">
                            <li className={checks.length ? "check-pass" : "check-fail"}>
                                Min 8 characters
                            </li>
                            <li className={checks.lowercase ? "check-pass" : "check-fail"}>
                                1 lowercase letter
                            </li>
                            <li className={checks.uppercase ? "check-pass" : "check-fail"}>
                                1 uppercase letter
                            </li>
                            <li className={checks.digit ? "check-pass" : "check-fail"}>
                                1 digit
                            </li>
                            <li className={checks.special ? "check-pass" : "check-fail"}>
                                1 special character
                            </li>
                        </ul>
                        {/* end right column */}
                    </div>
                </fieldset>
                <fieldset>
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input
                        type="password"
                        {...register("confirm", {
                            required: "Password Confirmation is required",
                            validate: (value, formValues) => {
                                return value === formValues.password || "Passwords do not match"
                            }
                        })}
                    />
                    {errors.confirm && <span className="error">{errors.confirm.message}</span>}
                </fieldset>
                <button>Register</button>
            </form>
        </main>
    );
}