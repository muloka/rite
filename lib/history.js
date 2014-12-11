var history = function (argv, callback) {
  var arg_hashtag = argv['_'].splice(1).join(' ')

  if (!arg_hashtag.length) {
    console.error('hashtag required')
    process.exit(1)
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

  var color_code_rank = {
    0: 'Unsused',
    1: 'Overused',
    2: 'Good',
    3: 'Great'
  }

  oauth.get(
    urls.base + urls.historical_data + arg_hashtag,
    config.token,
    config.token_secret,
    function (err, data, res) {
      if (err) { 
        console.error(err)
        process.exit(1)
      }

      var json = JSON.parse(data)

      var table = new Table({
        head: ['rank','date', 'unique','retweets','links','photos','mentions','potential_views','density']
      })

      async.each(json.data, function(time, cbEach) {

        table.push([
          apply_color(time.color, color_code_rank[time.color]),
          time.date,
          isnull(time.unique, '0'),
          isnull(time.retweets, '0'),
          isnull(time.links, '0') + '%',
          isnull(time.photos, '0') + '%',
          isnull(time.mentions, '0') + '%',
          isnull(time.potential_views, '0'),
          isnull(time.density, '0')
        ])

        cbEach()
      }, function(err){
        if (err) {
          console.error(err)
          process.exit(1)
        }

        console.log("┌────────────────────────────────────────────────────────────────────────────────────────────────")
        console.log("│ Historical data for: #" + arg_hashtag)
        console.log(table.toString())
      })
    }
  )

  return callback()
}

module.exports = history