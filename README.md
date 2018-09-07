# Static Webpack

A basic Webpack configuration to create simple static sites with Pug/Jade/HTML and SASS/SCSS/CSS.

## Usage

#### Clone

```
git clone https://github.com/CalculoJuridico/static-webpack
```

### Install Dependencies

```
yarn install
```

## Project structure

### Pug/Jade -> HTML
You can find pages in `src/views`.
Each page main file is located in `src/views/templates` and the shared elements are in `src/views/includes`.

When **adding a new page** you should add it to the list in `config/pages.config.js` and create the template in `src/views/templates`.

### Referencing images, videos and other media in Pug/Jade/HTML

Images are located in `src/assets/img` and should be required like this:
```pug
img(src=require('img/js-logo.svg'))
```

### SASS -> CSS
You can find styles in `src/styles`. You should

### Referencing images, videos and other media in SASS/CSS

TODO

### Referencing fonts in SASS/CSS

Fonts are located in `static/fonts` and should be referenced like this:
```css
@font-face {
  src: url('/fonts/open-sans-regular.woff2') format('woff2');
}
```

### For Development

This enables webpack-dev-server for Hot Module Replacement. It also uses browser-sync for a quick way of accessing your site from an external IP. [See more browser-sync options](https://browsersync.io/docs/options).

```
yarn dev
```

### For Production

```
yarn build
```

## Featured Dependencies

Besides browser-sync and webpack-dev-server, this projects ships with some cool dependencies.

-   [postcss-loader](https://github.com/postcss/postcss-loader)
-   [css-mqpacker](https://github.com/hail2u/node-css-mqpacker) (postcss plugin)
-   [normalize.css](https://github.com/necolas/normalize.css/)
