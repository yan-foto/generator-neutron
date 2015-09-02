<p align="center">
  <img alt="neutron" src="https://cloud.githubusercontent.com/assets/1678441/9429889/ccd2253a-49df-11e5-894e-81d52a36eb4b.png">
</p>

# neutron Yeoman generator
This is a simple Yeoman generator for [neutron](https://github.com/yan-foto/neutron). neutron allows rapid and painless app development using Github's [electron](http://electron.atom.io/).

<a href="https://www.npmjs.com/package/generator-neutron"><img alt="NPM Version" src="https://img.shields.io/npm/v/generator-neutron.svg"></a>
![license](https://img.shields.io/npm/l/generator-neutron.svg)

# Usage
There is a single no-parameter generator, that clones the neutron's project into the current directory:

```
yo neutron
```

![yo-neutron](https://raw.githubusercontent.com/yan-foto/yan-foto.github.io/master/assets/generator-neutron.gif)

Apart from cloning the neutron repository, two directories, `src` and `dist`, are created . Neutron [expects](https://github.com/yan-foto/neutron#file-structure) source files to be in the former, and the transpiled/compiled/etc. files are stored in the latter directory.

# Troubleshooting
The only error that might happen, is that you try to bootstrap neutron in a non-empty directory. This is going to fail, since git only clones in empty directories.
