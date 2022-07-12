const router = require("express").Router();
const { Comment, Post, User } = require("../../models");
const withAuth = require("../../utils/auth");


router.get("/", (req, res) => {
    Comment.findAll({})
    .then((dbCommentInfo) => res.json(dbCommentInfo))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id,
        },
    })
    .then((dbCommentInfo) => res.json(dbCommentInfo))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
    Comment.update(
        {
            comment: req.body.comment,
        },
        {
            where: {
                id: req.params.id,
            },
        }
        )
        .then((dbCommentInfo) => {
            if (!dbCommentInfo) {
                res.status(404).json({ message: "No comments with this id" });
                return;
            }
            res.json(dbCommentInfo);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    });

    // delete a comment
    router.delete("/:id", withAuth, (req, res) => {
      Comment.destroy({
          where: {
          id: req.params.id,
        },
      })
      .then((dbCommentInfo) => {
          if (!dbCommentInfo) {
              res.status(404).json({ message: "No comments with this id" });
              return;
            }
            res.json(dbCommentInfo);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    });
    
    // update a comment
    router.post("/", withAuth, (req, res) => {
        console.log(req.body.post_id, req.body.user_id, req.body.comment);
        if (req.session) {
            Comment.create({
                post_id: req.body.post_id,
                user_id: req.session.user_id,
                comment: req.body.comment,
            })
            .then((dbCommentInfo) => res.json(dbCommentInfo))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
      });
  }
}); 
module.exports = router;
