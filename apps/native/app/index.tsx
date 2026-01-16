import { Text, View } from 'react-native'
import { HomeScreen } from 'app/features/home/screen'
import { Stack } from 'expo-router'

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {/* <View className="items-center justify-center flex-1 bg-white">
        <Text className="text-xl font-bold text-blue-500">Welcome to Nativewind!</Text>
      </View> */}
      <HomeScreen />
    </>
  )
}
