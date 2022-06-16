const ELEMENT_ACTIONS = {
  disable: 'disable',
  enable: 'enable',
};

// eslint-disable-next-line
function toggleElements(ids = [], action = ELEMENT_ACTIONS.disable) {
  if (ids.length === 0) {
    return false;
  }

  console.log('action', action);
  ids.forEach(
    (id) => $(`#${id}`).attr(
      'disabled',
      ELEMENT_ACTIONS.disable === action,
    ),
  );
}
