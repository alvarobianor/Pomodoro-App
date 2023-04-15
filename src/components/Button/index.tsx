import { ReactNode } from "react";
import { StyledButton, Variant } from "./styles";

type Props = {
  variant?: Variant
  children: ReactNode;
}

export function Button({ variant = "primary", children }: Props) {
  return <StyledButton variant={variant}>
    {children}
  </StyledButton>;
}
