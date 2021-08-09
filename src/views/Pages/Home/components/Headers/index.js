/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
// core components

//mport teste from '../../../../../assets/img/brand'

function IndexHeader() {
  
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  },[]);

  return (
    <>
      <div className="page-header clear-filter" filter-color="purple">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../../../../../assets/img/brand/header.jpg") + ")"
          }}
          ref={ pageHeader }
        ></div>
        <Container>
          <div className="content-center brand">
            <img
              alt="..."
              className="n-logo"
              src={require("../../../../../assets/img/brand/caracol.png")}
            ></img>
            <h1 className="h1-seo">Caracol</h1>
            <h2 className="h2-seo">A sua casa onde você estiver.</h2>            
          </div>
          <div className="category-absolute">
            <a href="https://play.google.com/store/apps/details?id=com.caracol" target="_blank">
              <img
                alt="..."
                className="invision-logo"
                src={require("../../../../../assets/img/images/google-play-badge.png")}
              />
            </a>
            <a href="https://apps.apple.com/us/app/caracol-app/id1491565722?l=pt" target="_blank">
              <img
                alt="..."
                className="invision-logo"
                src={require("../../../../../assets/img/images/app-store.png")}
              />
            </a>
          </div>                                
        </Container>          
      </div>
    </>
  );
}

export default IndexHeader;
