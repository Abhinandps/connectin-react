import { IoHomeSharp } from 'react-icons/io5'
import { BiSolidDownArrow } from 'react-icons/bi'


const navdata = [
    {
        id: 'tab1',
        title: 'Home',
        icon: IoHomeSharp,
        path: '/',
    },
    {
        id: 'tab2',
        title: 'My Network',
        icon: IoHomeSharp,
        path: 'mynetwork'
    },
    {
        id: 'tab3',
        title: 'Jobs',
        icon: IoHomeSharp,
        path: 'jobs',
        disabled: true
    },
    {
        id: 'tab4',
        title: 'Messaging',
        icon: IoHomeSharp,
        path: 'messaging',
        disabled: true
    },
    {
        id: 'tab5',
        title: 'Notification',
        icon: IoHomeSharp,
        path: 'notification',
        disabled: true
    },
    {
        id: 'tab6',
        title: 'Me',
        icon: 'https://media.licdn.com/dms/image/D5603AQGWIWfHozDbFw/profile-displayphoto-shrink_100_100/0/1681645719137?e=1703116800&v=beta&t=emx0qOZ_uF1VpGQGbBT_cLE9uE_Q7D5vov-PgRQXy1I',
        subIcon: BiSolidDownArrow,
        modal: true
    },
    {
        id: 'tab7',
        title: 'Post a Job',
        icon: IoHomeSharp,
        path: 'add-job',
        disabled: true
    },
]


const usersManageList = [
    {
        id: 'tab1',
        title: 'Posts & Activity',
        path: '/recent-activity/all',
    },
    {
        id: 'tab2',
        title: 'Job Posting',
        path: '/',
    },
]

const contentAdminManageList = [
    {
        id: 'tab1',
        title: 'Posts & Activity',
        path: '/recent-activity/all',
    },
    {
        id: 'tab2',
        title: 'Reports',
        path: '/',
    },
]

const superAdminManageList = [
    {
        id: 'tab1',
        title: 'Posts & Activity',
        path: '/recent-activity/all',
    },
    {
        id: 'tab2',
        title: 'Users & Admin',
        path: '/manage-admins',
    },
]


export { navdata, usersManageList, contentAdminManageList, superAdminManageList }

