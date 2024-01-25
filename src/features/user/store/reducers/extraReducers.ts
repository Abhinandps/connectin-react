import { InvitationData } from "../networkslice"


// Invitations
// ===================

export const sendConnectionRequestFullfilledReducer = (_state:any, action:any) => {
    let { sender } = action.payload
    console.log(sender, 'sender id')
}

export const fetchConnectionsRequestsFullfilledReducer = (state:any, action:any) => {
    let py = action.payload.res

    const unviewedInvitationsId = state.invitations.filter((user: InvitationData) => !user.viewed).map((unviewedInvitation: any) => unviewedInvitation.userId);


    const connectionRequests = py.map((user: any) => {
        const userWithFlags = {
            ...user,
            viewed: unviewedInvitationsId.includes(user?.userId) ? false : true
        };

        return userWithFlags
    })

    state.invitations = connectionRequests;

}

export const acceptConnectionsRequestFullilledReducer = (state:any, action:any) => {
    let { userId } = action.payload
    const updateInvitation = state.invitations.map((user: InvitationData) => {
        if (user?.userId === userId) {
            return {
                ...user,
                status: 'connected',
                isAccepted: true
            };
        }
        return user
    })


    return {
        ...state,
        invitations: updateInvitation
    }

}

export const rejectConnectionRequestFullfilledReducer = (state:any, action:any) => {
    let { userId } = action.payload

    const updateInvitation = state.invitations.filter((user: any) => user?.userId !== userId)

    return {
        ...state,
        invitations: updateInvitation
    }
}


export const removeConnectionFullfilledReducer = (state:any, action:any) => {
    let { userId } = action.payload

    const updateConnections = state.connections.filter((user: any) => user?.userId !== userId)

    return {
        ...state,
        connections: updateConnections
    }
}




// Connections
// ===================


export const fetchConnectionsFullfilledReducer = (state:any, action:any) => {
    let py = action.payload.res
    console.log(py, 'py')
    state.connections = py
}


export const fetchRecommendedFullfilledReducer = (state:any, action:any) => {
    let py = action.payload.res.data
    state.recommendations = py
}

// FOLLOWERS

export const fetchFollowersFullfilledReducer = (state:any, action:any) => {
    let py = action.payload.res
    state.followers = py
}

export const fetchFollowingFullfilledReducer = (state:any, action:any) => {
    let py = action.payload.res
    state.following = py
}

export const followUserFullfilledReducer = (_state:any, action:any) => {
    let { sender } = action.payload
    console.log(sender, 'sender id')
}

export const unFollowUserFullfilledReducer = (_state:any, action:any) => {
    let { sender } = action.payload
    console.log(sender, 'sender id')
}



