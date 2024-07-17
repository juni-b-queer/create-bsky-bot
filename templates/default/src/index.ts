import {
    BadBotHandler,
    CreateSkeetHandler,
    DebugLog,
    GoodBotHandler,
    HandlerAgent,
    InputEqualsValidator,
    JetstreamSubscription,
    LogMessageAction,
    ReplyingToBotValidator,
    ReplyToSkeetAction,
    IntervalSubscription,
    IntervalSubscriptionHandlers,
    AbstractHandler,
    IsSpecifiedTimeValidator,
    CreateSkeetAction
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
            new CreateSkeetHandler(
                [new ReplyingToBotValidator(), new InputEqualsValidator("Hello")],
                [new LogMessageAction(), new ReplyToSkeetAction("World!")],
                testAgent
            ),
            new GoodBotHandler(testAgent),
            new BadBotHandler(testAgent)
        ]
    }
}

let intervalSubscription: IntervalSubscription;

const intervalSubscriptionHandlers: IntervalSubscriptionHandlers = [
    {
        intervalSeconds: 60,
        handlers:[
            new AbstractHandler(
                [IsSpecifiedTimeValidator.make("04:20", "16:20")],
                [CreateSkeetAction.make("It's 4:20 somewhere!")],
                testAgent)
        ]
    }
]


async function initialize() {
    await testAgent.authenticate()
    jetstreamSubscription = new JetstreamSubscription(
        handlers,
        <string>Bun.env.JETSTREAM_URL
    );
    intervalSubscription = new IntervalSubscription(
        intervalSubscriptionHandlers
    )
}

initialize().then(() =>{
    jetstreamSubscription.createSubscription()
    intervalSubscription.createSubscription()
    DebugLog.info("INIT", 'Initialized!')
});


