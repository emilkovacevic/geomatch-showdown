'use client'

import { useEffect, useState } from 'react'

interface ClientOnly {
  children: React.ReactNode
}

const ClientOnly = ({ children }: ClientOnly) => {
  const [clientMounted, setClientMounted] = useState(false)

  useEffect(() => {
    setClientMounted(true)
  }, [])

  if (!clientMounted) return null

  return <div>{children}</div>
}

export default ClientOnly