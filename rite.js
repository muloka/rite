#!/usr/bin/env node

var commander = require('commander')

commander
  .version('0.0.1')
  .usage('[options]')
  .command("directory [query]", "Returns an array of up to 10 hashtags most frequently used in tweets containing your query")
  .command("trending", "Returns trending hashtags ")
  // .command("url [url]", "Returns hashtags for a given url")
  .command("influencers [hashtag]", "Returns influencers on twitter for a given hashtag")
  .command("history [hashtag]", "Returns historical data for a given hashtag")
  // .command("grade [tweet]", "Grades the quality of the tweet.")
  .parse(process.argv)

if (commander.args.length === 0) {
  commander.help()
}