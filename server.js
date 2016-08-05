var http = require('http'),
    path = require('path'),
    formidable = require('formidable'),
    mkdirp = require('mkdirp');

var server = http.createServer(function(req, res){
    function onError(msg){
        res.statusCode = 500;
        res.statusMessage = msg;
        res.end();
    }
    function onSuccess(){
        res.end();
    }

    if(req.url == '/receiver' && req.method.toLowerCase() == 'post'){
        var form = new formidable.IncomingForm();
        var to = '';
        form.on('field', function onField(name, value){
            if(name == 'to'){
                to = value;
                form.removeListener('field', onField);
            }
        });
        form.on('fileBegin', function(name, file){
            try{
                mkdirp.sync(path.dirname(to));
                file.path = to;
            }catch(e){
                onError('cannot make dir ' + to + ' to save file ' + name);
                form.emit('aborted');
            }

        });
        form.parse(req, function(err, fields, file){
            if(err) onError(err.message);
            else onSuccess();
        });
    }
});

module.exports = server;