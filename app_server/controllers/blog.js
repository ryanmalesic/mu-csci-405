const request = require("request");


const BlogController = {
  showList: (_req, res) => {
    const requestOptions = {
      url: `${process.env.API_URL}/api/blogs`,
      method: "GET",
      json: {}
    }

    request(
      requestOptions,
      (_err, _response, body) => {
        res.render("blogs/list", { blogs: body });
      }
    )
  },
  showAdd: (req, res) => {
    res.render("blogs/add", { blogId: req.params.blogId });
  },
  add: (req, res) => {
    const requestOptions = {
      url: `${process.env.API_URL}/api/blogs`,
      method: "POST",
      json: {
        author: {
          avatar: req.body.authorAvatar,
          handle: req.body.authorHandle,
          name: req.body.authorName
        },
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags.split(",")
      }
    }

    request(
      requestOptions,
      (_err, _response, _body) => {
        res.redirect('/blogs')
      }
    )
  },
  showGet: (req, res) => {
    const requestOptions = {
      url: `${process.env.API_URL}/api/blogs/${req.params.id}`,
      method: "GET",
      json: {}
    }

    request(
      requestOptions,
      (_err, _response, body) => {
        res.render("blogs/get", { blog: body });
      }
    )
  },
  showEdit: (req, res) => {
    const requestOptions = {
      url: `${process.env.API_URL}/api/blogs/${req.params.id}`,
      method: "GET",
      json: {}
    }

    request(
      requestOptions,
      (_err, _response, body) => {
        res.render("blogs/edit", { blog: body });
      }
    )
  },
  edit: (req, res) => {
    const requestOptions = {
      url: `${process.env.API_URL}/api/blogs/${req.params.id}`,
      method: "PUT",
      json: {
        author: {
          avatar: req.body.authorAvatar,
          handle: req.body.authorHandle,
          name: req.body.authorName
        },
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags.split(",")
      }
    }

    request(
      requestOptions,
      (_err, _response, _body) => {
        res.redirect('/blogs')
      }
    )
  },
  showDelete: (req, res) => {
    res.render("blogs/delete", { id: req.params.id });
  },
  delete: (req, res) => {
    const requestOptions = {
      url: `${process.env.API_URL}/api/blogs/${req.params.id}`,
      method: "DELETE",
      json: {}
    }

    request(
      requestOptions,
      (_err, _response, _body) => {
        res.redirect('/blogs')
      }
    )
  },
};

module.exports = BlogController;
