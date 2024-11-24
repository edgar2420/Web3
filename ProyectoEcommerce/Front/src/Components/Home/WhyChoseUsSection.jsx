import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function Estrategia() {
  return (
    <section className="padding-y bg-light" style={{ marginTop: "1.2rem" }}>
      <div className="container">
        <h4 style={{ marginBottom: "1.2rem" }} className="card-title">
          Por qué elegirnos
        </h4>
      </div>
      <div className="container">
        <div className="row gy-3">
          <div className="col-lg-4 col-md-4">
            <article className="card content-body">
              <div className="text-center mx-lg-4">
                <span className="rounded-circle text-primary icon-lg bg-primary-light">
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <div className="pt-3">
                  <h5 className="title">Calidad</h5>
                  <p className="mb-0">
                    Ofrecemos productos Ecologicos de alta calidad.
                  </p>
                </div>
              </div>
            </article>
          </div>
          <div className="col-lg-4 col-md-4">
            <article className="card content-body">
              <div className="text-center mx-lg-4">
                <span className="rounded-circle text-primary icon-lg bg-primary-light">
                  <FontAwesomeIcon icon={faThumbsUp} />
                </span>
                <div className="pt-3">
                  <h5 className="title">Mejores precios</h5>
                  <p className="mb-0">Los mejores precios del mercado.</p>
                </div>
              </div>
            </article>
          </div>
          <div className="col-lg-4 col-md-4">
            <article className="card content-body">
              <div className="text-center mx-lg-4">
                <span className="rounded-circle text-primary icon-lg bg-primary-light">
                  <FontAwesomeIcon icon={faBox} />
                </span>
                <div className="pt-3">
                  <h5 className="title">Envío</h5>
                  <p className="mb-0">
                    Servicio de envío rápido y seguro hasta tu puerta.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
