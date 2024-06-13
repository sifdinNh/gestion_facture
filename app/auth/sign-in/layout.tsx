// components/SignInLayout.js
import React from 'react';


export const metadata = {
  title: 'IMACID',
  description:
    ''
};

const SignInLayout = ({ children }) => {
  return (
    <div className="signin-layout">
      {children}
    </div>
  );
};

export default SignInLayout;