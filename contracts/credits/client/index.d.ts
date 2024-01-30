import { ContractSpec } from '@stellar/stellar-sdk';
import { AssembledTransaction } from './assembled-tx.js';
import type { u128, i128 } from './assembled-tx.js';
import type { ClassOptions } from './method-options.js';
export * from './assembled-tx.js';
export * from './method-options.js';
export declare const networks: {
    readonly futurenet: {
        readonly networkPassphrase: "Test SDF Future Network ; October 2022";
        readonly rpcUrl: "https://rpc-futurenet.stellar.org:443";
    };
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly rpcUrl: "https://soroban-testnet.stellar.org";
    };
};
/**
    
    */
export type DataKey = {
    tag: "Admin";
    values: void;
} | {
    tag: "Balance";
    values: void;
} | {
    tag: "Bucket";
    values: void;
} | {
    tag: "Fees";
    values: void;
} | {
    tag: "Initiative";
    values: void;
} | {
    tag: "Minimum";
    values: void;
} | {
    tag: "Provider";
    values: void;
} | {
    tag: "ProviderFees";
    values: void;
} | {
    tag: "Vendor";
    values: void;
} | {
    tag: "VendorFees";
    values: void;
} | {
    tag: "Treasury";
    values: void;
} | {
    tag: "XLM";
    values: void;
};
/**
    
    */
export declare const Errors: {};
export declare class Contract {
    readonly options: ClassOptions;
    spec: ContractSpec;
    constructor(options: ClassOptions);
    private readonly parsers;
    private txFromJSON;
    readonly fromJSON: {
        initialize: (json: string) => AssembledTransaction<void>;
        donate: (json: string) => AssembledTransaction<void>;
        getAdmin: (json: string) => AssembledTransaction<string>;
        getBalance: (json: string) => AssembledTransaction<bigint>;
        getContractBalance: (json: string) => AssembledTransaction<bigint>;
        getBucket: (json: string) => AssembledTransaction<bigint>;
        getFees: (json: string) => AssembledTransaction<bigint>;
        getInitiative: (json: string) => AssembledTransaction<bigint>;
        getMinimum: (json: string) => AssembledTransaction<bigint>;
        getProvider: (json: string) => AssembledTransaction<string>;
        getProviderFees: (json: string) => AssembledTransaction<bigint>;
        getTreasury: (json: string) => AssembledTransaction<string>;
        getVendor: (json: string) => AssembledTransaction<string>;
        getVendorFees: (json: string) => AssembledTransaction<bigint>;
        getXlm: (json: string) => AssembledTransaction<string>;
        setAdmin: (json: string) => AssembledTransaction<void>;
        setBucket: (json: string) => AssembledTransaction<void>;
        setFees: (json: string) => AssembledTransaction<void>;
        setMinimum: (json: string) => AssembledTransaction<void>;
        setProvider: (json: string) => AssembledTransaction<void>;
        setProviderFees: (json: string) => AssembledTransaction<void>;
        setTreasury: (json: string) => AssembledTransaction<void>;
        setVendor: (json: string) => AssembledTransaction<void>;
        setVendorFees: (json: string) => AssembledTransaction<void>;
        setXlm: (json: string) => AssembledTransaction<void>;
    };
    /**
* Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    initialize: ({ admin, initiative, provider, vendor, bucket, xlm }: {
        admin: string;
        initiative: u128;
        provider: string;
        vendor: string;
        bucket: i128;
        xlm: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a donate transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    donate: ({ from, amount }: {
        from: string;
        amount: i128;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a getAdmin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getAdmin: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string>>;
    /**
* Construct and simulate a getBalance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getBalance: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<bigint>>;
    /**
* Construct and simulate a getContractBalance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getContractBalance: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<bigint>>;
    /**
* Construct and simulate a getBucket transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getBucket: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<bigint>>;
    /**
* Construct and simulate a getFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getFees: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<bigint>>;
    /**
* Construct and simulate a getInitiative transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getInitiative: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<bigint>>;
    /**
* Construct and simulate a getMinimum transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getMinimum: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<bigint>>;
    /**
* Construct and simulate a getProvider transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getProvider: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string>>;
    /**
* Construct and simulate a getProviderFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getProviderFees: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<bigint>>;
    /**
* Construct and simulate a getTreasury transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getTreasury: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string>>;
    /**
* Construct and simulate a getVendor transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getVendor: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string>>;
    /**
* Construct and simulate a getVendorFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getVendorFees: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<bigint>>;
    /**
* Construct and simulate a getXLM transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getXlm: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string>>;
    /**
* Construct and simulate a setAdmin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setAdmin: ({ newval }: {
        newval: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a setBucket transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setBucket: ({ newval }: {
        newval: i128;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a setFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setFees: ({ newval }: {
        newval: i128;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a setMinimum transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setMinimum: ({ newval }: {
        newval: i128;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a setProvider transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setProvider: ({ newval }: {
        newval: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a setProviderFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setProviderFees: ({ newval }: {
        newval: i128;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a setTreasury transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setTreasury: ({ newval }: {
        newval: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a setVendor transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setVendor: ({ newval }: {
        newval: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a setVendorFees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setVendorFees: ({ newval }: {
        newval: i128;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a setXLM transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setXlm: ({ newval }: {
        newval: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
}
