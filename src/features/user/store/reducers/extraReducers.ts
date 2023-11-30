import { InvitationData } from "../networkslice"


// Invitations
// ===================

export const sendConnectionRequestFullfilledReducer = (state, action) => {
    let { sender } = action.payload
    console.log(sender, 'sender id')
}

export const fetchConnectionsRequestsFullfilledReducer = (state, action) => {
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

export const acceptConnectionsRequestFullilledReducer = (state, action) => {
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

export const rejectConnectionRequestFullfilledReducer = (state, action) => {
    let { userId } = action.payload

    const updateInvitation = state.invitations.filter((user: any) => user?.userId !== userId)

    return {
        ...state,
        invitations: updateInvitation
    }
}


// Connections
// ===================


export const fetchConnectionsFullfilledReducer = (state, action) => {
    let py = action.payload.res
    console.log(py,'py')
    state.connections = py
}


