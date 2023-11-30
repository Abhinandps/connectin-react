import { IoHomeSharp } from 'react-icons/io5'
import { BiSolidDownArrow } from 'react-icons/bi'
import { RiGroupFill } from "react-icons/ri";
import { PiBagSimpleFill } from "react-icons/pi";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";


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
        icon: RiGroupFill,
        path: 'mynetwork',
        isNotify: false,
    },
    {
        id: 'tab3',
        title: 'Jobs',
        icon: PiBagSimpleFill,
        path: 'jobs',
    },
    {
        id: 'tab4',
        title: 'Messaging',
        icon: IoChatbubbleEllipsesSharp,
        path: 'messaging',
        disabled: true
    },
    {
        id: 'tab5',
        title: 'Notification',
        icon: IoNotifications,
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

