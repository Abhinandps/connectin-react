import { createSlice } from "@reduxjs/toolkit";
import { initialState } from './initialState'
import { acceptConnectionRequest, fetchConnections, fetchConnectionsRequests, fetchFollowers, fetchFollowing, fetchRecommendations, followUserReducer, rejectConnectionRequest, removeConnectionReducer, unFollowUserReducer } from "./thunks";
import { acceptConnectionsRequestFullilledReducer, fetchConnectionsFullfilledReducer, fetchConnectionsRequestsFullfilledReducer, fetchFollowersFullfilledReducer, fetchFollowingFullfilledReducer, fetchRecommendedFullfilledReducer, followUserFullfilledReducer, rejectConnectionRequestFullfilledReducer, removeConnectionFullfilledReducer, unFollowUserFullfilledReducer } from "./reducers/extraReducers";


export interface InvitationData {
    userId: string;
    firstName: string;
    lastName: string;
    headline: string;
    profileImage: string | null;
    coverImage: string | null;
    followStatus: string;
    connectionStatus: string;
    receiver: string;
    viewed?: boolean;
    isAccepted?: boolean
    status?: string
}

const networkSlice = createSlice({
    name: 'networks',
    initialState,
    reducers: {
        reciveInvitation: (state, action) => {
            const py: InvitationData = action.payload
            const updatedInvitations = [...state.invitations, { ...py, viewed: false }];
            return {
                ...state,
                invitations: updatedInvitations
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConnectionsRequests.fulfilled, fetchConnectionsRequestsFullfilledReducer)
            .addCase(acceptConnectionRequest.fulfilled, acceptConnectionsRequestFullilledReducer)
            .addCase(rejectConnectionRequest.fulfilled, rejectConnectionRequestFullfilledReducer)
            .addCase(removeConnectionReducer.fulfilled, removeConnectionFullfilledReducer)
            .addCase(fetchConnections.fulfilled, fetchConnectionsFullfilledReducer)
            .addCase(fetchRecommendations.fulfilled, fetchRecommendedFullfilledReducer)
            .addCase(fetchFollowers.fulfilled, fetchFollowersFullfilledReducer)
            .addCase(fetchFollowing.fulfilled, fetchFollowingFullfilledReducer)
            .addCase(followUserReducer.fulfilled, followUserFullfilledReducer)
            .addCase(unFollowUserReducer.fulfilled, unFollowUserFullfilledReducer)
    }
})

export const { reciveInvitation } = networkSlice.actions

export default networkSlice.reducer
