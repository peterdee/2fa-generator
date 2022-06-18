function clearSuccess(anchor) {
  return $(`#${anchor}`).empty();
}

function showSuccess(anchor, message = '') {
  if (!(anchor && message)) {
    return false;
  }

  return $(`#${anchor}`).empty().append(`
<div class="success-text">    
  ${message}
</div>
  `);
}
