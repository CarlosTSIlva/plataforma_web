const INITIAL_STATE = {
   showCallModal: false
  ,displayName: ''
  ,stateCall: 'Chamando...'
  ,incomingCall: false
  ,inCall: false
  ,isMuted: false
}

export default function call(state = INITIAL_STATE, action) {
  if (action.type === 'SET_CALL_MODAL') {
    return { ...state, ...action.callInfo }
  }
  return state
}