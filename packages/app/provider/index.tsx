import { TamaguiProvider, type TamaguiProviderProps, ToastProvider, isWeb } from '@my/ui'
import { config } from '@my/config'
import { useColorScheme } from 'react-native'
export function Provider({
  children,
  defaultTheme = 'light',
  ...rest
}: Omit<TamaguiProviderProps, 'config'> & { defaultTheme?: string }) {
  const colorScheme = useColorScheme()
  const theme = defaultTheme || (colorScheme === 'dark' ? 'dark' : 'light')

  return (
    <TamaguiProvider config={config} defaultTheme={theme} {...rest}>
      <ToastProvider swipeDirection="horizontal" duration={6000} native={isWeb ? [] : ['mobile']}>
        {children}
      </ToastProvider>
    </TamaguiProvider>
  )
}
