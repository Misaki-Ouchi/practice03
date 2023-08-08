Vue.createApp({
  data: function () {
    return {
      sortOrder: "1",
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
      // IDを選択
      if (this.sortOrder === 1) {
      }
      // 昇順を選択
      else if (this.sortOrder === 2) {
        this.list.sort((a, b) => {
          return a.name.localeCompare(b.name, "ja");
        });
      }
      // 降順を選択
      else if (this.sortOrder === 3) {
        this.list.sort((a, b) => {
          return b.name.localeCompare(a.name, "ja");
        });
      }
      return this.list;
    },
  },
}).mount("#app");
