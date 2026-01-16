## Project Structure

```
tamagui-rnr-demo/
├── apps
│   ├── native
│   │   ├── app
│   │   │   ├── students
│   │   │   │   ├── update
│   │   │   │   │   └── [id].tsx
│   │   │   │   ├── add.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── _layout.tsx
│   │   │   └── index.tsx
│   │   ├── assets
│   │   │   └── images
│   │   │       ├── android-icon-background.png
│   │   │       ├── android-icon-foreground.png
│   │   │       ├── android-icon-monochrome.png
│   │   │       ├── favicon.png
│   │   │       ├── icon.png
│   │   │       ├── partial-react-logo.png
│   │   │       ├── react-logo.png
│   │   │       ├── react-logo@2x.png
│   │   │       ├── react-logo@3x.png
│   │   │       └── splash-icon.png
│   │   ├── scripts
│   │   │   └── fix-xcode-env.mjs
│   │   ├── app.json
│   │   ├── babel.config.js
│   │   ├── eas.json
│   │   ├── expo-env.d.ts
│   │   ├── global.css
│   │   ├── index.js
│   │   ├── metro.config.js
│   │   ├── nativewind-env.d.ts
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── types.d.ts
│   └── web
│       ├── public
│       │   ├── favicon.ico
│       │   ├── file.svg
│       │   ├── globe.svg
│       │   ├── next.svg
│       │   ├── tamagui.css
│       │   ├── vercel.svg
│       │   └── window.svg
│       ├── src
│       │   ├── pages
│       │   │   ├── api
│       │   │   │   └── hello.ts
│       │   │   ├── students
│       │   │   │   ├── update
│       │   │   │   ├── add.tsx
│       │   │   │   └── index.tsx
│       │   │   ├── _app.tsx
│       │   │   ├── _document.tsx
│       │   │   └── index.tsx
│       │   └── global.css
│       ├── nativewind-env.d.ts
│       ├── next-env.d.ts
│       ├── next.config.ts
│       ├── package.json
│       ├── postcss.config.js
│       ├── README.md
│       ├── tailwind.config.js
│       ├── tsconfig.json
│       └── types.d.ts
├── packages
│   ├── app
│   │   ├── api
│   │   │   ├── generated
│   │   │   │   ├── default
│   │   │   │   │   └── default.ts
│   │   │   │   └── model
│   │   │   │       ├── createStudentBody.ts
│   │   │   │       ├── index.ts
│   │   │   │       ├── student.ts
│   │   │   │       └── updateStudentBody.ts
│   │   │   └── axios-client.ts
│   │   ├── features
│   │   │   ├── home
│   │   │   │   └── screen.tsx
│   │   │   └── students
│   │   │       ├── add.tsx
│   │   │       ├── list.tsx
│   │   │       └── update.tsx
│   │   ├── provider
│   │   │   ├── safe-area
│   │   │   │   ├── index.tsx
│   │   │   │   ├── index.web.tsx
│   │   │   │   ├── use-safe-area.ts
│   │   │   │   └── use-safe-area.web.ts
│   │   │   ├── index.tsx
│   │   │   ├── NextTamaguiProvider.tsx
│   │   │   ├── query-client-provider.tsx
│   │   │   ├── ToastViewport.tsx
│   │   │   └── ToastViewport.web.tsx
│   │   ├── index.ts
│   │   ├── nativewind-env.d.ts
│   │   ├── orval.config.js
│   │   ├── package.json
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── types.d.ts
│   ├── config
│   │   ├── src
│   │   │   ├── animations.ts
│   │   │   ├── fonts.ts
│   │   │   ├── index.ts
│   │   │   └── tamagui.config.ts
│   │   └── package.json
│   └── ui
│       ├── src
│       │   ├── components
│       │   │   ├── button.tsx
│       │   │   ├── dialog.tsx
│       │   │   ├── icon.tsx
│       │   │   ├── input.tsx
│       │   │   ├── native-only-animated-view.tsx
│       │   │   ├── separator.tsx
│       │   │   └── text.tsx
│       │   ├── lib
│       │   │   ├── theme.ts
│       │   │   └── utils.ts
│       │   ├── CustomToast.tsx
│       │   ├── index.tsx
│       │   ├── MyComponent.tsx
│       │   ├── NativeToast.tsx
│       │   ├── rnr.tsx
│       │   ├── SwitchRouterButton.tsx
│       │   ├── SwitchThemeButton.tsx
│       │   └── types.d.ts
│       ├── components.json
│       ├── nativewind-env.d.ts
│       ├── package.json
│       └── tsconfig.json
├── server
│   ├── index.ts
│   ├── package-lock.json
│   ├── package.json
│   └── students.json
├── package.json
├── README.md
├── student-list.html
├── tsconfig.base.json
├── tsconfig.json
├── turbo.json
├── vitest.config.mts
└── yarn.lock
```


- Understand my Above project structure.
- I have created this monorepo project with tamagui stater kit template.
- It used tamagui component & solito for cross-platform usage.
- I have also integrated the nativewind so we can use the tailwindcss with tamagui components as well.
- I have also integrated the RNR(react-native-reusables) in the project inside package/ui so you we can use anywhere.
- I want you help in migrating student crud demo from tamagui components to react-native-reusables components.
- I dont want to remove current implementation of Tamagui so don't remove anything in that.
- Add /rnr/ folder prefix in them so both can be separated. like packages\app\features\rnr\students\add.tsx 
- Don't do anything yourself without asking for it, you only do what I say.
- before doing any task ask me question so you can do better code in that.
- remember the syntax I use in that file.


## packages\ui\src\rnr.tsx

```tsx
export { View as RNRView } from 'react-native'
export { Text as RNRText } from './components/text'
export { Button as RNRButton } from './components/button'
export {
Dialog as RNRDialog,
DialogTrigger as RNRDialogTrigger,
DialogPortal as RNRDialogPortal,
DialogClose as RNRDialogClose,
DialogOverlay as RNRDialogOverlay,
DialogContent as RNRDialogContent,
DialogHeader as RNRDialogHeader,
DialogFooter as RNRDialogFooter,
DialogTitle as RNRDialogTitle,
DialogDescription as RNRDialogDescription,
} from './components/dialog'
export { Icon as RNRIcon } from './components/icon'
export { Input as RNRInput } from './components/input'
export { Separator as RNRSeparator } from './components/separator'
```


- in rnr.tsx i have exported all the RNR components with RNR prefix "RNR"
- its just didnt included 1 component that is  Sheet, so you can use Dialog instead.

- you can access them with this:
```ts
import { } from "@my/ui/rnr"
```