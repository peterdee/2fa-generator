const DEFAULT_ACCOUNT_NAME = 'user@localhost';
const DEFAULT_PERIOD = 30;
const DEFAULT_ISSUER = '2FA Generator';
const INPUT_LENGTH = 64;
const ROOT = '#root';

async function handleGenerate(event) {
  event.preventDefault();

  const accountName = $('#accountName').val().trim() || DEFAULT_ACCOUNT_NAME;
  const algorithm = $('#algorithm').val();
  const digits = Number($('#digits').val());
  const issuer = $('#issuer').val().trim() || DEFAULT_ISSUER;
  const period = Number($('#period').val()) || DEFAULT_PERIOD;

  if (period > 9999) {
    return showError('error-container', 'Period value should be less than 9999!');
  }

  toggleElements([
    'accountName',
    'algorithm',
    'digits',
    'generate-button',
    'generate-form',
    'issuer',
    'period',
  ]);

  $('#generate-button').empty().append(`
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
        accountName,
        algorithm,
        digits,
        issuer,
        period,
      },
      method: 'POST',
      url: '/api/generate',
    });
    return DisplayQR(ROOT, response.data);
  } catch (error) {
    toggleElements(
      [
        'accountName',
        'algorithm',
        'digits',
        'generate-button',
        'generate-form',
        'issuer',
        'period',
      ],
      ELEMENT_ACTIONS.enable,
    );

    $('#generate-button').empty().append('Generate');

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
        return showError('error-container', 'Period value is invalid!');
      }
    }
    return showError('error-container', 'Something went wrong...');
  }
}

function handleInput(event) {
  const target = event.target.name;
  const lengthLeft = INPUT_LENGTH - $(`#${target}`).val().length;
  if (lengthLeft >= 0) {
    return $(`#${target}LengthLeft`).empty().append(lengthLeft);
  }
  return $(`#${target}`).val($(`#${target}`).val().slice(0, -1));
}

function Index() {
  $(ROOT).empty().append(`
<div class="flex direction-column justify-content-center margin-auto mb-1 mt-2 width">
  <div class="flex align-center">
    <button
      id="logo"
      class="logo"
      type="button"
    >
      <img
        alt="2FA Generator"
        class="logo-image"
        src="./logo.svg"
      />
    </button>
    <div class="flex direction-column ml-1 noselect">
      <h1>
        2FA Generator
      </h1>
      <div>
        Generate a custom TOTP Key URI
      </div>
    </div>
  </div>
  <form
    class="flex direction-column mt-2 noselect"
    id="generate-form"
  >
    <div class="flex direction-column">
      <div>
        Algorithm
      </div>
      <select
        class="mt-half"
        id="algorithm"
        name="algorithm"
      >
        <option value="SHA1">SHA1</option>
        <option value="SHA256">SHA256</option>
        <option value="SHA512">SHA512</option>
      </select>
    </div>
    <div class="flex direction-column mt-1">
      <div>
        Digits
      </div>
      <select
        class="mt-half"
        id="digits"
        name="digits"
      >
        <option value="6">6</option>
        <option value="8">8</option>
      </select>
    </div>
    <div class="flex direction-column mt-1">
      <div>
        Period
      </div>
      <input
        class="mt-half"
        id="period"
        name="period"
        placeholder="30"
        type="number"
      />
    </div>
    <div class="flex direction-column mt-1">
      <div class="flex justify-content-space-between">
        <div>
          Issuer
        </div>
        <div id="issuerLengthLeft"></div>  
      </div>
      <input
        class="mt-half"
        id="issuer"
        name="issuer"
        placeholder="2FA Generator"
        type="text"
      />
    </div>
    <div class="flex direction-column mt-1">
      <div class="flex justify-content-space-between">
        <div>
          Account name
        </div>
        <div id="accountNameLengthLeft"></div>  
      </div>
      <input
        class="mt-half"
        id="accountName"
        name="accountName"
        placeholder="user@localhost"
        type="text"
      />
    </div>
    <button
      id="generate-button"
      class="mt-2 width"
      type="submit"
    >
      Generate
    </button>
  </form>
  <div
    id="error-container"
    class="error-container noselect"
  ></div>
</div>
  `);

  $('#accountName').val(DEFAULT_ACCOUNT_NAME);
  $('#issuer').val(DEFAULT_ISSUER);
  $('#period').val(DEFAULT_PERIOD);

  $('#accountNameLengthLeft').empty().append(INPUT_LENGTH - $('#accountName').val().length);
  $('#issuerLengthLeft').empty().append(INPUT_LENGTH - $('#issuer').val().length);

  $('#accountName').on('input', handleInput);
  $('#issuer').on('input', handleInput);

  $('#generate-form').on('submit', handleGenerate);
}

$(document).ready(Index);
