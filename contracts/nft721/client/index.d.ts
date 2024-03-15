import { ContractSpec } from '@stellar/stellar-sdk';
import { AssembledTransaction } from './assembled-tx.js';
import type { i128 } from './assembled-tx.js';
import type { ClassOptions } from './method-options.js';
export * from './assembled-tx.js';
export * from './method-options.js';
export declare const networks: {
    readonly futurenet: {
        readonly networkPassphrase: "Test SDF Future Network ; October 2022";
        readonly contractId: "CDWEQ6B7ARL7GF72SCTI7HASXCAP7SXWIPWP326VQAUZOXBX5M7SYWZV";
    };
};
/**
    
    */
export type DataKey = {
    tag: "Admin";
    values: void;
} | {
    tag: "Balance";
    values: readonly [string];
} | {
    tag: "Name";
    values: void;
} | {
    tag: "Nonce";
    values: readonly [string];
} | {
    tag: "Owner";
    values: readonly [i128];
} | {
    tag: "Operator";
    values: readonly [string];
} | {
    tag: "State";
    values: readonly [string];
} | {
    tag: "Supply";
    values: void;
} | {
    tag: "Symbol";
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
        setAdmin: (json: string) => AssembledTransaction<void>;
        approve: (json: string) => AssembledTransaction<void>;
        unapprove: (json: string) => AssembledTransaction<void>;
        mint: (json: string) => AssembledTransaction<void>;
        transfer: (json: string) => AssembledTransaction<void>;
        transferFrom: (json: string) => AssembledTransaction<void>;
        burn: (json: string) => AssembledTransaction<void>;
        burnFrom: (json: string) => AssembledTransaction<void>;
        admin: (json: string) => AssembledTransaction<string>;
        balance: (json: string) => AssembledTransaction<bigint>;
        name: (json: string) => AssembledTransaction<string>;
        operator: (json: string) => AssembledTransaction<string>;
        owner: (json: string) => AssembledTransaction<string>;
        supply: (json: string) => AssembledTransaction<bigint>;
        symbol: (json: string) => AssembledTransaction<string>;
        tokenUri: (json: string) => AssembledTransaction<string>;
    };
    /**
* Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    initialize: ({ admin, name, symbol }: {
        admin: string;
        name: string;
        symbol: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a set_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setAdmin: ({ new_admin }: {
        new_admin: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a approve transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    approve: ({ owner, operator }: {
        owner: string;
        operator: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a unapprove transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    unapprove: ({ owner }: {
        owner: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a mint transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    mint: ({ to }: {
        to: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a transfer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    transfer: ({ from, to, id }: {
        from: string;
        to: string;
        id: i128;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a transfer_from transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    transferFrom: ({ operator, from, to, id }: {
        operator: string;
        from: string;
        to: string;
        id: i128;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a burn transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    burn: ({ from, id }: {
        from: string;
        id: i128;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a burn_from transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    burnFrom: ({ operator, from, id }: {
        operator: string;
        from: string;
        id: i128;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    admin: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string>>;
    /**
* Construct and simulate a balance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    balance: ({ id }: {
        id: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<bigint>>;
    /**
* Construct and simulate a name transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    name: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string>>;
    /**
* Construct and simulate a operator transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    operator: ({ owner }: {
        owner: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string>>;
    /**
* Construct and simulate a owner transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    owner: ({ id }: {
        id: i128;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string>>;
    /**
* Construct and simulate a supply transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    supply: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<bigint>>;
    /**
* Construct and simulate a symbol transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    symbol: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string>>;
    /**
* Construct and simulate a token_uri transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    tokenUri: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string>>;
}
