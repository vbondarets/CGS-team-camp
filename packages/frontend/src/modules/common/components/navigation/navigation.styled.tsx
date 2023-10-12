import styled from 'styled-components';
import { NavigationComponent } from './navigation.component';

export const Navigation = styled(NavigationComponent)`
  display: flex;
  height: fit-content;
  margin-inline: auto;
  width: 95%;
  padding-block: 4px;
  justify-content: end;
  @media screen and (max-width: 768px) {
    justify-content: space-between;
  }
`;
