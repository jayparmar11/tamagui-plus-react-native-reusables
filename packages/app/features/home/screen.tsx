'use client'
// import { Activity, Airplay } from '@tamagui/lucide-icons'
import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  XGroup,
  Sheet,
  useToastController,
  XStack,
  YStack,
} from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'
import { Button as RNRButton, Text as RNRText } from '@my/ui/src/rnr'

export function HomeScreen() {
  const linkProps = useLink({
    href: '/user/nate',
  })

  return (
    <YStack flex={1} justify="center" items="center" gap="$8" p="$4" bg="$background">
      {/* <XStack
        position="absolute"
        width="100%"
        t="$6"
        gap="$6"
        justify="center"
        flexWrap="wrap"
        $sm={{ position: 'relative', t: 0 }}
      >
        {Platform.OS === 'web' && <SwitchThemeButton />}
      </XStack> */}
      <XStack width="100%" t="$6" gap="$6" justify="center" flexWrap="wrap">
        <RNRButton>
          <RNRText>Button</RNRText>
        </RNRButton>
        <RNRButton variant="secondary">
          <RNRText>secondary</RNRText>
        </RNRButton>
        <RNRButton variant="destructive">
          <RNRText>destructive</RNRText>
        </RNRButton>
        <RNRButton variant="outline">
          <RNRText>outline</RNRText>
        </RNRButton>
        <RNRButton variant="link">
          <RNRText>link</RNRText>
        </RNRButton>
      </XStack>

      <YStack gap="$4">
        <H1 text="center" color="$color12">
          Welcome to Tamagui X react-native-reusable
        </H1>
      </YStack>
      <YStack p="$3" gap="$3">
        <Button>Plain</Button>
        <Button self="center" size="$6">
          Large
        </Button>
        <XStack gap="$2" justify="center">
          <Button size="$3" theme="accent">
            Active
          </Button>
          <Button size="$3" variant="outlined">
            Outlined
          </Button>
        </XStack>
        <XStack gap="$2">
          <Button themeInverse size="$3">
            Inverse
          </Button>
          <Button size="$3">iconAfter</Button>
        </XStack>
        <Button width="50%" size="$2" disabled opacity={0.5}>
          disabled
        </Button>

        <Button width="50%" size="$2" chromeless>
          chromeless
        </Button>
      </YStack>

      {/* <SheetDemo /> */}
    </YStack>
  )
}
