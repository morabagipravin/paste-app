import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pastes: localStorage.getItem("pastes")
    ?JSON.parse(localStorage.getItem("pastes"))
    : []

}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state) => {
    
    },

    updateToPastes: (state) => {
    
    },

    resetToPastes: (state, action) => {
    
    },

    removeFromPaste: (state) => {

    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetToPastes, removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer