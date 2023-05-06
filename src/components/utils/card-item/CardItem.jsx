import React from "react";

function CardItem({ children }) {
  let subComponentList = Object.keys(CardItem);

  let subComponents = subComponentList.map((key) => {
    return React.Children.map(children, (child) =>
      child.type.name === key ? child : null
    );
  });

  return (
    <>
      <div className="card">{subComponents.map((component) => component)}</div>
    </>
  );
}

const Header = (props) => <div className="card-header">{props.children}</div>;
CardItem.Header = Header;

const Body = (props) => <div className="card-body">{props.children}</div>;
CardItem.Body = Body;

const Footer = (props) => <div className="card-footer">{props.children}</div>;
CardItem.Footer = Footer;

export default CardItem;
