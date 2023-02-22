import LtComponent from '../LtComponent';

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
    const decoration = this.getAttribute('decoration');

    return `
      <style>
        h1 {
          font-size: 1.5rem;
          font-weight: 800;
        }

        h2 {
          font-size: 1.25rem;
          font-weight: 600;
        }

        p {
          font-size: 0.9375rem;
          font-weight: 400;
        }

        caption {
          font-size: 0.875rem;
          font-weight: 700;
        }

        .typography {
          margin: 0;
        }

        ${
          (decoration &&
            `
            .typography::before {
              content: '${decoration}';
              margin-right: 0.5rem;
            }

            .typography::after {
              content: '${decoration}';
              margin-left: 0.5rem;
            }
            `) ||
          ''
        }
      </style>

      <${tag} class="typography"><slot></slot></${tag}>
    `;
  }
}

export default LtTypography;
