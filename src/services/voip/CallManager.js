import * as VoxImplant from 'voximplant-websdk';

const handlersGlobal = {};

export default class CallManager {

  static myInstance = null;
  call = null;

  constructor() {
    this.client = VoxImplant.getInstance();
  }

  init() {
    this.client.on(VoxImplant.Events.IncomingCall, this._incomingCall);
  }

  static getInstance() {
    if (this.myInstance === null) {
      this.myInstance = new CallManager();
    }
    return this.myInstance;
  }

  async makeCall(voipUser, isVideoCall) {
    console.log('CallManager: makeCall');
    const callSettings = {
      video: {
        sendVideo: false,
        receiveVideo: false
      },
    };
    try {
      const call = await this.client.call(voipUser, callSettings);
      this.addCall(call);
      this.bindCallCallbacks();
    } catch (err) {
      console.log(err)
    }
  }

  async answerCall() {
    console.log('CallManager: answerCall');
    if (this.call !== null && this.call !== undefined) {
      await this.call.answer();
    }
  }

  async muteCall(isMuted) {
    console.log('CallManager: muteCall');
    if (this.call !== null && this.call !== undefined) {
      this.call.sendAudio(!isMuted);
    }
  }

  bindCallCallbacks() {
    console.log('CallManager: bindCallCallbacks')
    try {
      this.call.on(VoxImplant.CallEvents.Connected, this._callConnected);
      this.call.on(VoxImplant.CallEvents.Disconnected, this._callDisconnected);
      this.call.on(VoxImplant.CallEvents.Failed, this._callFailed);
    }
    catch (e) {
    }
  }

  addCall(call) {
    console.log(`CallManager: addCall: ${call.id()}`);
    this.call = call;
  }

  removeCall(call) {
    console.log(`CallManager: removeCall: ${call.id()}`);
    if (this.call && (this.call.id() === call.id())) {
      this.call = null;
    } else if (this.call) {
      console.warn('CallManager: removeCall: call id mismatch');
    }
    this._emit('onEndCall');
  }

  getCallById(callId) {
    if (this.call && (this.call.id() === callId)) {
      return this.call;
    }
    return null;
  }

  endCall() {
    console.log('CallManager: endCall');
    console.log(this.call)
    if (this.call) {
      if (this.call.signalingConnected || !this.call.settings.incoming) {
        this.call.hangup();
      } else {
        this.call.decline();
      }
    }
  }

  on(event, handler) {
    if (!handlersGlobal[event]) {
      handlersGlobal[event] = [];
    }
    handlersGlobal[event].push(handler);
  }

  off(event, handler) {
    if (handlersGlobal[event]) {
      handlersGlobal[event] = handlersGlobal[event].filter(v => v !== handler);
    }
  }

  _emit(event, ...args) {
    const handlers = handlersGlobal[event];
    if (handlers) {
      for (const handler of handlers) {
        handler(...args);
      }
    }
  }

  _incomingCall = (event) => {
    if (this.call !== null) {
      console.log(this.call)
      console.log(`CallManager: incomingCall: already have a call, rejecting new call, current call id: ${this.call.id()}`);
      event.call.decline();
      return;
    }
    console.log(`CallManager: _incomingCall: ${event.call}`);
    this.addCall(event.call);
    this.bindCallCallbacks();
    this._emit('onIncomingCall', event.call)
    //this.call.answer();               
  };

  _callConnected = (event) => {
    console.log('CallManager: _callConnected')
    this._emit('onCall');
  };

  _callDisconnected = (event) => {
    console.log('CallManager: _callDisconnected');
    this.removeCall(event.call);
  };

  _callFailed = (event) => {
    console.log('CallManager: _callFailed');
    this.removeCall(event.call);
  }

}
