const constraints = {
  nome: {
    presence: {
      allowEmpty: false,
      message: "^Nome é uma informação obrigatória."
    },
    /*
    format: {
      pattern: /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/,
      message: "^Formato para o campo Nome está inválido."
    },
    */
  },
  email: {
    presence: {
      allowEmpty: false,
      message: "^E-mail é uma informação obrigatória."
    },
    email: {
      message: "^Formato de e-mail inválido.",
    }
  },
  data: {
    presence: {
      allowEmpty: false,
      message: "^(*) Campo obrigatório."
    },
    datetime: {
      dateOnly: false,
      message: "^Data inválida."
    }
  },
  username: {
    presence: {
      allowEmpty: false,
      message: "^Usuário é uma informação obrigatória."
    },
    length: {
      minimum: 6,
      maximum: 20,
      tooShort: "^Usuário precisar ter no mínimo %{count} caracteres.",
      tooLong: "^Usuário precisar ter no máximo %{count} caracteres."
    },
    format: {
      pattern: /^[a-zA-Z]+([_.-]?[a-zA-Z0-9])*$/,
      message: "^Usuário inválido, não pode haver espaços ou caracteres especiais."
    }
  },
  password: {
    presence: {
      allowEmpty: false,
      message: "^Senha é uma informação obrigatória."
    },
    length: {
      minimum: 6,
      maximum: 20,
      tooShort: "^Senha precisar ter no mínimo %{count} caracteres.",
      tooLong: "^Senha precisar ter no máximo %{count} caracteres."
    }
  },
  documento: {
    presence: {
      allowEmpty: false,
      message: "^(*) Campo obrigatório."
    }
  },
  confirmPassword: {
    equality: "password",
    message: "^A confirmação da senha não confere com a senha digitada."
  },
  descricao: {
    presence: {
      allowEmpty: false,
      message: "^(*) Campo obrigatório."
    }
  },
  telefone: {
    presence: {
      allowEmpty: false,
      message: "^(*) Campo obrigatório."
    }
  },
};

export default constraints;