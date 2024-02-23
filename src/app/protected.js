"use client"

import {  SessionProvider  } from "next-auth/react"
const Protected = ({children})=>{
    return <SessionProvider> {children} </SessionProvider>
}
export default Protected