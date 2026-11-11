'use client';

import PageTitle from "@/app/components/pageTitle";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSessionCounter } from "@/app/context/globalContext";

interface LoginFormData {
    username: string;
    password: string;
}

export default function Login() {
    // access global context username so we can set it on successful login
    const { setUsername } = useSessionCounter();

    // router for redirect after successful login
    const router  = useRouter();

    // set up react-hook-form
    const { register, control, handleSubmit, setError, formState: { errors, isSubmitSuccessful }} = useForm<LoginFormData>({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = async (data: LoginFormData) => {
        //console.log(`Submitted: `, data);
        try {
            // create json payload from form values
            const payload = {
                username: data.username,
                password: data.password
            };

            // get api domain from .env
            const apiDomain: string = process.env.NEXT_PUBLIC_API_DOMAIN!;

            // make POST request to server API, trying to log in
            const response: Response = await fetch(`${apiDomain}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: 'include' // required to store the http cookie w/jwt
            });

            // interpret api response
            const apiResponse: any = await response.json();
            //console.log(apiResponse);

            if (apiResponse.success == false) {
                setError("username", {
                    type: "api",
                    message: apiResponse.msg || 'Login Failed'
                });
            }
            else {
                // set username in global context
                setUsername(data.username);

                // redirect to blog
                router.push('/blog');
            }
        }
        catch (error: unknown) {
            console.log(error);
        }
    }

    return (
        <main>
            <PageTitle title="Login" />
            <h1>Login</h1>
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
                <button>Login</button>
            </form>
        </main>
    );
}