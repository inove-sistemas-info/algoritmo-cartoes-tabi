import React, { useState, useEffect } from "react";
import "./App.css";
import { Row, Col, Container } from "reactstrap";
import Barcode from "react-barcode";
import QRCode from "qrcode.react";
import Cartao from "../src/cartaoverso.png";
import jwt from "jwt-simple";

const totalDeCartoes = 10
const totalPorPagina = 2
const alturaCartao = 290

const GerarCartoes = () => {

  const [pages, setPages] = useState([])

  const gerar = () => {
    let paginas = []
    let cartoes = []
    let mesa = 1
    let totalDePaginas = Math.trunc(totalDeCartoes / totalPorPagina) + 1

    for (let i = 0; i < totalDePaginas; i++) {
      for (let j = 0; j < totalPorPagina; j++) {
        if (mesa > totalDeCartoes) break
        let cartao = { codBarras: ("000" + mesa).slice(-3), qrcode: mesa }
        cartoes.push(cartao)
        mesa++
      }
      paginas.push({ cartoes: cartoes })
      cartoes = []
    }
    return paginas
  }

  const ip = (mesa) => {
    let secret = "123";
    let payload = { mesa: mesa };
    let token = jwt.encode(payload, secret);
    return `http://192.168.2.2/?mesa=${token}`;
  }

  useEffect(() => {
    if (!pages.length > 0) setPages(gerar())
    console.log(pages)
  }, [pages])

  return (
    <Container>
      {pages.map((page, indexPage) => (
        <Row key={indexPage} style={{ pageBreakAfter: 'always' }}>{
          page.cartoes.map((cartao, indexCard) => (
            <Col md='5' key={indexCard} style={{ marginBottom: '20px' }} >
              <div
                title={indexCard}
                style={{
                  width: "100%",
                  height: alturaCartao,
                  marginLeft: indexCard % 2 !== 0 ? '20%' : '',
                  marginBottom: '10px',
                  background: '#c2c2c2',
                }}
              >
                <img
                  src={Cartao}
                  alt="img"
                  style={{
                    position: 'relative',
                    height: '100%',
                    zIndex: 1
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    transform: "rotate(-90deg)",
                    zIndex: 150,
                    top: '-89%',
                    left: '-32%',
                  }}
                >
                  <Barcode
                    value={cartao.codBarras}
                    height={15}
                    width={3}
                  />
                </div>
                <div
                  style={{
                    position: "relative",
                    height: "40%",
                    width: "26%",
                    zIndex: 100,
                  }}
                >
                <QRCode
                  value={ip(cartao.qrcode)}
                  style={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    top: "-290%",
                    left: "332%",
                    zIndex: 200,
                    background: '#FFF',
                    padding: '10px'
                  }}
                />
                </div>
              </div>
            </Col>
          ))
        }
          <hr />
        </Row>
      ))}
    </Container>
  )
}

export default GerarCartoes;
