class EventEmiiter {
    listeners = {}

    fire(event) {
        for (let [key, value] of Object.entries(this.listeners)) {
            this.unregister(key)
            value(event)
        }
    }

    register(id, listener) {
        this.listeners[id] = listener
        console.log("Register", id)
    }

    unregister(id) {
        return delete this.listeners[id]
    }
}

export default EventEmiiter 