import { InvitationData } from "./networkslice"

type NETWORK = {
    invitations: InvitationData[],
    connections: [],
    following: [],
    followers: [],
    hashtag: [],
    recommendations: []
}

export const initialState: NETWORK = {
    invitations: [],
    connections: [],
    following: [],
    followers: [],
    hashtag: [],
    recommendations: []
}