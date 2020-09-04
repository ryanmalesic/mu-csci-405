const BlogController = {
    showList: (_req, res) => {
        res.render("blogs/list");
    },
    showAdd: (_req, res) => {
        res.render("blogs/add");
    }
}

module.exports = BlogController
