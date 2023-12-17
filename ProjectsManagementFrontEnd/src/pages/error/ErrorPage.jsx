import React from "react";
import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();

  const { msg, status } = location.state;
  if (status === 401) {
    return <UnauthorizedPage msg={msg} />;
  }
  if (status === 404) {
    return <PageNotFoundErrorPage msg={msg} />;
  }
  if (status === 403) {
    return <ForbiddenPage msg={msg} />;
  }

  if (status === 400) {
    return <BadRequestPage msg={msg} />;
  }

  return <div> some error happend {location?.state?.status} </div>;
};

export default ErrorPage;

const PageNotFoundErrorPage = ({ msg }) => {
  return <div>PageNotFoundErrorPage 404</div>;
};
const UnauthorizedPage = ({ msg }) => {
  return <div>UnauthorizedPage 401</div>;
};
const ForbiddenPage = ({ msg }) => {
  return <div>403 Forbidden</div>;
};
const BadRequestPage = ({ msg }) => {
  return <div>400 BadRequestPage</div>;
};
