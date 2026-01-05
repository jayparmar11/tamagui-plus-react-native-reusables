'use client'

import { SignInScreen } from 'app/features/auth/SignInScreen'

function Login() {
  return (
    <div
      style={{
        maxWidth: 600,
        width: '100%',
        display: 'flex',
        height: '100%',
        margin: 'auto',
        minHeight: '100vh',
      }}
    >
      <SignInScreen />
    </div>
  )
}

export default Login
