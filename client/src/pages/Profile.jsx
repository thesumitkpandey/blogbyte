import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Profile() {
  const [tab] = useSearchParams();

  return (
    <>
      <h1>the tab is {tab.get("tab")} </h1>
    </>
  );
}
