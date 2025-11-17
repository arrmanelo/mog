'use client'
import { supabase } from '@/lib/supabase'

export default function LoginButton() {
  const signIn = async () => {
    await supabase.auth.signInWithPassword({
      email: 'method@123',
      password: 'method123',
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <button onClick={signIn} className="bg-green-600 text-white px-6 py-2 rounded">
      Войти как админ
    </button>
  )
}