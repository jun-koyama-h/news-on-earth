import posts from './post/data'

export function onRequestGet() {
    return Response.json(posts)
}