import React, { useState, useEffect } from "react";
import "./App.css";
import { Row, Col, Container } from "reactstrap";
import QRCode from "qrcode.react";
import jwt from "jwt-simple";

const totalDeCartoes = 100;
const totalPorPagina = 60;
const alturaCartao = 150;
const codEmpresa = 1218;

const GerarCartoes = () => {
  const [pages, setPages] = useState([]);

  const gerarPaginas = () => {
    let paginas = [];
    let cartoes = [];
    let mesa = 1;
    let totalDePaginas = Math.trunc(totalDeCartoes / totalPorPagina) + 1;

    for (let i = 0; i < totalDePaginas; i++) {
      for (let j = 0; j < totalPorPagina; j++) {
        if (mesa > totalDeCartoes) break;
        let cartao = { numero: mesa };
        cartoes.push(cartao);
        mesa++;
      }

      paginas.push({ cartoes: cartoes });
      cartoes = [];
    }
    return paginas;
  };

  const gerarLink = (mesa) => {
    let secret = "Q7jZYinLNDNSWAVBr6wsclXfc";
    let payload = { mesa, emp: codEmpresa };
    let token = jwt.encode(payload, secret);
    return `https://cardapio.digital.inovesistemas.info/redirect/${token}`;
  };

  useEffect(() => {
    if (!pages.length > 0) setPages(gerarPaginas());
    console.log(pages);
  }, [pages]);

  return (
    <Container>
      {pages.map((page, indexPage) => (
        <Row key={indexPage} style={{ pageBreakAfter: "always" }}>
          {page.cartoes.map((cartao, indexCard) => (
            <Col xs="2" key={indexCard}>
              <div
                title={indexCard}
                style={{
                  width: "100%",
                  height: alturaCartao,
                }}
              >
                  <QRCode value={gerarLink(cartao.numero)} style={{}} />
                  <span >
                    {cartao.numero}
                  </span>
              </div>
            </Col>
          ))}
          <hr />
        </Row>
      ))}
    </Container>
  );
};

export default GerarCartoes;
