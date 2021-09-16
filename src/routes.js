import React from "react";

const Interfone = React.lazy(() => import("./views/Interfone/Interfone"));
const Comunicado = React.lazy(() => import("./views/Comunicado/Comunicado"));
const ComunicadoEdit = React.lazy(() =>
  import("./views/Comunicado/ComunicadoEdit")
);
const ComunicadoView = React.lazy(() =>
  import("./views/Comunicado/ComunicadoView")
);

const Documentos = React.lazy(() => import("./views/Documentos/Documentos"));
const DocumentosEdit = React.lazy(() =>
  import("./views/Documentos/DocumentosEdit")
);
const DocumentosView = React.lazy(() =>
  import("./views/Documentos/DocumentosView")
);

const TelefoneUtil = React.lazy(() =>
  import("./views/TelefoneUtil/TelefoneUtil")
);
const TelefoneUtilEdit = React.lazy(() =>
  import("./views/TelefoneUtil/TelefoneUtilEdit")
);
const TelefoneUtilView = React.lazy(() =>
  import("./views/TelefoneUtil/TelefoneUtilView")
);
const Encomenda = React.lazy(() => import("./views/Encomenda/Encomenda"));
const EncomendaEdit = React.lazy(() =>
  import("./views/Encomenda/EncomendaEdit")
);
const EncomendaView = React.lazy(() =>
  import("./views/Encomenda/EncomendaView")
);
const AreaComum = React.lazy(() => import("./views/AreaComum/AreaComum"));
const AreaComumEdit = React.lazy(() =>
  import("./views/AreaComum/AreaComumEdit")
);
const AreaComumView = React.lazy(() =>
  import("./views/AreaComum/AreaComumView")
);
const Cliente = React.lazy(() => import("./views/Cliente/Cliente"));
const ClienteEdit = React.lazy(() => import("./views/Cliente/ClienteEdit"));
const ClienteView = React.lazy(() => import("./views/Cliente/ClienteView"));
const Condominio = React.lazy(() => import("./views/Condominio/Condominio"));

const Estabelecimento = React.lazy(() =>
  import("./views/Estabelecimento/Estabelecimento")
);
const EstabelecimentoEdit = React.lazy(() =>
  import("./views/Estabelecimento/EstabelecimentoEdit")
);
const EstabelecimentoView = React.lazy(() =>
  import("./views/Estabelecimento/EstabelecimentoView")
);
const Servico = React.lazy(() => import("./views/Sevico/Servico"));
const ServicoEdit = React.lazy(() => import("./views/Sevico/ServicoEdit"));
const ServicoView = React.lazy(() => import("./views/Sevico/ServicoView"));

const CondominioEdit = React.lazy(() =>
  import("./views/Condominio/CondominioEdit")
);
const CondominioView = React.lazy(() =>
  import("./views/Condominio/CondominioView")
);
const UnidadeHabitacional = React.lazy(() =>
  import("./views/UnidadeHabitacional/UnidadeHabitacional")
);
const UnidadeHabitacionalEdit = React.lazy(() =>
  import("./views/UnidadeHabitacional/UnidadeHabitacionalEdit")
);
const UnidadeHabitacionalView = React.lazy(() =>
  import("./views/UnidadeHabitacional/UnidadeHabitacionalView")
);

const Usuario = React.lazy(() => import("./views/Usuario/Usuario"));
const UsuarioEdit = React.lazy(() => import("./views/Usuario/UsuarioEdit"));
const UsuarioView = React.lazy(() => import("./views/Usuario/UsuarioView"));

const PostoTrabalho = React.lazy(() =>
  import("./views/PostoTrabalho/PostoTrabalho")
);
const PostoTrabalhoEdit = React.lazy(() =>
  import("./views/PostoTrabalho/PostoTrabalhoEdit")
);
const PostoTrabalhoView = React.lazy(() =>
  import("./views/PostoTrabalho/PostoTrabalhoView")
);

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/console", exact: true, name: "Console" },
  {
    path: "/console/interfone",
    exact: true,
    name: "Interfone",
    component: Interfone,
  },

  {
    path: "/console/usuario",
    exact: true,
    name: "Usuario",
    component: Usuario,
  },
  {
    path: "/console/usuario/edit",
    exact: true,
    name: "Edição",
    component: UsuarioEdit,
  },
  {
    path: "/console/usuario/edit/:id",
    exact: true,
    name: "Edição",
    component: UsuarioEdit,
  },
  {
    path: "/console/usuario/view",
    exact: true,
    name: "Visualização",
    component: UsuarioView,
  },
  {
    path: "/console/comunicado",
    exact: true,
    name: "Comunicado",
    component: Comunicado,
  },
  {
    path: "/console/comunicado/edit",
    exact: true,
    name: "Edição",
    component: ComunicadoEdit,
  },
  {
    path: "/console/comunicado/view",
    exact: true,
    name: "Visualização",
    component: ComunicadoView,
  },

  {
    path: "/console/posto_trabalho",
    exact: true,
    name: "Posto de Trabalho",
    component: PostoTrabalho,
  },
  {
    path: "/console/posto_trabalho/edit",
    exact: true,
    name: "Edição",
    component: PostoTrabalhoEdit,
  },
  {
    path: "/console/posto_trabalho/edit/:id",
    exact: true,
    name: "Edição",
    component: PostoTrabalhoEdit,
  },
  {
    path: "/console/posto_trabalho/view",
    exact: true,
    name: "Visualização",
    component: PostoTrabalhoView,
  },

  {
    path: "/console/documento",
    exact: true,
    name: "Documento",
    component: Documentos,
  },
  {
    path: "/console/documento/edit",
    exact: true,
    name: "Edição",
    component: DocumentosEdit,
  },
  {
    path: "/console/documento/view",
    exact: true,
    name: "Visualização",
    component: DocumentosView,
  },

  {
    path: "/console/telefoneutil",
    exact: true,
    name: "Telefone Útil",
    component: TelefoneUtil,
  },
  {
    path: "/console/telefoneutil/edit",
    exact: true,
    name: "Edição",
    component: TelefoneUtilEdit,
  },
  {
    path: "/console/telefoneutil/view",
    exact: true,
    name: "Visualização",
    component: TelefoneUtilView,
  },
  {
    path: "/console/encomenda",
    exact: true,
    name: "Encomenda",
    component: Encomenda,
  },
  {
    path: "/console/encomenda/edit",
    exact: true,
    name: "Edição",
    component: EncomendaEdit,
  },
  {
    path: "/console/encomenda/view",
    exact: true,
    name: "Visualização",
    component: EncomendaView,
  },
  {
    path: "/console/areacomum",
    exact: true,
    name: "Área Comum",
    component: AreaComum,
  },
  {
    path: "/console/areacomum/edit",
    exact: true,
    name: "Edição",
    component: AreaComumEdit,
  },
  {
    path: "/console/areacomum/view",
    exact: true,
    name: "Visualização",
    component: AreaComumView,
  },
  {
    path: "/console/cliente",
    exact: true,
    name: "Cliente",
    component: Cliente,
  },
  {
    path: "/console/cliente/edit",
    exact: true,
    component: ClienteEdit,
  },
  {
    path: "/console/cliente/edit/:id",
    exact: true,
    component: ClienteEdit,
  },
  {
    path: "/console/cliente/view",
    exact: true,
    name: "Visualização",
    component: ClienteView,
  },
  {
    path: "/console/condominio",
    exact: true,
    name: "Condomínio",
    component: Condominio,
  },
  {
    path: "/console/condominio/edit",
    exact: true,
    name: "Edição",
    component: CondominioEdit,
  },
  {
    path: "/console/condominio/view",
    exact: true,
    name: "Visualização",
    component: CondominioView,
  },
  {
    path: "/console/servico",
    exact: true,
    name: "Condomínio",
    component: Servico,
  },
  {
    path: "/console/servico/edit",
    exact: true,
    name: "Edição",
    component: ServicoEdit,
  },
  {
    path: "/console/servico/edit/:id",
    exact: true,
    name: "Edição",
    component: ServicoEdit,
  },
  {
    path: "/console/servico/view",
    exact: true,
    name: "Visualização",
    component: ServicoView,
  },
  {
    path: "/console/estabelecimento",
    exact: true,
    name: "Condomínio",
    component: Estabelecimento,
  },
  {
    path: "/console/estabelecimento/edit",
    exact: true,
    name: "Edição",
    component: EstabelecimentoEdit,
  },
  {
    path: "/console/estabelecimento/edit/:id",
    exact: true,
    name: "Edição",
    component: EstabelecimentoEdit,
  },
  {
    path: "/console/estabelecimento/view",
    exact: true,
    name: "Visualização",
    component: EstabelecimentoView,
  },
  {
    path: "/console/unidadehabitacional",
    exact: true,
    name: "Unidade Habitacional",
    component: UnidadeHabitacional,
  },
  {
    path: "/console/unidadehabitacional/edit",
    exact: true,
    name: "Edição",
    component: UnidadeHabitacionalEdit,
  },
  {
    path: "/console/unidadehabitacional/view",
    exact: true,
    name: "Visualização",
    component: UnidadeHabitacionalView,
  },
];

export default routes;
