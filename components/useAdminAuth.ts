'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAdminAuth() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  useEffect(() => {
    fetch('/api/admin/check-auth')
      .then(r => { if (!r.ok) router.replace('/admin/login'); else setChecking(false) })
      .catch(() => router.replace('/admin/login'))
  }, [router])
  return { checking }
}
