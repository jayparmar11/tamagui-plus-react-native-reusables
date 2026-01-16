import { withTamagui } from '@tamagui/next-plugin'
import type { NextConfig } from 'next'
import { config } from '@my/config'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    'solito',
    'react-native',
    'react-native-web',
    '@rn-primitives/slot',
    '@tamagui/react-native-svg',
    '@tamagui/next-theme',
    '@tamagui/lucide-icons',
    'expo-linking',
    'expo-modules-core',
    'nativewind',
    'react-native-css-interop',
    '@rn-primitives/portal',
  ],
  experimental: {
    scrollRestoration: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native': 'react-native-web',
      'react-native-svg': '@tamagui/react-native-svg',
    }
    return config
  },
  reactCompiler: true,
  reactStrictMode: true,
}

const tamaguiPlugin = withTamagui({
  config: '../../packages/config/src/tamagui.config.ts',
  components: ['tamagui'],
})

export default tamaguiPlugin(nextConfig)
