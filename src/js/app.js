class LoadingSort {
  constructor() {
    this.dataJSON = [
      {
        id: 26,
        title: 'Побег из Шоушенка',
        imdb: 9.30,
        year: 1994,
      },
      {
        id: 25,
        title: 'Крёстный отец',
        imdb: 9.20,
        year: 1972,
      },
      {
        id: 27,
        title: 'Крёстный отец 2',
        imdb: 9.00,
        year: 1974,
      },
      {
        id: 1047,
        title: 'Тёмный рыцарь',
        imdb: 9.00,
        year: 2008,
      },
      {
        id: 223,
        title: 'Криминальное чтиво',
        imdb: 8.90,
        year: 1994,
      },
    ];
  }

  loadList() {
    this.redrawDOM();
  }

  redrawDOM() {
    const doc = document.getElementById('tbody');
    doc.innerHTML = '';
    for (const item of this.dataJSON) {
      const itemTr = document.createElement('tr');
      itemTr.dataset.id = item.id;
      itemTr.dataset.title = item.title;
      itemTr.dataset.year = item.year;
      itemTr.dataset.imdb = item.imdb;
      itemTr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>(${item.year})</td>
        <td>imdb: ${item.imdb.toFixed(2)}</td>
      `;
      doc.appendChild(itemTr);
    }
  }

  sortPic(columnSort, sortUpDown) {
    const oldRow = document.querySelector('span');
    if (oldRow) {
      const parentOldRow = oldRow.parentNode;
      parentOldRow.removeChild(oldRow);
    }

    let sortArrow;
    sortArrow = '\u{2193}';
    if (sortUpDown === 'up') {
      sortArrow = '\u{2191}';
    }

    const titleHead = document.getElementById(`head-${columnSort}`);
    const addArrow = document.createElement('span');
    addArrow.innerText = sortArrow;
    titleHead.appendChild(addArrow);
  }

  sortStringDown(columnSort) {
    this.sortPic(columnSort, 'down');
    this.sortList('string', columnSort, 'down');
  }

  sortStringUp(columnSort) {
    this.sortPic(columnSort, 'up');
    this.sortList('string', columnSort, 'up');
  }

  sortNumbDown(columnSort) {
    this.sortPic(columnSort, 'down');
    this.sortList('numb', columnSort, 'down');
  }

  sortNumbUp(columnSort) {
    this.sortPic(columnSort, 'up');
    this.sortList('numb', columnSort, 'up');
  }

  sortList(columnType, columnSort, sortUpDown) {
    if (columnType === 'string') {
      this.sortStr(columnSort, sortUpDown);
    } else if (columnType === 'numb') {
      this.sortNum(columnSort, sortUpDown);
    }
    this.redrawDOM();
  }

  sortStr(columnSort, sortUpDown) {
    this.dataJSON.sort((a, b) => {
      if (a[columnSort] > b[columnSort]) {
        return sortUpDown === 'down' ? -1 : 1;
      }
      if (a[columnSort] < b[columnSort]) {
        return sortUpDown === 'down' ? 1 : -1;
      }
      return 0;
    });
  }

  sortNum(columnSort, sortUpDown) {
    this.dataJSON.sort((a, b) => {
      if (sortUpDown === 'down') {
        return b[columnSort] - a[columnSort];
      }
      return a[columnSort] - b[columnSort];
    });
  }

  randomImg() {
    let item = 1;
    setInterval(() => {
      switch (item) {
        case 1:
          this.sortNumbUp('id');
          break;
        case 2:
          this.sortNumbDown('id');
          break;
        case 3:
          this.sortStringUp('title');
          break;
        case 4:
          this.sortStringDown('title');
          break;
        case 5:
          this.sortNumbUp('year');
          break;
        case 6:
          this.sortNumbDown('year');
          break;
        case 7:
          this.sortNumbUp('imdb');
          break;
        default:
          this.sortNumbDown('imdb');
          item = 0;
          break;
      }
      item += 1;
    }, 2000);
  }
}

const gamesBoard = new LoadingSort();
gamesBoard.loadList();
gamesBoard.randomImg();
