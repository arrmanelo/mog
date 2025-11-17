"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    if (!email) {
      setMessage("Введите email")
      return
    }

    setMessage(`Ссылка для сброса пароля отправлена на ${email}`)
    
    setTimeout(() => {
      router.push("/login")
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Восстановление пароля</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-center text-sm text-muted-foreground">
            Введите email, на который мы отправим ссылку для сброса пароля
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email пользователя</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите email"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Отправить
            </Button>
          </form>

          {message && (
            <p className="text-center text-sm text-green-600 font-medium">{message}</p>
          )}

          <p className="text-center text-sm text-muted-foreground">
            <Link href="/login" className="text-primary hover:underline">
              Вернуться к Авторизации
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}