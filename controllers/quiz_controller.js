var models = require('../models/models.js');

// Autoload - factorización del codigo
exports.load = function(req, res, next, quizId){
  models.Quiz.findById(quizId).then(
    function (quiz){
      if (quiz){
        req.quiz = quiz;
        next();
      }else{
        next(new Error('No existe quizId='+quizId));
      }
    }
  ).catch(function (error) { next(error);});
};

/* GET /quizes/question */
exports.index = function(req, res  ) {
  var search = req.query.search;
  
  if ((typeof(search) === "undefined") ){
    search = "%";
  }else{
    search = search.replace(/\s/g,"%");
    search="%"+search+"%";
  }

  models.Quiz.findAll({where: ["pregunta like ?", search],order: '`pregunta` ASC'}).then(function (quizes) {
    res.render('quizes/index.ejs', { quizes: quizes});
  }).catch(function (error) { next(error);});
};

/* GET /quizes/question */
exports.show = function(req, res  ) {
    res.render('quizes/show', { quiz: req.quiz});
};

  /* GET /quizes/answer */
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta){
      resultado = 'Correcto';
    }
    res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado });
};

/* GET /author */
exports.author = function(req, res) {
  res.render('author', { autor: 'Álvaro Bermejo' });
};
