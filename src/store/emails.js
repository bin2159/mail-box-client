import {createSlice} from '@reduxjs/toolkit'
const initialState={outbox:[],inbox:[],unRead:0}
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
            state.inbox=action.payload
            state.unRead=state.inbox.reduce((acc,cur)=>acc+(cur[1].read?0:1),0)
        },
        deleteInboxEmail(state,action){
            state.inbox=state.inbox.filter(email=>email[0]!==action.payload)
        },
        deleteOutboxEmail(state,action){
            state.outbox=state.outbox.filter(email=>email[0]!==action.payload)
        },
        readInboxEmail(state,action){
            console.log('hai')
            const readData=state.inbox.findIndex(email=>email[0]===action.payload)
            state.inbox[readData][1]={...state.inbox[readData][1],read:true}
            state.unRead=state.inbox.reduce((acc,cur)=>acc+(cur[1].read?0:1),0)
        }
    }
})
export default emailSlice.reducer

export const emailActions=emailSlice.actions

