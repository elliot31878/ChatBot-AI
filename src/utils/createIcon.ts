import React, { JSX, ReactNode, SVGProps } from "react";

export type SvgComponent = (props: SVGProps<SVGSVGElement>) => ReactNode;

export function createIcon(SvgElement: JSX.Element): SvgComponent {
  return function Icon(props) {
    return React.cloneElement(SvgElement, props);
  };
}
