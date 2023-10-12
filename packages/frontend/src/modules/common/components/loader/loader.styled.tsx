import styled from 'styled-components';
import { loaderComponent } from './loader.component';
import { COLORS } from '../../../theme';

export const Loader = styled(loaderComponent)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 100vw;
  height: 100vh;
  background-color: ${COLORS.DavyGrey};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .loader-spiner {
    border: 5px solid ${COLORS.cadetGrey};
    border-top-color: ${COLORS.black};
    border-radius: 50%;
    width: 50px;
    height: 50px;
    -webkit-animation: Spiner 1s linear infinite;
    animation: Spiner 1s linear infinite;
    @keyframes Spiner {
      100% {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn);
      }
    }
  }
`;
