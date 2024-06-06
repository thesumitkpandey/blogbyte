import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Profile() {
  const [tab, setTab] = useSearchParams();
  if (tab.get("tab")) {
    console.log(`your age is ${tab.get("tab")}`);
  }
  return (
    <>
      <button onClick={() => setTab({ tab: 19 })}>age</button>
      <button onClick={() => setTab({ tab: 3888 })}>age</button>
    </>
  );
}
