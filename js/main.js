Vue.createApp({
  data: function () {
    return {
      list: [], //ユーザーリスト
      newList: [], //操作後リスト

      searchSelect: "searchId", // 検索項目
      searchWord: "", //検索ワード
      searchResult: true, //検索結果 表示or非表示

      addFirstName: "", //ユーザー追加
      addLastName: "",
      addCom: "",
      addDiv: "",
      addTitle: "",
      errName: "", //入力エラーテキスト
      errCom: "",
      errDiv: "",
      errTitle: "",

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
    // ユーザー追加
    addClick: function () {
      // エラーチェック
      // 名前入力チェック
      if (this.addFirstName === "" || this.addLastName === "") {
        this.errName = "名前を入力してください";
      } else if (
        !this.addFirstName.match(/^[ぁ-んア-ヶｱ-ﾝﾞﾟ一-龠]*$/) ||
        !this.addLastName.match(/^[ぁ-んア-ヶｱ-ﾝﾞﾟ一-龠]*$/)
      ) {
        this.errName = "日本語で入力してください";
      } else {
        this.errName = "";
      }
      // 会社名入力チェック
      if (this.addCom === "") {
        this.errCom = "会社名を入力してください";
      } else if (this.addCom.indexOf("株式会社") === -1) {
        this.errCom = "「株式会社」を付けて入力してください";
      } else if (this.addCom.length <= 4) {
        this.errCom = "正しい会社名を入力してください";
      } else {
        this.errCom = "";
      }
      // 部署入力チェック
      if (this.addDiv === "") {
        this.errDiv = "部署名を入力してください";
      } else if (
        !this.addDiv.match(
          /営業部|総務部|開発部|企画部|広報部|人事部|経理部|経営企画部|製造部/
        )
      ) {
        this.errDiv = "正しい部署名を入力してください";
      }
      // 役職入力チェック
      if (this.addTitle === "") {
        this.errTitle = "";
      } else if (!this.addTitle.match(/課長|主任|部長|係長/)) {
        this.errTitle = "正しい役職名を入力してください";
      }
      // 新規ユーザー追加
      if (
        this.addFirstName !== "" &&
        this.errName === "" &&
        this.errCom === "" &&
        this.errDiv === "" &&
        this.errTitle === ""
      ) {
        let addName = this.addFirstName + " " + this.addLastName; //氏名の間に半角空白
        let com = this.addCom.replace(/\s+/g, ""); // 会社名の空白削除
        let newUser = {
          id: this.list.length + 1,
          name: addName,
          company: com,
          division: this.addDiv,
          title: this.addTitle,
        };
        this.list.push(newUser);
        alert("社員リストに追加されました");
        // 入力欄を初期化
        this.addFirstName = "";
        this.addLastName = "";
        this.addCom = "";
        this.addDiv = "";
        this.addTitle = "";
      }
    },

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
