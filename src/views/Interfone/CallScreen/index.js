import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCallModal } from '../../../store/actions/call';

import CallManager from '../../../services/voip/CallManager';
import soundfile from '../../../assets/sounds/officephone.mp3';

import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col
} from 'reactstrap';

export default function CallScreen() {

  const call_info = useSelector(state => state.call);
  const dispatch = useDispatch()

  const ring = new Audio(soundfile);
  ring.loop = true;

  useEffect(() => {
    CallManager.getInstance().on('onIncomingCall', (call) => onIncomingCall(call));
    CallManager.getInstance().on('onCall', () => onCall());
    CallManager.getInstance().on('onEndCall', () => onEndCall());

    return () => {
      CallManager.getInstance().off('onIncomingCall', (call) => onIncomingCall(call));
      CallManager.getInstance().off('onCall', () => onCall());
      CallManager.getInstance().off('onEndCall', () => onEndCall());
    }
  }, [])

  function toggleRing(playRing){    
    if(playRing){      
      ring.play()
    } else {
      ring.pause()
    }
  }

  function onIncomingCall(call) {
    console.log(`CallScreen: onIncomingCall`);
    dispatch(setCallModal({
      showCallModal: true
      , displayName: call.settings.displayName
      , stateCall: 'Chamando...'
      , incomingCall: true
      , inCall: false
      , isMuted: false
    }))
    toggleRing(true)    
  }

  function onEndCall() {
    console.log(`CallScreen: onEndCall`);
    dispatch(setCallModal({
      showCallModal: false
      , displayName: ''
      , stateCall: 'Encerrando...'
      , incomingCall: false
      , inCall: false
      , isMuted: false
    }))
    toggleRing(false)    
  }

  function onCall() {
    console.log(`CallScreen: onCall`);
    dispatch(setCallModal({
      stateCall: 'Em chamada...'
      , incomingCall: false
      , inCall: true
      , isMuted: false
    }))
    toggleRing(false)
  }

  async function answerCall(e) {
    e.preventDefault()
    try{      
      await CallManager.getInstance().answerCall();      
    }
    catch(err){
      console.log(err)
    }   
  }

  async function endCall(e) {
    e.preventDefault()
    try{      
      await CallManager.getInstance().endCall();    
    }
    catch(err){
      console.log(err)
    }
  }

  async function muteCall(e) {
    e.preventDefault()
    try{      
      await CallManager.getInstance().muteCall(!call_info.isMuted)
      dispatch(setCallModal({ isMuted: !call_info.isMuted }))
    }
    catch(err){
      console.log(err)
    }
  }

  function renderModalCall() {
    return (
      <Modal isOpen={call_info.showCallModal}>
        <ModalHeader> Chamada</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="12" lg="12" className="text-center">
              <h3>{call_info.displayName}</h3>
              <p className="lead">{call_info.stateCall}</p>
            </Col>
          </Row>
          <div className='row justify-content-around'>
            {call_info.incomingCall ?
              (<Button className="btn-pill bg-green"
                style={{ width: '80px', height: '80px' }}
                onClick={e => { answerCall(e) }}>
                <i className="icon-phone icons font-2xl" />
              </Button>) :
              (<Button className="btn-pill btn-secondary"
                style={{ width: '80px', height: '80px' }}
                disabled>
                <i className="icon-phone icons font-2xl" />
              </Button>)
            }
            <Button className="btn-pill bg-red"
              style={{ width: '80px', height: '80px' }}
              onClick={e => { endCall(e) }}>
              <i className="icon-call-end icons font-2xl" />
            </Button>
            {call_info.inCall ?
              (<Button className={call_info.isMuted ? "btn-pill btn-secondary" : "btn-pill bg-orange"}
                style={{ width: '80px', height: '80px' }}
                onClick={e => { muteCall(e) }}>
                <i className="icon-microphone icons font-2xl" />
              </Button>) :
              (<Button className="btn-pill btn-secondary"
                style={{ width: '80px', height: '80px' }}
                disabled>
                <i className="icon-microphone icons font-2xl" />
              </Button>)
            }
          </div>
        </ModalBody>
      </Modal >
    )
  }

  return (
    <>
      {renderModalCall()}
    </>
  );
}
