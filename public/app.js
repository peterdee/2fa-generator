const ROOT = '#root';

function DisplayCode(content = '') {
  $(ROOT).empty().append(`
<div class="centered">
  <div id="qrcode"></div>
  <input
    id="otp"
    type="number"
  />
  <button
    id="validate"
    type="button"
  >
    Validate OTP
  </button>
  <div
    class="result"
    id="result"
  ></div>
  <button
    class="mt-1"
    id="regenerate"
    type="button"
  >
    Generate a new QR
  </button>
</div>
  `);

  // eslint-disable-next-line
  const qrcode = new QRCode('qrcode');

  qrcode.makeCode(content);

  const [secret] = content.split('secret=')[1].split('&');

  $('#validate').on('click', async () => {
    $('#result').empty();
    const password = Number($('#otp').val());

    try {
      await $.ajax({
        data: {
          password,
          secret,
        },
        method: 'POST',
        url: '/validate',
      });

      return $('#result').empty().append(`
<div class="success">  
  OTP is valid!
</div>
      `);
    } catch {
      return $('#result').empty().append(`
<div class="error">  
  OTP is invalid!
</div>
      `);
    }
  });
}

function Index() {
  $(ROOT).append(`
<div class="centered">
  <button
    id="generate"
    type="button"
  >
    Generate QR
  </button>
</div>  
  `);

  $('#generate').on('click', async () => {
    const { content } = await $.ajax({
      method: 'GET',
      url: '/generate',
    });

    return DisplayCode(content);
  });
}

$(document).ready(() => {
  Index();
});
