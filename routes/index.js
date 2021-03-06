var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite3');

exports.index = function(req, res){
  db.serialize(function(){
    if (req.body.content) {
      db.run("INSERT INTO messages (content) VALUES (?)", req.body.content);
    }

    db.all("SELECT content FROM messages", function(err, rows){
      if (!err) {
        res.render('index', {
          title: 'Miniblog Sample',
          messages: rows,
        });
      }
    });
  });
};
