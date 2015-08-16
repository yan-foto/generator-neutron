# neutron Yeoman generator
This is a simple Yeoman generator for [neutron](https://github.com/yan-foto/neutron). neutron allows rapid and painless app development using Github's [electron](http://electron.atom.io/).

# Usage
There is a single no-parameter generator, that clones the neutron's project into the current directory:

```
yo neutron
```

![yo-neutron](https://cloud.githubusercontent.com/assets/1678441/9293185/912f51ac-4420-11e5-8417-4c030a6f13d3.png)

Apart from cloning the neutron repository, two directories, `src` and `dist`, are created . Neutron [expects](https://github.com/yan-foto/neutron#file-structure) source files to be in the former, and the transpiled/compiled/etc. files are stored in the latter directory. 

# Troubleshooting
The only error that might happen, is that you try to bootstrap neutron in a non-empty directory. This is going to fail, since git only clones in empty directories.
