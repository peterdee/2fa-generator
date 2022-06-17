async function handleForm(event, data) {
  event.preventDefault();

  console.log(data);
  const value = $('#token').val();
  if (!value) {
    return showError('error-container', 'Please provide the token!');
  }
  const tokenLength = String(value).length;
  if (tokenLength !== 6 && tokenLength !== 8) {
    return showError('error-container', 'Token length is invalid!');
  }

  toggleElements([
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

  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  try {
    const response = await $.ajax({
      data: {
        token: Number(value),
      },
      method: 'POST',
      url: '/api/verify',
    });
    console.log(response);
  } catch (error) {
    console.log(error);

    toggleElements(
      [
        'token',
        'verify-button',
        'verify-form',
      ],
      ELEMENT_ACTIONS.enable,
    );

    $('#verify-button').empty().append('Generate');

    const { responseJSON } = error;
    if (responseJSON) {
      if (responseJSON.details && responseJSON.info
        && responseJSON.info === 'VALIDATION_ERROR') {
        const { details } = responseJSON;
        if (details.includes('algorithm')) {
          return showError('error-container', 'Provided algorithm is invalid!');
        }
        if (details.includes('digits')) {
          return showError('error-container', 'Digits value is invalid!');
        }
        if (details.includes('period')) {
          return showError('error-container', 'Period value is invalid!');
        }
        return showError('error-container', 'Token value is invalid!');
      }
    }
    return showError('error-container', 'Something went wrong...');
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
    id="error-container"
  ></div>
</div>
  `);

  const qrcode = new QRCode('qrcode');
  qrcode.makeCode(data.keyURI);

  $('#verify-form').on(
    'submit',
    (event) => handleForm(event, data),
  );
}
