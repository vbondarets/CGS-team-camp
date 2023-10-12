import styled from 'styled-components';
import { SliderComponent } from './slider.component';

export const Slider = styled(SliderComponent)`
  text-align: center;
  display: flex;
  .toggle-switch {
    position: relative;
    width: 64px;
    display: inline-block;
    text-align: left;
  }
  .checkbox {
    display: none;
  }
  .label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 0 solid #bbb;
    border-radius: 20px;
    margin-block: auto;
  }
  .inner {
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
  }
  .inner:before,
  .inner:after {
    float: left;
    width: 50%;
    height: 36px;
    padding: 0;
    line-height: 36px;
    color: #fff;
    font-weight: bold;
    box-sizing: border-box;
  }
  .inner:before {
    content: '';
    padding-left: 10px;
    background-color: #060;
    color: #fff;
  }
  .inner:after {
    content: '';
    padding-right: 10px;
    background-color: #bbb;
    color: #fff;
    text-align: right;
  }
  .switch {
    display: block;
    width: 24px;
    margin: 5px;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 30px;
    border: 0 solid #bbb;
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
  }
  .checkbox:checked + .label .inner {
    margin-left: 0;
  }
  .checkbox:checked + .label .switch {
    right: 0px;
  }
`;
