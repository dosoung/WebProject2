var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
const session = require('express-session');
const flash = require('connect-flash');


//DBconnect
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const DB = require('./config/key').MongoURI;
mongoose.connect(DB,{useNewUrlParser: true})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log(err));

//Other Setting
app.set('view engine','ejs');
app.use(express.static(__dirname+ '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({secret:'Mysecret',resave:true,saveUninitialized:true}));

//Routes
app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));



var PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log(`Server connected http://localhost: ${PORT}`);
});