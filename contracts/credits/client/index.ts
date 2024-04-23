import { ContractSpec, Address } from '@stellar/stellar-sdk';
//import { Buffer } from "buffer";
import { AssembledTransaction, Ok, Err } from './assembled-tx';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
  Error_,
  Result,
} from './assembled-tx';
import type { ClassOptions, XDR_BASE64 } from './method-options';

export * from './assembled-tx';
export * from './method-options';

if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}


export const networks = {
    futurenet: {
        networkPassphrase: "Test SDF Future Network ; October 2022",
        rpcUrl: 'https://rpc-futurenet.stellar.org'
    },
    testnet: {
        networkPassphrase: 'Test SDF Network ; September 2015',
        rpcUrl: 'https://soroban-testnet.stellar.org'
    }
} as const

/**
    
    */
export type DataKey = {tag: "Admin", values: void} | {tag: "Balance", values: void} | {tag: "Bucket", values: void} | {tag: "Initiative", values: void} | {tag: "Minimum", values: void} | {tag: "Provider", values: void} | {tag: "ProviderFees", values: void} | {tag: "Vendor", values: void} | {tag: "VendorFees", values: void} | {tag: "XLM", values: void};

/**
    
    */
export const Errors = {

}

export class Contract {
    spec: ContractSpec;
    constructor(public readonly options: ClassOptions) {
        this.spec = new ContractSpec([
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAABgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAppbml0aWF0aXZlAAAAAAAKAAAAAAAAAAhwcm92aWRlcgAAABMAAAAAAAAABnZlbmRvcgAAAAAAEwAAAAAAAAAGYnVja2V0AAAAAAALAAAAAAAAAAN4bG0AAAAAEwAAAAA=",
        "AAAAAAAAAAAAAAAGZG9uYXRlAAAAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
        "AAAAAAAAAAAAAAAIZ2V0QWRtaW4AAAAAAAAAAQAAABM=",
        "AAAAAAAAAAAAAAAKZ2V0QmFsYW5jZQAAAAAAAAAAAAEAAAAL",
        "AAAAAAAAAAAAAAASZ2V0Q29udHJhY3RCYWxhbmNlAAAAAAAAAAAAAQAAAAs=",
        "AAAAAAAAAAAAAAAJZ2V0QnVja2V0AAAAAAAAAAAAAAEAAAAL",
        "AAAAAAAAAAAAAAANZ2V0SW5pdGlhdGl2ZQAAAAAAAAAAAAABAAAACg==",
        "AAAAAAAAAAAAAAAKZ2V0TWluaW11bQAAAAAAAAAAAAEAAAAL",
        "AAAAAAAAAAAAAAALZ2V0UHJvdmlkZXIAAAAAAAAAAAEAAAAT",
        "AAAAAAAAAAAAAAAPZ2V0UHJvdmlkZXJGZWVzAAAAAAAAAAABAAAACw==",
        "AAAAAAAAAAAAAAAJZ2V0VmVuZG9yAAAAAAAAAAAAAAEAAAAT",
        "AAAAAAAAAAAAAAANZ2V0VmVuZG9yRmVlcwAAAAAAAAAAAAABAAAACw==",
        "AAAAAAAAAAAAAAAGZ2V0WExNAAAAAAAAAAAAAQAAABM=",
        "AAAAAAAAAAAAAAAIc2V0QWRtaW4AAAABAAAAAAAAAAZuZXd2YWwAAAAAABMAAAAA",
        "AAAAAAAAAAAAAAAJc2V0QnVja2V0AAAAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAALAAAAAA==",
        "AAAAAAAAAAAAAAAKc2V0TWluaW11bQAAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAALAAAAAA==",
        "AAAAAAAAAAAAAAALc2V0UHJvdmlkZXIAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAATAAAAAA==",
        "AAAAAAAAAAAAAAAPc2V0UHJvdmlkZXJGZWVzAAAAAAEAAAAAAAAABm5ld3ZhbAAAAAAACwAAAAA=",
        "AAAAAAAAAAAAAAAJc2V0VmVuZG9yAAAAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAATAAAAAA==",
        "AAAAAAAAAAAAAAANc2V0VmVuZG9yRmVlcwAAAAAAAAEAAAAAAAAABm5ld3ZhbAAAAAAACwAAAAA=",
        "AAAAAAAAAAAAAAAGc2V0WExNAAAAAAABAAAAAAAAAAZuZXd2YWwAAAAAABMAAAAA",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAACgAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAHQmFsYW5jZQAAAAAAAAAAAAAAAAZCdWNrZXQAAAAAAAAAAAAAAAAACkluaXRpYXRpdmUAAAAAAAAAAAAAAAAAB01pbmltdW0AAAAAAAAAAAAAAAAIUHJvdmlkZXIAAAAAAAAAAAAAAAxQcm92aWRlckZlZXMAAAAAAAAAAAAAAAZWZW5kb3IAAAAAAAAAAAAAAAAAClZlbmRvckZlZXMAAAAAAAAAAAAAAAAAA1hMTQA="
        ]);
    }
    private readonly parsers = {
        initialize: () => {},
        donate: () => {},
        getAdmin: (result: XDR_BASE64): string => this.spec.funcResToNative("getAdmin", result),
        getBalance: (result: XDR_BASE64): i128 => this.spec.funcResToNative("getBalance", result),
        getContractBalance: (result: XDR_BASE64): i128 => this.spec.funcResToNative("getContractBalance", result),
        getBucket: (result: XDR_BASE64): i128 => this.spec.funcResToNative("getBucket", result),
        getInitiative: (result: XDR_BASE64): u128 => this.spec.funcResToNative("getInitiative", result),
        getMinimum: (result: XDR_BASE64): i128 => this.spec.funcResToNative("getMinimum", result),
        getProvider: (result: XDR_BASE64): string => this.spec.funcResToNative("getProvider", result),
        getProviderFees: (result: XDR_BASE64): i128 => this.spec.funcResToNative("getProviderFees", result),
        getVendor: (result: XDR_BASE64): string => this.spec.funcResToNative("getVendor", result),
        getVendorFees: (result: XDR_BASE64): i128 => this.spec.funcResToNative("getVendorFees", result),
        getXlm: (result: XDR_BASE64): string => this.spec.funcResToNative("getXLM", result),
        setAdmin: () => {},
        setBucket: () => {},
        setMinimum: () => {},
        setProvider: () => {},
        setProviderFees: () => {},
        setVendor: () => {},
        setVendorFees: () => {},
        setXlm: () => {}
    };
    private txFromJSON = <T>(json: string): AssembledTransaction<T> => {
        const { method, ...tx } = JSON.parse(json)
        return AssembledTransaction.fromJSON(
            {
                ...this.options,
                method,
                parseResultXdr: this.parsers[method],
            },
            tx,
        );
    }
    public readonly fromJSON = {
        initialize: this.txFromJSON<ReturnType<typeof this.parsers['initialize']>>,
        donate: this.txFromJSON<ReturnType<typeof this.parsers['donate']>>,
        getAdmin: this.txFromJSON<ReturnType<typeof this.parsers['getAdmin']>>,
        getBalance: this.txFromJSON<ReturnType<typeof this.parsers['getBalance']>>,
        getContractBalance: this.txFromJSON<ReturnType<typeof this.parsers['getContractBalance']>>,
        getBucket: this.txFromJSON<ReturnType<typeof this.parsers['getBucket']>>,
        getInitiative: this.txFromJSON<ReturnType<typeof this.parsers['getInitiative']>>,
        getMinimum: this.txFromJSON<ReturnType<typeof this.parsers['getMinimum']>>,
        getProvider: this.txFromJSON<ReturnType<typeof this.parsers['getProvider']>>,
        getProviderFees: this.txFromJSON<ReturnType<typeof this.parsers['getProviderFees']>>,
        getVendor: this.txFromJSON<ReturnType<typeof this.parsers['getVendor']>>,
        getVendorFees: this.txFromJSON<ReturnType<typeof this.parsers['getVendorFees']>>,
        getXlm: this.txFromJSON<ReturnType<typeof this.parsers['getXlm']>>,
        setAdmin: this.txFromJSON<ReturnType<typeof this.parsers['setAdmin']>>,
        setBucket: this.txFromJSON<ReturnType<typeof this.parsers['setBucket']>>,
        setMinimum: this.txFromJSON<ReturnType<typeof this.parsers['setMinimum']>>,
        setProvider: this.txFromJSON<ReturnType<typeof this.parsers['setProvider']>>,
        setProviderFees: this.txFromJSON<ReturnType<typeof this.parsers['setProviderFees']>>,
        setVendor: this.txFromJSON<ReturnType<typeof this.parsers['setVendor']>>,
        setVendorFees: this.txFromJSON<ReturnType<typeof this.parsers['setVendorFees']>>,
        setXlm: this.txFromJSON<ReturnType<typeof this.parsers['setXlm']>>
    }
        /**
    * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    initialize = async ({admin, initiative, provider, vendor, bucket, xlm}: {admin: string, initiative: u128, provider: string, vendor: string, bucket: i128, xlm: string}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'initialize',
            args: this.spec.funcArgsToScVals("initialize", {admin: new Address(admin), initiative, provider: new Address(provider), vendor: new Address(vendor), bucket, xlm: new Address(xlm)}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['initialize'],
        });
    }


        /**
    * Construct and simulate a donate transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    donate = async ({from, amount}: {from: string, amount: i128}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'donate',
            args: this.spec.funcArgsToScVals("donate", {from: new Address(from), amount}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['donate'],
        });
    }


        /**
    * Construct and simulate a getAdmin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getAdmin = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getAdmin',
            args: this.spec.funcArgsToScVals("getAdmin", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getAdmin'],
        });
    }


        /**
    * Construct and simulate a getBalance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getBalance = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getBalance',
            args: this.spec.funcArgsToScVals("getBalance", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getBalance'],
        });
    }


        /**
    * Construct and simulate a getContractBalance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getContractBalance = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getContractBalance',
            args: this.spec.funcArgsToScVals("getContractBalance", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getContractBalance'],
        });
    }


        /**
    * Construct and simulate a getBucket transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getBucket = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getBucket',
            args: this.spec.funcArgsToScVals("getBucket", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getBucket'],
        });
    }


        /**
    * Construct and simulate a getInitiative transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getInitiative = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getInitiative',
            args: this.spec.funcArgsToScVals("getInitiative", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getInitiative'],
        });
    }


        /**
    * Construct and simulate a getMinimum transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getMinimum = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getMinimum',
            args: this.spec.funcArgsToScVals("getMinimum", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getMinimum'],
        });
    }


        /**
    * Construct and simulate a getProvider transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getProvider = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getProvider',
            args: this.spec.funcArgsToScVals("getProvider", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getProvider'],
        });
    }


        /**
    * Construct and simulate a getProviderFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getProviderFees = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getProviderFees',
            args: this.spec.funcArgsToScVals("getProviderFees", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getProviderFees'],
        });
    }


        /**
    * Construct and simulate a getVendor transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getVendor = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getVendor',
            args: this.spec.funcArgsToScVals("getVendor", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getVendor'],
        });
    }


        /**
    * Construct and simulate a getVendorFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getVendorFees = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getVendorFees',
            args: this.spec.funcArgsToScVals("getVendorFees", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getVendorFees'],
        });
    }


        /**
    * Construct and simulate a getXLM transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getXlm = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'getXLM',
            args: this.spec.funcArgsToScVals("getXLM", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getXlm'],
        });
    }


        /**
    * Construct and simulate a setAdmin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    setAdmin = async ({newval}: {newval: string}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setAdmin',
            args: this.spec.funcArgsToScVals("setAdmin", {newval: new Address(newval)}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setAdmin'],
        });
    }


        /**
    * Construct and simulate a setBucket transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    setBucket = async ({newval}: {newval: i128}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setBucket',
            args: this.spec.funcArgsToScVals("setBucket", {newval}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setBucket'],
        });
    }


        /**
    * Construct and simulate a setMinimum transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    setMinimum = async ({newval}: {newval: i128}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setMinimum',
            args: this.spec.funcArgsToScVals("setMinimum", {newval}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setMinimum'],
        });
    }


        /**
    * Construct and simulate a setProvider transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    setProvider = async ({newval}: {newval: string}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setProvider',
            args: this.spec.funcArgsToScVals("setProvider", {newval: new Address(newval)}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setProvider'],
        });
    }


        /**
    * Construct and simulate a setProviderFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    setProviderFees = async ({newval}: {newval: i128}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setProviderFees',
            args: this.spec.funcArgsToScVals("setProviderFees", {newval}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setProviderFees'],
        });
    }


        /**
    * Construct and simulate a setVendor transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    setVendor = async ({newval}: {newval: string}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setVendor',
            args: this.spec.funcArgsToScVals("setVendor", {newval: new Address(newval)}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setVendor'],
        });
    }


        /**
    * Construct and simulate a setVendorFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    setVendorFees = async ({newval}: {newval: i128}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setVendorFees',
            args: this.spec.funcArgsToScVals("setVendorFees", {newval}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setVendorFees'],
        });
    }


        /**
    * Construct and simulate a setXLM transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    setXlm = async ({newval}: {newval: string}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'setXLM',
            args: this.spec.funcArgsToScVals("setXLM", {newval: new Address(newval)}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setXlm'],
        });
    }

}