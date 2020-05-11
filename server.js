const express = require('express');  // express 라이브러리 import
const hbs = require('hbs');  // hbs(handlebars) 라이브러리 import
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs'); // 여기서 view engine은 왜 써야 하는 걸까?

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  })
  next();
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));
// app.use는 Express middleware를 쓰기 위함이다.
// express.static takes the absolute path to the folder you want to serve up.
// __dirname variable stores the path too your prohects directory.
// In this case, __dirname stores the path to node-web-server.


// hbs.registerHelper를 이용하면 등록한 함수를 hbs 파일에서 바로 쓸 수 있다.
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
}) // 함수의 입력이 있는 경우도 registerHelper로 등록할 수 있다.

// root page
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {  // 위에서 hbs.registerPartials를 통해 hbs 파일이 있는 폴더의 경로를 등록했으므로 이렇게 바로 hbs 파일을 사용 가능하다.
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
  });
});


// about page
app.get('/about', (req, res) => {  // about page
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {  // bad page
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});  // 3000번 포트를 통해 사용자들이 접근 가능
