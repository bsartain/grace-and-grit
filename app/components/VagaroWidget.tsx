"use client";

import { useEffect, useRef } from "react";
import { Spinner } from "react-bootstrap";

interface VagaroWidgetProps {
  widgetUrl: string;
}

export default function VagaroWidget({ widgetUrl }: VagaroWidgetProps) {
  console.log("🚀 ~ VagaroWidget ~ widgetUrl:", widgetUrl);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = widgetUrl;
    script.type = "text/javascript";
    script.async = true;

    if (widgetRef.current) {
      widgetRef.current.appendChild(script);
    }

    return () => {
      if (widgetRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [widgetUrl]);

  return (
    <div
      ref={widgetRef}
      className="vagaro"
      style={{
        width: "250px",
        padding: 0,
        border: 0,
        margin: "0 auto",
        textAlign: "center",
        fontSize: "14px",
        color: "#AAA",
      }}
    >
      <style jsx>{`
        .vagaro a {
          font-size: 14px;
          color: #aaa;
          text-decoration: none;
        }
      `}</style>
      <Spinner animation="grow" />
    </div>
  );
}
