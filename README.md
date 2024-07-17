# Create Bsky Bot

Simple command for scafolding a new bsky bot with bsky-event-handlers

## Usage

```bash
bunx create-bsky-bot <name>
```

The final prompt will ask if you also want to include a github action workflow to build and publish your docker containers

### Available templates:

**default** : includes basic code for jetstream and interval subscriptions

**jetstream**: includes basic code for jetstream subscription

**interval**: includes basic code for jetstream subscription


For more bsky-event-handler information, see the docs [here](https://github.com/juni-b-queer/bsky-event-handlers)