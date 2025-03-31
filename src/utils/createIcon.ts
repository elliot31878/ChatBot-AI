import React, { JSX, SVGProps } from "react";

export type SvgComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

export function createIcon(SvgElement: JSX.Element): SvgComponent {
  return function Icon(props: SVGProps<SVGSVGElement>) {
    return React.cloneElement(SvgElement, props);
  };
}
