import React from "react";

export default function Mapa() {
  return (
    <div style={{ marginTop: "1.2rem" }}>
      <div className="container">
        <div style={{ marginBottom: "1.2rem", zoom: "1.2" }}>
          <h4 className="card-title">¿Dónde encontrarnos?</h4>
          <h6 className="card-title">Universidad NUR, Santa Cruz, Bolivia</h6>
        </div>
        <div className="d-flex justify-content-center">
          <iframe
            title="universidad_nur_map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.4827261452415!2d-63.18538122385019!3d-17.768996074671705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e7e6d7434001%3A0xee836099e41634dc!2sUniversidad%20NUR!5e0!3m2!1ses!2sbo!4v1730802771021!5m2!1ses!2sbo"
            width="100%"
            height="320"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
