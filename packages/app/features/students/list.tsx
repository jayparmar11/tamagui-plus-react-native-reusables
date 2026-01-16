'use client'
import { Platform } from 'react-native'
import { Button, H1, Separator, Text, XStack, YStack } from '@my/ui'
// import { ChevronRight, Pencil, Plus, Trash2 } from '@tamagui/lucide-icons'
import { useMemo } from 'react'
import { useLink } from 'solito/navigation'
import { useDeleteStudent, useGetStudents } from './../../api/generated/default/default'

// 1. Create a separate component for the list item
function StudentRow({ student, onDelete }: { student: any; onDelete: (id: string) => void }) {
  const { id, name, grade, rollNumber } = student

  // Hooks are now at the top level of this sub-component
  const itemLink = useLink({ href: `/students/${id}` })
  const editLink = useLink({ href: `/students/update/${id}` })

  return (
    <XStack className="flex-row items-center px-3 py-2 border rounded-lg shadow-sm border-zinc-300">
      <YStack className="flex-1" {...itemLink}>
        <Text className="text-base font-medium">{name}</Text>
        <XStack className="gap-2 mt-1">
          {rollNumber ? <Text className="text-xs">Roll: {rollNumber}</Text> : null}
          {grade ? <Text className="text-xs">Grade: {grade}</Text> : null}
        </XStack>
      </YStack>

      <XStack className="items-center gap-2">
        <Button size="$2" theme="alt1" {...editLink}>
          🖊
        </Button>
        <Button size="$2" theme="red" onPress={() => onDelete(id)}>
          🚮
        </Button>
      </XStack>
    </XStack>
  )
}

export function StudentListScreen() {
  const { data, isLoading, isError } = useGetStudents()
  const deleteMutation = useDeleteStudent()

  const students = useMemo(() => data ?? [], [data])

  const addLink = useLink({
    href: '/students/add',
  })

  const handleDelete = (id: string) => {
    deleteMutation.mutate({ id })
  }

  return (
    <YStack className="flex-1 max-w-3xl gap-4 px-4 pt-4 pb-16 mx-auto">
      {/* Header */}
      <XStack className="items-center justify-between">
        <YStack>
          <H1>Students</H1>
          <Text className="text-xs">
            {isLoading ? 'Loading...' : `${students.length} record(s)`}
          </Text>
        </YStack>

        {Platform.OS === 'web' && (
          <Button
            size="$4"
            theme="accent"
            //  icon={Plus}
            {...addLink}
          >
            ➕ Add
          </Button>
        )}
      </XStack>

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
      <YStack className="gap-3">
        {students.map((student) => (
          // 2. Use the sub-component here
          <StudentRow key={student.id} student={student} onDelete={handleDelete} />
        ))}
      </YStack>

      {/* Floating add button */}
      <XStack className="absolute right-4 bottom-6" pointerEvents="box-none">
        {Platform.OS !== 'web' && (
          <Button
            size="$5"
            theme="accent"
            // icon={Plus}
            className="!text-3xl"
            {...addLink}
          >
            ➕ Add
          </Button>
        )}
      </XStack>
    </YStack>
  )
}
