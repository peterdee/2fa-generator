// eslint-disable-next-line
function SecretParams(ROOT = '') {
  $(ROOT).empty().append(`
<div class="flex direction-column margin-auto width">
  <h1 class="noselect">
    2FA Generator
  </h1>
  <div class="noselect">
    Generate a custom TOTP Key URI
  </div>
  <div class="flex mt-1">
    <div class="flex direction-column noselect">
      <div>
        Algorithm
      </div>
      <select
        class="mt-1"
        id="algorithm"
        name="algorithm"
      >
        <option value="SHA1">SHA1</option>
        <option value="SHA256">SHA256</option>
        <option value="SHA512">SHA512</option>
      </select>
    </div>
    <div class="flex direction-column">
      <div>
        Digits
      </div>
      <select
        class="mt-1"
        id="digits"
        name="digits"
      >
        <option value="6">6</option>
        <option value="8">8</option>
      </select>
    </div>
    <div class="flex direction-column">
      <div>
        Period
      </div>
      <input
        id="period"
        name="period"
        placeholder="30"
        type="number"
      />
    </div>
  </div>
</div>
  `);
}
