import styled from 'styled-components';
import { TodoSliderComponent } from './todoSlider.component';
import { COLORS, FONTS } from '../../../theme';

export const TodoSlider = styled(TodoSliderComponent)`
  /* display: flex; */
  width: 100%;
  margin-top: 50px;
  .todo-slider-item {
    border: 3px solid ${COLORS.black};
    padding: 8px;
    height: 300px;
    width: 400px;
    min-width: 300px;
    background-color: ${COLORS.white};
  }
  .todo-slier-description {
    margin-top: 8px;
    font-weight: ${FONTS.WEIGHTS.normal};
    font-size: ${FONTS.SIZES.m};
    height: 70%;
  }
  .todo-slider-buttons {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    width: 60%;
    justify-content: space-between;
    min-width: 190px;
  }
  .swiper {
    width: 100%;
    left: 0;
    /* transform: translateY(-50%) translateX(-50%); */
  }
`;
