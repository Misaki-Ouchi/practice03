Vue.createApp({
  data: function () {
    return {
      list: [], //ユーザーリスト
      newList: [], //操作後リスト

      // searchSelect: "1", // キーワード検索
      // searchWord: "", //検索ワード
      // searchResult: true, //検索結果 表示or非表示

      orderedList: [], // 並べ替え後リスト
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
    this.orderedList = this.list;
  },
  methods: {
    // // キーワード検索
    // searchClick: function () {
    //   let searchedList = [];
    //   // ID検索
    //   if (this.searchSelect === "1") {
    //     let found = this.list.find(e => e.id === this.searchWord);
    //     searchedList.push(found);
    //   }
    //   this.newList = searchedList;
    //   // forEachで検索ヒットのuserだけsearchedListに入れる。最後にsearchedListをnewListに入れる。orderedListもnewListに変更
    // },

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
        this.sortStr(this.count2, "name" , this.list);
      // 名前クリック
      this.count1 = true;
      this.count2 = !this.count2;
      this.count3 = true;
      this.count4 = true;
      this.count5 = true;
    },
    sortCom: function () {
      // 会社名クリック
      this.sortStr(this.count3, "company" , this.list);
      this.count1 = true;
      this.count2 = true;
      this.count3 = !this.count3;
      this.count4 = true;
      this.count5 = true;
    },
    sortDiv: function () {
      // 部署クリック
      this.sortStr(this.count4, "division" , this.list);
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
    sortNum: function (count, key, list) {
      let damList = list.slice();
      if (count === true) {
        damList.sort((a, b) => {
          return a[key] - b[key];
        });
        count = false;
      } else {
        damList.sort((a, b) => {
          return b[key] - a[key];
        });
        count = true;
      }
      this.orderedList = damList;
    },
    sortStr: function (count, key, list) {
      let damList = list.slice();
      if (count === true) {
        damList.sort((a, b) => {
          return a[key].localeCompare(b[key], "ja")
        });
        count = false;
      } else {
        damList.sort((a, b) => {
          return b[key].localeCompare(a[key], "ja")
        });
        count = true;
      }
      this.orderedList = damList;
    }
  },
}).mount("#app");
