import { StyledButton, Variant } from "./styles";

type Props = {
  variant?: Variant
}

export function Button({ variant = "primary" }: Props, children: string) {
  return <StyledButton variant={variant}>
    Enviar
  </StyledButton>;
}
