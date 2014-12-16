var trending = function (argv, callback) {
  if (argv['_'].splice(1).join(' ') === 'green') {
    var arg_green = '?green=true'
  } else {
    var arg_green = ''
  }

  var async     = require('async'),
      chalk     = require('chalk'),
      Table     = require('cli-table'),
      oauth     = require('../lib/oauth'),
      urls      = require('../rite-urls'),
      config    = require(process.env.HOME + '/rite-config.json')

  var isnull = function (original_value, default_value) {
    return String(original_value).replace('null', default_value)
  }

  var apply_color = function (color_code, tag) {
    switch(color_code) {
      case 1:
        return chalk.yellow(tag)
        break;
      case 2:
        return chalk.cyan(tag)
        break;
      case 3:
        return chalk.green(tag)
        break;
      default: // 0 or anything else
        return tag
    }
  }

  oauth.get(
    urls.base + urls.trending_hashtags + arg_green,
    config.token,
    config.token_secret,
    function (err, data, res) {
      if (err) { 
        console.error(err)
        process.exit(1)
      }

      var json = JSON.parse(data)

      var table = new Table({
        head: ['tag','retweets','links','photos','mentions','potential_views','density']
      })

      async.each(json.tags, function(tag, cbEach) {

        table.push([
          apply_color(tag.color, '#' + tag.tag),
          isnull(tag.retweets, '0'),
          isnull(tag.links, '0') + '%',
          isnull(tag.photos, '0') + '%',
          isnull(tag.mentions, '0') + '%',
          isnull(tag.potential_views, '0'),
          isnull(tag.density, '0')
        ])

        cbEach()
      }, function(err){
        if (err) {
          console.error(err)
          process.exit(1)
        }

        console.log("┌────────────────────────────────────────────────────────────────────────────────────────────────")
        console.log("│ Trending Hashtags")
        console.log(table.toString())
      })
    }
  )

  return callback()
}

module.exports = trending