import styled from 'styled-components';
import { SearchBarComponent } from './searchBar.component';
import { COLORS } from '../../../theme';

export const SearchBar = styled(SearchBarComponent)`
  display: flex;
  align-items: center;
  position: relative;
  input {
    border: 2px solid ${COLORS.black};
    width: 200px;
    padding-inline: 32px;
    padding-block: 2px;
    border-radius: 1px;
    :focus {
      border: 2px solid ${COLORS.black};
      border-radius: 1px;
    }
    :active {
      border: 2px solid ${COLORS.black};
      border-radius: 1px;
    }
  }
  @media screen and (max-width: 2560px) and (min-width: 768px) {
    left: 24px;
  }
  @media screen and (max-width: 768px) and (min-width: 426px) {
    left: 24px;
  }
  @media screen and (max-width: 426px) {
    right: 24px;
  }
`;
