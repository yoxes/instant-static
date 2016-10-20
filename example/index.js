const fs = require('fs')

const InstantStatic = require('../index.js')
const is = new InstantStatic()

is.addModule(require('../modules/blog'))

is.addTheme('blog/index.ejs', fs.readFileSync('../theme/blog/post.ejs', 'utf8'))
is.addTheme('layouts/main.ejs', fs.readFileSync('../theme/layouts/main.ejs', 'utf8'))
is.addTheme('shop/category.ejs', fs.readFileSync('../theme/shop/category.ejs', 'utf8'))
is.addTheme('shop/product.ejs', fs.readFileSync('../theme/shop/product.ejs', 'utf8'))

is.addSettings(fs.readFileSync('./settings.yml', 'utf8'))

is.addAsset('/images/blog-banner.jpg', fs.readFileSync('./images/blog-banner.jpg'))

is.addContent({
  module: 'blog',
  id: 'my-first-post',
  title: 'My First Post',
  date: '2016-05-15 10:51',
  banner: '/images/blog-banner.jpg',
  tags: ['First'],
  type: 'markdown',
  content: `
## First Post

Sometimes I just want to tell people this is my second post when actually this is my first
  `
})

is.addContent({
  module: 'blog',
  id: 'my-second-post',
  title: 'My second Post',
  date: '2016-05-15 10:51',
  banner: '/images/blog-banner.jpg',
  tags: ['Second'],
  type: 'markdown',
  content: `
## Second Post

Sometimes I just want to tell people this is my first post when actually this is my second
  `
})

const compiled = is.compile()

/*
  Example web server to deliver compiled content
*/
const http = require('http')
http.createServer(function(req, res) {
  const page = compiled.filter(page => page.path === req.url)[0]
  if (page) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(page.data)    
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/text'
    })
    res.write('Page not found')
  }

  res.end()
}).listen(8080)
console.log('Listening on post 8080')