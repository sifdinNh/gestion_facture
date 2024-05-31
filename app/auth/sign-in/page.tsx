import * as React from 'react'
import { SignInForm } from './signin-form'
import SignInLayout from './layout';

const  SignInPage = () => {
  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-8">
      <div className="mx-auto flex w-full max-w-[320px] flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
            <h2 className={'text-2xl font-semibold tracking-tight'}>Welcome back</h2>
            <p className={'text-sm text-muted-foreground'}>Enter your email to sign in to your account.</p>
        </div>
        <div className="grid gap-6">
          <SignInForm />
        </div>
      </div>
    </div>
  )
};


SignInPage.getLayout = (page) => {
  return <SignInLayout>{page}</SignInLayout>;
};

export default SignInPage;