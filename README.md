



# Tamagui + Solito + Nativewind + react-native-reusables + Next + Expo Monorepo


















## 🔦 About

This monorepo is a having the demo Student CRUD, with tamagui & react-native-reusable components, to have understanding of both components library.

## 📦 Included packages

- [Tamagui](https://tamagui.dev) 🪄
- [solito](https://solito.dev) for cross-platform navigation
- Expo SDK
- Next.js
- Expo Router
- Nativewind
- react-native-reusables

## 🗂 Folder layout

The main apps are:
- `apps/` deployable apps
  - `expo` (native)
  - `next` (web)

- `packages/` shared packages across apps
  - `api`
  - `config`
  - `features` (don't use a `screens` folder. organize by feature.)
  - `core` (its includes file that you can access ...)
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)
    - `constants`
    - `hooks`
    - `store` - zustand store
    - `utils`
  - `ui` includes your custom UI kit that will be optimized by Tamagui + react-native-reusables components.

You can add other folders inside of `packages/` if you know what you're doing and have a good reason to.

## 🏁 Start the app

- Install dependencies: `yarn`
- Run App(both): `yarn dev`
  - Only Next.js : `yarn web`
  - Only Expo : `yarn native`