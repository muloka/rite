var commander = require('commander'),
    async     = require('async'),
    colors    = require('colors'),
    Table     = require('cli-table'),
    oauth     = require('./lib/oauth'),
    urls      = require('./rite-urls'),
    config    = require(process.env.HOME + '/rite-config.json')

commander.parse(process.argv)

if (!commander.args.length) {
  console.error('url required')
  process.exit(1)
}

var arg_tweet = commander.args[0]


// process.exit(1)


oauth.post(
  urls.base + urls.tweet_grader + arg_tweet,
  config.token,
  config.token_secret,
  'tweet=' + arg_tweet,
  'application/x-www-form-urlencoded',
  function (err, data, res) {
    if (err) { 
      console.error(err)
      process.exit(1)
    }

    console.log(data)
    process.exit(1)
  }
) 

// var json = JSON.parse(data)

    // var table = new Table({
    //   head: ['hashtag','count']
    // })

    // async.each(json.data, function(hashtag, cbEach) {

    //   table.push([
    //     '#' + hashtag.tag,
    //     hashtag.count
    //   ])

    //   cbEach()
    // }, function(err){
    //   if (err) {
    //     console.error(err)
    //     process.exit(1)
    //   }

    //   console.log("┌────────────────────────────────────────────────────────────────────────────────────────────────")
    //   console.log("│ Hashtags for URL: " + arg_url)
    //   console.log(table.toString())
    // })