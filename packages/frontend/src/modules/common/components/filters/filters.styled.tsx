import styled from 'styled-components';
import { FilterComponent } from './filters.component';

export const Filters = styled(FilterComponent)`
  display: flex;
  margin-top: 20px;
  width: 90%;
  margin-inline: auto;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 95%;
  }
  @media screen and (max-width: 425px) {
    height: 80px;
    align-content: space-between;
    flex-direction: column-reverse;
  }
`;
