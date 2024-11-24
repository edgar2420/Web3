import React from "react";
import HeaderSection from "../Components/Home/HeaderSection";
import NewProductsSection from "../Components/Home/NewProductsSection";
import WhyChoseUsSection from "../Components/Home/WhyChoseUsSection";
import Map from "../Components/Home/Map";
export default function Home() {
  return (
    <div>
      <HeaderSection />
      <section className="padding-y bg-light">
        <NewProductsSection />
        <WhyChoseUsSection />
        <Map />
      </section>
    </div>
  );
}
