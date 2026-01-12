'use client'
import dynamic from 'next/dynamic'
import { Text as RNText, View as RNView } from 'react-native'
const DynamicComponent = dynamic(
  () => import('app/features/home/screen').then((mod) => mod.HomeScreen),
  { ssr: false }
)
import { HomeScreen } from 'app/features/home/screen'
import { Text, View } from '@my/ui'

function AppPage() {
  return (
    <>
      <View className="bg-green-500">
        <View className="bg-zinc-500 p-20">
          <Text className="!text-cyan-500">Hello World! FROM SCREEN ~ @my/ui</Text>
        </View>
        <RNView className="bg-zinc-500 p-20">
          <RNText className="!text-cyan-500">Hello World! FROM SCREEN ~ react-native</RNText>
        </RNView>
        {/* <DynamicComponent /> */}
      </View>
      <HomeScreen />
    </>
  )
}

export default AppPage
