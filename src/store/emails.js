import {createSlice} from '@reduxjs/toolkit'
const initialState={outbox:[],inbox:[]}
const emailSlice=createSlice({
    name:'emails',
    initialState,
    reducers:{
        outboxEmail(state,action){
            // state.outbox.push(...action.payload)
            console.log(action.payload)
            state.outbox=[...state.outbox,...action.payload]

        },

        inboxEmail(state,action){
            //state.inbox=[state.inbox,...action.payload]
             state.inbox=[...state.outbox,...action.payload]
        },
        deleteInboxEmail(state,action){
            state.inbox=state.inbox.filter(email=>email[0]!==action.payload)
        },
        deleteOutboxEmail(state,action){
            
            state.outbox=state.outbox.filter(email=>email[0]!==action.payload)
        }
    }
})
export default emailSlice.reducer

export const emailActions=emailSlice.actions

