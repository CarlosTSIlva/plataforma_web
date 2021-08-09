const INITIAL_STATE = {
    "info": {
        "id": 1,
        "nome": "Ielon Clesio Perotti Barbosa",
        "username": "ielonclesio",
        "email": "ielon.clesio@caracol.com.vc",
        "imagem": "https://brvstr.blob.core.windows.net/cloudelsys/morador.jpeg",
        "voip": {
            "user": "76_ieloncrcl",
            "app": "@app.ielonclesio.voximplant.com",
            "password": "@Carac01#apP",
            "hash": "@Carac01#apP"
        }
    },
    "contas": [
        {
            "id": 2,
            "id_conta_pai": null,
            "tipo": {
                "id": 1,
                "descricao": "Morador Titular"
            },
            "status": {
                "id": 1,
                "descricao": "Pendente"
            },
            "unidade": {
                "id": 2,
                "quadra_bloco": "10",
                "casa_apto": "20",
                "logradouro": null,
                "numero": null,
                "tipo": {
                    "id": 1,
                    "descricao": "Casa"
                },
                "condominio": {
                    "id": 1,
                    "nome": "Caracol App",
                    "razao_social": "Caracol App",
                    "cnpj": "1234567890",
                    "cep": "13060-840",
                    "logradouro": "Av. da Saudade",
                    "numero": "1000",
                    "bairro": "Centro",
                    "cidade": "Campinas",
                    "uf": "SP",
                    "localizacao": {
                        "x": -22.9294724,
                        "y": -47.1244093
                    },
                    "imagem": null
                }
            }
        }
    ]
}


export default function user(state = INITIAL_STATE, action) {

    if (action.type === 'SET_USER_INFO') {
        return action.user_info
    }

    return state
}