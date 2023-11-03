import throttle from 'lodash.throttle';

const LS_FEEDBACK_FORM_STATE_KEY = 'feedback-form-state';
const saveStateInterval = 500;

const feedbackForm = document.querySelector('.feedback-form');

const feedbackFormState = loadFeedbackFormState();

feedbackForm.addEventListener(
  'input',
  throttle(onFeedbackFormInput, saveStateInterval)
);
feedbackForm.addEventListener('submit', onFeedbackFormSubmit);

function loadFeedbackFormState() {
  const feedbackFormState = localStorage.getItem(LS_FEEDBACK_FORM_STATE_KEY);

  if (feedbackFormState) {
    const parsedFeedbackFormState = JSON.parse(feedbackFormState);

    feedbackForm.email.value = parsedFeedbackFormState.email;
    feedbackForm.message.value = parsedFeedbackFormState.message;
    return parsedFeedbackFormState;
  }

  return {
    email: '',
    message: '',
  };
}

function onFeedbackFormInput() {
  feedbackFormState.email = feedbackForm.email.value;
  feedbackFormState.message = feedbackForm.message.value;

  localStorage.setItem(
    LS_FEEDBACK_FORM_STATE_KEY,
    JSON.stringify(feedbackFormState)
  );
}

function onFeedbackFormSubmit(event) {
  event.preventDefault();

  feedbackFormState.email = feedbackForm.email.value;
  feedbackFormState.message = feedbackForm.message.value;

  if (
    isWhitespacesOrEmpty(feedbackFormState.email) ||
    isWhitespacesOrEmpty(feedbackFormState.message)
  ) {
    return;
  }

  console.dir(feedbackFormState);

  localStorage.removeItem(LS_FEEDBACK_FORM_STATE_KEY);
  feedbackForm.reset();
}

function isWhitespacesOrEmpty(input) {
  const regexPattern = /[^ \t\r\n\v\f]/;
  return !regexPattern.test(input);
}
