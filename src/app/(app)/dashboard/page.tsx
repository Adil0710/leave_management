"use client"
import { useSession } from 'next-auth/react';
import React from 'react'

function page() {
    const { data: session } = useSession();
  const user = session?.user;

  return (
    <div><p className=' mt-40'>username : {user?.name}</p></div>
  )
}

export default page