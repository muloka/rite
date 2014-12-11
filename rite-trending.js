var async     = require('async'),
    colors    = require('colors'),
    Table     = require('cli-table'),
    oauth     = require('./lib/oauth'),
    urls      = require('./rite-urls')
    config    = require('./rite-config')

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

oauth.get(
  urls.base + urls.trending_hashtags,
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