'use client'
import { useRouter } from 'solito/navigation'

import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useLink } from 'solito/navigation'
import { useCreateStudent, getGetStudentsQueryKey } from './../../api/generated/default/default'
import { Button, H1, Text, XStack, YStack, Input } from '@my/ui'
import { useQueryClient } from '@tanstack/react-query'

export function AddStudentScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  // const toast = useToastController()
  const backToListLink = useLink({ href: '/students' })
  const router = useRouter()

  const createMutation = useCreateStudent({
    mutation: {
      onSuccess: () => {
        setServerError(null)
        router.back()
        queryClient.invalidateQueries({ queryKey: getGetStudentsQueryKey() })
      },
      onError: (err: any) => {
        const message = err?.response?.data?.message || err?.message || 'Failed to create student.'
        console.log(err)
        setServerError(message)
      },
    },
  })

  const validate = () => {
    const nextErrors: { name?: string; email?: string } = {}

    if (!name.trim()) {
      nextErrors.name = 'Name is required.'
    }

    if (!email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = () => {
    setServerError(null)
    if (!validate()) return

    createMutation.mutate({
      data: {
        name: name.trim(),
        email: email.trim(),
      },
    })
  }

  const isSubmitting = createMutation.isPending || createMutation.isLoading

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <YStack className="flex-1 px-4 py-8">
          <YStack className="w-full max-w-md gap-6 mx-auto">
            {/* Header */}
            <YStack className="items-center gap-2">
              <H1>Add Student</H1>
              <Text className="text-xs">Create a new student record.</Text>
            </YStack>

            {/* Form */}
            <YStack className="gap-4">
              <YStack className="gap-1">
                <Text className="text-sm">Name</Text>
                <Input
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter name"
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                {errors.name ? <Text className="text-xs text-red-500">{errors.name}</Text> : null}
              </YStack>

              <YStack className="gap-1">
                <Text className="text-sm">Email</Text>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {errors.email ? <Text className="text-xs text-red-500">{errors.email}</Text> : null}
              </YStack>

              {serverError ? <Text className="text-xs text-red-500">{serverError}</Text> : null}
            </YStack>

            {/* Actions */}
            <XStack className="justify-end gap-3 mt-4">
              <Button size="$3" variant="outline" disabled={isSubmitting} {...backToListLink}>
                Cancel
              </Button>

              <Button size="$3" theme="accent" onPress={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create'}
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
