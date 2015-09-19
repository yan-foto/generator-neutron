'use strict';

var generators  = require('yeoman-generator');
var exec = require('child_process').exec;
var extend = require('util')._extend;
var path = require('path');
var fs = require('fs');
var mkdir = require('mkdirp');
var Q = require('q');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    // Just in case .neutronrc is updated
    this.conflicter.force = true;

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
    var log = this.log;
    var deferred = Q.defer();

    log('Trying to clone neutron repository...');

    exec('git clone https://github.com/yan-foto/neutron.git .', function(err, stdout) {
      if(err) {
        log('Cloning failed! (' + err.message.trim() + ')');
        deferred.reject(err);
        return;
      }

      deferred.resolve();
    }.bind(this));

    return deferred.promise;
  },
  _install: function() {
    var log = this.log;
    var deferred = Q.defer();

    log('Installing modules, bootstraping neutron...');

    exec('npm install && gulp bootstrap', function(err, stdout) {
      if(err) {
        log('Bootsraping failed (' + err.message.trim() + ')');
        deferred.reject(err);
        return;
      }

      deferred.resolve();
    });
  },
  _prepareStructure: function() {
    this.log('Creating package structure...');
    ['src', 'dist'].forEach(function(dir) {
      mkdir.sync(path.join(process.cwd(), dir));
    });

    var pkg = path.join(process.cwd(), 'dist', 'package.json')
    fs.writeFileSync(pkg, JSON.stringify(this.pkg, null, 2));
  },
  _selectModules: function(answers) {
    var config = this.fs.readJSON('.neutronrc');

    var desired = Object.keys(config.dependencies).filter(function(module) {
      return answers.modules.indexOf(module) == -1;
    });

    desired.forEach(function(module) {
      delete config.dependencies[module];
    });

    this.fs.writeJSON('.neutronrc', config);
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
    }, {
      type: 'checkbox',
      name: 'modules',
      message: 'Desired modules',
      choices: [
        {
          name: 'babel',
          checked: true
        },
        {
          name: 'jade',
          checked: true
        },
        {
          name: 'sass',
          checked: true
        }
      ]
    }], function(answers) {
      self._checkGit(function(err) {
        if(err) {
          self.log(err);
          done();
        }

        self.pkg = extend(self.pkg, answers);
        Q.fcall(self._clone.bind(self, answers))
          .then(function() {
            self._prepareStructure();
            self._selectModules(answers);
            return self._install();
          })
          .catch(function(err) {
            self.log.error(err);
          });
      });
    });
  }
});
