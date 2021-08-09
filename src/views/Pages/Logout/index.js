import { useEffect } from 'react';

import LoginManager from '../../../services/voip/LoginManager'; 

export default function Logout(props) {
  
  useEffect(()=>{
    LoginManager.getInstance().logout()
    localStorage.clear()    
    props.history.push('/')     
  },[])

  return null;
}
