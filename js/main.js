Vue.createApp({
  data: function () {
    return {
      list: [], //ユーザーリスト
      newList: [], //操作後リスト

      searchSelect: "searchId", // 検索項目
      searchWord: "", //検索ワード
      searchResult: true, //検索結果 表示or非表示

      count1: false, //並べ替え用 count1は初期でtrueのため
      count2: true,
      count3: true,
      count4: true,
      count5: true,
    };
  },
  created: async function () {
    // ユーザーリスト
    const res = await fetch("./data/cards.json");
    const users = await res.json();
    this.list = users;
    this.newList = this.list;
  },
  methods: {
    // キーワード検索
    searchClick: function () {
      let searchedList = [];
      // ID検索
      if (this.searchSelect === "searchId") {
        searchedList.push(this.list.find((e) => e.id === this.searchWord));
      }
      this.newList = searchedList;
      // 名前検索
      this.searchStr("searchName", "name", this.list);
      // 会社名検索
      this.searchStr("searchCom", "company", this.list);
      // 部署検索
      this.searchStr("searchDiv", "division", this.list);
      // 役職検索
      this.searchStr("searchTitle", "title", this.list);
    },

    // ユーザーリスト並べ替え機能
    sortId: function () {
      // ID名クリック
      this.sortNum(this.count1, "id", this.list);
      // 2回目を逆に＆別タブを初期化
      this.count1 = !this.count1;
      this.count2 = true;
      this.count3 = true;
      this.count4 = true;
      this.count5 = true;
    },
    sortName: function () {
      this.sortStr(this.count2, "name", this.list);
      // 名前クリック
      this.count1 = true;
      this.count2 = !this.count2;
      this.count3 = true;
      this.count4 = true;
      this.count5 = true;
    },
    sortCom: function () {
      // 会社名クリック
      this.sortStr(this.count3, "company", this.list);
      this.count1 = true;
      this.count2 = true;
      this.count3 = !this.count3;
      this.count4 = true;
      this.count5 = true;
    },
    sortDiv: function () {
      // 部署クリック
      this.sortStr(this.count4, "division", this.list);
      this.count1 = true;
      this.count2 = true;
      this.count3 = true;
      this.count4 = !this.count4;
      this.count5 = true;
    },
    sortTitle: function () {
      // 役職クリック
      this.sortStr(this.count5, "title", this.list);
      this.count1 = true;
      this.count2 = true;
      this.count3 = true;
      this.count4 = true;
      this.count5 = !this.count5;
    },
    // 項目別文字列の検索関数
    searchStr: function (searchItem, key, list) {
      if (this.searchSelect === searchItem) {
        let searchedList = [];
        for (let i = 0; i < list.length; i++) {
          if (
            list[i][key].indexOf(this.searchWord) !== -1 &&
            this.searchWord !== ""
          ) {
            searchedList.push(list[i]);
          }
        }
        this.newList = searchedList;
      }
    },
    // 数字の並び替え関数
    sortNum: function (count, key, list) {
      let damList = list.slice();
      if (count === true) {
        damList.sort((a, b) => {
          return a[key] - b[key];
        });
      } else {
        damList.sort((a, b) => {
          return b[key] - a[key];
        });
      }
      this.newList = damList;
    },
    // 文字列の並び替え関数
    sortStr: function (count, key, list) {
      let damList = list.slice();
      if (count === true) {
        damList.sort((a, b) => {
          return a[key].localeCompare(b[key], "ja");
        });
      } else {
        damList.sort((a, b) => {
          return b[key].localeCompare(a[key], "ja");
        });
      }
      this.newList = damList;
    },
  },
}).mount("#app");
