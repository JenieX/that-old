(() => {
  const el = document.createElement('li');
  el.setAttribute('role', 'presentation');
  el.setAttribute('class', 'ipc-metadata-list__item');
  el.appendChild(
    (() => {
      const el = document.createElement('span');
      el.setAttribute('class', 'ipc-metadata-list-item__label');
      el.appendChild(document.createTextNode('Born'));
      return el;
    })()
  );
  el.appendChild(
    (() => {
      const el = document.createElement('div');
      el.setAttribute('class', 'ipc-metadata-list-item__content-container');
      el.appendChild(
        (() => {
          const el = document.createElement('ul');
          el.setAttribute(
            'class',
            'ipc-inline-list ipc-inline-list--show-dividers'
          );
          el.setAttribute('role', 'presentation');
          el.appendChild(
            (() => {
              const el = document.createElement('li');
              el.setAttribute('role', 'presentation');
              el.setAttribute('class', 'ipc-inline-list__item');
              el.appendChild(
                (() => {
                  const el = document.createElement('span');
                  el.setAttribute(
                    'class',
                    'ipc-metadata-list-item__list-content-item'
                  );
                  el.appendChild(document.createTextNode('{birthDate}'));
                  return el;
                })()
              );
              return el;
            })()
          );
          el.appendChild(
            (() => {
              const el = document.createElement('li');
              el.setAttribute('role', 'presentation');
              el.setAttribute('class', 'ipc-inline-list__item');
              el.appendChild(
                (() => {
                  const el = document.createElement('span');
                  el.setAttribute(
                    'class',
                    'ipc-metadata-list-item__list-content-item'
                  );
                  el.appendChild(document.createTextNode('{age} years old'));
                  return el;
                })()
              );
              return el;
            })()
          );
          el.appendChild(
            (() => {
              const el = document.createElement('li');
              el.setAttribute('role', 'presentation');
              el.setAttribute('class', 'ipc-inline-list__item');
              el.appendChild(
                (() => {
                  const el = document.createElement('span');
                  el.setAttribute(
                    'class',
                    'ipc-metadata-list-item__list-content-item'
                  );
                  el.appendChild(document.createTextNode('{zodiacSign}'));
                  return el;
                })()
              );
              return el;
            })()
          );
          return el;
        })()
      );
      return el;
    })()
  );
  return el;
})();
