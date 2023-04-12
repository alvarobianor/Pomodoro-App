import styled from 'styled-components';

export type Variant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning'

const buttonVariants = {
  primary: 'blue',
  secondary: 'purple',
  danger: 'red',
  success: 'green',
  warning: 'yellow'
}

export const StyledButton = styled.button <{ variant: Variant }> `
  padding: 1rem;
  border-radius: 8px;
  background-color: ${props => buttonVariants[props.variant]};
`;
