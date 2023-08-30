import {createSlice} from '@reduxjs/toolkit'
const initialState={outbox:[],inbox:[]}
const emailSlice=createSlice({
    name:'emails',
    initialState,
    reducers:{
        outboxEmail(state,action){
            // state.outbox.push(...action.payload)
            state.outbox=action.payload

        },
        addOutboxEmail(state,action){
            state.outbox=[...state.outbox,action.payload]
        },

        inboxEmail(state,action){
            //state.inbox=[state.inbox,...action.payload]
             state.inbox=action.payload
        },
        deleteInboxEmail(state,action){
            state.inbox=state.inbox.filter(email=>email[0]!==action.payload)
        },
        deleteOutboxEmail(state,action){
            state.outbox=state.outbox.filter(email=>email[0]!==action.payload)
        },
        readInboxEmail(state,action){
            const readData=state.inbox.findIndex(email=>email[0]===action.payload)
            state.inbox[readData][1]={...state.inbox[readData][1],read:true}
        }
    }
})
export default emailSlice.reducer

export const emailActions=emailSlice.actions

