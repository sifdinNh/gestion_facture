"use client";

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/client'

import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { useAuth } from '@/hooks/use-auth'

const FormSchema = z.object({
  email: z.string().nonempty().max(255).email(),
  password: z.string().nonempty().min(6).max(72),
})

type FormValues = z.infer<typeof FormSchema>

const defaultValues: Partial<FormValues> = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: 'onSubmit',
    defaultValues,
  })

  return (
    <Form {...form}>
      <form method="POST" noValidate className="space-y-4">
        <EmailField />
        <PasswordField />
        <SubmitButton />
      </form>
    </Form>
  )
}

const EmailField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              placeholder="email"
              {...field}
            />
          </FormControl>
          <FormMessage className="font-normal" />
        </FormItem>
      )}
    />
  )
}

const PasswordField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>Mot de passe</FormLabel>
          </div>
          <FormControl>
            <Input
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              placeholder="Mot de passe"
              {...field}
            />
          </FormControl>
          <FormMessage className="font-normal" />
        </FormItem>
      )}
    />
  )
}

const SubmitButton = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { handleSubmit, setError, getValues } = useFormContext()
  const { setSession, setUser } = useAuth()
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

  const onSubmit = async () => {
    try {
      setIsSubmitting(true)

      const next = (searchParams.get('next') as string) ?? '/dashboard'
      const formValues = getValues()
      const supabase = createClient()

      const signed = await supabase.auth.signInWithPassword({
        email: formValues?.email,
        password: formValues?.password,
      })

      setSession(signed?.data?.session)
      setUser(signed?.data?.user)
      if (signed?.error) throw new Error(signed?.error?.message)


      toast.success('You have successfully logged in')

      router.refresh()
      router.replace(next)
    } catch (e: unknown) {
      const err = (e as Error)?.message
      if (err.startsWith('Invalid login credentials')) {
        setError('email', {
          message: 'Invalid login credentials',
        })
        setError('password', {
          message: 'Invalid login credentials',
        })
      } else {
        toast.error(err)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Button
      type="submit"
      onClick={handleSubmit(onSubmit)}
      disabled={isSubmitting}
      className="w-full"
    >
     Se connecter
    </Button>
  )
}

export { SignInForm }