Rite: CLI for Ritetag API
=========================

Uses [RiteTag API](http://ritetag.com/rest-api) to get lists of similar hashtags & their viral potential.

Ritetag has can show you which hashtags are most likely to get picked up & amplify your content.

This work was inspired by [Neal Shyam](https://github.com/nealrs) on [Ritehash](https://github.com/nealrs/ritehash)

API Documentation: [http://docs.ritetag.apiary.io/](http://docs.ritetag.apiary.io/)

### Requirements

Obtain free API keys from [https://ritetag.com/developer/dashboard](https://ritetag.com/developer/dashboard)

Then save keys in `rite-config.json`


#### API Limits

| Plan   | per day   | per hour |
|:-------|----------:|---------:|
| Free   | 1,000     | 100      |
| Tier 1 | 10,000    | 1,000    |
| Tier 2 | 100,000   | 10,000   |
| Tier 3 | 500,000   | 50,000   |
| Tier 4 | 2,000,000 | 200,000  |

### Installation

    npm install rite

### Usage

    rite [options]

    Commands:

      directory [query]      Returns an array of up to 10 hashtags most frequently used in tweets containing your query
      trending               Returns trending hashtags
      influencers [hashtag]  Returns influencers on twitter for a given hashtag
      history [hashtag]      Returns historical data for a given hashtag
      help [cmd]             display help for [cmd]

    Options:

      -h, --help     output usage information
      -V, --version  output the version number


### Glossary

- **tag:** name of the associated hashtag
- **density:** number of unique tweets with this hashtag per hour
- **retweets:** number of retweets per hour
- **links:** % of unique tweets with link
- **photos:** % of unique tweets with photos
- **mentions:** % of unique tweets with mentions
- **potential views:** how many times per hour the hashtag is appearing in home feed across Twitter

### Doest not yet support (todo)

- Testing
- Hashtags for a given url
- Grade a tweet
- Alternative output formats

### License

MIT Licensed - 2014 - Louis Galipeau | [@muloka](https://twitter.com/muloka)