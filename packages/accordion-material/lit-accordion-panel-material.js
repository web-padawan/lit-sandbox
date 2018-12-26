import { css } from 'lit-css';
import { AccordionPanelBase } from '@lit/accordion-base';
import basicStyles from '@lit/details-material/lit-details-material-styles.js';
import panelStyles from './lit-accordion-panel-material-styles.js';

export class LitAccordionPanelMaterial extends AccordionPanelBase {
  static get is() {
    return 'lit-accordion-panel-material';
  }

  static get version() {
    return '0.1.0';
  }

  static get style() {
    return css`
      ${super.style}
      ${basicStyles}
      ${panelStyles}
    `;
  }
}

customElements.define(LitAccordionPanelMaterial.is, LitAccordionPanelMaterial);
