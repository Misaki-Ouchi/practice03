Vue.createApp({
  data: function () {
    return {
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      list: []
    };
  },
  created: async function () {
    const res = await fetch("./data/cards.json");
    const users = await res.json();
    this.list = users;
  },
  computed: {
    orderedList: function () {
      let newList = this.list.slice();
      // ID名クリック
      if (this.count1 % 2 === 0) {
        newList.sort((a, b) => {
          return a.id - b.id;
        });
      } else if (this.count1 % 2 !== 0) {
        newList.sort((a, b) => {
          return b.id - a.id;
        });
      }
      // 名前クリック
      if (this.count2 % 2 !== 0) {
        newList.sort((a, b) => {
          return a.name.localeCompare(b.name, "ja");
        });
      } else if (this.count2 % 2 === 0 && this.count2 !== 0) {
        newList.sort((a, b) => {
          return b.name.localeCompare(a.name, "ja");
        });
      }
      // 会社名クリック
      if (this.count3 % 2 !== 0) {
        newList.sort((a, b) => {
          return a.company.localeCompare(b.company, "ja");
        });
      } else if (this.count3 % 2 === 0 && this.count3 !== 0) {
        newList.sort((a, b) => {
          return b.company.localeCompare(a.company, "ja");
        });
      }
      // 部署クリック
      if (this.count4 % 2 !== 0) {
        newList.sort((a, b) => {
          return a.division.localeCompare(b.division, "ja");
        });
      } else if (this.count4 % 2 === 0 && this.count4 !== 0) {
        newList.sort((a, b) => {
          return b.division.localeCompare(a.division, "ja");
        });
      }
      // 役職クリック
      if (this.count5 % 2 !== 0) {
        newList.sort((a, b) => {
          return a.title.localeCompare(b.title, "ja");
        });
      } else if (this.count5 % 2 === 0 && this.count5 !== 0) {
        newList.sort((a, b) => {
          return b.title.localeCompare(a.title, "ja");
        });
      }
      return newList;
    }
  },
  methods: {
    sortId: function () {
      this.count1++;
    },
    sortName: function () {
      this.count2++;
    },
    sortCom: function () {
      this.count3++;
    },
    sortDiv: function () {
      this.count4++;
    },
    sortTitle: function () {
      this.count5++;
    },
  },
  // sortList: function (key) {
  //   this.list.sort((a, b) => {
  //     return a.key.localeCompare(b.key, "ja");
  //   });
  // },
  // sortDown: function (key) {
  //   this.list.sort((a, b) => {
  //     return b.key.localeCompare(a.key, "ja");
  //   });
  // },
}).mount("#app");
