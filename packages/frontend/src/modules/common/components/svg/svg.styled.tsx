import styled from 'styled-components';
import { SvgComponent } from './svg.component';

export const Svg = styled(SvgComponent)`
  position: relative;
  width: 24px;
  height: 24px;
  left: ${(props) => (props.left ? props.left : '')};
  right: ${(props) => (props.right ? props.right : '')};
  top: ${(props) => (props.top ? props.top : '')};
  bottom: ${(props) => (props.bootom ? props.bootom : '')};
  cursor: ${(props) => (props.cursor ? props.cursor : '')};
`;
