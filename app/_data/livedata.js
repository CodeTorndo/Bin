import { LiveApi } from 'binary-live-api';
import Ticks from './Ticks';

let instance = null;

export default class LiveData {

    constructor() {
        if (!instance) {
            instance = this;
        }

        this.dataHandlers = {};

        this.offerings = [];
        this.contracts = {};
        this.portfolio = [];
        this.activeSymbols = [];

        this.ticks = new Ticks();

        this.api = new LiveApi();

        this.events = this.api.events;
        this.events.on('authorize', ::this.authorizeResponseHandler);
        this.events.on('portfolio', ::this.portfolioHandler);
        this.events.on('offerings', ::this.offeringsHandler);
        this.events.on('tick', ::this.ticksHandler);
        this.events.on('active_symbols', ::this.activeSymbolsHandler);
        this.events.on('contracts', ::this.contractHandler);

        this.api.authorize('8NS2r0HzIPiamwR9opmloyibNQowkNdnhssv0UH4HPR9zF1d');
        this.api.getActiveSymbolsByName();

        return instance;
    }

    addDataHandler(dataType, func) {
        if (!this.dataHandlers[dataType]) {
            this.dataHandlers[dataType] = [];
        }
        this.dataHandlers[dataType].push(func);
    }

    dataChanged(dataType, data) {
        const handlers = this.dataHandlers[dataType];
        if (handlers) {
            handlers.forEach(handler => handler(data));
        }
    }

    authorizeResponseHandler(r) {
        this.balance = {
            currency: r.data.currency,
            amount: +r.data.balance,
        };
        this.dataChanged('balance');
    }

    activeSymbolsHandler(r) {
        this.activeSymbols = Object.keys(r.data).map(x => r.data[x]);
        this.dataChanged('activeSymbols', this.activeSymbols);
    }

    ticksHandler(r) {
        this.ticks.appendData({
            symbol: r.echo.ticks,
            quote: r.data.quote,
            epoch: r.data.epoch,
        });
        this.dataChanged('ticks');
    }

    offeringsHandler(r) {
        this.offerings = r.data.offerings;
        this.dataChanged('offerings');
    }

    portfolioHandler(r) {
        const entry = this.portfolio.find(c => c.id === r.data.id);

        if (!entry) {
            this.portfolio.push(r.data);
        } else {
            Object.assign(entry, r.data);
        }

        this.dataChanged('portfolio');
    }

    contractHandler(r) {
        this.contracts = r.data;
        this.dataChanged('contracts');
    }

    trackActiveSymbols() {
        const list = this.activeSymbols.map(s => s.symbol);

        this.api.trackSymbols(list.slice(list.length - 20));
    }
}
