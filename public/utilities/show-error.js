function clearError(anchor) {
  return $(`#${anchor}`).empty();
}

function showError(anchor, message = '') {
  if (!(anchor && message)) {
    return false;
  }

  return $(`#${anchor}`).empty().append(`
<div class="error-text">    
  ${message}
</div>
  `);
}
