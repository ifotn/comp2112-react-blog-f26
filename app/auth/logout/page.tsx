'use client';

import { useRouter } from "next/navigation";
import { useSessionCounter } from "@/app/context/globalContext";

export default function Logout() {
    // access global context username set method so we can clear it - user is logging out
    const { setUsername } = useSessionCounter();

    const router= useRouter();
    const apiDomain: string = process.env.NEXT_PUBLIC_API_DOMAIN!;

    const handleLogout = async () => {
        try {
            const response: Response = await fetch(`${apiDomain}/users/logout`, {
                credentials: 'include' // include domain cookies which has our jwt we need to expire
            });

            if (response.ok) {
                // clear global context username
                setUsername('');
                router.push('/');
            }
        }
        catch (error: unknown) {
            console.log(`Logout Error: ${error}`);
        }
    }

    handleLogout();

    return (
        <h1>Logging Out...</h1>
    );
}