'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Button } from '../ui/button' 

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  title: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Invalid email format.' }),
  message: z
    .string()
    .min(10, { message: 'Message should be at least 10 characters long.' })
})

type FormValues = z.infer<typeof formSchema>

const ContactForm = () => {
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      title: '',
      email: '',
      message: ''
    }
  })

  const {
    formState: { errors },
    reset
  } = form

  function onSubmit(values: FormValues) {
    fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            'Network response is not ok, failed to send the message. Please use other methods to contact.'
          )
        }
        return response.json()
      })
      .then((data) => {
        // Check if the data is valid JSON before using it
        if (data && data.message) {
          toast({
            title: 'Message sent',
            description: data.message
          })
        } else {
          throw new Error('Invalid JSON data')
        }
        reset({
          name: '',
          title: '',
          email: '',
          message: ''
        })
      })
      .catch((error) => {
        toast({ title: 'Error sending email:', description: error.message })
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your name"
                  {...field}
                  className="w-full p-2 border rounded-md border-foreground"
                />
              </FormControl>
              {errors.name?.message && (
                <p className="text-destructive">{errors.name?.message}</p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Message title"
                  {...field}
                  className="w-full p-2 border rounded-md border-foreground"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...field}
                  className="w-full p-2 rounded-md border-foreground"
                />
              </FormControl>
              {errors.email?.message && (
                <p className="text-destructive">{errors.email?.message}</p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  rows={5}
                  className="w-full p-2 border rounded-md"
                />
              </FormControl>
              {errors.message?.message && (
                <p className="text-destructive">{errors.message?.message}</p>
              )}
            </FormItem>
          )}
        />

        <Button
        variant={'game_option'}
        type="submit">Send Message</Button>
      </form>
    </Form>
  )
}

export default ContactForm