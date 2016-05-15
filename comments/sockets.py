import redis
import asyncio
import websockets


async def comments_changed(websocket, path):
    r = redis.StrictRedis(host='localhost', port=6379, db=0)
    pubsub = r.pubsub()
    pubsub.subscribe(['test'])
    while True:
        for item in pubsub.listen():
            await websocket.send("Changed")

start_server = websockets.serve(comments_changed, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
