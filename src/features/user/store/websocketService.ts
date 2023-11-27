

import io from 'socket.io-client';
import { userSocketUrl } from '../../../config/apiUrl';

const socket = io(userSocketUrl)

export default socket;

