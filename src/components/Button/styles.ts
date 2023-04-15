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
  margin-right: 16px;
  border: 0;
  background-color: ${props => props.theme.primary};
  /* background-color: ${props => buttonVariants[props.variant]}; */
`;
