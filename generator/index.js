module.exports = (api, options) => {
  api.extendPackage({
    dependencies: {
      'cube-ui': '~1.10.9'
    }
  })
  api.injectImports(api.entryFile, `import './cube-ui'`)
  if (api.invoking) {
    api.postProcessFiles(files => {
      const appFile = files[`src/App.vue`]
      if (appFile) {
        // TODO
//         files[`src/App.vue`] = appFile.replace(/^<template>[^]+<\/template>/, `
// <template>
//   <div id="app">
//     <div id="nav">
//       <router-link to="/">Home</router-link> |
//       <router-link to="/about">About</router-link>
//     </div>
//     <router-view/>
//   </div>
// </template>
//         `.trim())
      }
    })
  }
  if (options.postCompile) {
    api.extendPackage({
      transformModules: {
        'cube-ui': {
          transform: 'cube-ui/src/modules/${member}',
          kebabCase: true
        }
      },
      devDependencies: {
        stylus: '^0.54.5',
        'stylus-loader': '^3.0.2'
      }
    })
  } else {
    api.extendPackage({
      transformModules: {
        'cube-ui': {
          transform: 'cube-ui/lib/${member}',
          kebabCase: true,
          style: {
            ignore: ['create-api', 'better-scroll']
          }
        }
      }
    })
  }
  api.extendPackage({
    browserslist: [
      'Android >= 4.0'
    ]
  })

  require('./config')(api, options)

  if (options.importType === 'partly') {
    require('./partly')(api, options)
  } else if (options.importType === 'fully') {
    require('./fully')(api, options)
  }

  if (options.theme) {
    require('./theme')(api, options)
  }
  if (options.rem) {
    require('./rem')(api, options)
  }
  if (options.vw) {
    require('./vw')(api, options)
  }
}