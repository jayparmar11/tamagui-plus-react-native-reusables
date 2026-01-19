
# Next + Expo + Tamagui + Solito + Nativewind + React Native Reusables + Turborepo Monorepo


This monorepo is a having the demo Student CRUD, with tamagui & react-native-reusable components, to have understanding of both components library.

## Included packages

- [React Native Expo](https://expo.dev) Mobile apps
- [Next.js](https://nextjs.org) Web app
- [Tamagui](https://tamagui.dev) cross plateform ui library
- [solito](https://solito.dev) for cross-platform navigation
- [Nativewind](https://www.nativewind.dev/) tailwindcss for both apps
- [React Native Reusables](https://reactnativereusables.com/) cross plateform ui library
- [Turborepo](https://turborepo.dev/)

## 🗂 Folder layout

The main apps are:
- `apps/` deployable apps
  - `native` - React Native Expo for mobile apps with expo-router.
  - `web` - Next.js app for web app with pages router.

- `packages/` shared internal packages
  - `api` - Type-safe data fetching layer. Utilizes Orval for automated client generation from OpenAPI specs, featuring customized Axios instances and TanStack Query integration.
  - `config` - Centralizes place for config files.
  - `features` - Include actual application's screens, shared to both expo & nextjs.
  - `ui` Includes core components of Tamagui + react-native-reusables components.
  - `core` - Contains shared providers, constants, custom hooks, zustand store, and utilities.
    - `provider` - Includes different providers for both apps
    - `constants` - Includes constants values use in our apps
    - `hooks` - Includes custom hooks
    - `store` - zustand store
    - `utils` - custom utilities & helper functions

## 🏁 Start the app

1. Install dependencies: 
```sh 
yarn
```
2. Run both apps: 
```sh
yarn dev
```
3. Start server(new terminal): 
```sh
cd ./.server && npm i && npm run dev
```

### Run Individual apps:
- Next.js : 
```sh
yarn web
```
- Expo : 
```sh
yarn native
```

## [Tamagui](https://tamagui.dev/) [github](https://github.com/tamagui/tamagui)
- Creator : [Nate Wienert](https://github.com/natew) [LinkedIn](https://www.linkedin.com/in/nathan-wienert-89091945/)
- 13k stars on Github.
- Growing cross-platform component library.
### Pros:-
- True cross‑platform Design System.
- Consistent on both platforms out of the box.
- Well maintained documentation.
- In Next.js, Can work with both app router and pages router.
- Proper guidance for platform integration.
- [Tamagui Compiler](https://tamagui.dev/docs/intro/compiler-install) significantly improves performance of both web and native applications.
### Cons:-
- Steeper learning curve.
- Actively maintained on github only one person(Nate Wienert) & No big compony behind to support.
- No built-in data table or chart support.


## [React Native Reusables](https://reactnativereusables.com/) [github](https://github.com/founded-labs/react-native-reusables)
- 8k stars on Github
- Creator : [Zach Nugent](https://github.com/mrzachnugent) [LinkedIn](https://www.linkedin.com/in/mrzachnugent)
- uses NativeWind v4 under the hood.
### Pros:-
- “shadcn‑style” starting point for react native.
### Cons:-
- missing things like Data Table, Chart, Calendar/Date Picker, Pagination, Breadcrumb, Sidebar, Sonner.
- Actively maintained on github only one person(Zach Nugent) & No big compony behind to support.
- Younger, less battle-tested than shadcn & tamagui, Docs and ecosystem still growing.
- In Next.js, limited to pages router for now.

## [Solito](https://solito.dev/) [github](https://github.com/nandorojo/solito)
- Cross platform React Native + Next.js Navigation library.
- 4k stars on github.
- Creator : [Fernando Rojo](https://github.com/nandorojo) [LinkedIn](https://www.linkedin.com/in/fernandotherojo/)

## [Nativewind](https://www.nativewind.dev/) [github](https://github.com/nativewind/nativewind)
- tailwindcss for react native & react native web.
- 7.5k stars on github
- Creator : [Mark Lawlor](https://github.com/marklawlor) [LinkedIn](https://www.linkedin.com/in/mark-lawlor-6b13055a/)