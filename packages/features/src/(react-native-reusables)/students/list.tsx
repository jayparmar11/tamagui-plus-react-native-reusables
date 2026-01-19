'use client'

import { Button } from '@my/ui/src/components/button'
import { Dialog, DialogContent, DialogOverlay } from '@my/ui/src/components/dialog'
import { Text } from '@my/ui/src/components/text'
import { useQueryClient } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, Pencil, Plus, Trash2 } from '@tamagui/lucide-icons'
import { useMemo, useState } from 'react'
import { Platform, ScrollView, View } from 'react-native'
import { useLink, useRouter } from 'solito/navigation'
import {
  getGetStudentsQueryKey,
  useDeleteStudent,
  useGetStudents,
} from '@my/api/generated/client/students/students'
import { type Student } from '@my/api/generated/model/student'

type DeleteState = {
  id: string | null
  name: string | null
}

// Shared confirmation content
function DeleteConfirmationContent(props: {
  name: string | null
  isDeleting: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  const { name, isDeleting, onCancel, onConfirm } = props

  return (
    <View className="w-full">
      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-900">Delete student</Text>
        <Text className="mt-2 text-sm text-gray-700">
          Are you sure you want to delete{' '}
          <Text className="font-semibold">{name ?? 'this student'}</Text>? This action cannot be
          undone.
        </Text>
      </View>
      <View className="flex-row justify-end gap-4 mt-2">
        <Button variant={'ghost'} onPress={onCancel} disabled={isDeleting}>
          <Text>Cancel</Text>
        </Button>
        <Button onPress={onConfirm} variant={'destructive'} disabled={isDeleting}>
          <Text>{isDeleting ? 'Deleting...' : 'Delete'}</Text>
        </Button>
      </View>
    </View>
  )
}

// Row component
function StudentRow({
  student,
  onAskDelete,
}: {
  student: Student
  onAskDelete: (student: Student) => void
}) {
  const { id, name } = student
  const itemLink = useLink({ href: `/rnr/students/${id}` })
  const editLink = useLink({ href: `/rnr/students/update/${id}` })

  return (
    <View className="flex-row items-center px-3 py-2 bg-white border rounded-lg shadow-sm border-zinc-300">
      <View {...itemLink} className="flex-1">
        <Text className="text-base font-medium text-gray-900">{name}</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <Button variant={'secondary'} {...editLink}>
          <Pencil />
          <Text>EDIT</Text>
        </Button>
        <Button variant={'destructive'} onPress={() => onAskDelete(student)} className='text-white'>
          <Trash2 className='text-white' color={"#fff"}/>
          <Text>DELETE</Text>
        </Button>
      </View>
    </View>
  )
}

// Main screen
export function StudentListScreen() {
  const router = useRouter()
  const { data, isLoading, isError } = useGetStudents()
  const deleteMutation = useDeleteStudent()
  const queryClient = useQueryClient()

  const students = useMemo(() => data ?? [], [data])

  const addLink = useLink({
    href: '/rnr/students/add',
  })

  const [deleteSheet, setDeleteSheet] = useState<DeleteState>({
    id: null,
    name: null,
  })
  const [isOpen, setIsOpen] = useState(false)

  const onAskDelete = (student: Student) => {
    setDeleteSheet({
      id: student.id,
      name: student.name,
    })
    setIsOpen((s) => !s)
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  const handleConfirmDelete = () => {
    if (!deleteSheet.id) return
    deleteMutation.mutate(
      { id: deleteSheet.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetStudentsQueryKey() })
          closeDialog()
        },
      }
    )
  }

  const isDeleting = deleteMutation.isPending

  return (
    <View className="flex-1 w-full max-w-3xl px-4 pt-4 pb-4 mx-auto bg-white">
      {/* Header */}
      <View>
        <Button className='w-fit' variant='outline' size={'lg'} onPress={() => router.back()}>
          <ChevronLeft />
          <Text className="text-lg font-bold"> Back</Text>
        </Button>
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-2xl font-semibold text-gray-900">Students</Text>
            <Text className="mt-1 text-xs text-gray-500">
              {isLoading ? 'Loading...' : `${students.length} record(s)`}
            </Text>
          </View>
          {Platform.OS === 'web' && (
            <Button {...addLink} size={'lg'}><Plus color={"#FFF"} />
              <Text className="text-lg font-bold"> ADD</Text>
            </Button>
          )}
        </View>
      </View>

      {/* Separator */}
      <View className="h-px mb-4 bg-gray-200" />

      {/* Content states */}
      {isLoading && <Text className="text-sm text-gray-600">Loading students...</Text>}
      {isError && (
        <Text className="text-sm text-red-500">Failed to load students. Please try again.</Text>
      )}
      {!isLoading && !isError && students.length === 0 && (
        <View className="items-center justify-center flex-1">
          <Text className="text-sm text-gray-600">No students found.</Text>
        </View>
      )}

      {/* List */}
      <ScrollView>
        <View className="gap-2 pb-16 mt-2">
          {students.map((student: Student) => (
            <StudentRow key={student.id} student={student} onAskDelete={onAskDelete} />
          ))}
        </View>
      </ScrollView>

      {/* Floating add button (native) */}
      {Platform.OS !== 'web' && (
        <View className="absolute right-4 bottom-6">
          <Button {...addLink} size={'lg'}>
            <Plus color={"#FFF"} />
            <Text className="text-lg font-bold"> ADD</Text>
          </Button>
        </View>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <>
          <DialogOverlay className="bg-black/40" />
          <DialogContent className="max-w-md p-8 mx-auto bg-white rounded-lg ">
            <DeleteConfirmationContent
              name={deleteSheet.name}
              isDeleting={isDeleting}
              onCancel={closeDialog}
              onConfirm={handleConfirmDelete}
            />
          </DialogContent>
        </>
      </Dialog>
    </View>
  )
}
