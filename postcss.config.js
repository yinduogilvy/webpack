module.exports = {
  plugins:{
    "postcss-import":{},
    "precss":{},
    "postcss-cssnext":{},
    "cssnano":{
      reduceIdents: false,
      preset:"advanced",
      autoprefixer:false,
      "postcss-zindex":false
    }

  }
}
