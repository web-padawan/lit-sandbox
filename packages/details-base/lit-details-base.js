import { html } from '@polymer/lit-element';
import { css } from 'lit-css';
import { StyledLitElement } from 'styled-lit-element';
import { ControlStateMixin } from '@lit/control-state-mixin';
import styles from './lit-details-styles.js';

export class DetailsBase extends ControlStateMixin(StyledLitElement) {
  constructor() {
    super();

    if (!this.hasAttribute('expanded')) {
      this.expanded = false;
    }
  }

  static get style() {
    return css`
      ${styles}
    `;
  }

  static get properties() {
    return {
      expanded: {
        type: Boolean,
        reflect: true
      },
      summary: {
        type: String
      }
    };
  }

  render() {
    return html`
      <div role="heading">
        <button
          type="button"
          part="header"
          @click="${this._onToggleClick}"
          ?disabled="${this.disabled}"
          aria-expanded="${this.expanded ? 'true' : 'false'}"
        >
          <span part="toggle"></span><span part="summary">${this.summary}</span>
        </button>
      </div>
      <div part="content"><slot></slot></div>
    `;
  }

  get collapsible() {
    return this.shadowRoot.querySelector('[part="content"]');
  }

  get focusElement() {
    return this.shadowRoot.querySelector('button');
  }

  updated(props) {
    super.updated(props);

    if (props.has('expanded')) {
      this._expandedChanged(this.expanded, props.get('expanded'));
    }
  }

  _expandedChanged(expanded, wasExpanded) {
    this.collapsible.setAttribute('aria-hidden', !expanded);

    if (expanded) {
      this._expand();
    } else if (wasExpanded) {
      this._collapse();
    }
  }

  _expand() {
    this.collapsible.style.maxHeight = null;
  }

  _collapse() {
    this.collapsible.style.maxHeight = '0px';
  }

  firstUpdated() {
    // prevent Shift + Tab on content from host blur
    this.collapsible.addEventListener('keydown', e => {
      if (e.shiftKey && e.keyCode === 9) {
        e.stopPropagation();
      }
    });

    super.firstUpdated();
  }

  _onToggleClick() {
    this.expanded = !this.expanded;
  }
}
