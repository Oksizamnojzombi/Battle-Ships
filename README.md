# Battle-Ships

Get started:

The site is compiled on Webpack 4. It is assumed that Node.js is installed.

First, we create the workpiece Node.js of the project. To do this, create a folder of our project with the above structure and go to it on the command line, where we call the command to create the package.json file.

 npm init
We will install three common packages that we will need in any case: webpack, webpack-cli (work with the command line in webpack was taken out as a separate package) and webpack-dev-server (to start the local server so that the saved project changes are displayed in the browser immediately)

 npm install webpack webpack-cli webpack-dev-server --save-dev
Collecting JavaScript.

Since Webpack is created primarily for building js files, this part will be the simplest. To be able to write javascript in a modern form ES2015, which is not supported by browsers, we will deliver the packages babel-core, babel-loader, babel-preset-env.

npm install babel-core babel-loader babel-preset-env --save-dev
After creating the configuration file webpack.config.js with the following content: const path = require('path');

 module.exports = {
   entry: [
     './src/js/index.js',
   ],
   output: {
     filename: './js/bundle.js'
   },
   devtool: "source-map",
   module: {
     rules: [{
         test: /\.js$/,
         include: path.resolve(__dirname, 'src/js'),
         use: {
           loader: 'babel-loader',
           options: {
             presets: 'env'
           }
         }
       },
     ]
   },
   plugins: [
   ]
 };
In our project, we make our pages on Boostrap 4. So we need to install three packages: bootstrap, jquery, popper.js. The second and third package we install on demand Bootstrap.

 npm install bootstrap jquery popper.js --save
we need these three packages for the site itself, and not for its assembly. Therefore, we install these packages with the flag --save, and not --save-dev.

Now you can start writing our index.js file:

 import jQuery from 'jquery';
 import popper from 'popper.js';
 import bootstrap from 'bootstrap';
Now you can go to the assembly of the js file. To do this, in the package.json file in the scripts section, we will write the following npm scripts:

 "scripts": {
     "dev": "webpack --mode development",
     "build": "webpack --mode production",
     "watch": "webpack --mode development --watch",
     "start": "webpack-dev-server --mode development --open"
   },
Now when you run ~ npm run dev in the command line, the project will be assembled (css and html files will also be collected by this command), and the bundle.js and bundle.js.map files appear in the / dist / js folder.

When the ~ npm run build command is run, the project will also be assembled, but the final one (with optimization, maximum file minimization) that can be uploaded to the hosting.

When you run ~ npm run watch, it starts the automatic viewing mode for changes to the project files with the automatic completion of the modified files. Yes, to disable this mode on the command line (for example, so that you can write other commands), you can press Ctrl + C (at least in PowerShell).

When you start ~ npm run start, the local server will start, which will launch the html page and will also track the changes in the files. But while this command we do not use, as assembly html pages are not added.

We add another del-cli plugin, which is not connected to the webpack and works separately.

 npm install del-cli --save-dev
Make changes to package.json file.

 {
 ...
   "scripts": {
 ...
     "clear": "del-cli dist"
   },
 ...
 }
Building a CSS file.

The CSS file will be collected from SCSS files, under which we have the folder src / scss reserved. In it, create a file style.scss, for example, with the following content:

 $font-stack: -apple-system, BlinkMacSystemFont,Roboto,'Open Sans','Helvetica Neue',sans-serif;
 
 @import "~bootstrap/scss/bootstrap";
 
 @font-face {
   font-family: 'Roboto';
   font-style: normal;
   font-weight: 400;
   src: url(../fonts/Roboto-Regular.ttf);
 }
 
 body {
   font-family: $font-stack;
   #logo {
     width: 10rem;
   }
   .container {
     img {
       width: 20rem;
     }
   }
 }
Note that we connect the Bootstrap styles not through its CSS file, but through the SSSS (@import "~ bootstrap / scss / bootstrap";), which will, if necessary, rewrite certain properties of the library, use its mixins, etc.

To process css files we will need the following modules: node-sass, sass-loader, css-loader and extract-text-webpack-plugin (they say that in the next version of Webpack in the last plug-in will disappear).

 npm install node-sass sass-loader css-loader extract-text-webpack-plugin@next --save-dev
Building HTML pages

Let's move on to the funniest thing: to assembling HTML pages where I have the biggest difficulties.

For the assembly of HTML pages we will use the plugin html-webpack-plugin, which supports various types of template engines. We also need a raw-loader package.

 npm install html-webpack-plugin raw-loader --save-dev
As an HTML templateer, we will use the default template for lodash. This is what a typical HTML page will look like before the build:

 <% var data = {
   title: "Title | Project",
   author: "Ksy"
 }; %>
 <%= _.template(require('./../includes/header.html'))(data) %>
 
 <p>text</p>
 
 <%= _.template(require('./../includes/footer.html'))(data) %>
First, in the variable data, we write all of our variable pages that we want to use on this page. Then we embed the header and footer templates through _.template (require ()).

Important specification. In articles about assembling HTML pages via html-webpack-plugin, you usually connect embeddable templates simply through the command:

 require('html-loader!./../includes/header.html')
However, in these embedded templates, the lodash syntax will not work (I still do not understand why this happens). And the data from the variable data will not be passed there. Therefore, we forcefully say the webpack that we embed the template, which must be processed as a lodash template.

Now we can use the full lodash syntax in the embedded templates. In the header file header.html below through <% = title%> we print the title of the article.

Copy the remaining files.

We generated js, css files, HTML pages. Remained files of images, fonts, etc., which we did not touch and deliberately did not copy via file-loader or url-loader. Therefore, we copy all the remaining folders through the plug-in copy-webpack-plugin:

npm install copy-webpack-plugin --save-dev
In the file webpack.config.js we will make changes:

...
const HtmlWebpackPlugin = require('html-webpack-plugin');
...

module.exports = {
  ...
  plugins: [
  ...
    new CopyWebpackPlugin([{
        from: './src/fonts',
        to: './fonts'
      },
      {
        from: './src/favicon',
        to: './favicon'
      },
      {
        from: './src/img',
        to: './img'
      },
      {
        from: './src/uploads',
        to: './uploads'
      }
    ]),
  ]...
};
All. Now, using the ~ npm run build command, we collect the project and the assembled static site appears in the dist folder.

Link to the resource for the procurement of the site. If necessary, recompile the project. - https://github.com/Harrix/static-site-webpack-habrahabr/blob/master/docs/article.md

#Now let's add Pixi.js
