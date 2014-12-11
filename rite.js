#!/usr/bin/env node
var ycommands   = require('ycommands')

var directory   = require('./lib/directory')
var trending    = require('./lib/trending')
var influencers = require('./lib/influencers')
var history     = require('./lib/history')

ycommands
  .usage("CLI for Ritetag API\n===================\n\nUsage:\n  rite command")
  .help('help')
  .command(
    "directory [query]", 
    "Returns an array of up to 10 hashtags most frequently used in tweets containing your query", 
    directory
  )
  .command(
    "trending",
    "Returns trending hashtags ",
    trending
  )
  .command(
    "influencers [hashtag]",
    "Returns influencers on twitter for a given hashtag",
    influencers
  )
  .command(
    "history [hashtag]",
    "Returns historical data for a given hashtag",
    history
  )
  // .nocommand("List all config keys", function(argv, callback) { 
  //   return callback() 
  // })
  .execute(function(err) {
    if (err) { console.error(err.toString()) }
  })