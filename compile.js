var fs        = require('fs');
var yaml      = require('js-yaml');
var ejs       = require('ejs');
var q         = require('q');
var writeFile = q.denodeify(fs.writeFile);
var readFile  = q.denodeify(fs.readFile);

q.all([readFile('./web/index_template.html', 'utf-8'), readFile('./content.yml', 'utf-8')]).then(function(results) {
  var templateValue = results[0];
  var rawYaml       = results[1];
  var pageAttributes  = yaml.safeLoad(rawYaml);

  var html = ejs.render(templateValue, pageAttributes);
  return writeFile('./web/index.html', html);
}).then(function() {
  console.log('./web/index.html file written successfully.');
}, function(error) {
  console.log(error);
});
