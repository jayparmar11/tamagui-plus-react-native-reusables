'use client'

import { useRouter } from 'solito/navigation'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { useCreateStudent, getGetStudentsQueryKey } from './../../../api/generated/default/default'
import { useQueryClient } from '@tanstack/react-query'
import {
  RNRButton,
  RNRInput,
  RNRText,
  RNRView,
} from '@my/ui/rnr'

const Form = Platform.OS === 'web' ? 'form' : RNRView

export function AddStudentScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [serverError, setServerError] = useState<string | null>(null)

  const queryClient = useQueryClient()
  const router = useRouter()

  const createMutation = useCreateStudent({
    mutation: {
      onSuccess: () => {
        setServerError(null)
        router.back()
        queryClient.invalidateQueries({ queryKey: getGetStudentsQueryKey() })
      },
      onError: (err: any) => {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          'Failed to create student.'
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

  const handleSubmit = (event?: React.FormEvent) => {
    if (event && Platform.OS === 'web') {
      event.preventDefault()
    }

    setServerError(null)
    if (!validate()) return

    createMutation.mutate({
      data: {
        name: name.trim(),
        email: email.trim(),
      },
    })
  }

  const isSubmitting = createMutation.isPending

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <RNRView className="self-center flex-1 w-full max-w-xl px-4 py-6">
          {/* Header */}
          <RNRView className="mb-6">
            <RNRText className="mb-1 text-2xl font-semibold text-gray-900">
              Add Student
            </RNRText>
            <RNRText className="text-sm text-gray-500">
              Create a new student record.
            </RNRText>
          </RNRView>

          {/* Form */}
          <Form
            onSubmit={Platform.OS === 'web' ? handleSubmit : undefined}
            className={Platform.OS === 'web' ? 'space-y-4' : undefined}
          >
            {/* Name */}
            <RNRView className="mb-4">
              <RNRText className="mb-1 text-sm font-medium text-gray-800">
                Name
              </RNRText>
              <RNRInput
                value={name}
                onChangeText={setName}
                placeholder="Enter full name"
                className="px-3 py-2 text-base border border-gray-300 rounded-md"
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.name ? (
                <RNRText className="mt-1 text-xs text-red-500">
                  {errors.name}
                </RNRText>
              ) : null}
            </RNRView>

            {/* Email */}
            <RNRView className="mb-4">
              <RNRText className="mb-1 text-sm font-medium text-gray-800">
                Email
              </RNRText>
              <RNRInput
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="px-3 py-2 text-base border border-gray-300 rounded-md"
              />
              {errors.email ? (
                <RNRText className="mt-1 text-xs text-red-500">
                  {errors.email}
                </RNRText>
              ) : null}
            </RNRView>

            {/* Server error */}
            {serverError ? (
              <RNRView className="mb-4">
                <RNRText className="text-xs text-red-600">
                  {serverError}
                </RNRText>
              </RNRView>
            ) : null}

            {/* Actions */}
            <RNRView className="flex-row justify-end mt-4 space-x-3">
              <RNRButton
                type={Platform.OS === 'web' ? 'button' : undefined}
                onPress={() => router.back()}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md"
              >
                <RNRText className="text-sm text-gray-700">Cancel</RNRText>
              </RNRButton>

              <RNRButton
                type={Platform.OS === 'web' ? 'submit' : undefined}
                onPress={Platform.OS === 'web' ? undefined : () => handleSubmit()}
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 rounded-md disabled:bg-blue-400"
              >
                <RNRText className="text-sm text-white">
                  {isSubmitting ? 'Creating...' : 'Create'}
                </RNRText>
              </RNRButton>
            </RNRView>
          </Form>
        </RNRView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
