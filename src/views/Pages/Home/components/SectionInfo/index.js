import React from "react";

import { Container, Row, Col, CardImg } from "reactstrap";

export default function SectionInfo() {
  return (
    <>
      <div className="section">
        <Container className="text-center">
          <Row className="justify-content-md-center">
            <Col lg="12" md="12">
              <h3 className="title">
                O App que fortalece a vida em Comunidade.
              </h3>
              <h4 className="description">
                De famílias a amizades, compartilhamos experiências e interações
                com grupos. Nossos vínculos fortes ou fracos com esses grupos
                tecem o tecido da associação e da comunidade. Uma comunidade é
                uma estrutura social que compartilha valores pessoais, valores
                culturais, objetivos de negócios, atitudes ou uma visão de
                mundo. O que o une é uma cultura comunitária de regras sociais e
                dinâmicas de grupo que identificam os membros.
              </h4>
              <br></br>
              <br></br>
              <h4 className="description">
                De famílias a amizades, compartilhamos experiências e interações
                com grupos. Nossos vínculos fortes ou fracos com esses grupos
                tecem o tecido da associação e da comunidade. Uma comunidade é
                uma estrutura social que compartilha valores pessoais, valores
                culturais, objetivos de negócios, atitudes ou uma visão de
                mundo. O que o une é uma cultura comunitária de regras sociais e
                dinâmicas de grupo que identificam os membros.
              </h4>
              <br></br>
              <br></br>
              <h4 className="description">
                Todos nós temos comunidades online, mas algumas são menos
                visíveis Uma comunidade online não é diferente de qualquer outra
                comunidade, exceto pelo fato de que é online. É um grupo de
                pessoas com algo em comum, que pode incluir interesses
                compartilhados, experiências, ideais, objetivos (normalmente sem
                fins lucrativos, por exemplo) ou perfis (por exemplo, clientes
                fiéis ou fãs de uma marca). As comunidades costumam ser baseadas
                na proximidade.
              </h4>
            </Col>
          </Row>
        </Container>
        <Container className="text-center">
          <h3 className="title">Benefícios da vida em Comunidade</h3>
          <Row>
            <Col lg="4" md="12">
              <h3 className="title">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    maxWidth: "800px",
                    flex: 1,
                  }}
                >
                  <CardImg
                    style={{ heigth: "88px", width: "86px", paddingLeft: 8 }}
                    src={require("../../assets/suporte_ao_morador.png")}
                    alt="Card image cap"
                  />
                  <div>Suporte ao Morador</div>
                </div>
              </h3>
              <h4 className="description">
                Algumas pessoas publicam informações úteis regularmente em
                comunidades. Quando alguém se envolve regularmente em contribuir
                com informações úteis para as discussões, essa pessoa pode
                ganhar uma boa reputação nessa comunidade.
              </h4>
            </Col>

            <Col lg="4" md="12">
              <h3 className="title">
                <CardImg
                  style={{ heigth: "87px", width: "90px", paddingRight: 12 }}
                  src={require("../../assets/autoestima.png")}
                  alt="Card image cap"
                />
                Autoestima
              </h3>
              <h4 className="description">
                As pessoas se sentem realizadas quando contribuem com
                informações úteis para a comunidade. Se uma pessoa ajuda outro
                cliente com um problema, essa pessoa geralmente fica satisfeita
                com a experiência. Os humanos precisam se sentir importantes de
                alguma forma. Ao ajudar outras pessoas, os membros podem sentir
                que são necessários e apreciados pelos outros.
              </h4>
            </Col>
            <Col lg="4" md="12">
              <h3 className="title">
                <CardImg
                  style={{ heigth: "83px", width: "86px", paddingRight: 8 }}
                  src={require("../../assets/reputacao.png")}
                  alt="Card image cap"
                />
                Reputação
              </h3>
              <h4 className="description">
                Os membros costumam visitar comunidades com o objetivo de obter
                suporte. Às vezes, esse suporte vem na forma de um funcionário
                fornecendo orientação e feedback, enquanto outras vezes o
                feedback pode vir de outros membros. De qualquer forma, o membro
                obtém a ajuda que procura.
              </h4>
            </Col>
          </Row>

          <Row>
            <Col lg="4" md="12">
              <h3 className="title">
                <CardImg
                  style={{ heigth: "86px", width: "86px", paddingRight: 8 }}
                  src={require("../../assets/companheirismo.png")}
                  alt="Card image cap"
                />
                Companheirismo
              </h3>
              <h4 className="description">
                Enquanto alguns membros gostam de ajudar outros membros da
                comunidade, algumas pessoas participam das discussões da
                comunidade em busca de companhia. Os membros podem interagir uns
                com os outros e discutir as coisas que gostam e não gostam de
                uma entidade e de produtos/serviços. Além disso, alguns membros
                podem discutir seus interesses pessoais e vida cotidiana. As
                comunidades podem dar às pessoas um novo grupo de pessoas com
                quem conversar, em vez das pessoas que vêem diariamente.
              </h4>
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              lg="4"
              md="12"
            >
              <CardImg
                style={{
                  heigth: "262px",
                  width: "262px",
                  alignItems: "center",
                }}
                src={require("../../assets/network-cicle.png")}
                alt="Card image cap"
              />
            </Col>
            <Col lg="4" md="12">
              <h3 className="title">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    maxWidth: "800px",
                    flex: 1,
                  }}
                >
                  <CardImg
                    style={{
                      heigth: "85px",
                      width: "86px",
                      paddingRight: "10px",
                    }}
                    src={require("../../assets/conteudo_e_informacoes.png")}
                    alt="Card image cap"
                  />
                  <div>
                    Conteúdo e <br></br>
                    informações
                  </div>
                </div>
              </h3>
              <h4 className="description">
                Frequentemente, uma comunidade é alimentada pela troca e
                compartilhamento de conteúdo e informações. Se for esse o caso e
                os membros da sua comunidade estiverem procurando boas
                informações e conteúdo (pergunte a eles!). De uma perspectiva de
                comunidade social, dê uma olhada na função e nos fundamentos de
                conteúdo social.
              </h4>
            </Col>
          </Row>

          <h4>
            <strong>Comunidade</strong> é uma estratégia, mas também uma
            mentalidade. Requer participação e algumas práticas recomendadas.
            Mais importante, requer um alinhamento de seus objetivos e o que seu
            público-alvo deseja em uma abordagem de comunidade social.
          </h4>
          <h3 className="title">
            Algumas dicas e princípios básicos da comunidade
          </h3>
          <Row>
            <Col lg="4" md="12">
              <h3 className="title">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    maxWidth: "800px",
                    flex: 1,
                  }}
                >
                  <CardImg
                    style={{ heigth: "106px", width: "106px" }}
                    src={require("../../assets/comunidade_primeiro.png")}
                    alt="Card image cap"
                  />
                  <div>
                    Comunidade <br></br>
                    primeiro
                  </div>
                </div>
              </h3>
              <h4 className="description">
                Como usuários das redes sociais, devemos primeiro pensar nas
                necessidades da comunidade que construímos ou da qual
                participamos. Em vez de pensar em todas as maneiras de comunicar
                às pessoas o quanto somos importantes, precisamos dar à
                comunidade o que seus membros desejam. Este é um primeiro passo
                essencial para construir uma comunidade.
              </h4>
            </Col>
            <Col lg="4" md="12">
              <h3 className="title">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    maxWidth: "800px",
                    flex: 1,
                  }}
                >
                  <CardImg
                    style={{
                      heigth: "112px",
                      width: "112px",
                      addingLeft: "30%",
                    }}
                    src={require("../../assets/interacao_e_participacao.png")}
                    alt="Card image cap"
                  />
                  <div>
                    Interação e<br></br>
                    participação
                  </div>
                </div>
              </h3>
              <h4 className="description">
                São fundamentais e é importante lembrar que a mídia social não é
                uma rua de mão única. A palavra-chave aqui é “social”, o que
                significa que deve haver interação. O experiente networker
                social cria oportunidades para as pessoas interagirem e
                responder a elas também. A participação da comunidade deve ser
                encorajada.
              </h4>
            </Col>
            <Col lg="4" md="12">
              <h3 className="title">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    maxWidth: "800px",
                    flex: 1,
                  }}
                >
                  <CardImg
                    style={{ heigth: "121px", width: "118px" }}
                    src={require("../../assets/quantidade_acima_de_qualidade.png")}
                    alt="Card image cap"
                  />
                  <div>
                    Qualidade acima <br></br>
                    de quantidade
                  </div>
                </div>
              </h3>
              <h4 className="description">
                Mais do que nunca, as pessoas recebem um fluxo avassalador de
                informações e aqueles que passam tudo adiante sem se importar
                com a qualidade serão rapidamente ignorados. Aqueles que se
                tornam uma fonte confiável do melhor conteúdo, filtrando e
                classificando os benefícios, verão esse público crescendo e
                contando com eles para obter experiência. Eles se tornarão o que
                chamamos de líderes de pensamento ou consultores de confiança.
              </h4>
            </Col>
          </Row>

          <h3 className="title">O que esperar da Caracol</h3>
          <Row>
            <Col lg="4" md="12">
              <h3 className="title">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    maxWidth: "800px",
                    flex: 1,
                  }}
                >
                  <CardImg
                    style={{ heigth: "88px", width: "80px" }}
                    src={require("../../assets/interfone_virtual.png")}
                    alt="Card image cap"
                  />
                  <div> Interfone Virtual</div>
                </div>
              </h3>
              <h4 className="description">
                Através do seu smartphone, a portaria se comunica com o morador
                por telefonia IP, sem necessidade de ligação tradicional com
                tarifação e/ou interfone fixo. Você não precisa mais correr
                dentro de casa para atender ao interfone fixo.
              </h4>
            </Col>
            <Col lg="4" md="12">
              <h3 className="title">
                <CardImg
                  style={{ heigth: "88px", width: "86px", paddingRight: 8 }}
                  src={require("../../assets/comunidades.png")}
                  alt="Card image cap"
                />
                Comunidos
              </h3>
              <h4 className="description">
                Todas as comunicações feitos pelo Condomínio, terão um destino e
                serão centralizados através do Caracol.
              </h4>
            </Col>
            <Col lg="4" md="12">
              <h3 className="title">
                <CardImg
                  style={{ heigth: "88px", width: "86px", paddingRight: 8 }}
                  src={require("../../assets/encomendas.png")}
                  alt="Card image cap"
                />
                Encomendas
              </h3>
              <h4 className="description">
                Na fase que estamos, onde consumimos mais e mais de forma
                virtual, nada melhor do que saber em primeira mão que aquela
                encomenda tão esperada chegou.
              </h4>
            </Col>
          </Row>

          <Row>
            <Col lg="4" md="12">
              <h3 className="title">
                <CardImg
                  style={{ heigth: "88px", width: "86px", paddingRight: 8 }}
                  src={require("../../assets/acao_social.png")}
                  alt="Card image cap"
                />
                Ação Social
              </h3>
              <h4 className="description">
                Área onde os Moradores abrem idéias de Ações Sociais para o
                Condomínio / Bairro e as pessoas irão contribuir de alguma
                forma.
              </h4>
            </Col>
            <Col lg="4" md="12">
              <h3 className="title">
                <CardImg
                  style={{ heigth: "88px", width: "86px", paddingRight: 8 }}
                  src={require("../../assets/classificados.png")}
                  alt="Card image cap"
                />
                Classificados
              </h3>
              <h4 className="description">
                Comunidade sendo estimulada a trocar as coisas que não mais
                utilidade para uma família
              </h4>
            </Col>
            <Col lg="4" md="12">
              <h3 className="title">
                <CardImg
                  style={{ heigth: "88px", width: "86px", paddingRight: 8 }}
                  src={require("../../assets/me_ajuda.png")}
                  alt="Card image cap"
                />
                Me Ajuda
              </h3>
              <h4 className="description">
                Precisa de ajuda para ir no Mercado, está com necessidade de
                pendular aquele quadro e não sabe como? Para isto que serve o
                “Me Ajuda”.
              </h4>
            </Col>
          </Row>

          <Row>
            <Col lg="4" md="12">
              <h3 className="title">
                <CardImg
                  style={{ heigth: "88px", width: "86px", paddingRight: 8 }}
                  src={require("../../assets/me_empresta.png")}
                  alt="Card image cap"
                />
                Me Empresta
              </h3>
              <h4 className="description">
                Precisa daquela ferramenta mais não tem sentido comprar uma pois
                será de pouca utilidade? Está tarde da noite e acabou o açucar?
                Para isto que serve o “Me Empresta”.
              </h4>
            </Col>
            <Col lg="4" md="12">
              <h3 className="title">
                <CardImg
                  style={{ heigth: "88px", width: "86px", paddingRight: 8 }}
                  src={require("../../assets/achados_e_perdidos.png")}
                  alt="Card image cap"
                />
                Achados e Perdidos
              </h3>
              <h4 className="description">
                Seu filho esqueceu o agasalho na quadra de futebol? Pode ter
                certeza que alguém irá achar e colocar no Achados e Perdidos.
              </h4>
            </Col>
            <Col lg="4" md="12">
              <h3 className="title">
                <CardImg
                  style={{ heigth: "88px", width: "86px", paddingRight: 8 }}
                  src={require("../../assets/pets.png")}
                  alt="Card image cap"
                />
                PETs
              </h3>
              <h4 className="description">
                O Condomínio é grande e você gosta muito do seu Pet e gostaria
                de arrumar um amigo para ele e ainda mais poder trocar ideias do
                gosto em comum.
              </h4>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
