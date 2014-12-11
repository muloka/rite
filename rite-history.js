var commander = require('commander'),
    async     = require('async'),
    colors    = require('colors'),
    Table     = require('cli-table'),
    oauth     = require('./lib/oauth'),
    urls      = require('./rite-urls')
    config    = require('./rite-config')

commander.parse(process.argv)

if (!commander.args.length) {
  console.error('hashtag required')
  process.exit(1)
}

var arg_hashtag = commander.args[0]

isnull = function (original_value, default_value) {
  return String(original_value).replace('null', default_value)
}

apply_color = function (color_code, tag) {
  switch(color_code) {
    case 1:
      return tag.yellow
      break;
    case 2:
      return tag.blue
      break;
    case 3:
      return tag.green
      break;
    default: // 0 or anything else
      return tag
  }
}

color_code_rank = {
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