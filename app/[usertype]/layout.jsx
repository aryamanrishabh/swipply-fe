import React from "react";

import Body from "./Body";
import Header from "./Header";
import Footer from "./Footer";

const layout = ({ children }) => {
  return (
    <>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </>
  );
};

export default layout;
