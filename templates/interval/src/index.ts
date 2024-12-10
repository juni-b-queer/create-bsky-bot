import {
    DebugLog,
    HandlerAgent,
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
    intervalSubscription = new IntervalSubscription(
        intervalSubscriptionHandlers
    )
}

initialize().then(() =>{
    intervalSubscription.createSubscription()
    DebugLog.info("INIT", 'Initialized!')
});


