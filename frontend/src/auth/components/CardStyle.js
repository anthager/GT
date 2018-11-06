import styled from 'styled-components'
import { colorFor } from '../../utils/Colors'

export const CardStyle = styled.div`
  position: relative;
  background-color: ${props => (props.bgColor ? props.bgColor : colorFor.card)};
  line-height: 50px;
  border-radius: 3px;
  border: 1px solid ${colorFor.cardBorder}
  text-align: ${props => (props.center ? 'center' : 'left')}
  cursor: ${props => (!props.toggled ? 'pointer' : '')};
  span {
    font-size: 18px;
    padding: 0 10px;
    color: ${colorFor.text};
  }
`
