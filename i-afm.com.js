var express = require("express");
var bodyParser = require("body-parser");
var mailer = require("express-mailer");
var fs = require("fs");
var path = require("path");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', '/var/www/i-afm.com/views');
app.set('view engine', 'jade');

app.get("/home_language", function(req, res){
    var idioma = req.query.language;
    var archivo_idioma = path.join("/var/www/i-afm.com/languages", idioma + ".json");
    fs.readFile(archivo_idioma, function(err, file){
        if(err){
            res.json({});
        }else{
            res.json(JSON.parse(file.toString()));
        }
    });
});

app.post("/assets/php/contact.php", function(req, res){
    
    var nombre = req.body["form-contact-name"];
    var email = req.body["form-contact-email"];
    var mensaje = req.body["form-contact-message"];
    
    
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'iafm.com@gmail.com',
            pass: 's3gur1dadiafm33'
        }
    });
    
    transporter.sendMail({
        from: 'iafm.com@gmail.com',
        to: 'jjuarez007@gmail.com',
        bcc: "harald@i-afm.com",
        subject: 'Formulario de Contacto',
        text: nombre + "\n" + email + "\n" + mensaje
    });
    

    res.end('<span id="valid">Your Email was sent!</span>');

});

//

app.use(express.static("/var/www/i-afm.com"));


app.listen(3001);

console.log("running");



