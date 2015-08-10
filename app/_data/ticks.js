export default class Ticks {

    constructor() {
        this.ticks = {};
    }

    symbols() {
        return Object.keys(this.ticks);
    }

    appendData(data) {

        if (!this.ticks[data.symbol]) this.ticks[data.symbol] = { history: [] };

        this.ticks[data.symbol].history.push({
            epoch: data.epoch,
            quote: data.quote
        });
    }

    history(symbol) {
        return this.ticks[symbol] ? this.ticks[symbol].history : [];
    }

    current(symbol) {

        if (!this.ticks[symbol]) return {};

        const lastTick = this.ticks[symbol].history[this.ticks[symbol].history.length - 1];

        return {
            symbol: symbol,
            diff: this.diff(symbol),
            quote: lastTick.quote,
            epoch: lastTick.epoch,
        };
    }

    diff(symbol) {

        const t = this.ticks[symbol];

        if (!t || !t.history || t.history.length <= 1) return 0;

        return t.history[t.history.length - 1].quote - t.history[t.history.length - 2].quote;
    }
}
