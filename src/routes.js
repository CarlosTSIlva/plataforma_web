import React from 'react';

const Interfone = React.lazy(() => import('./views/Interfone/Interfone'));
const Comunicado = React.lazy(() => import('./views/Comunicado/Comunicado'));
const ComunicadoEdit = React.lazy(() => import('./views/Comunicado/ComunicadoEdit'));
const ComunicadoView = React.lazy(() => import('./views/Comunicado/ComunicadoView'));

const Documentos = React.lazy(() => import('./views/Documentos/Documentos'));
const DocumentosEdit = React.lazy(() => import('./views/Documentos/DocumentosEdit'));
const DocumentosView = React.lazy(() => import('./views/Documentos/DocumentosView'));

const TelefoneUtil = React.lazy(() => import('./views/TelefoneUtil/TelefoneUtil'));
const TelefoneUtilEdit = React.lazy(() => import('./views/TelefoneUtil/TelefoneUtilEdit'));
const TelefoneUtilView = React.lazy(() => import('./views/TelefoneUtil/TelefoneUtilView'));
const Encomenda = React.lazy(() => import('./views/Encomenda/Encomenda'));
const EncomendaEdit = React.lazy(() => import('./views/Encomenda/EncomendaEdit'));
const EncomendaView = React.lazy(() => import('./views/Encomenda/EncomendaView'));
const AreaComum = React.lazy(() => import('./views/AreaComum/AreaComum'));
const AreaComumEdit = React.lazy(() => import('./views/AreaComum/AreaComumEdit'));
const AreaComumView = React.lazy(() => import('./views/AreaComum/AreaComumView'));
const Associado = React.lazy(() => import('./views/Associado/Associado'));
const AssociadoEdit = React.lazy(() => import('./views/Associado/AssociadoEdit'));
const AssociadoView = React.lazy(() => import('./views/Associado/AssociadoView'));
const Visita = React.lazy(() => import('./views/Visita/Visita'));
const VisitaEdit = React.lazy(() => import('./views/Visita/VisitaEdit'));
const VisitaView = React.lazy(() => import('./views/Visita/VisitaView'));
const Condominio = React.lazy(() => import('./views/Condominio/Condominio'));
const CondominioEdit = React.lazy(() => import('./views/Condominio/CondominioEdit'));
const CondominioView = React.lazy(() => import('./views/Condominio/CondominioView'));
const UnidadeHabitacional = React.lazy(() => import('./views/UnidadeHabitacional/UnidadeHabitacional'));
const UnidadeHabitacionalEdit = React.lazy(() => import('./views/UnidadeHabitacional/UnidadeHabitacionalEdit'));
const UnidadeHabitacionalView = React.lazy(() => import('./views/UnidadeHabitacional/UnidadeHabitacionalView'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/console', exact: true, name: 'Console' },  
  { path: '/console/interfone', exact: true, name: 'Interfone', component: Interfone },

  { path: '/console/comunicado', exact: true, name: 'Comunicado', component: Comunicado },
  { path: '/console/comunicado/edit', exact: true, name: 'Edição', component: ComunicadoEdit },
  { path: '/console/comunicado/view', exact: true, name: 'Visualização', component: ComunicadoView },

  { path: '/console/documento', exact: true, name: 'Documento', component: Documentos },
  { path: '/console/documento/edit', exact: true, name: 'Edição', component: DocumentosEdit },
  { path: '/console/documento/view', exact: true, name: 'Visualização', component: DocumentosView },

  { path: '/console/telefoneutil', exact: true, name: 'Telefone Útil', component: TelefoneUtil },
  { path: '/console/telefoneutil/edit', exact: true, name: 'Edição', component: TelefoneUtilEdit },
  { path: '/console/telefoneutil/view', exact: true, name: 'Visualização', component: TelefoneUtilView },
  { path: '/console/encomenda', exact: true, name: 'Encomenda', component: Encomenda },
  { path: '/console/encomenda/edit', exact: true, name: 'Edição', component: EncomendaEdit },
  { path: '/console/encomenda/view', exact: true, name: 'Visualização', component: EncomendaView },
  { path: '/console/areacomum', exact: true, name: 'Área Comum', component: AreaComum },
  { path: '/console/areacomum/edit', exact: true, name: 'Edição', component: AreaComumEdit },
  { path: '/console/areacomum/view', exact: true, name: 'Visualização', component: AreaComumView },
  { path: '/console/associado', exact: true, name: 'Conta', component: Associado },
  { path: '/console/associado/edit', exact: true, name: 'Edição', component: AssociadoEdit },
  { path: '/console/associado/view', exact: true, name: 'Visualização', component: AssociadoView },
  { path: '/console/visita', exact: true, name: 'Visita', component: Visita },
  { path: '/console/visita/edit', exact: true, name: 'Edição', component: VisitaEdit },
  { path: '/console/visita/view', exact: true, name: 'Visualização', component: VisitaView },
  { path: '/console/condominio', exact: true, name: 'Condomínio', component: Condominio },
  { path: '/console/condominio/edit', exact: true, name: 'Edição', component: CondominioEdit },
  { path: '/console/condominio/view', exact: true, name: 'Visualização', component: CondominioView },
  { path: '/console/unidadehabitacional', exact: true, name: 'Unidade Habitacional', component: UnidadeHabitacional },
  { path: '/console/unidadehabitacional/edit', exact: true, name: 'Edição', component: UnidadeHabitacionalEdit },
  { path: '/console/unidadehabitacional/view', exact: true, name: 'Visualização', component: UnidadeHabitacionalView },
];

export default routes;
