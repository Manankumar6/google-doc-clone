import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchInput from './SearchInput'
import {  SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

const Navbar = () => {
    return (
        <nav className='w-full h-full flex items-center justify-between'>

            <div className='flex gap-3 items-center shrink-0 pr-6 '>
                <Link href={'/'}>
                    <Image src={'/logo.svg'} alt='logo ' width={36} height={36} />

                </Link>
                <h3 className='text-xl '>Docs</h3>

            </div>
            <SearchInput />
            <div>
               
                    <UserButton />

             
            </div>

        </nav>
    )
}

export default Navbar