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
import useFetchUserData from './features/auth/hooks/useFetchUserData'
import EmailConfirmationSent from './layouts/EmailConfimationSent'
import Authorization from './layouts/Authorization'

/* TODO: 
    - create usermanagement service
    - can manage users by an admin (action, view , recruit)
    - profile management ( upload images )

  FIXME: pending
    - modile otp not set
    - resend email confirmation
    - resend otp for password reset
    - add design to confirmation page
    - standard animation to every behaviour 
*/

function App() {

  useRefreshToken()

  useFetchUserData()

  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path='/' element={<HomeContainer />}>
              <Route index element={<Feed />} />
              <Route path='mynetwork' element={<div>My netWork</div>} />
              <Route path='/manage-admins' element={
                <Authorization userRoles={user?.role} requiredRole="admin">
                  <div>Manage Admins</div>
                </Authorization>
              } />
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
        <Route path='unauthorized' element={<div>unauthorized</div>} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </Router >
  );
}

export default App
