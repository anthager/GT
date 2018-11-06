import styled from 'styled-components'
import { colorFor } from '../utils/Colors'
export const Button = styled.button`
  width: 80px;
  height: 27px;
  position: relative;
  display: inline-block;
  margin: 5px 5px;
  border-radius: 5px;
  background-color: ${colorFor.acceptButton};
  border-style: none;
  font-weight: 400;
  font-size: 0.8rem;
  cursor: pointer;
`
