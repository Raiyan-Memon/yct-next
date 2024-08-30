'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from '@/lib/axios'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp'
import session from '@/lib/session'

export default function CustomLoginPage() {
    const [mobile, setMobile] = useState()
    const [otp, setOtp] = useState()
    const [error, setError] = useState('')
    const [showOtpInput, setShowOtpInput] = useState(false)

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    async function submit(e) {
        e.preventDefault()

        session({
            token: 'raifaosdfj',
            user: {
                name: 'raiyan',
                phone: 72347834,
                email: 'raiyan@gmail.com',
            },
        })

        await csrf()
        axios
            .post('/api/v1/user/generate-otp', {
                mobile: mobile,
            })
            .then(response => {
                setShowOtpInput(true)
                setError('')
                toast.success('OTP Sent Successfully')
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        console.error(error.response.data.message)
                        setError(error.response.data.message)
                    }
                }
            })
    }
    async function otpSubmit(e) {
        e.preventDefault()
        await csrf()
        axios
            .post('/api/v1/user/login', {
                otp: otp,
                mobile: mobile,
                device_id:
                    'lorem asdjfl sdjf slfj sadlfjsad fjsdfk jsijf asuf8sf uasdjdf sklfj lsdjflasdjf lsdjf asdldkf sd fsjadfj sdf kasdjfsad fasjdflsdfjsdf sdf sdf asd fsd fas fas dfa sdf asdf asdfsd fasdfds dadfasdf asdf asdf asdf asdf asdf asdf',
            })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <div className="container min-h-100">
                <h3>Custom Login page</h3>

                <form onSubmit={submit} className="mt-10">
                    <div>
                        <h5>Enter Number</h5>
                    </div>
                    <Input
                        id="mobile"
                        onChange={e => {
                            setMobile(e.target.value)
                        }}
                        name="mobile"
                        required
                        placeholder="Enter Number"
                    />
                    <span className="text-red-600 mb-4">{error}</span>
                    <div>
                        <Button className="mt-4" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
                {/* {!showOtpInput ? (
                ) : (
                )} */}
                <form onSubmit={otpSubmit} className="mt-10">
                    <div>
                        <h5>Enter OTP</h5>
                    </div>
                    <Input
                        id="otp"
                        onChange={e => {
                            setOtp(e.target.value)
                        }}
                        name="otp"
                        required
                        placeholder="Enter OTP"
                    />
                    <div>
                        <Button className="mt-4" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}
