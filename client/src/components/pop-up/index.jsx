import React from "react";
import PropTypes from "prop-types";
import { Container, Button, Header, Backdrop } from "./style";

const PopUp = ({ closePopUp, header, children }) => (
  <Backdrop>
    <Container role="dialog">
      <Button onClick={closePopUp}>&#x2715;</Button>
      <Header>{header}</Header>
      {children}
    </Container>
  </Backdrop>
);

PopUp.propTypes = {
  closePopUp: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default PopUp;
