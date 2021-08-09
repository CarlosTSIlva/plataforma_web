import React from "react";

import IndexNavbar from "./components/Navbars";
import IndexHeader from "./components/Headers";
import IndexFooter from "./components/Footers";
import SectionInfo from "./components/SectionInfo";

export default function Main() {
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          <SectionInfo />
        </div>
        <IndexFooter />
      </div>
    </>
  );
}
