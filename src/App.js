import React, { useState, useEffect } from "react";
import "./App.css";
import { Row, Col } from "reactstrap";
import Barcode from "react-barcode";
import QRCode from "qrcode.react";
import Cartao from "../src/cartaoverso.png";
import CartaoFrente from "../src/cartaofrente.png";
import jwt from "jwt-simple";
import "./index.css";

const totalDeCartoes = 50
const totalPorPagina = 8

const Cartoes = () => {

  const [cards, setCards] = useState([])
  
  const preencherCartoes = () => {
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
    preencherCartoes()
  })
  
  return (
    <div style={{ marginLeft: 20 }}>
      <Row>
        {cards.map(cartao => (
          <Col sm="6">
            <div style={{ margin: 5 }}>
              <QRCode
                style={{
                  position: "relative",
                  right: 250,
                  // top: 12,
                  width: "140px",
                  height: "140px",
                  // zIndex: 1,
                  padding: 10,
                  background: "#fff"
                }}
                value={ip(cartao.qrcode)}
              />
              <div
                style={{
                  position: "absolute",
                  transform: "rotate(-90deg)",
                  left: -57,
                  top: 135,
                  zIndex: 1
                }}
              >
                <Barcode
                  value={cartao.codBarras}
                  width={4.4}
                  height={43}
                  margin={5}
                />
              </div>
              <img
                src={Cartao}
                alt="img"
                style={{
                  width: "690",
                  height: "330px"
                }}
              />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Cartoes;
