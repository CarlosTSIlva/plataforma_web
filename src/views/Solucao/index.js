/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import IndexNavbar from "../../components/Navbars/IndexNavbar";
import Footer from "../../components/Footer/Footer";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import Card from "reactstrap/lib/Card";
import Form from "reactstrap/lib/Form";
import CardHeader from "reactstrap/lib/CardHeader";
import CardTitle from "reactstrap/lib/CardTitle";
import {
  Button,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
} from "reactstrap";

function Solucao() {
  const [firstFocus, setFirstFocus] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const toggle2 = () => setDropdownOpen2((prevState) => !prevState);

  return (
    <>
      <IndexNavbar />

      <>
        <div className="page-header clear-filter">
          {/* <div
            className="page-header-image"
            style={{
              backgroundImage: "url(" + require("assets/fundoimg3.png") + ")",
            }}
          ></div> */}
          <Container style={{ paddingTop: 500 }}>
            <div className="content-center brand">
              {/* <img
                alt="..."
                className="n-logo"
                src={require("assets/girassol_logo_branco.png")}
              ></img> */}
              <Container>
                <Row>
                  <Card
                    className="card-signup"
                    style={{ background: "white", color: "black" }}
                  >
                    <Form action="" className="form" method="">
                      <CardHeader className="text-center">
                        <CardTitle tag="h3">
                          Vamos Simular o Quanto Você Poderá Economizar?
                        </CardTitle>
                      </CardHeader>
                      <CardBody style={{ textAlign: "start" }}>
                        <p class="h5">Seu Endereço</p>
                        <InputGroup
                          className={
                            "no-border" +
                            (firstFocus ? " input-group-focus" : "")
                          }
                        >
                          <Input
                            placeholder="Av. Ipiranga, 1000 CEP 00000-000"
                            type="text"
                            onFocus={() => setFirstFocus(true)}
                            onBlur={() => setFirstFocus(false)}
                          ></Input>
                        </InputGroup>
                        <p class="h5">Potência máxima</p>

                        <InputGroup
                          className={
                            "no-border" +
                            (firstFocus ? " input-group-focus" : "")
                          }
                        >
                          <Input
                            placeholder="100 kW"
                            type="text"
                            onFocus={() => setFirstFocus(true)}
                            onBlur={() => setFirstFocus(false)}
                          ></Input>
                        </InputGroup>
                      </CardBody>
                      <CardFooter
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          padding: 8,
                        }}
                      >
                        <Button color="primary">Pesquisar</Button>{" "}
                      </CardFooter>
                    </Form>
                  </Card>
                </Row>
              </Container>
            </div>
          </Container>
        </div>
      </>
      <>
        <Container>
          <>
            <div class="text-center">
              <h2>Planos e Preços</h2>
              <p style={{ fontSize: "1.4rem" }}>
                Todo Plano inclui 07 dias livres para teste.
              </p>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    Para moiores detalhes sobre preços, visite{" "}
                    <a
                      style={{ color: "#008489" }}
                      href="https://web.whatsapp.com"
                    >
                      aqui
                    </a>{" "}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ marginRight: 20 }}>
                      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle
                          style={{ background: "#219653", color: "white" }}
                          caret
                        >
                          Selecionea sua Moeda
                        </DropdownToggle>
                        <DropdownMenu container="body">
                          <DropdownItem>R$</DropdownItem>
                          <DropdownItem>€</DropdownItem>
                          <DropdownItem>Fr</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    <div>
                      <Dropdown isOpen={dropdownOpen2} toggle={toggle2}>
                        <DropdownToggle
                          style={{ background: "#219653", color: "white" }}
                          caret
                        >
                          Selecionea seu Plano
                        </DropdownToggle>
                        <DropdownMenu container="body">
                          <DropdownItem>Mensal</DropdownItem>
                          <DropdownItem>Semestral</DropdownItem>
                          <DropdownItem>Anual</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section class="pricing py-5">
              <div class="container">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="card mb-5 mb-lg-0">
                      <div class="card-body">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <h5
                            class="card-title text-uppercase text-center"
                            style={{ color: "#008489" }}
                          >
                            Livre
                          </h5>
                          {/* <img
                            alt="..."
                            width="24"
                            height="24"
                            className="n-logo"
                            src={require("assets/home-smile.png")}
                          ></img> */}
                        </div>
                        <h6 class="card-price text-center">$00.00</h6>
                        <ul class="fa-ul">
                          <li>
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem
                          </li>
                          <li class="text-muted">20 Consultas Mês</li>
                          <li class="text-muted">Raio limitado por Consulta</li>
                          <li class="text-muted">Período de uso por 60 dias</li>
                        </ul>

                        <a
                          href="#"
                          class="btn btn-block btn-primary text-uppercase"
                        >
                          Comece Hoje
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="card mb-5 mb-lg-0">
                      <div class="card-body">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <h5
                            class="card-title text-uppercase text-center"
                            style={{ color: "#008489" }}
                          >
                            Professional
                          </h5>
                          {/* <img
                            alt="..."
                            width="52"
                            height="52"
                            className="n-logo"
                            src={require("assets/logo_preto.png")}
                          ></img> */}
                        </div>
                        <h6 class="card-price text-center">$100.00</h6>
                        <ul class="fa-ul">
                          <li>
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem
                          </li>
                          <li class="text-muted">It is a long established</li>
                          <li class="text-muted">It is a long established</li>
                          <li class="text-muted">Usuário único</li>
                        </ul>

                        <a
                          href="#"
                          class="btn btn-block btn-primary text-uppercase"
                        >
                          Comece Hoje
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="card mb-5 mb-lg-0">
                      <div class="card-body">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <h5
                            class="card-title text-uppercase text-center"
                            style={{ color: "#008489" }}
                          >
                            Corporativo
                          </h5>
                          {/* <img
                            alt="..."
                            width="22"
                            height="20"
                            className="n-logo"
                            src={require("assets/predio.png")}
                          ></img> */}
                        </div>
                        <h6 class="card-price text-center">$500.00</h6>
                        <ul class="fa-ul">
                          <li>
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem
                          </li>
                          <li class="text-muted">It is a long established</li>
                          <li class="text-muted">It is a long established</li>
                          <li class="text-muted">Até 5 usuários</li>
                        </ul>

                        <a
                          href="#"
                          class="btn btn-block btn-primary text-uppercase"
                        >
                          Comece Hoje
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
          <div className="section section-examples">
            <div className="text-center" style={{ marginBottom: 15 }}>
              <h2>Vamos Olhar o Que Está ao Seu Redor</h2>
              <p style={{ fontSize: "1.4rem" }}>
                A economia solar é calculada usando o tamanho e a forma do
                telhado, áreas sombreadas do telhado, clima local, preços locais
                de eletricidade, custos solares e incentivos estimados ao longo
                do tempo. Usando um endereço válido, dê uma olhada na estimativa
                detalhada que o Girassol.ai pode fornecer.
              </p>
              {/* <img alt="..." src={require("assets/consumidor_mapa.png")}></img> */}
            </div>
            <Row xs="2">
              <div class="col-sm">
                <div>
                  <h3>Como Você Deve Escolher um Fornecedor?</h3>

                  <div>
                    {/* <img
                      alt="..."
                      src={require("assets/truck-1.png")}
                      style={{ maxHeight: "180px" }}
                    ></img> */}
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <p style={{ fontSize: "1.4rem" }}>
                      Optar pela energia solar é um investimento valioso.
                      Selecionar o fornecedor de energia solar certo é uma
                      decisão importante que pode contribuir para uma transição
                      suave e afetar o desempenho geral do sistema. Desde
                      fornecer uma cotação inicial, obter financiamento,
                      projetar, instalar o sistema, até mantê-lo ao longo do
                      tempo, há muitos aspectos que seu provedor gerencia.
                    </p>
                  </div>
                </div>
                <div>
                  <h3>Principais Fatores na Escolha do Fornecedor </h3>
                  <div>
                    <h3>Experiência</h3>
                    <p style={{ fontSize: "1.4rem" }}>
                      Há quanto tempo o fornecedor de energia solar está no
                      mercado não é o único sinal de um bom fornecedor, mas
                      ajuda. Veja há quantos anos eles estão no mercado e
                      quantos sistemas eles instalaram.
                    </p>
                  </div>
                  <div>
                    <h3>Avaliação do Cliente</h3>
                    <p style={{ fontSize: "1.4rem" }}>
                      As avaliações dos clientes às vezes não contam toda a
                      história, especialmente se a avaliação for apenas sobre a
                      ligação inicial. Mas as avaliações e depoimentos são bons
                      insights sobre o atendimento ao cliente em geral e o tempo
                      de resposta.
                    </p>
                  </div>
                  <div>
                    <h3>Trabalho</h3>
                    <p style={{ fontSize: "1.4rem" }}>
                      Procure certificações, empreiteiros licenciados e fotos de
                      trabalhos concluídos.
                    </p>
                  </div>
                  <div>
                    <h3>Cotação Final</h3>
                    <p style={{ fontSize: "1.4rem" }}>
                      Um bom fornecedor de energia solar será transparente.
                      Certifique-se de que eles listam todos os seus custos
                      estimados com economia projetada, instalação do sistema e
                      custos de manutenção, bem como garantias do produto para
                      ajudar a proteger seu investimento.
                    </p>
                  </div>
                  <div>
                    <h3>Components do Sistema</h3>
                    <p style={{ fontSize: "1.4rem" }}>
                      Veja quais painéis e inversores eles oferecem. Alguns
                      provedores possuem uma ampla variedade de tipos.
                    </p>
                  </div>
                  <div>
                    <h3>Tempo</h3>
                    <p style={{ fontSize: "1.4rem" }}>
                      É uma boa ideia observar o tempo médio de espera de um
                      fornecedor de energia solar para a instalação. Pergunte
                      quando eles agendariam sua instalação.
                    </p>
                  </div>
                  <div>
                    <h3>Garantias</h3>
                    <p style={{ fontSize: "1.4rem" }}>
                      Certifique-se de que eles fornecem garantias de produto e
                      desempenho. Procure o comprimento da cobertura. O padrão é
                      a garantia de 20 anos para painéis solares, o que deixa
                      você sem preocupações durante o período de seu aluguel,
                      empréstimo ou compra.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-sm">
                <div>
                  <h3>Quais Painés Solares Você Deve Usar?</h3>

                  <div>
                    {/* <img
                      alt="..."
                      src={require("assets/truck-2.png")}
                      style={{ maxHeight: "180px" }}
                    ></img> */}
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <p style={{ fontSize: "1.4rem" }}>
                      Ao selecionar painéis solares, revise os seguintes
                      detalhes com seu fornecedor solar:
                      <br /> O melhor valor para sua economia desejada: Depende
                      de quanto espaço utilizável no telhado você tem, da
                      produção de energia do painel e do custo.
                    </p>
                    <p style={{ fontSize: "1.4rem" }}>
                      Estética: A cor do painel e os sistemas de montagem podem
                      ser lindamente projetados para se integrarem bem à
                      arquitetura de sua casa. <br />
                      Qualidade e garantias do fabricante do painel: Proteja seu
                      investimento escolhendo painéis de alta qualidade com
                      garantias de 20 a 25 anos.
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <h3>Qual Inverson Solar Você Deve Escolher? </h3>
                    </div>
                    <div>
                      {/* <img
                        alt="..."
                        src={require("assets/truck-3.png")}
                        style={{ maxHeight: "180px" }}
                      ></img> */}
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <p style={{ fontSize: "1.4rem" }}>
                        Os tipos de inversores incluem:
                        <br />
                        <br /> Inversores de string: convertem eletricidade de
                        vários painéis.
                        <br /> Microinversores: converta eletricidade de um
                        único painel. <br />
                        <br />
                        Ao selecionar painéis solares, revise os seguintes
                        detalhes com seu fornecedor solar:
                        <br />
                        <br />
                        Histórico e garantias do fabricante do inversor: Os
                        inversores string normalmente têm uma garantia de 10
                        anos e podem precisar ser substituídos durante a vida
                        útil da sua instalação solar. Às vezes, os
                        microinversores têm garantias de 25 anos e podem não
                        precisar ser substituídos. <br />
                        <br />
                        Melhor ajuste para sua instalação solar: A escolha do
                        fio ou microinversor geralmente depende da quantidade de
                        sombra que seu telhado recebe. Discuta com o fornecedor
                        de energia solar o que faz mais sentido para sua
                        situação.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3>
                        Como Você Pode Monitorar o Desempenho do Seu Sistema?
                      </h3>
                    </div>
                    <div>
                      {/* <img
                        alt="..."
                        src={require("assets/truck-4.png")}
                        style={{ maxHeight: "180px" }}
                      ></img> */}
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <p style={{ fontSize: "1.4rem" }}>
                        Para maximizar o desempenho e a economia de sua
                        instalação solar ao longo do tempo, a maioria dos
                        fornecedores inclui monitoramento contínuo, bem como
                        serviços de manutenção, caso algo dê errado com seu
                        sistema.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </Container>
      </>
      <Footer />
    </>
  );
}

export default Solucao;
