import LtComponent from '../LtComponent';
import template from './index.html';

class LtTypography extends LtComponent {
  static VARIANT_TAGS = {
    title: 'h1',
    subtitle: 'h2',
    body: 'p',
    caption: 'caption',
  };

  static get observedAttributes() {
    return ['variant', 'decoration'];
  }

  getRenderContent() {
    const variant = this.getAttribute('variant');
    const tag = LtTypography.VARIANT_TAGS[variant] ?? 'p';

    return `
      ${template}

      <${tag} class="typography">
        <slot></slot>
      </${tag}>
    `;
  }
}

export default LtTypography;
