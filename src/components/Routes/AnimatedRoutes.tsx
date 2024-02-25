

import { Route, Routes } from 'react-router-dom'
import { useAuth } from '../../features/auth/hooks/useAuth'
import Home from '../../pages/Home'
import HomeContainer from '../../layouts/HomeContainer'
import SignIn from '../../pages/SignIn'
import SignUp from '../../pages/SignUp'
import Feed from '../../pages/Feed'
import EmailConfirmation from '../../layouts/EmailConfirmation'
import PasswordForgot from '../../features/auth/components/PasswordForgot'
import Verify from '../../features/auth/components/Verify'
import ChangePassword from '../../features/auth/components/ChangePassword'
import EmailConfirmationSent from '../../layouts/EmailConfimationSent'
import Authorization from '../../layouts/Authorization'
import ManageUsersAndAdmins from '../../pages/ManageUsersAndAdmins'
import PostsAndActivity from '../../pages/PostsAndActivity'
import Subscription, { Completion } from '../../pages/Subscription'
import Jobs, { AllJobs, CreateJob, ManagedJobs } from '../../pages/Jobs'
import ProtectedAddJob from '../../layouts/ProtectedAddJob'
import Mynetwork from '../../pages/Mynetwork'
import Main from '../../features/user/components/Main'
import Connections from '../../features/user/components/Connections'
import Network from '../../features/user/components/Network'
import Following from '../../features/user/components/Following'
import Followers from '../../features/user/components/Followers'
import Hashtag from '../../features/user/components/Hashtag'
import Profile from '../../pages/Profile'
import JobView, { Applicants, ApplicationSetting } from '../../pages/JobView'
import Notifications from '../../pages/Notifications'
import ScheduledInterviews from '../../features/common/components/ScheduledInterviews'
import MyInterviews from '../../features/common/components/MyInterviews'

import { AnimatePresence } from 'framer-motion'

function AnimatedRoutes() {
    const { isAuthenticated, user } = useAuth();

    // const location = useLocation();
    return (
        <AnimatePresence>
            <Routes >
                {isAuthenticated ? (
                    <>
                        <Route path='/' element={<HomeContainer />}>
                            <Route index element={<Feed />} />
                            <Route path='/jobs' element={<Jobs />}>
                                <Route index element={<AllJobs />} />
                                <Route path='posted-jobs' element={<ProtectedAddJob element={<ManagedJobs />} />} />
                                <Route path='view' element={<JobView />} />
                                <Route path='settings' element={<ApplicationSetting />} />
                                <Route path='applicants' element={<ProtectedAddJob element={<Applicants />} />} />
                                <Route path='my-interviews' element={<ProtectedAddJob element={<MyInterviews />} />} />
                                <Route path='scheduled-interviews' element={<ScheduledInterviews />} />
                            </Route>
                            <Route path='/notifications' element={<Notifications />} />
                            <Route path='/add-job' element={<ProtectedAddJob element={<CreateJob />} />} />
                            <Route path='/premium' element={<Subscription />} />
                            <Route path='/completion' element={<Completion />} />
                            <Route path='/mynetwork' element={<Mynetwork />}>
                                <Route index element={<Main />} />
                                <Route path='connections' element={<Connections />} />
                                <Route path='network-manager' element={<Network />} >
                                    <Route index element={<Following />} />
                                    <Route path='followers' element={<Followers />} />
                                </Route>
                                <Route path='hashtags' element={<Hashtag />} />
                            </Route>
                            <Route path='/manage-admins' element={
                                <Authorization userRoles={user?.role} requiredRole="admin">
                                    <ManageUsersAndAdmins isAdmin />
                                </Authorization>
                            } />
                            <Route path='/manage-users' element={
                                <Authorization userRoles={user?.role} requiredRole="admin">
                                    <ManageUsersAndAdmins />
                                </Authorization>
                            } />

                            <Route path='recent-activity/all' element={<PostsAndActivity />} />
                            <Route path='in/:id' element={<Profile />} />

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
        </AnimatePresence>

    )
}

export default AnimatedRoutes