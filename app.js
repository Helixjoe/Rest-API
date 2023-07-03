const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://joeljohn:joeljohn1234@cluster0.qpazsri.mongodb.net/wikiDB?retryWrites=true&w=majority", { useNewUrlParser: true });

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("article", articleSchema);

/////////////////////////////Requesting ALL Articles///////////////////////////////
app.route("/articles")

    .get((req, res) => {
        async function find() {
            const foundItems = await Article.find();
            res.send(foundItems);
        };
        find();
    })

    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save();
    })

    .delete((req, res) => {
        async function deleteAllArticles() {
            await Article.deleteMany();
        };
        deleteAllArticles();
    });

/////////////////////////////Requesting A Specific Article/////////////////////////////// 

app.route("/articles/:articleTitle")

    .get((req, res) => {
        async function findArticle() {
            const foundItem = await Article.findOne({ title: req.params.articleTitle });
            res.send(foundItem);
        }
        findArticle();
    })

    .put((req, res) => {
        async function updateArticle() {
            await Article.replaceOne({ title: req.params.articleTitle }, {
                title: req.body.title,
                content: req.body.content
            })
        }
        updateArticle();
    })
    .patch((req, res) => {
        async function updateArticle() {
            await Article.updateMany({ title: req.params.articleTitle }, {
                $set: req.body
            }
            )
        }
        updateArticle();
    })
    .delete((req, res) => {
        async function deleteArticle() {
            await Article.deleteOne({ title: req.params.articleTitle })
        };
        deleteArticle();
    });


app.listen("3000", () => {
    console.log("Server started on port 3000");
});