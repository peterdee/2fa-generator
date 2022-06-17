async function handleForm(event, data) {
  event.preventDefault();

  const value = $('#token').val();
  if (!value) {
    return showError('message-container', 'Please provide the token!');
  }
  const tokenLength = String(value).length;
  if (tokenLength !== 6 && tokenLength !== 8) {
    return showError('message-container', 'Token length is invalid!');
  }

  toggleElements([
    'back-button',
    'token',
    'verify-button',
    'verify-form',
  ]);

  $('#verify-button').empty().append(`
<img
  alt="Loading"
  class="button-loader"
  src="/loader.svg"
/>
  `);

  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const response = await $.ajax({
      data: {
        algorithm: data.options.algorithm,
        period: data.options.period,
        secret: data.secret,
        token: Number(value),
      },
      method: 'POST',
      url: '/api/verify',
    });
    console.log(response);
  } catch (error) {
    const { responseJSON } = error;
    if (responseJSON) {
      if (responseJSON.details && responseJSON.info
        && responseJSON.info === 'VALIDATION_ERROR') {
        const { details } = responseJSON;
        if (details.includes('algorithm')) {
          return showError('message-container', 'Provided algorithm is invalid!');
        }
        if (details.includes('digits')) {
          return showError('message-container', 'Digits value is invalid!');
        }
        if (details.includes('period')) {
          return showError('message-container', 'Period value is invalid!');
        }
        return showError('message-container', 'Token value is invalid!');
      }
    }
    return showError('message-container', 'Something went wrong...');
  } finally {
    toggleElements(
      [
        'back-button',
        'token',
        'verify-button',
        'verify-form',
      ],
      ELEMENT_ACTIONS.enable,
    );

    return $('#verify-button').empty().append('Verify');
  }
}

function DisplayQR(ROOT = '', data) {
  $(ROOT).empty().append(`
<div class="flex direction-column justify-content-center margin-auto mt-2 mb-1 width">
  <div
    class="flex justify-content-center noselect mt-1"
    id="qrcode"
  ></div>
  <div class="noselect mt-2">
    Verify token
  </div>
  <form
    class="flex direction-column mt-half noselect"
    id="verify-form"
  >
    <input
      id="token"
      name="token"
      type="number"
    />
    <button
      class="mt-2"
      id="verify-button"
      type="submit"
    >
      Verify
    </button>
  </form>
  <div
    class="error-container"
    id="message-container"
  ></div>
  <button
    class="link-button mt-1"
    id="back-button"
    type="button"
  >
    Back
  </button>
</div>
  `);

  const qrcode = new QRCode('qrcode');
  qrcode.makeCode(data.keyURI);

  $('#back-button').on('click', Index);

  $('#verify-form').on(
    'submit',
    (event) => handleForm(event, data),
  );
}
