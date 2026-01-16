'use client'

import { config } from '@my/config'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useMemo } from 'react'
import { TamaguiProvider } from 'tamagui'
import '../global.css'
import '../../public/tamagui.css'

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useRootTheme()
  // memo to avoid re-render on dark/light change
  const contents = useMemo(() => {
    return <Component {...pageProps} />
  }, [pageProps])

  return (
    <>
      <Head>
        <title>Your page title</title>
        <meta name="description" content="Your page description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextThemeProvider onChangeTheme={setTheme as any} defaultTheme={theme}>
        <TamaguiProvider config={config} disableInjectCSS defaultTheme={theme}>
          {contents}
        </TamaguiProvider>
      </NextThemeProvider>
    </>
  )
}
