import {
    BadBotHandler,
    CreateSkeetAction,
    DebugLog,
    GoodBotHandler,
    HandlerAgent,
    InputEqualsValidator,
    JetstreamSubscription,
    LogMessageAction,
    ReplyingToBotValidator,
    MessageHandler
} from 'bsky-event-handlers';

const testAgent = new HandlerAgent(
    'test-bot',
    <string>Bun.env.TEST_BSKY_HANDLE,
    <string>Bun.env.TEST_BSKY_PASSWORD
);

/**
 * Jetstream Subscription setup
 */
let jetstreamSubscription: JetstreamSubscription;

let handlers = {
    post: {
        c: [
            new MessageHandler(
                [ReplyingToBotValidator.make(), InputEqualsValidator.make("Hello")],
                [LogMessageAction.make(), CreateSkeetAction.make('World!', MessageHandler.generateReplyFromMessage)],
                testAgent
            ),
            new GoodBotHandler(testAgent),
            new BadBotHandler(testAgent)
        ]
    }
}

async function initialize() {
    await testAgent.authenticate()
    jetstreamSubscription = new JetstreamSubscription(
        handlers,
        <string>Bun.env.JETSTREAM_URL
    );
}

initialize().then(() =>{
    jetstreamSubscription.createSubscription()
    DebugLog.info("INIT", 'Initialized!')
});


