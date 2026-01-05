'use client'

import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import {
  Checkbox,
  ScrollView,
  Sheet,
  Input,
  Button,
  H1,
  Text,
  View,
  YStack,
  AlertDialog,
} from 'tamagui'
import { Trash2 } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useTodoStore } from './useTodoStore'

function TodoScreen() {
  const todos = useTodoStore((s) => s.todos)
  const inputValue = useTodoStore((s) => s.inputValue)
  const setInputValue = useTodoStore((s) => s.setInputValue)
  const addTodo = useTodoStore((s) => s.addTodo)
  const toggleTodo = useTodoStore((s) => s.toggleTodo)
  const removeTodo = useTodoStore((s) => s.removeTodo)

  const list = Array.from(todos.values())

  // edit sheet state
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetPosition, setSheetPosition] = useState(0)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')

  // delete confirm dialog state
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const startEdit = (id: string) => {
    const todo = todos.get(id)
    if (!todo) return
    setEditingId(id)
    setEditingTitle(todo.title)
    setSheetOpen(true)
  }

  const saveEdit = () => {
    Keyboard.dismiss()
    if (!editingId) return
    const todo = todos.get(editingId)
    if (!todo) {
      setSheetOpen(false)
      return
    }

    const title = editingTitle.trim()
    if (!title) {
      setSheetOpen(false)
      return
    }

    useTodoStore.setState((state) => {
      const next = new Map(state.todos)
      const current = next.get(editingId)
      if (!current) return state
      next.set(editingId, { ...current, title })
      return { todos: next }
    })

    setSheetOpen(false)
  }

  const askDelete = (id: string) => {
    setDeleteId(id)
    setDeleteOpen(true)
  }

  const confirmDelete = () => {
    if (deleteId) {
      removeTodo(deleteId)
    }
    setDeleteId(null)
    setDeleteOpen(false)
  }

  const cancelDelete = () => {
    setDeleteId(null)
    setDeleteOpen(false)
  }

  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <YStack flex={1} justify="flex-start" items="center" p="$4" gap="$4" bg="$background">
          <H1>Todo</H1>

          <ScrollView
            rounded="$6"
            borderWidth="$0.5"
            borderColor="$white3"
            width="100%"
            flex={1}
            keyboardShouldPersistTaps="handled"
          >
            <YStack
              width="100%"
              p="$4"
              justify="flex-start"
              items="flex-start"
              gap="$2"
              bg="$background"
            >
              {list.length === 0 && <Text color="$white7">No todos yet. Add your first task.</Text>}

              {list.map((todo) => (
                <View
                  key={todo.id}
                  bg={todo.completed ? '$green3' : '$blue2'}
                  rounded="$4"
                  padding="$2"
                  width="100%"
                  minHeight="$5"
                >
                  <YStack flexDirection="row" justify="space-between" items="center" gap="$2.5">
                    <Checkbox
                      size="$5"
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                    />

                    <Button
                      chromeless
                      flex={1}
                      justifyContent="flex-start"
                      onPress={() => startEdit(todo.id)}
                    >
                      <Text flex={1} textDecorationLine={todo.completed ? 'line-through' : 'none'}>
                        {todo.title}
                      </Text>
                    </Button>

                    {/* Delete opens confirm dialog */}
                    <AlertDialog.Trigger asChild>
                      <Button
                        width="$4"
                        height="$4"
                        chromeless
                        onPress={() => askDelete(todo.id)}
                        color="$red10"
                        p={0}
                        icon={<Trash2 />}
                      />
                    </AlertDialog.Trigger>
                  </YStack>
                </View>
              ))}
            </YStack>
          </ScrollView>

          <YStack width="100%" justify="flex-start" items="flex-start" gap="$4" bg="$background">
            <Input
              width="100%"
              value={inputValue}
              onChangeText={(value) => {
                if (typeof value === 'string') {
                  setInputValue(value)
                }
              }}
              onChange={(e: any) => {
                if (e?.target?.value != null) {
                  setInputValue(String(e.target.value))
                }
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addTodo()
                }
              }}
              placeholder="Add a task..."
            />
            <Button width="100%" onPress={addTodo}>
              Add
            </Button>
          </YStack>
        </YStack>

        {/* Update Todo Sheet (unchanged) */}
        <Sheet
          modal
          animation="quick"
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          snapPoints={[30, 50, 80]}
          position={sheetPosition}
          onPositionChange={setSheetPosition}
          moveOnKeyboardChange={true}
        >
          <Sheet.Overlay
            bg="$shadow4"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Sheet.Handle bg="$color8" />
          <Sheet.Frame items="center" justify="center" gap="$4" bg="$color2" p="$4">
            <Sheet.ScrollView width="100%" keyboardShouldPersistTaps="handled">
              <YStack width="100%" gap="$3">
                <H1 size="$5">Update todo</H1>

                <Input
                  width="100%"
                  value={editingTitle}
                  onChangeText={(value) => {
                    if (typeof value === 'string') {
                      setEditingTitle(value)
                    }
                  }}
                  onChange={(e: any) => {
                    if (e?.target?.value != null) {
                      setEditingTitle(String(e.target.value))
                    }
                  }}
                  placeholder="Edit your task..."
                />

                <YStack gap="$2">
                  <Button width="100%" onPress={saveEdit}>
                    Save
                  </Button>

                  <Button width="100%" chromeless onPress={() => setSheetOpen(false)}>
                    Cancel
                  </Button>
                </YStack>
              </YStack>
            </Sheet.ScrollView>
          </Sheet.Frame>
        </Sheet>
      </KeyboardAvoidingView>

      {/* Confirm delete dialog */}
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          opacity={0.5}
        />
        <AlertDialog.Content
          key="content"
          bordered
          elevate
          bg="$background"
          animation="quick"
          enterStyle={{ opacity: 0, scale: 0.9, y: -10 }}
          exitStyle={{ opacity: 0, scale: 0.95, y: 10 }}
        >
          <YStack gap="$3">
            <AlertDialog.Title>Delete todo?</AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure you want to delete this todo?
            </AlertDialog.Description>

            <YStack gap="$2" mt="$2">
              <AlertDialog.Cancel asChild>
                <Button onPress={cancelDelete}>Cancel</Button>
              </AlertDialog.Cancel>

              <AlertDialog.Action asChild>
                <Button
                  backgroundColor="$red10"
                  color="$color1"
                  hoverStyle={{ backgroundColor: '$red9' }}
                  pressStyle={{ backgroundColor: '$red8' }}
                  onPress={confirmDelete}
                >
                  Delete
                </Button>
              </AlertDialog.Action>
            </YStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}

export default TodoScreen
