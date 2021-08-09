export default {
  items: [
    {
      title: true,
      name: 'Administrativo',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },    
    {
      name: 'Condomínio',
      url: '/console/condominio',
      icon: 'icon-grid',
    },    
  ],
};
