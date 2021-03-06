import { css } from 'lit-element';
import '@vaadin/vaadin-material-styles/color.js';
import '@vaadin/vaadin-material-styles/font-icons.js';
import '@vaadin/vaadin-material-styles/shadow.js';
import '@vaadin/vaadin-material-styles/typography.js';

export default css`
  /* stylelint-disable font-family-no-missing-generic-family-keyword */
  :host {
    font-family: var(--material-font-family);
    box-shadow: var(--material-shadow-elevation-2dp);
    outline: none;
  }

  [part='header'] {
    width: 100%;
    position: relative;
    text-align: left;
    border: none;
    outline: none;
    box-shadow: none;
    min-height: 48px;
    margin: 0;
    padding: 0 24px;
    box-sizing: border-box;
    font-weight: 500;
    font-size: var(--material-small-font-size);
    background-color: var(--material-background-color);
    color: var(--material-body-text-color);
    cursor: default;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :host([disabled]) [part='header'] {
    color: var(--material-disabled-text-color);
    background: var(--material-disabled-color);
  }

  :host([focus-ring]) [part='header'] {
    background: var(--material-secondary-background-color);
  }

  [part='summary'] {
    margin: 12px 0;
  }

  [part='toggle'] {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    padding: 4px;
    color: var(--material-secondary-text-color);
    line-height: 24px;
    text-align: center;
  }

  [part='toggle']::before {
    font-family: 'material-icons';
    font-size: 24px;
    width: 24px;
    transform: rotate(90deg);
    transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 0.1);
    display: inline-block;
    content: var(--material-icons-chevron-right);
  }

  [part='toggle']::after {
    display: inline-block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--material-disabled-text-color);
    transform: scale(0);
    opacity: 0;
    transition: transform 0s 0.8s, opacity 0.8s;
    will-change: transform, opacity;
  }

  :host([disabled]) [part='toggle'] {
    color: var(--material-disabled-color);
  }

  :host(:not([disabled])) [part='header']:active [part='toggle']::after {
    transition-duration: 0.08s, 0.01s;
    transition-delay: 0s, 0s;
    transform: scale(1.25);
    opacity: 0.15;
  }

  :host([expanded]) [part='toggle']::before {
    content: var(--material-icons-chevron-right);
    transform: rotate(270deg);
  }

  [part='content'] {
    padding: 8px 24px 24px;
  }
`;
