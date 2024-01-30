import { ContractSpec, Address } from '@stellar/stellar-sdk';
import { Buffer } from "buffer";
import { AssembledTransaction } from './assembled-tx.js';
export * from './assembled-tx.js';
export * from './method-options.js';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    futurenet: {
        networkPassphrase: "Test SDF Future Network ; October 2022",
        rpcUrl: 'https://rpc-futurenet.stellar.org:443'
    },
    testnet: {
        networkPassphrase: 'Test SDF Network ; September 2015',
        rpcUrl: 'https://soroban-testnet.stellar.org'
    }
};
/**
    
    */
export const Errors = {};
export class Contract {
    options;
    spec;
    constructor(options) {
        this.options = options;
        this.spec = new ContractSpec([
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAwAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAARuYW1lAAAAEAAAAAAAAAAGc3ltYm9sAAAAAAAQAAAAAA==",
            "AAAAAAAAAAAAAAAJc2V0X2FkbWluAAAAAAAAAQAAAAAAAAAJbmV3X2FkbWluAAAAAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAAHYXBwcm92ZQAAAAACAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAACG9wZXJhdG9yAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAAJdW5hcHByb3ZlAAAAAAAAAQAAAAAAAAAFb3duZXIAAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAEbWludAAAAAEAAAAAAAAAAnRvAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAIdHJhbnNmZXIAAAADAAAAAAAAAARmcm9tAAAAEwAAAAAAAAACdG8AAAAAABMAAAAAAAAAAmlkAAAAAAALAAAAAA==",
            "AAAAAAAAAAAAAAANdHJhbnNmZXJfZnJvbQAAAAAAAAQAAAAAAAAACG9wZXJhdG9yAAAAEwAAAAAAAAAEZnJvbQAAABMAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAJpZAAAAAAACwAAAAA=",
            "AAAAAAAAAAAAAAAEYnVybgAAAAIAAAAAAAAABGZyb20AAAATAAAAAAAAAAJpZAAAAAAACwAAAAA=",
            "AAAAAAAAAAAAAAAJYnVybl9mcm9tAAAAAAAAAwAAAAAAAAAIb3BlcmF0b3IAAAATAAAAAAAAAARmcm9tAAAAEwAAAAAAAAACaWQAAAAAAAsAAAAA",
            "AAAAAAAAAAAAAAAFYWRtaW4AAAAAAAAAAAAAAQAAABM=",
            "AAAAAAAAAAAAAAAHYmFsYW5jZQAAAAABAAAAAAAAAAJpZAAAAAAAEwAAAAEAAAAL",
            "AAAAAAAAAAAAAAAEbmFtZQAAAAAAAAABAAAAEA==",
            "AAAAAAAAAAAAAAAIb3BlcmF0b3IAAAABAAAAAAAAAAVvd25lcgAAAAAAABMAAAABAAAAEw==",
            "AAAAAAAAAAAAAAAFb3duZXIAAAAAAAABAAAAAAAAAAJpZAAAAAAACwAAAAEAAAAT",
            "AAAAAAAAAAAAAAAGc3VwcGx5AAAAAAAAAAAAAQAAAAs=",
            "AAAAAAAAAAAAAAAGc3ltYm9sAAAAAAAAAAAAAQAAABA=",
            "AAAAAAAAAAAAAAAJdG9rZW5fdXJpAAAAAAAAAAAAAAEAAAAQ",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAACQAAAAAAAAAAAAAABUFkbWluAAAAAAAAAQAAAAAAAAAHQmFsYW5jZQAAAAABAAAAEwAAAAAAAAAAAAAABE5hbWUAAAABAAAAAAAAAAVOb25jZQAAAAAAAAEAAAATAAAAAQAAAAAAAAAFT3duZXIAAAAAAAABAAAACwAAAAEAAAAAAAAACE9wZXJhdG9yAAAAAQAAABMAAAABAAAAAAAAAAVTdGF0ZQAAAAAAAAEAAAATAAAAAAAAAAAAAAAGU3VwcGx5AAAAAAAAAAAAAAAAAAZTeW1ib2wAAA=="
        ]);
    }
    parsers = {
        initialize: () => { },
        setAdmin: () => { },
        approve: () => { },
        unapprove: () => { },
        mint: () => { },
        transfer: () => { },
        transferFrom: () => { },
        burn: () => { },
        burnFrom: () => { },
        admin: (result) => this.spec.funcResToNative("admin", result),
        balance: (result) => this.spec.funcResToNative("balance", result),
        name: (result) => this.spec.funcResToNative("name", result),
        operator: (result) => this.spec.funcResToNative("operator", result),
        owner: (result) => this.spec.funcResToNative("owner", result),
        supply: (result) => this.spec.funcResToNative("supply", result),
        symbol: (result) => this.spec.funcResToNative("symbol", result),
        tokenUri: (result) => this.spec.funcResToNative("token_uri", result)
    };
    txFromJSON = (json) => {
        const { method, ...tx } = JSON.parse(json);
        return AssembledTransaction.fromJSON({
            ...this.options,
            method,
            parseResultXdr: this.parsers[method],
        }, tx);
    };
    fromJSON = {
        initialize: (this.txFromJSON),
        setAdmin: (this.txFromJSON),
        approve: (this.txFromJSON),
        unapprove: (this.txFromJSON),
        mint: (this.txFromJSON),
        transfer: (this.txFromJSON),
        transferFrom: (this.txFromJSON),
        burn: (this.txFromJSON),
        burnFrom: (this.txFromJSON),
        admin: (this.txFromJSON),
        balance: (this.txFromJSON),
        name: (this.txFromJSON),
        operator: (this.txFromJSON),
        owner: (this.txFromJSON),
        supply: (this.txFromJSON),
        symbol: (this.txFromJSON),
        tokenUri: (this.txFromJSON)
    };
    /**
* Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    initialize = async ({ admin, name, symbol }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'initialize',
            args: this.spec.funcArgsToScVals("initialize", { admin: new Address(admin), name, symbol }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['initialize'],
        });
    };
    /**
* Construct and simulate a set_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setAdmin = async ({ new_admin }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'set_admin',
            args: this.spec.funcArgsToScVals("set_admin", { new_admin: new Address(new_admin) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setAdmin'],
        });
    };
    /**
* Construct and simulate a approve transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    approve = async ({ owner, operator }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'approve',
            args: this.spec.funcArgsToScVals("approve", { owner: new Address(owner), operator: new Address(operator) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['approve'],
        });
    };
    /**
* Construct and simulate a unapprove transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    unapprove = async ({ owner }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'unapprove',
            args: this.spec.funcArgsToScVals("unapprove", { owner: new Address(owner) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['unapprove'],
        });
    };
    /**
* Construct and simulate a mint transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    mint = async ({ to }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'mint',
            args: this.spec.funcArgsToScVals("mint", { to: new Address(to) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['mint'],
        });
    };
    /**
* Construct and simulate a transfer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    transfer = async ({ from, to, id }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'transfer',
            args: this.spec.funcArgsToScVals("transfer", { from: new Address(from), to: new Address(to), id }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['transfer'],
        });
    };
    /**
* Construct and simulate a transfer_from transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    transferFrom = async ({ operator, from, to, id }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'transfer_from',
            args: this.spec.funcArgsToScVals("transfer_from", { operator: new Address(operator), from: new Address(from), to: new Address(to), id }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['transferFrom'],
        });
    };
    /**
* Construct and simulate a burn transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    burn = async ({ from, id }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'burn',
            args: this.spec.funcArgsToScVals("burn", { from: new Address(from), id }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['burn'],
        });
    };
    /**
* Construct and simulate a burn_from transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    burnFrom = async ({ operator, from, id }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'burn_from',
            args: this.spec.funcArgsToScVals("burn_from", { operator: new Address(operator), from: new Address(from), id }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['burnFrom'],
        });
    };
    /**
* Construct and simulate a admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    admin = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'admin',
            args: this.spec.funcArgsToScVals("admin", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['admin'],
        });
    };
    /**
* Construct and simulate a balance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    balance = async ({ id }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'balance',
            args: this.spec.funcArgsToScVals("balance", { id: new Address(id) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['balance'],
        });
    };
    /**
* Construct and simulate a name transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    name = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'name',
            args: this.spec.funcArgsToScVals("name", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['name'],
        });
    };
    /**
* Construct and simulate a operator transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    operator = async ({ owner }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'operator',
            args: this.spec.funcArgsToScVals("operator", { owner: new Address(owner) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['operator'],
        });
    };
    /**
* Construct and simulate a owner transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    owner = async ({ id }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'owner',
            args: this.spec.funcArgsToScVals("owner", { id }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['owner'],
        });
    };
    /**
* Construct and simulate a supply transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    supply = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'supply',
            args: this.spec.funcArgsToScVals("supply", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['supply'],
        });
    };
    /**
* Construct and simulate a symbol transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    symbol = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'symbol',
            args: this.spec.funcArgsToScVals("symbol", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['symbol'],
        });
    };
    /**
* Construct and simulate a token_uri transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    tokenUri = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'token_uri',
            args: this.spec.funcArgsToScVals("token_uri", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['tokenUri'],
        });
    };
}
