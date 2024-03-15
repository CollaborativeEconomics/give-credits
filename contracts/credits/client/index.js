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
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAABgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAppbml0aWF0aXZlAAAAAAAKAAAAAAAAAAhwcm92aWRlcgAAABMAAAAAAAAABnZlbmRvcgAAAAAAEwAAAAAAAAAGYnVja2V0AAAAAAALAAAAAAAAAAN4bG0AAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAAGZG9uYXRlAAAAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
            "AAAAAAAAAAAAAAAIZ2V0QWRtaW4AAAAAAAAAAQAAABM=",
            "AAAAAAAAAAAAAAAKZ2V0QmFsYW5jZQAAAAAAAAAAAAEAAAAL",
            "AAAAAAAAAAAAAAASZ2V0Q29udHJhY3RCYWxhbmNlAAAAAAAAAAAAAQAAAAs=",
            "AAAAAAAAAAAAAAAJZ2V0QnVja2V0AAAAAAAAAAAAAAEAAAAL",
            "AAAAAAAAAAAAAAAHZ2V0RmVlcwAAAAAAAAAAAQAAAAs=",
            "AAAAAAAAAAAAAAANZ2V0SW5pdGlhdGl2ZQAAAAAAAAAAAAABAAAACg==",
            "AAAAAAAAAAAAAAAKZ2V0TWluaW11bQAAAAAAAAAAAAEAAAAL",
            "AAAAAAAAAAAAAAALZ2V0UHJvdmlkZXIAAAAAAAAAAAEAAAAT",
            "AAAAAAAAAAAAAAAPZ2V0UHJvdmlkZXJGZWVzAAAAAAAAAAABAAAACw==",
            "AAAAAAAAAAAAAAALZ2V0VHJlYXN1cnkAAAAAAAAAAAEAAAAT",
            "AAAAAAAAAAAAAAAJZ2V0VmVuZG9yAAAAAAAAAAAAAAEAAAAT",
            "AAAAAAAAAAAAAAANZ2V0VmVuZG9yRmVlcwAAAAAAAAAAAAABAAAACw==",
            "AAAAAAAAAAAAAAAGZ2V0WExNAAAAAAAAAAAAAQAAABM=",
            "AAAAAAAAAAAAAAAIc2V0QWRtaW4AAAABAAAAAAAAAAZuZXd2YWwAAAAAABMAAAAA",
            "AAAAAAAAAAAAAAAJc2V0QnVja2V0AAAAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAALAAAAAA==",
            "AAAAAAAAAAAAAAAHc2V0RmVlcwAAAAABAAAAAAAAAAZuZXd2YWwAAAAAAAsAAAAA",
            "AAAAAAAAAAAAAAAKc2V0TWluaW11bQAAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAALAAAAAA==",
            "AAAAAAAAAAAAAAALc2V0UHJvdmlkZXIAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAPc2V0UHJvdmlkZXJGZWVzAAAAAAEAAAAAAAAABm5ld3ZhbAAAAAAACwAAAAA=",
            "AAAAAAAAAAAAAAALc2V0VHJlYXN1cnkAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAJc2V0VmVuZG9yAAAAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAANc2V0VmVuZG9yRmVlcwAAAAAAAAEAAAAAAAAABm5ld3ZhbAAAAAAACwAAAAA=",
            "AAAAAAAAAAAAAAAGc2V0WExNAAAAAAABAAAAAAAAAAZuZXd2YWwAAAAAABMAAAAA",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAADAAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAHQmFsYW5jZQAAAAAAAAAAAAAAAAZCdWNrZXQAAAAAAAAAAAAAAAAABEZlZXMAAAAAAAAAAAAAAApJbml0aWF0aXZlAAAAAAAAAAAAAAAAAAdNaW5pbXVtAAAAAAAAAAAAAAAACFByb3ZpZGVyAAAAAAAAAAAAAAAMUHJvdmlkZXJGZWVzAAAAAAAAAAAAAAAGVmVuZG9yAAAAAAAAAAAAAAAAAApWZW5kb3JGZWVzAAAAAAAAAAAAAAAAAAhUcmVhc3VyeQAAAAAAAAAAAAAAA1hMTQA="
        ]);
    }
    parsers = {
        initialize: () => { },
        donate: () => { },
        getAdmin: (result) => this.spec.funcResToNative("getAdmin", result),
        getBalance: (result) => this.spec.funcResToNative("getBalance", result),
        getContractBalance: (result) => this.spec.funcResToNative("getContractBalance", result),
        getBucket: (result) => this.spec.funcResToNative("getBucket", result),
        getFees: (result) => this.spec.funcResToNative("getFees", result),
        getInitiative: (result) => this.spec.funcResToNative("getInitiative", result),
        getMinimum: (result) => this.spec.funcResToNative("getMinimum", result),
        getProvider: (result) => this.spec.funcResToNative("getProvider", result),
        getProviderFees: (result) => this.spec.funcResToNative("getProviderFees", result),
        getTreasury: (result) => this.spec.funcResToNative("getTreasury", result),
        getVendor: (result) => this.spec.funcResToNative("getVendor", result),
        getVendorFees: (result) => this.spec.funcResToNative("getVendorFees", result),
        getXlm: (result) => this.spec.funcResToNative("getXLM", result),
        setAdmin: () => { },
        setBucket: () => { },
        setFees: () => { },
        setMinimum: () => { },
        setProvider: () => { },
        setProviderFees: () => { },
        setTreasury: () => { },
        setVendor: () => { },
        setVendorFees: () => { },
        setXlm: () => { }
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
        donate: (this.txFromJSON),
        getAdmin: (this.txFromJSON),
        getBalance: (this.txFromJSON),
        getContractBalance: (this.txFromJSON),
        getBucket: (this.txFromJSON),
        getFees: (this.txFromJSON),
        getInitiative: (this.txFromJSON),
        getMinimum: (this.txFromJSON),
        getProvider: (this.txFromJSON),
        getProviderFees: (this.txFromJSON),
        getTreasury: (this.txFromJSON),
        getVendor: (this.txFromJSON),
        getVendorFees: (this.txFromJSON),
        getXlm: (this.txFromJSON),
        setAdmin: (this.txFromJSON),
        setBucket: (this.txFromJSON),
        setFees: (this.txFromJSON),
        setMinimum: (this.txFromJSON),
        setProvider: (this.txFromJSON),
        setProviderFees: (this.txFromJSON),
        setTreasury: (this.txFromJSON),
        setVendor: (this.txFromJSON),
        setVendorFees: (this.txFromJSON),
        setXlm: (this.txFromJSON)
    };
    /**
* Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    initialize = async ({ admin, initiative, provider, vendor, bucket, xlm }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'initialize',
            args: this.spec.funcArgsToScVals("initialize", { admin: new Address(admin), initiative, provider: new Address(provider), vendor: new Address(vendor), bucket, xlm: new Address(xlm) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['initialize'],
        });
    };
    /**
* Construct and simulate a donate transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    donate = async ({ from, amount }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'donate',
            args: this.spec.funcArgsToScVals("donate", { from: new Address(from), amount }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['donate'],
        });
    };
    /**
* Construct and simulate a getAdmin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getAdmin = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getAdmin',
            args: this.spec.funcArgsToScVals("getAdmin", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getAdmin'],
        });
    };
    /**
* Construct and simulate a getBalance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getBalance = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getBalance',
            args: this.spec.funcArgsToScVals("getBalance", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getBalance'],
        });
    };
    /**
* Construct and simulate a getContractBalance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getContractBalance = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getContractBalance',
            args: this.spec.funcArgsToScVals("getContractBalance", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getContractBalance'],
        });
    };
    /**
* Construct and simulate a getBucket transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getBucket = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getBucket',
            args: this.spec.funcArgsToScVals("getBucket", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getBucket'],
        });
    };
    /**
* Construct and simulate a getFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getFees = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getFees',
            args: this.spec.funcArgsToScVals("getFees", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getFees'],
        });
    };
    /**
* Construct and simulate a getInitiative transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getInitiative = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getInitiative',
            args: this.spec.funcArgsToScVals("getInitiative", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getInitiative'],
        });
    };
    /**
* Construct and simulate a getMinimum transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getMinimum = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getMinimum',
            args: this.spec.funcArgsToScVals("getMinimum", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getMinimum'],
        });
    };
    /**
* Construct and simulate a getProvider transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getProvider = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getProvider',
            args: this.spec.funcArgsToScVals("getProvider", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getProvider'],
        });
    };
    /**
* Construct and simulate a getProviderFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getProviderFees = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getProviderFees',
            args: this.spec.funcArgsToScVals("getProviderFees", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getProviderFees'],
        });
    };
    /**
* Construct and simulate a getTreasury transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getTreasury = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getTreasury',
            args: this.spec.funcArgsToScVals("getTreasury", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getTreasury'],
        });
    };
    /**
* Construct and simulate a getVendor transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getVendor = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getVendor',
            args: this.spec.funcArgsToScVals("getVendor", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getVendor'],
        });
    };
    /**
* Construct and simulate a getVendorFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getVendorFees = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getVendorFees',
            args: this.spec.funcArgsToScVals("getVendorFees", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getVendorFees'],
        });
    };
    /**
* Construct and simulate a getXLM transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getXlm = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getXLM',
            args: this.spec.funcArgsToScVals("getXLM", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getXlm'],
        });
    };
    /**
* Construct and simulate a setAdmin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setAdmin = async ({ newval }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setAdmin',
            args: this.spec.funcArgsToScVals("setAdmin", { newval: new Address(newval) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setAdmin'],
        });
    };
    /**
* Construct and simulate a setBucket transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setBucket = async ({ newval }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setBucket',
            args: this.spec.funcArgsToScVals("setBucket", { newval }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setBucket'],
        });
    };
    /**
* Construct and simulate a setFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setFees = async ({ newval }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setFees',
            args: this.spec.funcArgsToScVals("setFees", { newval }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setFees'],
        });
    };
    /**
* Construct and simulate a setMinimum transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setMinimum = async ({ newval }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setMinimum',
            args: this.spec.funcArgsToScVals("setMinimum", { newval }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setMinimum'],
        });
    };
    /**
* Construct and simulate a setProvider transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setProvider = async ({ newval }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setProvider',
            args: this.spec.funcArgsToScVals("setProvider", { newval: new Address(newval) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setProvider'],
        });
    };
    /**
* Construct and simulate a setProviderFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setProviderFees = async ({ newval }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setProviderFees',
            args: this.spec.funcArgsToScVals("setProviderFees", { newval }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setProviderFees'],
        });
    };
    /**
* Construct and simulate a setTreasury transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setTreasury = async ({ newval }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setTreasury',
            args: this.spec.funcArgsToScVals("setTreasury", { newval: new Address(newval) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setTreasury'],
        });
    };
    /**
* Construct and simulate a setVendor transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setVendor = async ({ newval }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setVendor',
            args: this.spec.funcArgsToScVals("setVendor", { newval: new Address(newval) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setVendor'],
        });
    };
    /**
* Construct and simulate a setVendorFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setVendorFees = async ({ newval }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setVendorFees',
            args: this.spec.funcArgsToScVals("setVendorFees", { newval }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setVendorFees'],
        });
    };
    /**
* Construct and simulate a setXLM transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setXlm = async ({ newval }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setXLM',
            args: this.spec.funcArgsToScVals("setXLM", { newval: new Address(newval) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setXlm'],
        });
    };
}
