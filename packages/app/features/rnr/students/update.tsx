'use client'
import { useRouter } from 'solito/navigation'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useLink } from 'solito/navigation'
import {
  useGetStudentById,
  useUpdateStudent,
  getGetStudentsQueryKey,
} from './../../api/generated/default/default'
import { Button, H1, Text, XStack, YStack, Input, View } from '@my/ui'
import { useQueryClient } from '@tanstack/react-query'

type UpdateStudentScreenProps = {
  id: string
}

const Form = Platform.OS === 'web' ? 'form' : View

export function UpdateStudentScreen(props: UpdateStudentScreenProps) {
  const { id } = props

  const queryClient = useQueryClient()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [serverError, setServerError] = useState<string | null>(null)

  // const backToListLink = useLink({ href: '/students' })
  const router = useRouter()

  const { data, isLoading } = useGetStudentById(id)
  const updateMutation = useUpdateStudent({
    mutation: {
      onSuccess: () => {
        setServerError(null)
        router.back()
        queryClient.invalidateQueries({ queryKey: getGetStudentsQueryKey() })
      },
      onError: (err: any) => {
        const message = err?.response?.data?.message || err?.message || 'Failed to update student.'
        console.log(err)
        setServerError(message)
      },
    },
  })

  useEffect(() => {
    if (data) {
      setName(data.name ?? '')
      setEmail(data.email ?? '')
    }
  }, [data])

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

    updateMutation.mutate({
      id,
      data: {
        name: name.trim(),
        email: email.trim(),
      },
    })
  }

  const isSubmitting = updateMutation.isPending

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
              <H1>Edit Student</H1>
              <Text className="text-xs">Update the student information.</Text>
            </YStack>

            {/* Loading state before data */}
            {isLoading && <Text className="text-sm">Loading student...</Text>}

            {/* Form */}
            {!isLoading && (
              <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                  {errors.email ? (
                    <Text className="text-xs text-red-500">{errors.email}</Text>
                  ) : null}
                </YStack>

                {serverError ? <Text className="text-xs text-red-500">{serverError}</Text> : null}
              </Form>
            )}

            {/* Actions */}
            <XStack className="justify-end gap-3 mt-4">
              <Button
                size="$3"
                variant="outlined"
                disabled={isSubmitting}
                onPress={() => router.back()}
              >
                Cancel
              </Button>

              <Button
                size="$3"
                theme="accent"
                onPress={() => handleSubmit()}
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
