import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "react-redux";

const CardInfo = () => {
  const location = useLocation();
  const { handleSubmit } = location.state;

  useEffect(() => {
    handleSubmit();
  }, []);

  return <div>cardInfo</div>;
};

export default CardInfo;
