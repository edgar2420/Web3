import React from "react";

export default function SeccionEncabezado() {
  return (
    <section className="bg-white border-bottom">
      <div className="container">
        <div className="row align-items-center" style={{ minHeight: "520px" }}>
          <div className="col-lg-6 order-lg-1">
            <img
              className="img-fluid mw-100"
              src="/images/banner.png"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="col-lg-6">
            <article className="my-5 ms-lg-5">
              <h1 className="display-4">
                Los mejores productos &amp; <br />
                Con los mejores precios del mercado
              </h1>
              <p className="lead">En VERDE MARKET</p>
              <a
                href="/"
                className="btn btn-primary btn-lg"
                style={{ marginLeft: "0.2rem" }}
              >
                {" "}
                Descubrir{" "}
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
