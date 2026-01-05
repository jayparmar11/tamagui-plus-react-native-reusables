import { HomeScreen } from 'app/features/home/screen'
import { Stack } from 'expo-router'
import { ScrollView, StatusBar, Text } from 'react-native'

export default function Screen() {
  return (
    <>
      <StatusBar />
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <ScrollView>
        <HomeScreen />
      </ScrollView>
    </>
  )
}
