const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

var firebase = require('firebase');



// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
const port = 3000;



var serviceAccount = require("./serviceAccountKey.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://thegirlfriendbox-a277f.firebaseio.com"
});

const csrfMiddleware = csrf({ cookie: true });

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);
app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});


/*var firebase = require('firebase');
var ref = firebase.database().ref('admin-panel');
var users = ref.child('users');

users.push({
  name:'a',
  email:'as@as',

});*/




app.engine("html", require("ejs").renderFile);

app.get('/',function(req, res){
  res.render('login.html')
})

app.get("/import", function (req, res) {
  const sessionCookie = req.cookies.session || "";
  admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("import.html");
    })
    .catch((error) => {
      res.redirect("/");
    });
});

app.get("/import2", function (req, res) {
  const sessionCookie = req.cookies.session || "";
  admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("import2.html");
    })
    .catch((error) => {
      res.redirect("/");
    });
});


app.get("/signup", function (req, res) {
  const sessionCookie = req.cookies.session || "";
  admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("signup.html");
    })
    .catch((error) => {
      res.redirect("/");
    });
});

app.get("/signup2", function (req, res) {
  const sessionCookie = req.cookies.session || "";
  admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("signup2.html");
    })
    .catch((error) => {
      res.redirect("/");
    });
});

app.get("/proposal", function (req, res) {
  const sessionCookie = req.cookies.session || "";
  admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("proposal.html");
    })
    .catch((error) => {
      res.redirect("/");
    });
});

app.get("/request", function (req, res) {
  const sessionCookie = req.cookies.session || "";
  admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("request.html");
    })
    .catch((error) => {
      res.redirect("/");
    });
});

app.get("/campaigns", function (req, res) {
  const sessionCookie = req.cookies.session || "";
  admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("campaigns.html");
    })
    .catch((error) => {
      res.redirect("/");
    });
});

app.get("/campaigns2", function (req, res) {
  const sessionCookie = req.cookies.session || "";
  admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("campaigns2.html");
    })
    .catch((error) => {
      res.redirect("/");
    });
});


app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  console.log(idToken);
  console.log(expiresIn);

  admin.auth().createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        console.log(error);
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});


app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
