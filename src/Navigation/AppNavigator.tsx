import React from 'react'
import RootNavigation from './RootNavigation'

export default function AppNavigator () {
     const isUserLoggedIn = true
  return (
    <>
      <RootNavigation
        defaultRoute={isUserLoggedIn ? 'DashboardLayout' : 'InitialScreen'}
      />
    </>
  );
}
