import { LoaderIcon } from 'lucide-react'
import React from 'react'

interface FullScreenLaoderProps {
    label?: string
}


const FullScreenLaoder = ({label}:FullScreenLaoderProps) => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-3 '>
        <LoaderIcon className='size-6 text-muted-foreground animate-spin'/>
        {label && <p className='text-sm text-muted-foreground'>{label}</p>}
    </div>
  )
}

export default FullScreenLaoder