
class Store {
  constructor(props) {
    if (props && props.hasOwnProperty('callback')) {
      this.callback = props.callback;
      this.context = props.context;
      this.host = props.host;
      this.socket = new WebSocket(`ws://chat.${this.host}`)
      this.socket.onmessage = (evt) => this.receive(this.process(evt));
    }
  }

  process(evt) {
    try {
      return JSON.parse(evt.data);
    } catch (e) {
      if (e instanceof SyntaxError) {
        return { error: 'Error: invalid message format.' };
      }
      return { error: 'Error: could not handle received data.' };
    }
  }

  receive(data) {
    this.callback.call(this.context, data);
  }

  broadcast(data) {
    this.socket.send(JSON.stringify(data));
  }

  async subscribe(data) {
    const res = await fetch('/subscribe', {
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      credentials: 'same-origin',
    });

    if (!res.ok) return false;

    const resData = res.json();
    return resData;
  }
}

export default Store;
