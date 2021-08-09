import * as VoxImplant from 'voximplant-websdk';
import { secureGetItem } from '../secure'; 

import CallManager from './CallManager';

const handlersGlobal = {};

export default class LoginManager {

  static myInstance = null;
  client = null;
  displayName = '';
  voip_refresh = null;
  callManager = null;


  static getInstance() {
    if (this.myInstance === null) {
      this.myInstance = new LoginManager();
    }
    return this.myInstance;
  }

  constructor() {
    this.client = VoxImplant.getInstance();
    (async () => {
      try {        
        await this.logout()
      } catch (err) {
        console.log(err)
      }
    })();
    this.client.on(VoxImplant.ClientState.ConnectionClosed, this._connectionClosed);
  }

  async logout(){
    console.log('LoginManager disconnect()')
    clearTimeout(this.voip_refresh)
    const state = await this.client.getClientState();
    if (state !== VoxImplant.ClientState.DISCONNECTED){
      await this.client.disconnect();
    }        
  }

  async loginWithPassword(user, password) {
    console.log('LoginManager: loginWithPassword')
    try {
      const state = await this.client.getClientState();
      if (state === VoxImplant.ClientState.DISCONNECTED) {
        await this.client.init({
          micRequired: true,
          progressTone: true,
          progressToneCountry: 'US'
        });
        await this.client.connect(false);
      }

      if(state !== VoxImplant.ClientState.LOGGED_IN && state !== VoxImplant.ClientState.LOGGING_IN){
        const authResult = await this.client.login(user, password);
        await this._processLoginSuccess(authResult);
      }   
      
      const newState = await this.client.getClientState();
      console.log('Login Manager (Client State):', newState)

    } catch (e) {
      console.log('LoginManager: loginWithPassword ' + e.name + e.message);
      switch (e.name) {
        case VoxImplant.ClientState.ConnectionFailed:
          this._emit('onConnectionFailed', e.message);
          break;
        case VoxImplant.ClientState.AuthResult:
          this._emit('onLoginFailed', e.code);
          break;
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

  _connectionClosed = () => {
    this._emit('onConnectionClosed');
  };

  async _processLoginSuccess(authResult) {
    this.displayName = authResult.displayName;
    const loginTokens = authResult.tokens;
    if (loginTokens !== null) {
      if (!this.callManager) {
        this.callManager = CallManager.getInstance();
        this.callManager.init();
      }
      clearTimeout(this.voip_refresh)  
      this.voip_refresh = setInterval(()=>{ this.voipRefresh() }, 60000)
    } else {
      console.error('LoginSuccessful: login tokens are invalid');
    }    
    console.log('LoginManager: _processLoginSuccess')
    this.client.setOperatorACDStatus(VoxImplant.OperatorACDStatuses.Ready);
    this._emit('onLoggedIn', authResult.displayName);
  }
  
  voipRefresh(){
    console.log('LoginManager: voipRefresh')
    const data = secureGetItem('crcl-ssl-info')      
    if(data && data.info.voip){        
      const voipUsername = data.info.voip.user + data.info.voip.app
      const voipPassword = data.info.voip.password
      this.loginWithPassword(voipUsername,voipPassword)
    } else {
      this.logout();
      this._emit('onConnectionClosed');
    }
  }
  
}