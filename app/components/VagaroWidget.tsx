"use client";

import { useEffect, useRef } from "react";
import { Spinner } from "react-bootstrap";

interface VagaroWidgetProps {
  widgetUrl: string;
}

export default function VagaroWidget({ widgetUrl }: VagaroWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = widgetUrl;
    script.type = "text/javascript";
    script.async = true;

    container.appendChild(script);

    return () => {
      container.removeChild(script);
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
