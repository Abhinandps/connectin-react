import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useAuth } from './features/auth/hooks/useAuth'
import useRefreshToken from './features/auth/hooks/useRefreshToken'
import Home from './pages/Home'
import HomeContainer from './layouts/HomeContainer'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Feed from './pages/Feed'
import './App.css'
import EmailConfirmation from './layouts/EmailConfirmation'
import PasswordForgot from './features/auth/components/PasswordForgot'
import Verify from './features/auth/components/Verify'
import ChangePassword from './features/auth/components/ChangePassword'
import { useEffect } from 'react'
import useFetchUserData from './features/auth/hooks/useFetchUserData'
import EmailConfirmationSent from './layouts/EmailConfimationSent'


function App() {

  useRefreshToken()

  useFetchUserData()

  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path='/' element={<HomeContainer />}>
              <Route index element={<Feed />} />
              <Route path='mynetwork' element={<div>My netWork</div>} />
            </Route>
            <Route path="email-confirmation/sent" element={<EmailConfirmationSent />} />
          </>
        ) : (
          <>
            <Route path='/' element={<HomeContainer />}>
              <Route index element={<Home />} />
              <Route path='sign-in' element={<SignIn />} />
              <Route path='sign-up' element={<SignUp />} />
              <Route path='request-password-reset' element={<PasswordForgot />} />
              <Route path='checkpoint/verify' element={<Verify />} />
              <Route path='changepassword/verify' element={<ChangePassword />} />
            </Route>
            <Route path="email-confirmation/confirm" element={<EmailConfirmation />} />
          </>
        )}
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </Router >
  );
}

export default App














{/* <Route
            path="feed"
            element={
              <UserProtected>
                <Route index element={<Feed />} />
                <Route path=":id" element={<FeedDetail />} />
              </UserProtected>
            }
          /> */}