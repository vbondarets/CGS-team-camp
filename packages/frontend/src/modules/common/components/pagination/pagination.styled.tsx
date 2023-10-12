import styled from 'styled-components';
import { PaginationComponent } from './pagination.component';
import { COLORS, FONTS } from '../../../theme';

export const Pagination = styled(PaginationComponent)`
  display: flex;
  flex-direction: row;
  width: fit-content;
  margin-top: 24px;
  width: 90%;
  margin-inline: auto;
  .pagination-button {
    color: ${COLORS.black};
    background-color: ${COLORS.white};
    border: 2px solid ${COLORS.black};
    box-shadow: 4px 4px ${COLORS.black};
    border-radius: 0px;
    transition: all 0.2s;
    /* height: 30px; */
    padding-inline: 12px;
    cursor: pointer;
    font-size: ${FONTS.SIZES.l};
  }
  .pagination-button.active {
    background-color: ${COLORS.primary};
  }
`;
