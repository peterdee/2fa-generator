const ROOT = '#root';

let REMAINING = 0;
let TOKEN_EXAMPLE = '';

async function getContent() {
  const { data } = await $.ajax({
    method: 'GET',
    url: '/generate',
  });
  return data;
}

function DisplayQR(data = {}) {
  REMAINING = data.timeRemaining;
  TOKEN_EXAMPLE = data.tokenExample;

  $(ROOT).empty().append(`
<div class="centered">
  <span class="title title-small noselect">
    2FA Generator
  </span>
  <div
    class="noselect mt-1"
    id="qrcode"
  ></div>
  <div class="example mt-1">
    <span
      class="noselect"
    >Token example: </span><span id="example">${String(TOKEN_EXAMPLE)}</span><span
      class="noselect"
    > (expires in <span id="remaining">${REMAINING}</span>)</span>
  </div>
  <form
    class="form"
    id="validate-form"
  >
    <input
      id="otp"
      type="number"
    />
    <button
      class="noselect"
      type="submit"
    >
      Validate token
    </button>
  </form>
  <div
    class="result noselect"
    id="result"
  ></div>
  <button
    class="noselect"
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

  const interval = setInterval(
    async () => {
      REMAINING -= 1;
      if (REMAINING >= 0) {
        $('#remaining').empty().append(REMAINING);
      } else {
        const { data: { timeRemaining, tokenExample } = {} } = await $.ajax({
          data: {
            secret,
          },
          method: 'POST',
          url: '/token',
        });
        REMAINING = timeRemaining;
        TOKEN_EXAMPLE = String(tokenExample);
        $('#remaining').empty().append(REMAINING);
        $('#example').empty().append(TOKEN_EXAMPLE);
      }
    },
    1000,
  );

  $('#validate-form').on('submit', async (event) => {
    event.preventDefault();
    $('#result').empty();
    const token = Number($('#otp').val());

    if (!token) {
      return $('#result').empty().append(`
<div class="error">  
  Please provide a token!
</div>
      `);
    }
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
  Token is valid!
</div>
      `);
    } catch {
      return $('#result').empty().append(`
<div class="error">  
  Token is invalid!
</div>
      `);
    }
  });

  $('#regenerate').on('click', async () => {
    clearInterval(interval);
    const newData = await getContent();
    return DisplayQR(newData);
  });
}

function Index() {
  $(ROOT).append(`
<div class="centered">
  <span class="title title-big noselect">
    2FA Generator
  </span>
  <button
    class="noselect mt-1"
    id="generate"
    type="button"
  >
    Generate QR
  </button>
  <button
    class="noselect mt-1"
    id="configure"
    type="button"
  >
    Configure
  </button>
</div>  
  `);

  // eslint-disable-next-line
  $('#configure').on('click', () => SecretParams(ROOT));

  $('#generate').on('click', async () => {
    const data = await getContent();
    return DisplayQR(data);
  });
}

$(document).ready(() => {
  Index();
});
