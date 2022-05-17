const ROOT = '#root';

function DisplayCode(content = '') {
  $(ROOT).empty().append(`
<div class="validation">
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
</div>
  `);

  const qrcode = new QRCode('qrcode');

  qrcode.makeCode(content);
  const [token] = content.split('secret=')[1].split('&');
  console.log(token);

  $('#validate').on('click', async () => {
    const value = Number($('#otp').val());

    try {
      await $.ajax({
        data: {
          token,
          value,
        },
        method: 'POST',
        url: '/validate',
      });
    } catch (error) {
      console.log(error);
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
    Generate QR code
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
