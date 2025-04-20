'use client'

import { googleAuthenticate } from "@/actions/google-login"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { BsGoogle } from "react-icons/bs"

export default function GoogleButton() {
    const [ errorMsGoogle, dispatchGoogle ] = useActionState(googleAuthenticate, undefined);
    return (
        <form className="flex mt-4" action={dispatchGoogle}>
            <Button
                variant="outline"
                className="w-full"
            >
                <BsGoogle className="mr-2" />
                Sign in with Google
            </Button>
            {errorMsGoogle && (
                <p className="text-red-500 text-sm mt-2">
                    {errorMsGoogle?.error}
                </p>
            )}
        </form>
    )
}