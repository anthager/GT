import styled from 'styled-components'
import { colorFor } from '../utils/Colors'
export const Input = styled.input`
  width: 60px;
  height: 25px;
  position: relative;
  display: inline-block;
  margin: 5px auto;
  font-size: 15px;
  border-radius: 5px;
  background-color: ${colorFor.input};
  border: 0;
  text-align: center;
  border: 1px solid ${colorFor.border};
`
