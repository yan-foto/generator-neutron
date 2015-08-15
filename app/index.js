'use strict';

var generators  = require('yeoman-generator');
var exec = require('child_process').exec;
var extend = require('util')._extend;
var path = require('path');
var fs = require('fs');
var mkdir = require('mkdirp');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.pkg = {
      version: '0.1.0',
      description: 'boombastic | romantic | fantastic | neutron!'
    };
  },
  _checkGit: function(cb) {
    cb = cb || function() {};
    this.log('Checking git...');
    exec('git --version', function(err, stdout) {
      if(err) {
        cb('Git not found (' + err.message() + ')');
        return;
      }

      this.log('Git found: "' + stdout.trim() + '"');
      cb();
    }.bind(this));
  },
  _clone: function(answers) {
    this.log('Trying to clone neutron repository...');
    exec('git clone https://github.com/yan-foto/neutron.git .', function(err, stdout) {
      if(err) {
        this.log.error('Cloning failed! (' + err.message.trim() + ')');
        return;
      }

      this._prepareStructure();
    }.bind(this));
  },
  _prepareStructure: function() {
    this.log('Creating package structure...');
    ['src', 'dist'].forEach(function(dir) {
      mkdir.sync(path.join(process.cwd(), dir));
    });

    var pkg = path.join(process.cwd(), 'dist', 'package.json')
    fs.writeFileSync(pkg, JSON.stringify(this.pkg, null, 2));
  },
  prompting: function() {
    var self = this;

    this.prompt([{
      type: 'input',
      name: 'name',
      message: 'App\'s name',
      default: this.appname
    }, {
      type: 'input',
      name: 'version',
      message: 'Version',
      default: this.pkg.version
    }, {
      type: 'input',
      name: 'description',
      message: 'Description',
      default: this.pkg.description
    }], function(answers) {
      self._checkGit(function(err) {
        if(err) {
          self.log.error(err);
          done();
        }

        self.pkg = extend(self.pkg, answers);
        self._clone(answers);
      });
    });
  }
});
