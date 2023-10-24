"use client"

import { useEffect } from "react";
import { register } from "@teamhanko/hanko-elements";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL as string;

export default function HankoProfile() {
    useEffect(() => {
        register(hankoApi).catch((error) => {
            // handle error
            console.log("Hanko Auth Profile", error)
        });
    }, []);

    return <hanko-profile />;
}

