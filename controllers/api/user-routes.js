const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["[password"] },
  })
    .then((dbUserInfo) => res.json(dbUserInfo))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "body", "user_id"],
      },

      {
        model: Comment,
        attributes: ["id", "body", "useR_id"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
      {
        model: Post,
        attributes: ["title"],
      },
    ],
  })
    .then((dbUserInfo) => {
      if (!dbUserInfo) {
        res.status(404).json({ message: "No users with this id" });
        return;
      }
      res.json(dbUserInfo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((dbUserInfo) => {
      if (!dbUserInfo) {
        res.status(400).json({ message: "No user with that username!" });
        return;
      }
      const validPassword = dbUserInfo.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: "Incorrect password!" });
        return;
      }
      req.session.save(() => {
        req.session.user_id = dbUserInfo.id;
        req.session.username = dbUserInfo.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserInfo, message: "You are logged in. Welcome!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })

    .then((dbUserInfo) => {
      req.session.save(() => {
        req.session.user_id = dbUserInfo.id;
        req.session.username = dbUserInfo.username;
        req.session.loggedIn = true;

        res.json(dbUserInfo);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserInfo) => {
      if (!dbUserInfo) {
        res.status(404).json({ message: "No users with this id" });
        return;
      }
      res.json(dbUserInfo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserInfo) => {
      if (!dbUserInfo[0]) {
        res.status(404).json({ message: "No users with this id" });
        return;
      }
      res.json(dbUserInfo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
