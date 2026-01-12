import { Text as TamaText, View as TamaView } from 'tamagui'
// import { Text, View } from 'react-native'
import { Text as UiText, View as UiView } from '@my/ui'
import { HomeScreen } from 'app/features/home/screen'
import { Stack } from 'expo-router'

import { Text as RNText, View as RNView } from 'react-native'

import { Text, View } from '@my/ui'

export default function Screen() {
  return (
    <>
      <RNView className="bg-green-500">
        <Stack.Screen
          options={{
            title: 'Home',
          }}
        />
        {/* <View className="items-center justify-center bg-white">
        <Text className="text-xl font-bold text-blue-500">Welcome from REACT NATIVE!</Text>
      </View>
      <TamaView className="flex-1 items-center justify-center bg-white">
        <TamaText className="text-xl font-bold text-blue-500">Welcome from TAMAGUI!</TamaText>
      </TamaView>
      <UiView className="flex-1 items-center justify-center bg-white">
        <UiText className="text-xl font-bold text-blue-500">Welcome from MONOREPO!</UiText>
      </UiView>
      <UiText className="text-xl font-bold text-blue-500">Welcome from MONOREPO!</UiText> */}

        <View className="bg-zinc-500 p-20">
          <Text className="!text-cyan-500">Hello World! FROM SCREEN ~ @my/ui</Text>
        </View>
        <RNView className="bg-zinc-500 p-20">
          <RNText className="!text-cyan-500">Hello World! FROM SCREEN ~ react-native</RNText>
        </RNView>
      </RNView>
      <HomeScreen />
    </>
  )
}
