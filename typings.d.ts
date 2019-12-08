declare module "*.svg" {
  import { SFC, SVGAttributes } from "react";

  const content: SFC<SVGAttributes<SVGElement>>;
  export default content;
}
