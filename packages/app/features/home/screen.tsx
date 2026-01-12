'use client'

import {
  Anchor,
  Button,
  Paragraph,
  ScrollView,
  Sheet,
  Text,
  useToastController,
  View,
  XStack,
  YStack,
  H1,
} from '@my/ui'
import { ChevronDown, ChevronUp, Minus, Plus, RotateCcw } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useLink } from 'solito/navigation'

export function HomeScreen() {
  const [count, setCount] = useState(0)

  const linkProps = useLink({
    href: '/user/Jay_Parmar',
  })

  return (
    <ScrollView className="bg-background">
      <YStack className="flex-1 items-center justify-center p-6 gap-8 mt-10">
        {/* Header Section */}
        <YStack className="items-center gap-2">
          <H1 className="text-center font-bold tracking-tight">Counter App</H1>
          <Paragraph className="text-muted-foreground text-center">
            Testing NativeWind + Tamagui Bridge
          </Paragraph>
        </YStack>

        {/* Counter Display Card */}
        <View className="bg-card w-full max-w-[300px] p-10 rounded-3xl shadow-xl border border-border items-center gap-6">
          <Text
            className={`text-7xl font-bold transition-all ${
              count > 0 ? 'text-primary' : count < 0 ? 'text-destructive' : 'text-foreground'
            }`}
          >
            {count}
          </Text>

          <XStack className="gap-4 items-center">
            <Button
              size="$5"
              circular
              icon={Minus}
              onPress={() => setCount(count - 1)}
              className="bg-secondary active:opacity-80"
            />

            <Button
              size="$5"
              circular
              icon={RotateCcw}
              onPress={() => setCount(0)}
              className="bg-accent active:opacity-80"
            />

            <Button
              size="$5"
              circular
              icon={Plus}
              onPress={() => setCount(count + 1)}
              className="bg-primary active:opacity-80"
            />
          </XStack>
        </View>

        {/* Navigation & Utilities */}
        <YStack className="gap-4 w-full max-w-[300px]">
          <Button {...linkProps} theme="blue_Button" className="rounded-full">
            Go to User Profile
          </Button>

          <XStack className="justify-center items-center gap-4">
            <SheetDemo />
            <Text className="text-sm text-muted-foreground font-medium">Open Info Sheet</Text>
          </XStack>
        </YStack>
      </YStack>
    </ScrollView>
  )
}

function SheetDemo() {
  const toast = useToastController()
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)

  return (
    <>
      <Button
        size="$4"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
        className="shadow-md"
      />
      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[40]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay
          bg="$shadow4"
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle bg="$color8" />
        <Sheet.Frame
          items="center"
          justify="center"
          gap="$6"
          bg="$color2"
          className="rounded-t-3xl"
        >
          <YStack className="items-center gap-2">
            <Text className="text-xl font-bold">Project Info</Text>
            <XStack gap="$2" className="flex-wrap justify-center px-4">
              <Paragraph className="text-center">Built by</Paragraph>
              <Anchor color="$blue10" href="https://github.com/jayparmar11" target="_blank">
                @jayparmar
              </Anchor>
            </XStack>
          </YStack>

          <Button
            size="$5"
            theme="active"
            onPress={() => {
              setOpen(false)
              toast.show('Settings Saved!', {
                message: 'Your counter preferences were updated.',
              })
            }}
          >
            Close Sheet
          </Button>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
