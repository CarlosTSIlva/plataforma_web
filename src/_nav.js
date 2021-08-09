export default {
  items: [
    {
      name: "Interfone",
      url: "/console/interfone",
      icon: "icon-phone",
      badge: {
        variant: "success",
        text: "Ligar",
      },
    },
    {
      title: true,
      name: "Administrativo",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {}, // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "", // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: "Comunicado",
      url: "/console/comunicado",
      icon: "icon-note",
    },
    {
      name: "Encomenda",
      url: "/console/encomenda",
      icon: "icon-envelope",
    },
    {
      name: "Telefone Útil",
      url: "/console/telefoneutil",
      icon: "icon-phone",
    },
    {
      name: "Documento",
      url: "/console/documento",
      icon: "icon-folder",
    },
    {
      name: "Área Comum",
      url: "/console/areacomum",
      icon: "icon-arrow-right",
    },
    {
      name: "Associado",
      url: "/console/associado",
      icon: "icon-people",
    },
    {
      name: "Visita",
      url: "/console/visita",
      icon: "icon-user-following",
    },
    {
      name: "Condomínio",
      url: "/console/condominio",
      icon: "icon-grid",
    },
    {
      name: "Unid. Habitacional",
      url: "/console/unidadehabitacional",
      icon: "icon-home",
    },
  ],
};
