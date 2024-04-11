import { ROUTER } from "@/constants";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function UserNotFound() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  if (!name) {
    return (
      <div className="container error-container">
        <h1 className="main-title">Error something went wrong! </h1>
        <Link to={ROUTER.HOME} className="button">
          Back
        </Link>
      </div>
    );
  }
  return (
    <div className="container error-container">
      <h1 className="main-title">
        No results for{" "}
        <span style={{ textDecoration: "underline" }}>{name}</span>
      </h1>
      <Link to={ROUTER.HOME} className="button">
        Back
      </Link>
    </div>
  );
}
