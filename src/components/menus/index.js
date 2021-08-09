import { secureGetItem } from '../../services/secure';

import administrador_sistema from './administrador_sistema';
import administrador_condominio from './administrador_condominio';
import administrativo_condominio from './administrativo_condominio';
import operacional_condominio from './operacional_condominio';

export default function navigation() {  
  const userInfo = secureGetItem('crcl-ssl-info')
  //const id_tipo_usuario = userInfo[0].id_tipo_usuario 
  return administrador_condominio;
  /*
  switch (id_tipo_usuario) {
    case 1:
      return administrador_sistema;
      break;
    case 3:
      return administrador_condominio;
      break;
    case 4:
      return administrativo_condominio;
      break;
    case 5:
      return operacional_condominio;
      break;
    default:
      return {
        items: []
      }
      break;  
  }
  */
}

