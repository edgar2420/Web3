import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faTwitter,
  faCcVisa,
  faCcAmex,
  faCcMastercard,
  faCcPaypal,
} from "@fortawesome/free-brands-svg-icons";

export default function PieDePagina(props) {
  return (
    <footer
      className="section-footer bg-white border-top p-3"
      style={{
        marginTop: "2rem",
      }}
    >
      <div className="container">
        <section className="footer-main py-5">
          <div className="row">
            <aside className="col-md-12 col-lg-3 col-xl-3">
              <article className="me-lg-4">
                <img src="/logo192.png" className="logo-footer" />
                <p className="mt-3">
                  <br />
                </p>
              </article>
            </aside>
            <aside className="col-6 col-md-3 col-lg-2 col-xl-2">
              <h6 className="title">VerdeMarket</h6>
              <ul className="list-menu mb-3">
                <li>
                  <a href="/">Sobre nosotros</a>
                </li>
                <li>
                  <a href="/">Dónde encontrarnos</a>
                </li>
                <li>
                  <a href="/">Categorías</a>
                </li>
                <li>
                  <a href="/">Quiénes somos</a>
                </li>
              </ul>
            </aside>
            <aside className="col-6 col-md-3 col-lg-2 col-xl-2">
              <h6 className="title">Información</h6>
              <ul className="list-menu mb-3">
                <li>
                  <a href="/">Ayuda</a>
                </li>
                <li>
                  <a href="/">Pago</a>
                </li>
                <li>
                  <a href="/">Envío</a>
                </li>
              </ul>
            </aside>
            <aside className="col-6 col-md-3 col-lg-2 col-xl-2">
              <h6 className="title">Mis enlaces</h6>
              <ul className="list-menu mb-3">
                <li>
                  <a href="/"> Mi cuenta </a>
                </li>
                <li>
                  <a href="/"> Mis pedidos </a>
                </li>
                <li>
                  <a href="/"> Mi carrito </a>
                </li>
              </ul>
            </aside>
            <aside className="col-6 col-md-3 col-lg-3 col-xl-3">
              <h6 className="title">Contáctanos</h6>
              <p className="h5 mb-0">78130227 </p>
              <div className="mt-3">
                <a
                  className="btn btn-icon btn-light"
                  title="Facebook"
                  target="_blank"
                  href="/"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  className="btn btn-icon btn-light"
                  title="Instagram"
                  target="_blank"
                  href="/"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  className="btn btn-icon btn-light"
                  title="Youtube"
                  target="_blank"
                  href="/"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a
                  className="btn btn-icon btn-light"
                  title="Twitter"
                  target="_blank"
                  href="/"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
            </aside>
          </div>
        </section>
        <section className="footer-bottom d-flex justify-content-between border-top">
          <div>
            <FontAwesomeIcon
              style={{ marginRight: "0.3rem", zoom: "1.3" }}
              icon={faCcVisa}
            />
            <FontAwesomeIcon
              style={{ marginRight: "0.3rem", zoom: "1.3" }}
              icon={faCcAmex}
            />
            <FontAwesomeIcon
              style={{ marginRight: "0.3rem", zoom: "1.3" }}
              icon={faCcMastercard}
            />
            <FontAwesomeIcon
              style={{ marginRight: "0.3rem", zoom: "1.3" }}
              icon={faCcPaypal}
            />
          </div>
          <p>Santa Cruz-Bolivia</p>
        </section>
      </div>
    </footer>
  );
}
