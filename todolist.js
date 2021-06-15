const addToDoButton = document.getElementById('addToDo');
const toDoContainer = document.getElementById('toDoContainer');
const inputField = document.getElementById('inputField');

const Storage = localStorage;
const storageKey = 'todos';

const getItems = () => {
  const items = Storage.getItem(storageKey);
  if (!items) {
    return null;
  }
  return JSON.parse(items);
};

const items = getItems();

const addToStorage = (item) => {
  let _items = items;
  if (!_items) {
    _items = [];
  }
  _items.push(item);
  Storage.setItem(storageKey, JSON.stringify(_items));
};

const addListItem = (item) => {
  const paragraph = document.createElement('p');
  paragraph.classList.add('paragraph-styling');
  paragraph.innerText = item;
  toDoContainer.appendChild(paragraph);

  paragraph.addEventListener('click', function () {
    paragraph.style.textDecoration = 'line-through';
  });

  paragraph.addEventListener('dblclick', function () {
    toDoContainer.removeChild(paragraph);
    const index = (getItems() || []).findIndex(_item => _item === item);
    let _items = items;
    if (index < 0) {
      return;
    }
    _items.splice(index, 1);
    Storage.setItem(storageKey, JSON.stringify(_items));
  });
};

if (items) {
  items.map(item => {
    addListItem(item);
  });
}

addToDoButton.addEventListener('click', function () {
  const item = inputField.value;
  addToStorage(item);
  addListItem(item);
  inputField.value = '';
});



