export function onRequest(context) {
    return new Response("Hello, world! " + context.params)
}