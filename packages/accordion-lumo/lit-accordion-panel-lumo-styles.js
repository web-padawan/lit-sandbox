import { css } from 'lit-css';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';

export default css`
  [part='header'] {
    margin: var(--lumo-space-xs) 0;
  }

  :host(:first-child) [part='header'] {
    margin-top: 0;
  }

  :host([focused]) [part='header'] {
    box-shadow: 0 0 0 2px var(--lumo-primary-color-50pct);
  }
`;
