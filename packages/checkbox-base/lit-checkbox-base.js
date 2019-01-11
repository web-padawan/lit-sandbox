import { LitElement, html } from 'lit-element';
import { CheckboxMixin } from '@lit/checkbox-mixin';
import styles from './lit-checkbox-styles.js';

export class CheckboxBase extends CheckboxMixin(LitElement) {
  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      /**
       * Indeterminate state of the checkbox when it's neither checked nor unchecked, but undetermined.
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Indeterminate_state_checkboxes
       */
      indeterminate: {
        type: Boolean,
        reflect: true
      },

      /**
       * The value given to the data submitted with the checkbox's name
       * to the server when the control is inside a form.
       */
      value: {
        reflect: true
      }
    };
  }

  constructor() {
    super();
    if (!this.hasAttribute('checked')) {
      this.checked = false;
    }
    if (!this.hasAttribute('value')) {
      this.value = 'on';
    }
  }

  render() {
    return html`
      <label>
        <span part="checkbox">
          <input
            type="checkbox"
            ?checked="${this.checked}"
            ?disabled="${this.disabled}"
            .indeterminate="${this.indeterminate}"
            @change="${this._inputChangeHandler}"
            role="presentation"
            tabindex="-1"
          />
        </span>
        <span part="label"><slot></slot></span>
      </label>
    `;
  }

  get focusElement() {
    return this.shadowRoot.querySelector('label');
  }

  get name() {
    return this.checked ? this._storedName : '';
  }

  set name(name) {
    this._storedName = name;
  }

  firstUpdated() {
    super.firstUpdated();

    const attrName = this.getAttribute('name');
    if (attrName) {
      this.name = attrName;
    }

    this.setAttribute('role', 'checkbox');

    this.addEventListener('click', this._handleClick.bind(this));
  }

  update(props) {
    if (props.has('indeterminate')) {
      this._indeterminateChanged(this.indeterminate);
    }

    if (props.has('checked')) {
      this._checkedChanged(this.checked);
    }

    super.update(props);
  }

  _checkedChanged(checked) {
    if (this.indeterminate) {
      this.setAttribute('aria-checked', 'mixed');
    } else {
      this.setAttribute('aria-checked', checked);
    }
    this.dispatchEvent(
      new CustomEvent('checked-changed', {
        detail: { value: checked }
      })
    );
  }

  _indeterminateChanged(indeterminate) {
    if (indeterminate) {
      this.setAttribute('aria-checked', 'mixed');
    } else {
      this.setAttribute('aria-checked', this.checked);
    }
    this.dispatchEvent(
      new CustomEvent('indeterminate-changed', {
        detail: { value: indeterminate }
      })
    );
  }

  _inputChangeHandler(e) {
    const target = e.composedPath()[0];
    this.checked = target.checked;
    this.indeterminate = target.indeterminate;
  }

  _handleClick(e) {
    if (this._interactionsAllowed(e)) {
      if (!this.indeterminate) {
        if (e.composedPath()[0] !== this._nativeCheckbox) {
          e.preventDefault();
          this._toggleChecked();
        }
      } else {
        /*
         * Required for IE 11 and Edge.
         * See issue here: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7344418/
         */
        this.indeterminate = false;
        e.preventDefault();
        this._toggleChecked();
      }
    }
  }

  _toggleChecked() {
    super._toggleChecked();
    if (this.indeterminate) {
      this.indeterminate = false;
    }
    this.dispatchEvent(new CustomEvent('change', { composed: true, bubbles: true }));
  }
}
