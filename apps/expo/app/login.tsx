import { SignInScreen } from 'app/features/auth/SignInScreen'
import { View } from '@my/ui'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'SignInScreen',
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <View style={{ paddingTop: 50, flex: 1 }} bg={'$background'}>
        <SignInScreen />
      </View>
    </>
  )
}
