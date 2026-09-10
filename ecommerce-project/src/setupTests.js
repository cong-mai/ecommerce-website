// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom (Jest's test environment) doesn't provide MessageChannel, but antd's
// Form implementation (@rc-component/form) uses it to schedule field-value
// updates as a macrotask. A minimal setTimeout-based shim is enough — no
// need for a real cross-thread channel in tests.
if (typeof global.MessageChannel === 'undefined') {
  class FakeMessagePort {
    postMessage(data) {
      setTimeout(() => {
        if (this.target && this.target.onmessage) this.target.onmessage({ data })
      }, 0)
    }
  }
  global.MessageChannel = class FakeMessageChannel {
    constructor() {
      this.port1 = new FakeMessagePort()
      this.port2 = new FakeMessagePort()
      this.port1.target = this.port2
      this.port2.target = this.port1
    }
  }
}
