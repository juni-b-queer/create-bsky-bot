# {{name}}

{{description}}

# Quickstart
- [ ] Install Bun
- [ ] Install Docker
- [ ] Fill in .env with your handle and **app** password (do not use your real password)
- [ ] Run `make up`
- [ ] Be free and create to your hearts content!


## Development
Sometimes it may be easier to keep jetstream running and make quick changes to your code. To run jetstream on its own use `docker compose up jetstream -d`
Then when you make changes to your code, you can test it by running `make dev`, but be sure your .env jetstream url is set correctly.
When using the docker containers, it should be `ws://jetstream:6008/subscribe`, but when running code with bun run, it should be `ws://localhost:6008/subscribe`

For the latest firehose content, start jetstream with an empty data folder/cursor.json file

Check out the bsky-event-handler docs [here](https://github.com/juni-b-queer/bsky-event-handlers)