'use client';

import { useRouter } from "next/navigation";

export default function Logout() {
    const router= useRouter();
    const apiDomain: string = process.env.NEXT_PUBLIC_API_DOMAIN!;

    const handleLogout = async () => {
        try {
            const response: Response = await fetch(`${apiDomain}/users/logout`, {
                credentials: 'include' // include domain cookies which has our jwt we need to expire
            });

            if (response.ok) {
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