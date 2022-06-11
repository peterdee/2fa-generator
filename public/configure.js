// eslint-disable-next-line
function SecretParams(ROOT = '') {
  $(ROOT).empty().append(`
<div>
  <select id="algorithm" name="algorithm">
    <option value="SHA1">SHA1</option>
  </select>
</div>
  `);
}
