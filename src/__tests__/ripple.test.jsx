import { render, fireEvent } from "@testing-library/react";
import { RippleEffect } from "../components/Ripple";
import "@testing-library/jest-dom";
import React from "react";

describe("RippleEffect Component", () => {
  test("renders without crashing", () => {
    const containerRef = { current: document.createElement("button") };
    render(
      <RippleEffect mode="light" color="primary" containerRef={containerRef} />
    );
    expect(
      document.querySelector(".absolute.inset-0.overflow-hidden")
    ).toBeInTheDocument();
  });

  test("creates ripple on click", () => {
    const containerRef = { current: document.createElement("button") };
    document.body.appendChild(containerRef.current);
    render(
      <RippleEffect mode="light" color="primary" containerRef={containerRef} />
    );

    fireEvent.click(containerRef.current, { clientX: 50, clientY: 50 });

    const rippleContainer = document.querySelector(
      ".absolute.inset-0.overflow-hidden"
    );
    expect(rippleContainer?.firstChild).toBeInTheDocument();
    expect(rippleContainer?.firstChild).toHaveClass("bg-primary-300");
  });
});
