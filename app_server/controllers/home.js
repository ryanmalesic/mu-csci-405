const HomeController = {
  showHome: (_req, res) => {
    res.render("index", { name: "Ryan Malesic" });
  },
};

module.exports = HomeController;
