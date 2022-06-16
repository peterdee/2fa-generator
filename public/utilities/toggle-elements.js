const ELEMENT_ACTIONS = {
  disable: 'disable',
  enable: 'enable',
};

function toggleElements(ids = [], action = ELEMENT_ACTIONS.disable) {
  if (ids.length === 0) {
    return false;
  }

  return ids.forEach(
    (id) => $(`#${id}`).attr(
      'disabled',
      ELEMENT_ACTIONS.disable === action,
    ),
  );
}
