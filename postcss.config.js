module.exports = {
  plugins:{
    "postcss-import":{},
    "precss":{},
    "postcss-cssnext":{},
    "cssnano":{
      preset:"advanced",
      autoprefixer:false,
      "postcss-zindex":false
    }

  }
}
