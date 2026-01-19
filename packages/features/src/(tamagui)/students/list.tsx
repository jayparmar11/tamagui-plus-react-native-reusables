'use client'

import {
  Adapt,
  Button,
  Dialog,
  H1,
  ScrollView,
  Separator,
  Sheet,
  Text,
  View,
  XStack,
  YStack,
} from '@my/ui'
import { useMemo, useState } from 'react'
import { Platform } from 'react-native'
import { ChevronLeft, ChevronRight, Pencil, Plus, Trash2 } from '@tamagui/lucide-icons'
import { useQueryClient } from '@tanstack/react-query'
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
    <YStack className="gap-4">
      <YStack className="gap-2">
        <Text className="text-lg font-semibold">Delete student</Text>
        <Text className="text-sm">
          Are you sure you want to delete{' '}
          <Text className="font-semibold">{name ?? 'this student'}</Text>? This action cannot be
          undone.
        </Text>
      </YStack>

      <XStack className="justify-end gap-3 mt-4">
        {/* <Dialog.Close asChild> */}
        <Button size="$3" variant="outlined" disabled={isDeleting} onPress={onCancel}>
          Cancel
        </Button>
        {/* </Dialog.Close> */}
        <Button size="$3" theme="red" onPress={onConfirm} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </XStack>
    </YStack>
  )
}

// 1. Row component
function StudentRow({
  student,
  onAskDelete,
}: {
  student: Student
  onAskDelete: (student: Student) => void
}) {
  const { id, name } = student

  // const itemLink = useLink({ href: `/students/${id}` })
  const editLink = useLink({ href: `/students/update/${id}` })

  return (
    <XStack className="flex-row items-center px-3 py-2 border rounded-lg native:border-2 web:shadow-sm border-zinc-300">
      <YStack
        className="flex-1"
        // {...itemLink}
      >
        <Text className="text-base font-medium">{name}</Text>
      </YStack>

      <XStack className="items-center gap-2">
        <Button size="$4" variant="outlined" {...editLink} icon={Pencil}>
          {Platform.OS === 'web' && 'EDIT'}
        </Button>
        <Button size="$4" theme="red" onPress={() => onAskDelete(student)} icon={Trash2}>
          {Platform.OS === 'web' && 'DELETE'}
        </Button>
      </XStack>
    </XStack>
  )
}

// 2. Main screen
export function StudentListScreen() {
  const { data, isLoading, isError } = useGetStudents()
  const deleteMutation = useDeleteStudent()
  const router = useRouter()

  const queryClient = useQueryClient()
  const students = useMemo(() => data ?? [], [data])

  const addLink = useLink({
    href: '/students/add',
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
    setIsOpen(true)
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
    <YStack className="flex-1 w-full max-w-3xl gap-4 px-4 pt-4 pb-4 mx-auto ">
      {/* Header */}
      <YStack className="items-start justify-start">
        <Button
          size="$4"
          variant="outlined"
          icon={ChevronLeft}
          onPress={() => router.back()}
          className="w-fit"
        >
          <Text className="!font-bold text-xl">BACK</Text>
        </Button>
        <XStack className="items-center justify-between">
          <YStack>
            <H1>Students</H1>
            <Text className="text-xs">
              {isLoading ? 'Loading...' : `${students.length} record(s)`}
            </Text>
          </YStack>

          {Platform.OS === 'web' && (
            <Button size="$4" theme="accent" icon={Plus} {...addLink}>
              <Text className="!font-bold text-xl">Add</Text>
            </Button>
          )}
        </XStack>
      </YStack>

      <Separator />

      {/* Content */}
      {isLoading && <Text className="text-sm">Loading students...</Text>}

      {isError && <Text className="text-sm">Failed to load students. Please try again.</Text>}

      {!isLoading && !isError && students.length === 0 && (
        <YStack className="items-center justify-center flex-1">
          <Text className="text-sm">No students found.</Text>
        </YStack>
      )}

      {/* List */}
      <ScrollView className='flex-1 p-0 pb-16 m-0'>
        <YStack className="gap-3">
          {students.map((student: Student) => (
            <StudentRow key={student.id} student={student} onAskDelete={onAskDelete} />
          ))}
        </YStack>
      </ScrollView>

      {/* Floating add button */}
      <XStack className="absolute right-4 bottom-6" pointerEvents="box-none">
        {Platform.OS !== 'web' && (
          <Button size="$5" theme="accent" icon={Plus} scaleIcon={1.5} {...addLink}>
            <Text className="!font-bold text-xl">ADD</Text>
          </Button>
        )}
      </XStack>

      {/* Delete confirmation dialog + Adapt + Sheet */}
      <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
        {/* Trigger is the delete button; we only control open from state */}

        <Adapt when="maxMd" platform="touch">
          <Sheet
            // snapPoints={[30]}
            snapPointsMode="fit"
            animation="medium"
            zIndex={200000}
            modal
            dismissOnSnapToBottom
            unmountChildrenWhenHidden
          >
            <Sheet.Frame>
              <View className="p-4">
                <Adapt.Contents />
              </View>
            </Sheet.Frame>
            <Sheet.Overlay
              bg="$shadow6"
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            bg="$shadow6"
            animateOnly={['transform', 'opacity']}
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />

          <Dialog.FocusScope focusOnIdle>
            <Dialog.Content
              bordered
              py="$4"
              px="$6"
              elevate
              rounded="$6"
              key="content"
              animateOnly={['transform', 'opacity']}
              animation={[
                'quick',
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{ x: 0, y: 20, opacity: 0 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              className="w-full max-w-md mx-auto bg-background"
            >
              <DeleteConfirmationContent
                name={deleteSheet.name}
                isDeleting={isDeleting}
                onCancel={closeDialog}
                onConfirm={handleConfirmDelete}
              />
            </Dialog.Content>
          </Dialog.FocusScope>
        </Dialog.Portal>
      </Dialog>
    </YStack>
  )
}
