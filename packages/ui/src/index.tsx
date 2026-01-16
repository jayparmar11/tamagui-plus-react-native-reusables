export * from 'tamagui'
export * from '@tamagui/toast'
export * from './MyComponent'
export { config } from '@my/config'
export * from './CustomToast'
export * from './SwitchThemeButton'
export * from './SwitchRouterButton'

// import * as Tamagui from 'tamagui'
// import { cssInterop } from 'nativewind'

// export * from 'tamagui'
// export * from '@tamagui/toast'

// export { cn } from './lib/utils'

// Object.keys(Tamagui).forEach((key) => {
//   const item = (Tamagui as any)[key]

//   if ((item && typeof item === 'function') || typeof item === 'object') {
//     if (item.staticConfig || (key[0] === key[0].toUpperCase() && !key.startsWith('use'))) {
//       try {
//         cssInterop(item, {
//           className: 'style',
//         })
//       } catch (e) {}
//     }
//   }
// })
