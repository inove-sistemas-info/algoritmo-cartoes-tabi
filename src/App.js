import React, { useState, useEffect } from "react";
import "./App.css";
import { Row, Col } from "reactstrap";
import Barcode from "react-barcode";
import QRCode from "qrcode.react";
import Cartao from "../src/cartaoverso.png";
import jwt from "jwt-simple";

const totalDeCartoes = 30
const totalPorPagina = 8

const Cartoes = () => {

  const [cards, setCards] = useState([])

  const gerar = () => {
    let cartoes = [];
    for (let i = 1; i <= totalDeCartoes; i++) {
      let cartao = { codBarras: ("000" + i).slice(-3), qrcode: i };
      cartoes.push(cartao);
    }
    setCards(cartoes);
  }

  const ip = (mesa) => {
    let secret = "123";
    let payload = { mesa: mesa };
    let token = jwt.encode(payload, secret);
    return `http://192.168.2.2/?mesa=${token}`;
  }

  useEffect(() => {
    gerar()
  })

  return (
    <div className="container">
      <Row>
        {cards.map((cartao, index) => (
          <Col md='6'>
            <div
              title={index}
              style={{
                width: "100%",
                height: "330px",
                padding: '0px',
                marginBottom: '10px',
                background: '#c2c2c2',
                zIndex: '0 auto'
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
                  top: '-88%',
                  left: '-34%',
                }}
              >
                <Barcode
                  value={cartao.codBarras}
                  height='20%'
                  width='4%'
                />

              </div>
              <div
                style={{
                  position: "relative",
                  height: "30%",
                  width: "22%",
                  top: "-115%",
                  left: "80%",
                  zIndex: 100
                }}
              >
                <QRCode
                  value={ip(cartao.qrcode)}
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Cartoes;
