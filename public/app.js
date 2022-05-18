const ROOT = '#root';

async function getContent() {
  const { data } = await $.ajax({
    method: 'GET',
    url: '/generate',
  });
  return data;
}

function DisplayQR(data = {}) {
  $(ROOT).empty().append(`
<div class="centered">
  <div id="qrcode"></div>
  <div class="example mt-1">
    Token example: ${data.tokenExample} (expires in ${data.timeRemaining})
  </div>
  <form
    class="form"
    id="validate-form"
  >
    <input
      id="otp"
      type="number"
    />
    <button type="submit">
      Validate OTP
    </button>
  </form>
  <div
    class="result"
    id="result"
  ></div>
  <button
    id="regenerate"
    type="button"
  >
    Generate a new QR
  </button>
</div>
  `);

  // eslint-disable-next-line
  const qrcode = new QRCode('qrcode');

  qrcode.makeCode(data.keyURI);

  const [secret] = data.keyURI.split('secret=')[1].split('&');

  $('#validate-form').on('submit', async (event) => {
    event.preventDefault();
    $('#result').empty();
    const token = Number($('#otp').val());

    try {
      await $.ajax({
        data: {
          secret,
          token,
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

  $('#regenerate').on('click', async () => {
    const newData = await getContent();
    return DisplayQR(newData);
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
    const data = await getContent();
    return DisplayQR(data);
  });
}

$(document).ready(() => {
  Index();
});
