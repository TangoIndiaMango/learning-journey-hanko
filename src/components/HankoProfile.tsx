"use client"

import { useEffect } from "react";
import { register } from "@teamhanko/hanko-elements";
import HankoError from "./HankoError";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL as string;

export default function HankoProfile() {
    useEffect(() => {
        register(hankoApi).catch((error) => {
            // handle error
            console.log("Hanko Auth Profile", error)
            return < HankoError />

        });
    }, []);

    return <hanko-profile />;
}

