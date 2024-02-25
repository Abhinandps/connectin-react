import { BrowserRouter as Router } from 'react-router-dom'
import useRefreshToken from './features/auth/hooks/useRefreshToken'
import './App.css'
import useFetchUserData from './features/auth/hooks/useFetchUserData'
import ErrorBoundary from './layouts/ErrorBoundary'
import AnimatedRoutes from './components/Routes/AnimatedRoutes'


/* TODO: 
    - [] Post creation, Like and comment, Report a post, Post recommendations

    - [] create usermanagement service
    - [] can manage users by an admin (action, view , recruit)
    - [] moderator page view ( content , post, message ) latest reports
    - [] profile management ( upload images )

  FIXME: pending
    - mobile otp not set
    - resend email confirmation
    - resend otp for password reset
    - add design to confirmation page
    - standard animation to every behaviour 
    - 404 page | unauthorized page design
*/

function App() {
  useRefreshToken()
  useFetchUserData()
  return (
    <ErrorBoundary>
      <Router>
        <AnimatedRoutes />
      </Router >
    </ErrorBoundary>

  );
}

export default App
