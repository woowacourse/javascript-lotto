import { $$ } from '@lotto/utils/selector';

const preventFormFromSubmitting = () => {
  $$('form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
    });
  });
};

export default preventFormFromSubmitting;
