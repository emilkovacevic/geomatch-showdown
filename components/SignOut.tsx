'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

const SignOutBtn = () => {
  return (
    <button className='w-full text-left' type="button" onClick={()=>signOut()}>SignOut</button>
  )
}

export default SignOutBtn