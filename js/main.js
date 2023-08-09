Vue.createApp({
  data: function () {
    return {
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      list: [],
      orderedList: []
    };
  },
  created: async function () {
    const res = await fetch("./data/cards.json");
    const users = await res.json();
    this.list = users;
    this.orderedList = this.list;
  },
  methods: {
    sortId: function () {
      // ID名クリック
      this.count1++;
      console.log(this.count1);
      let list1 = this.list.slice();
      if (this.count1 % 2 === 0) {
        list1.sort((a, b) => {
          return a.id - b.id;
        });
      } else {
        list1.sort((a, b) => {
          return b.id - a.id;
        });
      }
      this.orderedList = list1;
    },
    sortName: function () {
      // 名前クリック
      this.count2++;
      let list2 = this.list.slice();
      if (this.count2 % 2 !== 0) {
        list2.sort((a, b) => {
          return a.name.localeCompare(b.name, "ja");
        });
      } else if (this.count2 % 2 === 0 && this.count2 !== 0) {
        list2.sort((a, b) => {
          return b.name.localeCompare(a.name, "ja");
        });
      }
      this.orderedList = list2;
    },
    sortCom: function () {
      // 会社名クリック
      this.count3++;
      let list3 = this.list.slice();
      if (this.count3 % 2 !== 0) {
        list3.sort((a, b) => {
          return a.company.localeCompare(b.company, "ja");
        });
      } else if (this.count3 % 2 === 0 && this.count3 !== 0) {
        list3.sort((a, b) => {
          return b.company.localeCompare(a.company, "ja");
        });
      }
      this.orderedList = list3;
    },
    sortDiv: function () {
      // 部署クリック
      this.count4++;
      let list4 = this.list.slice();
      if (this.count4 % 2 !== 0) {
        list4.sort((a, b) => {
          return a.division.localeCompare(b.division, "ja");
        });
      } else if (this.count4 % 2 === 0 && this.count4 !== 0) {
        list4.sort((a, b) => {
          return b.division.localeCompare(a.division, "ja");
        });
      }
      this.orderedList = list4;
    },
    sortTitle: function () {
      // 役職クリック
      this.count5++;
      let list5 = this.list.slice();
      if (this.count5 % 2 !== 0) {
        list5.sort((a, b) => {
          return a.title.localeCompare(b.title, "ja");
        });
      } else if (this.count5 % 2 === 0 && this.count5 !== 0) {
        list5.sort((a, b) => {
          return b.title.localeCompare(a.title, "ja");
        });
      }
      this.orderedList = list5;
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
