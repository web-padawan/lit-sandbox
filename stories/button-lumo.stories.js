import { storiesOf } from '@storybook/polymer';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { html } from 'lit-html';

import '@lit/button-lumo';

const TYPES = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  'tertiary-inline': 'tertiary-inline',
  none: ''
};

const COLORS = {
  success: 'success',
  error: 'error',
  contrast: 'contrast',
  none: ''
};

storiesOf('Lumo Button', module)
  .addDecorator(withKnobs)
  .add('primary', () => {
    const disabled = boolean('Disabled', false);
    const title = text('Button title', 'Hello');
    const type = select('Type', TYPES, TYPES.primary);
    const color = select('Color', COLORS, COLORS.none);
    return html`
      <lit-button-lumo theme="${type} ${color}" .disabled="${disabled}">
        ${title}
      </lit-button-lumo>
    `;
  });
