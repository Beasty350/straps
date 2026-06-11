
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model TrainingMenu
 * 
 */
export type TrainingMenu = $Result.DefaultSelection<Prisma.$TrainingMenuPayload>
/**
 * Model UserRecap
 * 
 */
export type UserRecap = $Result.DefaultSelection<Prisma.$UserRecapPayload>
/**
 * Model ActivityLog
 * 
 */
export type ActivityLog = $Result.DefaultSelection<Prisma.$ActivityLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainingMenu`: Exposes CRUD operations for the **TrainingMenu** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainingMenus
    * const trainingMenus = await prisma.trainingMenu.findMany()
    * ```
    */
  get trainingMenu(): Prisma.TrainingMenuDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userRecap`: Exposes CRUD operations for the **UserRecap** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRecaps
    * const userRecaps = await prisma.userRecap.findMany()
    * ```
    */
  get userRecap(): Prisma.UserRecapDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    TrainingMenu: 'TrainingMenu',
    UserRecap: 'UserRecap',
    ActivityLog: 'ActivityLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "trainingMenu" | "userRecap" | "activityLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      TrainingMenu: {
        payload: Prisma.$TrainingMenuPayload<ExtArgs>
        fields: Prisma.TrainingMenuFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainingMenuFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingMenuPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainingMenuFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingMenuPayload>
          }
          findFirst: {
            args: Prisma.TrainingMenuFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingMenuPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainingMenuFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingMenuPayload>
          }
          findMany: {
            args: Prisma.TrainingMenuFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingMenuPayload>[]
          }
          create: {
            args: Prisma.TrainingMenuCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingMenuPayload>
          }
          createMany: {
            args: Prisma.TrainingMenuCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainingMenuCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingMenuPayload>[]
          }
          delete: {
            args: Prisma.TrainingMenuDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingMenuPayload>
          }
          update: {
            args: Prisma.TrainingMenuUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingMenuPayload>
          }
          deleteMany: {
            args: Prisma.TrainingMenuDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainingMenuUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainingMenuUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingMenuPayload>[]
          }
          upsert: {
            args: Prisma.TrainingMenuUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingMenuPayload>
          }
          aggregate: {
            args: Prisma.TrainingMenuAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainingMenu>
          }
          groupBy: {
            args: Prisma.TrainingMenuGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainingMenuGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainingMenuCountArgs<ExtArgs>
            result: $Utils.Optional<TrainingMenuCountAggregateOutputType> | number
          }
        }
      }
      UserRecap: {
        payload: Prisma.$UserRecapPayload<ExtArgs>
        fields: Prisma.UserRecapFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserRecapFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserRecapFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecapPayload>
          }
          findFirst: {
            args: Prisma.UserRecapFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserRecapFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecapPayload>
          }
          findMany: {
            args: Prisma.UserRecapFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecapPayload>[]
          }
          create: {
            args: Prisma.UserRecapCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecapPayload>
          }
          createMany: {
            args: Prisma.UserRecapCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserRecapCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecapPayload>[]
          }
          delete: {
            args: Prisma.UserRecapDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecapPayload>
          }
          update: {
            args: Prisma.UserRecapUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecapPayload>
          }
          deleteMany: {
            args: Prisma.UserRecapDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserRecapUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserRecapUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecapPayload>[]
          }
          upsert: {
            args: Prisma.UserRecapUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecapPayload>
          }
          aggregate: {
            args: Prisma.UserRecapAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserRecap>
          }
          groupBy: {
            args: Prisma.UserRecapGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserRecapGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserRecapCountArgs<ExtArgs>
            result: $Utils.Optional<UserRecapCountAggregateOutputType> | number
          }
        }
      }
      ActivityLog: {
        payload: Prisma.$ActivityLogPayload<ExtArgs>
        fields: Prisma.ActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findFirst: {
            args: Prisma.ActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findMany: {
            args: Prisma.ActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          create: {
            args: Prisma.ActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          createMany: {
            args: Prisma.ActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          delete: {
            args: Prisma.ActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          update: {
            args: Prisma.ActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          upsert: {
            args: Prisma.ActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          aggregate: {
            args: Prisma.ActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityLog>
          }
          groupBy: {
            args: Prisma.ActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    trainingMenu?: TrainingMenuOmit
    userRecap?: UserRecapOmit
    activityLog?: ActivityLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    clients: number
    trainingMenus: number
    clientMenus: number
    recaps: number
    activityLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clients?: boolean | UserCountOutputTypeCountClientsArgs
    trainingMenus?: boolean | UserCountOutputTypeCountTrainingMenusArgs
    clientMenus?: boolean | UserCountOutputTypeCountClientMenusArgs
    recaps?: boolean | UserCountOutputTypeCountRecapsArgs
    activityLogs?: boolean | UserCountOutputTypeCountActivityLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTrainingMenusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingMenuWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClientMenusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingMenuWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRecapsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRecapWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
  }


  /**
   * Count Type TrainingMenuCountOutputType
   */

  export type TrainingMenuCountOutputType = {
    recaps: number
  }

  export type TrainingMenuCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recaps?: boolean | TrainingMenuCountOutputTypeCountRecapsArgs
  }

  // Custom InputTypes
  /**
   * TrainingMenuCountOutputType without action
   */
  export type TrainingMenuCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenuCountOutputType
     */
    select?: TrainingMenuCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrainingMenuCountOutputType without action
   */
  export type TrainingMenuCountOutputTypeCountRecapsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRecapWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    birthDate: Date | null
    gender: string | null
    role: string | null
    coachId: string | null
    totpSecret: string | null
    totpEnabled: boolean | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    birthDate: Date | null
    gender: string | null
    role: string | null
    coachId: string | null
    totpSecret: string | null
    totpEnabled: boolean | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    birthDate: number
    gender: number
    role: number
    coachId: number
    totpSecret: number
    totpEnabled: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    birthDate?: true
    gender?: true
    role?: true
    coachId?: true
    totpSecret?: true
    totpEnabled?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    birthDate?: true
    gender?: true
    role?: true
    coachId?: true
    totpSecret?: true
    totpEnabled?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    birthDate?: true
    gender?: true
    role?: true
    coachId?: true
    totpSecret?: true
    totpEnabled?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string | null
    password: string | null
    name: string
    birthDate: Date | null
    gender: string | null
    role: string
    coachId: string | null
    totpSecret: string | null
    totpEnabled: boolean
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    birthDate?: boolean
    gender?: boolean
    role?: boolean
    coachId?: boolean
    totpSecret?: boolean
    totpEnabled?: boolean
    createdAt?: boolean
    coach?: boolean | User$coachArgs<ExtArgs>
    clients?: boolean | User$clientsArgs<ExtArgs>
    trainingMenus?: boolean | User$trainingMenusArgs<ExtArgs>
    clientMenus?: boolean | User$clientMenusArgs<ExtArgs>
    recaps?: boolean | User$recapsArgs<ExtArgs>
    activityLogs?: boolean | User$activityLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    birthDate?: boolean
    gender?: boolean
    role?: boolean
    coachId?: boolean
    totpSecret?: boolean
    totpEnabled?: boolean
    createdAt?: boolean
    coach?: boolean | User$coachArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    birthDate?: boolean
    gender?: boolean
    role?: boolean
    coachId?: boolean
    totpSecret?: boolean
    totpEnabled?: boolean
    createdAt?: boolean
    coach?: boolean | User$coachArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    birthDate?: boolean
    gender?: boolean
    role?: boolean
    coachId?: boolean
    totpSecret?: boolean
    totpEnabled?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "birthDate" | "gender" | "role" | "coachId" | "totpSecret" | "totpEnabled" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coach?: boolean | User$coachArgs<ExtArgs>
    clients?: boolean | User$clientsArgs<ExtArgs>
    trainingMenus?: boolean | User$trainingMenusArgs<ExtArgs>
    clientMenus?: boolean | User$clientMenusArgs<ExtArgs>
    recaps?: boolean | User$recapsArgs<ExtArgs>
    activityLogs?: boolean | User$activityLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coach?: boolean | User$coachArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coach?: boolean | User$coachArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      coach: Prisma.$UserPayload<ExtArgs> | null
      clients: Prisma.$UserPayload<ExtArgs>[]
      trainingMenus: Prisma.$TrainingMenuPayload<ExtArgs>[]
      clientMenus: Prisma.$TrainingMenuPayload<ExtArgs>[]
      recaps: Prisma.$UserRecapPayload<ExtArgs>[]
      activityLogs: Prisma.$ActivityLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string | null
      password: string | null
      name: string
      birthDate: Date | null
      gender: string | null
      role: string
      coachId: string | null
      totpSecret: string | null
      totpEnabled: boolean
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    coach<T extends User$coachArgs<ExtArgs> = {}>(args?: Subset<T, User$coachArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    clients<T extends User$clientsArgs<ExtArgs> = {}>(args?: Subset<T, User$clientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trainingMenus<T extends User$trainingMenusArgs<ExtArgs> = {}>(args?: Subset<T, User$trainingMenusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingMenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    clientMenus<T extends User$clientMenusArgs<ExtArgs> = {}>(args?: Subset<T, User$clientMenusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingMenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recaps<T extends User$recapsArgs<ExtArgs> = {}>(args?: Subset<T, User$recapsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRecapPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activityLogs<T extends User$activityLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$activityLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly birthDate: FieldRef<"User", 'DateTime'>
    readonly gender: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly coachId: FieldRef<"User", 'String'>
    readonly totpSecret: FieldRef<"User", 'String'>
    readonly totpEnabled: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.coach
   */
  export type User$coachArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * User.clients
   */
  export type User$clientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.trainingMenus
   */
  export type User$trainingMenusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenu
     */
    select?: TrainingMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingMenu
     */
    omit?: TrainingMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingMenuInclude<ExtArgs> | null
    where?: TrainingMenuWhereInput
    orderBy?: TrainingMenuOrderByWithRelationInput | TrainingMenuOrderByWithRelationInput[]
    cursor?: TrainingMenuWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainingMenuScalarFieldEnum | TrainingMenuScalarFieldEnum[]
  }

  /**
   * User.clientMenus
   */
  export type User$clientMenusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenu
     */
    select?: TrainingMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingMenu
     */
    omit?: TrainingMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingMenuInclude<ExtArgs> | null
    where?: TrainingMenuWhereInput
    orderBy?: TrainingMenuOrderByWithRelationInput | TrainingMenuOrderByWithRelationInput[]
    cursor?: TrainingMenuWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainingMenuScalarFieldEnum | TrainingMenuScalarFieldEnum[]
  }

  /**
   * User.recaps
   */
  export type User$recapsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecap
     */
    select?: UserRecapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecap
     */
    omit?: UserRecapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecapInclude<ExtArgs> | null
    where?: UserRecapWhereInput
    orderBy?: UserRecapOrderByWithRelationInput | UserRecapOrderByWithRelationInput[]
    cursor?: UserRecapWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRecapScalarFieldEnum | UserRecapScalarFieldEnum[]
  }

  /**
   * User.activityLogs
   */
  export type User$activityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    cursor?: ActivityLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model TrainingMenu
   */

  export type AggregateTrainingMenu = {
    _count: TrainingMenuCountAggregateOutputType | null
    _min: TrainingMenuMinAggregateOutputType | null
    _max: TrainingMenuMaxAggregateOutputType | null
  }

  export type TrainingMenuMinAggregateOutputType = {
    id: string | null
    name: string | null
    authorId: string | null
    clientId: string | null
    createdAt: Date | null
  }

  export type TrainingMenuMaxAggregateOutputType = {
    id: string | null
    name: string | null
    authorId: string | null
    clientId: string | null
    createdAt: Date | null
  }

  export type TrainingMenuCountAggregateOutputType = {
    id: number
    name: number
    authorId: number
    clientId: number
    exerciseList: number
    createdAt: number
    _all: number
  }


  export type TrainingMenuMinAggregateInputType = {
    id?: true
    name?: true
    authorId?: true
    clientId?: true
    createdAt?: true
  }

  export type TrainingMenuMaxAggregateInputType = {
    id?: true
    name?: true
    authorId?: true
    clientId?: true
    createdAt?: true
  }

  export type TrainingMenuCountAggregateInputType = {
    id?: true
    name?: true
    authorId?: true
    clientId?: true
    exerciseList?: true
    createdAt?: true
    _all?: true
  }

  export type TrainingMenuAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingMenu to aggregate.
     */
    where?: TrainingMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingMenus to fetch.
     */
    orderBy?: TrainingMenuOrderByWithRelationInput | TrainingMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainingMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingMenus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainingMenus
    **/
    _count?: true | TrainingMenuCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainingMenuMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainingMenuMaxAggregateInputType
  }

  export type GetTrainingMenuAggregateType<T extends TrainingMenuAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainingMenu]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainingMenu[P]>
      : GetScalarType<T[P], AggregateTrainingMenu[P]>
  }




  export type TrainingMenuGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingMenuWhereInput
    orderBy?: TrainingMenuOrderByWithAggregationInput | TrainingMenuOrderByWithAggregationInput[]
    by: TrainingMenuScalarFieldEnum[] | TrainingMenuScalarFieldEnum
    having?: TrainingMenuScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainingMenuCountAggregateInputType | true
    _min?: TrainingMenuMinAggregateInputType
    _max?: TrainingMenuMaxAggregateInputType
  }

  export type TrainingMenuGroupByOutputType = {
    id: string
    name: string
    authorId: string
    clientId: string | null
    exerciseList: JsonValue
    createdAt: Date
    _count: TrainingMenuCountAggregateOutputType | null
    _min: TrainingMenuMinAggregateOutputType | null
    _max: TrainingMenuMaxAggregateOutputType | null
  }

  type GetTrainingMenuGroupByPayload<T extends TrainingMenuGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainingMenuGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainingMenuGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainingMenuGroupByOutputType[P]>
            : GetScalarType<T[P], TrainingMenuGroupByOutputType[P]>
        }
      >
    >


  export type TrainingMenuSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    authorId?: boolean
    clientId?: boolean
    exerciseList?: boolean
    createdAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | TrainingMenu$clientArgs<ExtArgs>
    recaps?: boolean | TrainingMenu$recapsArgs<ExtArgs>
    _count?: boolean | TrainingMenuCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingMenu"]>

  export type TrainingMenuSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    authorId?: boolean
    clientId?: boolean
    exerciseList?: boolean
    createdAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | TrainingMenu$clientArgs<ExtArgs>
  }, ExtArgs["result"]["trainingMenu"]>

  export type TrainingMenuSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    authorId?: boolean
    clientId?: boolean
    exerciseList?: boolean
    createdAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | TrainingMenu$clientArgs<ExtArgs>
  }, ExtArgs["result"]["trainingMenu"]>

  export type TrainingMenuSelectScalar = {
    id?: boolean
    name?: boolean
    authorId?: boolean
    clientId?: boolean
    exerciseList?: boolean
    createdAt?: boolean
  }

  export type TrainingMenuOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "authorId" | "clientId" | "exerciseList" | "createdAt", ExtArgs["result"]["trainingMenu"]>
  export type TrainingMenuInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | TrainingMenu$clientArgs<ExtArgs>
    recaps?: boolean | TrainingMenu$recapsArgs<ExtArgs>
    _count?: boolean | TrainingMenuCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TrainingMenuIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | TrainingMenu$clientArgs<ExtArgs>
  }
  export type TrainingMenuIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | TrainingMenu$clientArgs<ExtArgs>
  }

  export type $TrainingMenuPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainingMenu"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      client: Prisma.$UserPayload<ExtArgs> | null
      recaps: Prisma.$UserRecapPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      authorId: string
      clientId: string | null
      exerciseList: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["trainingMenu"]>
    composites: {}
  }

  type TrainingMenuGetPayload<S extends boolean | null | undefined | TrainingMenuDefaultArgs> = $Result.GetResult<Prisma.$TrainingMenuPayload, S>

  type TrainingMenuCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainingMenuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainingMenuCountAggregateInputType | true
    }

  export interface TrainingMenuDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainingMenu'], meta: { name: 'TrainingMenu' } }
    /**
     * Find zero or one TrainingMenu that matches the filter.
     * @param {TrainingMenuFindUniqueArgs} args - Arguments to find a TrainingMenu
     * @example
     * // Get one TrainingMenu
     * const trainingMenu = await prisma.trainingMenu.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainingMenuFindUniqueArgs>(args: SelectSubset<T, TrainingMenuFindUniqueArgs<ExtArgs>>): Prisma__TrainingMenuClient<$Result.GetResult<Prisma.$TrainingMenuPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainingMenu that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainingMenuFindUniqueOrThrowArgs} args - Arguments to find a TrainingMenu
     * @example
     * // Get one TrainingMenu
     * const trainingMenu = await prisma.trainingMenu.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainingMenuFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainingMenuFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainingMenuClient<$Result.GetResult<Prisma.$TrainingMenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingMenu that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingMenuFindFirstArgs} args - Arguments to find a TrainingMenu
     * @example
     * // Get one TrainingMenu
     * const trainingMenu = await prisma.trainingMenu.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainingMenuFindFirstArgs>(args?: SelectSubset<T, TrainingMenuFindFirstArgs<ExtArgs>>): Prisma__TrainingMenuClient<$Result.GetResult<Prisma.$TrainingMenuPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingMenu that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingMenuFindFirstOrThrowArgs} args - Arguments to find a TrainingMenu
     * @example
     * // Get one TrainingMenu
     * const trainingMenu = await prisma.trainingMenu.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainingMenuFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainingMenuFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainingMenuClient<$Result.GetResult<Prisma.$TrainingMenuPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainingMenus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingMenuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainingMenus
     * const trainingMenus = await prisma.trainingMenu.findMany()
     * 
     * // Get first 10 TrainingMenus
     * const trainingMenus = await prisma.trainingMenu.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainingMenuWithIdOnly = await prisma.trainingMenu.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainingMenuFindManyArgs>(args?: SelectSubset<T, TrainingMenuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingMenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainingMenu.
     * @param {TrainingMenuCreateArgs} args - Arguments to create a TrainingMenu.
     * @example
     * // Create one TrainingMenu
     * const TrainingMenu = await prisma.trainingMenu.create({
     *   data: {
     *     // ... data to create a TrainingMenu
     *   }
     * })
     * 
     */
    create<T extends TrainingMenuCreateArgs>(args: SelectSubset<T, TrainingMenuCreateArgs<ExtArgs>>): Prisma__TrainingMenuClient<$Result.GetResult<Prisma.$TrainingMenuPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainingMenus.
     * @param {TrainingMenuCreateManyArgs} args - Arguments to create many TrainingMenus.
     * @example
     * // Create many TrainingMenus
     * const trainingMenu = await prisma.trainingMenu.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainingMenuCreateManyArgs>(args?: SelectSubset<T, TrainingMenuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainingMenus and returns the data saved in the database.
     * @param {TrainingMenuCreateManyAndReturnArgs} args - Arguments to create many TrainingMenus.
     * @example
     * // Create many TrainingMenus
     * const trainingMenu = await prisma.trainingMenu.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainingMenus and only return the `id`
     * const trainingMenuWithIdOnly = await prisma.trainingMenu.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainingMenuCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainingMenuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingMenuPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainingMenu.
     * @param {TrainingMenuDeleteArgs} args - Arguments to delete one TrainingMenu.
     * @example
     * // Delete one TrainingMenu
     * const TrainingMenu = await prisma.trainingMenu.delete({
     *   where: {
     *     // ... filter to delete one TrainingMenu
     *   }
     * })
     * 
     */
    delete<T extends TrainingMenuDeleteArgs>(args: SelectSubset<T, TrainingMenuDeleteArgs<ExtArgs>>): Prisma__TrainingMenuClient<$Result.GetResult<Prisma.$TrainingMenuPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainingMenu.
     * @param {TrainingMenuUpdateArgs} args - Arguments to update one TrainingMenu.
     * @example
     * // Update one TrainingMenu
     * const trainingMenu = await prisma.trainingMenu.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainingMenuUpdateArgs>(args: SelectSubset<T, TrainingMenuUpdateArgs<ExtArgs>>): Prisma__TrainingMenuClient<$Result.GetResult<Prisma.$TrainingMenuPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainingMenus.
     * @param {TrainingMenuDeleteManyArgs} args - Arguments to filter TrainingMenus to delete.
     * @example
     * // Delete a few TrainingMenus
     * const { count } = await prisma.trainingMenu.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainingMenuDeleteManyArgs>(args?: SelectSubset<T, TrainingMenuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingMenus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingMenuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainingMenus
     * const trainingMenu = await prisma.trainingMenu.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainingMenuUpdateManyArgs>(args: SelectSubset<T, TrainingMenuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingMenus and returns the data updated in the database.
     * @param {TrainingMenuUpdateManyAndReturnArgs} args - Arguments to update many TrainingMenus.
     * @example
     * // Update many TrainingMenus
     * const trainingMenu = await prisma.trainingMenu.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainingMenus and only return the `id`
     * const trainingMenuWithIdOnly = await prisma.trainingMenu.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainingMenuUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainingMenuUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingMenuPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainingMenu.
     * @param {TrainingMenuUpsertArgs} args - Arguments to update or create a TrainingMenu.
     * @example
     * // Update or create a TrainingMenu
     * const trainingMenu = await prisma.trainingMenu.upsert({
     *   create: {
     *     // ... data to create a TrainingMenu
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainingMenu we want to update
     *   }
     * })
     */
    upsert<T extends TrainingMenuUpsertArgs>(args: SelectSubset<T, TrainingMenuUpsertArgs<ExtArgs>>): Prisma__TrainingMenuClient<$Result.GetResult<Prisma.$TrainingMenuPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainingMenus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingMenuCountArgs} args - Arguments to filter TrainingMenus to count.
     * @example
     * // Count the number of TrainingMenus
     * const count = await prisma.trainingMenu.count({
     *   where: {
     *     // ... the filter for the TrainingMenus we want to count
     *   }
     * })
    **/
    count<T extends TrainingMenuCountArgs>(
      args?: Subset<T, TrainingMenuCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainingMenuCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainingMenu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingMenuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainingMenuAggregateArgs>(args: Subset<T, TrainingMenuAggregateArgs>): Prisma.PrismaPromise<GetTrainingMenuAggregateType<T>>

    /**
     * Group by TrainingMenu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingMenuGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainingMenuGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainingMenuGroupByArgs['orderBy'] }
        : { orderBy?: TrainingMenuGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainingMenuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainingMenuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainingMenu model
   */
  readonly fields: TrainingMenuFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainingMenu.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainingMenuClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    client<T extends TrainingMenu$clientArgs<ExtArgs> = {}>(args?: Subset<T, TrainingMenu$clientArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    recaps<T extends TrainingMenu$recapsArgs<ExtArgs> = {}>(args?: Subset<T, TrainingMenu$recapsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRecapPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainingMenu model
   */
  interface TrainingMenuFieldRefs {
    readonly id: FieldRef<"TrainingMenu", 'String'>
    readonly name: FieldRef<"TrainingMenu", 'String'>
    readonly authorId: FieldRef<"TrainingMenu", 'String'>
    readonly clientId: FieldRef<"TrainingMenu", 'String'>
    readonly exerciseList: FieldRef<"TrainingMenu", 'Json'>
    readonly createdAt: FieldRef<"TrainingMenu", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrainingMenu findUnique
   */
  export type TrainingMenuFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenu
     */
    select?: TrainingMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingMenu
     */
    omit?: TrainingMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingMenuInclude<ExtArgs> | null
    /**
     * Filter, which TrainingMenu to fetch.
     */
    where: TrainingMenuWhereUniqueInput
  }

  /**
   * TrainingMenu findUniqueOrThrow
   */
  export type TrainingMenuFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenu
     */
    select?: TrainingMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingMenu
     */
    omit?: TrainingMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingMenuInclude<ExtArgs> | null
    /**
     * Filter, which TrainingMenu to fetch.
     */
    where: TrainingMenuWhereUniqueInput
  }

  /**
   * TrainingMenu findFirst
   */
  export type TrainingMenuFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenu
     */
    select?: TrainingMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingMenu
     */
    omit?: TrainingMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingMenuInclude<ExtArgs> | null
    /**
     * Filter, which TrainingMenu to fetch.
     */
    where?: TrainingMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingMenus to fetch.
     */
    orderBy?: TrainingMenuOrderByWithRelationInput | TrainingMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingMenus.
     */
    cursor?: TrainingMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingMenus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingMenus.
     */
    distinct?: TrainingMenuScalarFieldEnum | TrainingMenuScalarFieldEnum[]
  }

  /**
   * TrainingMenu findFirstOrThrow
   */
  export type TrainingMenuFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenu
     */
    select?: TrainingMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingMenu
     */
    omit?: TrainingMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingMenuInclude<ExtArgs> | null
    /**
     * Filter, which TrainingMenu to fetch.
     */
    where?: TrainingMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingMenus to fetch.
     */
    orderBy?: TrainingMenuOrderByWithRelationInput | TrainingMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingMenus.
     */
    cursor?: TrainingMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingMenus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingMenus.
     */
    distinct?: TrainingMenuScalarFieldEnum | TrainingMenuScalarFieldEnum[]
  }

  /**
   * TrainingMenu findMany
   */
  export type TrainingMenuFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenu
     */
    select?: TrainingMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingMenu
     */
    omit?: TrainingMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingMenuInclude<ExtArgs> | null
    /**
     * Filter, which TrainingMenus to fetch.
     */
    where?: TrainingMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingMenus to fetch.
     */
    orderBy?: TrainingMenuOrderByWithRelationInput | TrainingMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainingMenus.
     */
    cursor?: TrainingMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingMenus.
     */
    skip?: number
    distinct?: TrainingMenuScalarFieldEnum | TrainingMenuScalarFieldEnum[]
  }

  /**
   * TrainingMenu create
   */
  export type TrainingMenuCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenu
     */
    select?: TrainingMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingMenu
     */
    omit?: TrainingMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingMenuInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainingMenu.
     */
    data: XOR<TrainingMenuCreateInput, TrainingMenuUncheckedCreateInput>
  }

  /**
   * TrainingMenu createMany
   */
  export type TrainingMenuCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainingMenus.
     */
    data: TrainingMenuCreateManyInput | TrainingMenuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainingMenu createManyAndReturn
   */
  export type TrainingMenuCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenu
     */
    select?: TrainingMenuSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingMenu
     */
    omit?: TrainingMenuOmit<ExtArgs> | null
    /**
     * The data used to create many TrainingMenus.
     */
    data: TrainingMenuCreateManyInput | TrainingMenuCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingMenuIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingMenu update
   */
  export type TrainingMenuUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenu
     */
    select?: TrainingMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingMenu
     */
    omit?: TrainingMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingMenuInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainingMenu.
     */
    data: XOR<TrainingMenuUpdateInput, TrainingMenuUncheckedUpdateInput>
    /**
     * Choose, which TrainingMenu to update.
     */
    where: TrainingMenuWhereUniqueInput
  }

  /**
   * TrainingMenu updateMany
   */
  export type TrainingMenuUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainingMenus.
     */
    data: XOR<TrainingMenuUpdateManyMutationInput, TrainingMenuUncheckedUpdateManyInput>
    /**
     * Filter which TrainingMenus to update
     */
    where?: TrainingMenuWhereInput
    /**
     * Limit how many TrainingMenus to update.
     */
    limit?: number
  }

  /**
   * TrainingMenu updateManyAndReturn
   */
  export type TrainingMenuUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenu
     */
    select?: TrainingMenuSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingMenu
     */
    omit?: TrainingMenuOmit<ExtArgs> | null
    /**
     * The data used to update TrainingMenus.
     */
    data: XOR<TrainingMenuUpdateManyMutationInput, TrainingMenuUncheckedUpdateManyInput>
    /**
     * Filter which TrainingMenus to update
     */
    where?: TrainingMenuWhereInput
    /**
     * Limit how many TrainingMenus to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingMenuIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingMenu upsert
   */
  export type TrainingMenuUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenu
     */
    select?: TrainingMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingMenu
     */
    omit?: TrainingMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingMenuInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainingMenu to update in case it exists.
     */
    where: TrainingMenuWhereUniqueInput
    /**
     * In case the TrainingMenu found by the `where` argument doesn't exist, create a new TrainingMenu with this data.
     */
    create: XOR<TrainingMenuCreateInput, TrainingMenuUncheckedCreateInput>
    /**
     * In case the TrainingMenu was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainingMenuUpdateInput, TrainingMenuUncheckedUpdateInput>
  }

  /**
   * TrainingMenu delete
   */
  export type TrainingMenuDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenu
     */
    select?: TrainingMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingMenu
     */
    omit?: TrainingMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingMenuInclude<ExtArgs> | null
    /**
     * Filter which TrainingMenu to delete.
     */
    where: TrainingMenuWhereUniqueInput
  }

  /**
   * TrainingMenu deleteMany
   */
  export type TrainingMenuDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingMenus to delete
     */
    where?: TrainingMenuWhereInput
    /**
     * Limit how many TrainingMenus to delete.
     */
    limit?: number
  }

  /**
   * TrainingMenu.client
   */
  export type TrainingMenu$clientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TrainingMenu.recaps
   */
  export type TrainingMenu$recapsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecap
     */
    select?: UserRecapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecap
     */
    omit?: UserRecapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecapInclude<ExtArgs> | null
    where?: UserRecapWhereInput
    orderBy?: UserRecapOrderByWithRelationInput | UserRecapOrderByWithRelationInput[]
    cursor?: UserRecapWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRecapScalarFieldEnum | UserRecapScalarFieldEnum[]
  }

  /**
   * TrainingMenu without action
   */
  export type TrainingMenuDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenu
     */
    select?: TrainingMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingMenu
     */
    omit?: TrainingMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingMenuInclude<ExtArgs> | null
  }


  /**
   * Model UserRecap
   */

  export type AggregateUserRecap = {
    _count: UserRecapCountAggregateOutputType | null
    _avg: UserRecapAvgAggregateOutputType | null
    _sum: UserRecapSumAggregateOutputType | null
    _min: UserRecapMinAggregateOutputType | null
    _max: UserRecapMaxAggregateOutputType | null
  }

  export type UserRecapAvgAggregateOutputType = {
    sessionDuration: number | null
  }

  export type UserRecapSumAggregateOutputType = {
    sessionDuration: number | null
  }

  export type UserRecapMinAggregateOutputType = {
    id: string | null
    userId: string | null
    menuId: string | null
    isCompleted: boolean | null
    sessionDuration: number | null
    completedAt: Date | null
    mongodbId: string | null
  }

  export type UserRecapMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    menuId: string | null
    isCompleted: boolean | null
    sessionDuration: number | null
    completedAt: Date | null
    mongodbId: string | null
  }

  export type UserRecapCountAggregateOutputType = {
    id: number
    userId: number
    menuId: number
    sessionSummary: number
    isCompleted: number
    sessionDuration: number
    completedAt: number
    mongodbId: number
    _all: number
  }


  export type UserRecapAvgAggregateInputType = {
    sessionDuration?: true
  }

  export type UserRecapSumAggregateInputType = {
    sessionDuration?: true
  }

  export type UserRecapMinAggregateInputType = {
    id?: true
    userId?: true
    menuId?: true
    isCompleted?: true
    sessionDuration?: true
    completedAt?: true
    mongodbId?: true
  }

  export type UserRecapMaxAggregateInputType = {
    id?: true
    userId?: true
    menuId?: true
    isCompleted?: true
    sessionDuration?: true
    completedAt?: true
    mongodbId?: true
  }

  export type UserRecapCountAggregateInputType = {
    id?: true
    userId?: true
    menuId?: true
    sessionSummary?: true
    isCompleted?: true
    sessionDuration?: true
    completedAt?: true
    mongodbId?: true
    _all?: true
  }

  export type UserRecapAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRecap to aggregate.
     */
    where?: UserRecapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRecaps to fetch.
     */
    orderBy?: UserRecapOrderByWithRelationInput | UserRecapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserRecapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRecaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRecaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserRecaps
    **/
    _count?: true | UserRecapCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserRecapAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserRecapSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserRecapMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserRecapMaxAggregateInputType
  }

  export type GetUserRecapAggregateType<T extends UserRecapAggregateArgs> = {
        [P in keyof T & keyof AggregateUserRecap]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRecap[P]>
      : GetScalarType<T[P], AggregateUserRecap[P]>
  }




  export type UserRecapGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRecapWhereInput
    orderBy?: UserRecapOrderByWithAggregationInput | UserRecapOrderByWithAggregationInput[]
    by: UserRecapScalarFieldEnum[] | UserRecapScalarFieldEnum
    having?: UserRecapScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserRecapCountAggregateInputType | true
    _avg?: UserRecapAvgAggregateInputType
    _sum?: UserRecapSumAggregateInputType
    _min?: UserRecapMinAggregateInputType
    _max?: UserRecapMaxAggregateInputType
  }

  export type UserRecapGroupByOutputType = {
    id: string
    userId: string
    menuId: string | null
    sessionSummary: JsonValue
    isCompleted: boolean
    sessionDuration: number
    completedAt: Date
    mongodbId: string | null
    _count: UserRecapCountAggregateOutputType | null
    _avg: UserRecapAvgAggregateOutputType | null
    _sum: UserRecapSumAggregateOutputType | null
    _min: UserRecapMinAggregateOutputType | null
    _max: UserRecapMaxAggregateOutputType | null
  }

  type GetUserRecapGroupByPayload<T extends UserRecapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserRecapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserRecapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRecapGroupByOutputType[P]>
            : GetScalarType<T[P], UserRecapGroupByOutputType[P]>
        }
      >
    >


  export type UserRecapSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    menuId?: boolean
    sessionSummary?: boolean
    isCompleted?: boolean
    sessionDuration?: boolean
    completedAt?: boolean
    mongodbId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    menu?: boolean | UserRecap$menuArgs<ExtArgs>
  }, ExtArgs["result"]["userRecap"]>

  export type UserRecapSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    menuId?: boolean
    sessionSummary?: boolean
    isCompleted?: boolean
    sessionDuration?: boolean
    completedAt?: boolean
    mongodbId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    menu?: boolean | UserRecap$menuArgs<ExtArgs>
  }, ExtArgs["result"]["userRecap"]>

  export type UserRecapSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    menuId?: boolean
    sessionSummary?: boolean
    isCompleted?: boolean
    sessionDuration?: boolean
    completedAt?: boolean
    mongodbId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    menu?: boolean | UserRecap$menuArgs<ExtArgs>
  }, ExtArgs["result"]["userRecap"]>

  export type UserRecapSelectScalar = {
    id?: boolean
    userId?: boolean
    menuId?: boolean
    sessionSummary?: boolean
    isCompleted?: boolean
    sessionDuration?: boolean
    completedAt?: boolean
    mongodbId?: boolean
  }

  export type UserRecapOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "menuId" | "sessionSummary" | "isCompleted" | "sessionDuration" | "completedAt" | "mongodbId", ExtArgs["result"]["userRecap"]>
  export type UserRecapInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    menu?: boolean | UserRecap$menuArgs<ExtArgs>
  }
  export type UserRecapIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    menu?: boolean | UserRecap$menuArgs<ExtArgs>
  }
  export type UserRecapIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    menu?: boolean | UserRecap$menuArgs<ExtArgs>
  }

  export type $UserRecapPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserRecap"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      menu: Prisma.$TrainingMenuPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      menuId: string | null
      sessionSummary: Prisma.JsonValue
      isCompleted: boolean
      sessionDuration: number
      completedAt: Date
      mongodbId: string | null
    }, ExtArgs["result"]["userRecap"]>
    composites: {}
  }

  type UserRecapGetPayload<S extends boolean | null | undefined | UserRecapDefaultArgs> = $Result.GetResult<Prisma.$UserRecapPayload, S>

  type UserRecapCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserRecapFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserRecapCountAggregateInputType | true
    }

  export interface UserRecapDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserRecap'], meta: { name: 'UserRecap' } }
    /**
     * Find zero or one UserRecap that matches the filter.
     * @param {UserRecapFindUniqueArgs} args - Arguments to find a UserRecap
     * @example
     * // Get one UserRecap
     * const userRecap = await prisma.userRecap.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserRecapFindUniqueArgs>(args: SelectSubset<T, UserRecapFindUniqueArgs<ExtArgs>>): Prisma__UserRecapClient<$Result.GetResult<Prisma.$UserRecapPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserRecap that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserRecapFindUniqueOrThrowArgs} args - Arguments to find a UserRecap
     * @example
     * // Get one UserRecap
     * const userRecap = await prisma.userRecap.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserRecapFindUniqueOrThrowArgs>(args: SelectSubset<T, UserRecapFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserRecapClient<$Result.GetResult<Prisma.$UserRecapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRecap that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRecapFindFirstArgs} args - Arguments to find a UserRecap
     * @example
     * // Get one UserRecap
     * const userRecap = await prisma.userRecap.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserRecapFindFirstArgs>(args?: SelectSubset<T, UserRecapFindFirstArgs<ExtArgs>>): Prisma__UserRecapClient<$Result.GetResult<Prisma.$UserRecapPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRecap that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRecapFindFirstOrThrowArgs} args - Arguments to find a UserRecap
     * @example
     * // Get one UserRecap
     * const userRecap = await prisma.userRecap.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserRecapFindFirstOrThrowArgs>(args?: SelectSubset<T, UserRecapFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserRecapClient<$Result.GetResult<Prisma.$UserRecapPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserRecaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRecapFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRecaps
     * const userRecaps = await prisma.userRecap.findMany()
     * 
     * // Get first 10 UserRecaps
     * const userRecaps = await prisma.userRecap.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userRecapWithIdOnly = await prisma.userRecap.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserRecapFindManyArgs>(args?: SelectSubset<T, UserRecapFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRecapPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserRecap.
     * @param {UserRecapCreateArgs} args - Arguments to create a UserRecap.
     * @example
     * // Create one UserRecap
     * const UserRecap = await prisma.userRecap.create({
     *   data: {
     *     // ... data to create a UserRecap
     *   }
     * })
     * 
     */
    create<T extends UserRecapCreateArgs>(args: SelectSubset<T, UserRecapCreateArgs<ExtArgs>>): Prisma__UserRecapClient<$Result.GetResult<Prisma.$UserRecapPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserRecaps.
     * @param {UserRecapCreateManyArgs} args - Arguments to create many UserRecaps.
     * @example
     * // Create many UserRecaps
     * const userRecap = await prisma.userRecap.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserRecapCreateManyArgs>(args?: SelectSubset<T, UserRecapCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserRecaps and returns the data saved in the database.
     * @param {UserRecapCreateManyAndReturnArgs} args - Arguments to create many UserRecaps.
     * @example
     * // Create many UserRecaps
     * const userRecap = await prisma.userRecap.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserRecaps and only return the `id`
     * const userRecapWithIdOnly = await prisma.userRecap.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserRecapCreateManyAndReturnArgs>(args?: SelectSubset<T, UserRecapCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRecapPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserRecap.
     * @param {UserRecapDeleteArgs} args - Arguments to delete one UserRecap.
     * @example
     * // Delete one UserRecap
     * const UserRecap = await prisma.userRecap.delete({
     *   where: {
     *     // ... filter to delete one UserRecap
     *   }
     * })
     * 
     */
    delete<T extends UserRecapDeleteArgs>(args: SelectSubset<T, UserRecapDeleteArgs<ExtArgs>>): Prisma__UserRecapClient<$Result.GetResult<Prisma.$UserRecapPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserRecap.
     * @param {UserRecapUpdateArgs} args - Arguments to update one UserRecap.
     * @example
     * // Update one UserRecap
     * const userRecap = await prisma.userRecap.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserRecapUpdateArgs>(args: SelectSubset<T, UserRecapUpdateArgs<ExtArgs>>): Prisma__UserRecapClient<$Result.GetResult<Prisma.$UserRecapPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserRecaps.
     * @param {UserRecapDeleteManyArgs} args - Arguments to filter UserRecaps to delete.
     * @example
     * // Delete a few UserRecaps
     * const { count } = await prisma.userRecap.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserRecapDeleteManyArgs>(args?: SelectSubset<T, UserRecapDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRecaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRecapUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRecaps
     * const userRecap = await prisma.userRecap.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserRecapUpdateManyArgs>(args: SelectSubset<T, UserRecapUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRecaps and returns the data updated in the database.
     * @param {UserRecapUpdateManyAndReturnArgs} args - Arguments to update many UserRecaps.
     * @example
     * // Update many UserRecaps
     * const userRecap = await prisma.userRecap.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserRecaps and only return the `id`
     * const userRecapWithIdOnly = await prisma.userRecap.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserRecapUpdateManyAndReturnArgs>(args: SelectSubset<T, UserRecapUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRecapPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserRecap.
     * @param {UserRecapUpsertArgs} args - Arguments to update or create a UserRecap.
     * @example
     * // Update or create a UserRecap
     * const userRecap = await prisma.userRecap.upsert({
     *   create: {
     *     // ... data to create a UserRecap
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRecap we want to update
     *   }
     * })
     */
    upsert<T extends UserRecapUpsertArgs>(args: SelectSubset<T, UserRecapUpsertArgs<ExtArgs>>): Prisma__UserRecapClient<$Result.GetResult<Prisma.$UserRecapPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserRecaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRecapCountArgs} args - Arguments to filter UserRecaps to count.
     * @example
     * // Count the number of UserRecaps
     * const count = await prisma.userRecap.count({
     *   where: {
     *     // ... the filter for the UserRecaps we want to count
     *   }
     * })
    **/
    count<T extends UserRecapCountArgs>(
      args?: Subset<T, UserRecapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRecapCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserRecap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRecapAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserRecapAggregateArgs>(args: Subset<T, UserRecapAggregateArgs>): Prisma.PrismaPromise<GetUserRecapAggregateType<T>>

    /**
     * Group by UserRecap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRecapGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserRecapGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRecapGroupByArgs['orderBy'] }
        : { orderBy?: UserRecapGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserRecapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserRecapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserRecap model
   */
  readonly fields: UserRecapFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRecap.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserRecapClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    menu<T extends UserRecap$menuArgs<ExtArgs> = {}>(args?: Subset<T, UserRecap$menuArgs<ExtArgs>>): Prisma__TrainingMenuClient<$Result.GetResult<Prisma.$TrainingMenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserRecap model
   */
  interface UserRecapFieldRefs {
    readonly id: FieldRef<"UserRecap", 'String'>
    readonly userId: FieldRef<"UserRecap", 'String'>
    readonly menuId: FieldRef<"UserRecap", 'String'>
    readonly sessionSummary: FieldRef<"UserRecap", 'Json'>
    readonly isCompleted: FieldRef<"UserRecap", 'Boolean'>
    readonly sessionDuration: FieldRef<"UserRecap", 'Int'>
    readonly completedAt: FieldRef<"UserRecap", 'DateTime'>
    readonly mongodbId: FieldRef<"UserRecap", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserRecap findUnique
   */
  export type UserRecapFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecap
     */
    select?: UserRecapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecap
     */
    omit?: UserRecapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecapInclude<ExtArgs> | null
    /**
     * Filter, which UserRecap to fetch.
     */
    where: UserRecapWhereUniqueInput
  }

  /**
   * UserRecap findUniqueOrThrow
   */
  export type UserRecapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecap
     */
    select?: UserRecapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecap
     */
    omit?: UserRecapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecapInclude<ExtArgs> | null
    /**
     * Filter, which UserRecap to fetch.
     */
    where: UserRecapWhereUniqueInput
  }

  /**
   * UserRecap findFirst
   */
  export type UserRecapFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecap
     */
    select?: UserRecapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecap
     */
    omit?: UserRecapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecapInclude<ExtArgs> | null
    /**
     * Filter, which UserRecap to fetch.
     */
    where?: UserRecapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRecaps to fetch.
     */
    orderBy?: UserRecapOrderByWithRelationInput | UserRecapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRecaps.
     */
    cursor?: UserRecapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRecaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRecaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRecaps.
     */
    distinct?: UserRecapScalarFieldEnum | UserRecapScalarFieldEnum[]
  }

  /**
   * UserRecap findFirstOrThrow
   */
  export type UserRecapFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecap
     */
    select?: UserRecapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecap
     */
    omit?: UserRecapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecapInclude<ExtArgs> | null
    /**
     * Filter, which UserRecap to fetch.
     */
    where?: UserRecapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRecaps to fetch.
     */
    orderBy?: UserRecapOrderByWithRelationInput | UserRecapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRecaps.
     */
    cursor?: UserRecapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRecaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRecaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRecaps.
     */
    distinct?: UserRecapScalarFieldEnum | UserRecapScalarFieldEnum[]
  }

  /**
   * UserRecap findMany
   */
  export type UserRecapFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecap
     */
    select?: UserRecapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecap
     */
    omit?: UserRecapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecapInclude<ExtArgs> | null
    /**
     * Filter, which UserRecaps to fetch.
     */
    where?: UserRecapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRecaps to fetch.
     */
    orderBy?: UserRecapOrderByWithRelationInput | UserRecapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserRecaps.
     */
    cursor?: UserRecapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRecaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRecaps.
     */
    skip?: number
    distinct?: UserRecapScalarFieldEnum | UserRecapScalarFieldEnum[]
  }

  /**
   * UserRecap create
   */
  export type UserRecapCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecap
     */
    select?: UserRecapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecap
     */
    omit?: UserRecapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecapInclude<ExtArgs> | null
    /**
     * The data needed to create a UserRecap.
     */
    data: XOR<UserRecapCreateInput, UserRecapUncheckedCreateInput>
  }

  /**
   * UserRecap createMany
   */
  export type UserRecapCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserRecaps.
     */
    data: UserRecapCreateManyInput | UserRecapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserRecap createManyAndReturn
   */
  export type UserRecapCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecap
     */
    select?: UserRecapSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecap
     */
    omit?: UserRecapOmit<ExtArgs> | null
    /**
     * The data used to create many UserRecaps.
     */
    data: UserRecapCreateManyInput | UserRecapCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecapIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRecap update
   */
  export type UserRecapUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecap
     */
    select?: UserRecapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecap
     */
    omit?: UserRecapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecapInclude<ExtArgs> | null
    /**
     * The data needed to update a UserRecap.
     */
    data: XOR<UserRecapUpdateInput, UserRecapUncheckedUpdateInput>
    /**
     * Choose, which UserRecap to update.
     */
    where: UserRecapWhereUniqueInput
  }

  /**
   * UserRecap updateMany
   */
  export type UserRecapUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserRecaps.
     */
    data: XOR<UserRecapUpdateManyMutationInput, UserRecapUncheckedUpdateManyInput>
    /**
     * Filter which UserRecaps to update
     */
    where?: UserRecapWhereInput
    /**
     * Limit how many UserRecaps to update.
     */
    limit?: number
  }

  /**
   * UserRecap updateManyAndReturn
   */
  export type UserRecapUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecap
     */
    select?: UserRecapSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecap
     */
    omit?: UserRecapOmit<ExtArgs> | null
    /**
     * The data used to update UserRecaps.
     */
    data: XOR<UserRecapUpdateManyMutationInput, UserRecapUncheckedUpdateManyInput>
    /**
     * Filter which UserRecaps to update
     */
    where?: UserRecapWhereInput
    /**
     * Limit how many UserRecaps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecapIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRecap upsert
   */
  export type UserRecapUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecap
     */
    select?: UserRecapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecap
     */
    omit?: UserRecapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecapInclude<ExtArgs> | null
    /**
     * The filter to search for the UserRecap to update in case it exists.
     */
    where: UserRecapWhereUniqueInput
    /**
     * In case the UserRecap found by the `where` argument doesn't exist, create a new UserRecap with this data.
     */
    create: XOR<UserRecapCreateInput, UserRecapUncheckedCreateInput>
    /**
     * In case the UserRecap was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRecapUpdateInput, UserRecapUncheckedUpdateInput>
  }

  /**
   * UserRecap delete
   */
  export type UserRecapDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecap
     */
    select?: UserRecapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecap
     */
    omit?: UserRecapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecapInclude<ExtArgs> | null
    /**
     * Filter which UserRecap to delete.
     */
    where: UserRecapWhereUniqueInput
  }

  /**
   * UserRecap deleteMany
   */
  export type UserRecapDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRecaps to delete
     */
    where?: UserRecapWhereInput
    /**
     * Limit how many UserRecaps to delete.
     */
    limit?: number
  }

  /**
   * UserRecap.menu
   */
  export type UserRecap$menuArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingMenu
     */
    select?: TrainingMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingMenu
     */
    omit?: TrainingMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingMenuInclude<ExtArgs> | null
    where?: TrainingMenuWhereInput
  }

  /**
   * UserRecap without action
   */
  export type UserRecapDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecap
     */
    select?: UserRecapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecap
     */
    omit?: UserRecapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecapInclude<ExtArgs> | null
  }


  /**
   * Model ActivityLog
   */

  export type AggregateActivityLog = {
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  export type ActivityLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    timeStamp: Date | null
    status: string | null
    confidence: string | null
  }

  export type ActivityLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    timeStamp: Date | null
    status: string | null
    confidence: string | null
  }

  export type ActivityLogCountAggregateOutputType = {
    id: number
    userId: number
    timeStamp: number
    status: number
    confidence: number
    details: number
    _all: number
  }


  export type ActivityLogMinAggregateInputType = {
    id?: true
    userId?: true
    timeStamp?: true
    status?: true
    confidence?: true
  }

  export type ActivityLogMaxAggregateInputType = {
    id?: true
    userId?: true
    timeStamp?: true
    status?: true
    confidence?: true
  }

  export type ActivityLogCountAggregateInputType = {
    id?: true
    userId?: true
    timeStamp?: true
    status?: true
    confidence?: true
    details?: true
    _all?: true
  }

  export type ActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLog to aggregate.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityLogs
    **/
    _count?: true | ActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityLogMaxAggregateInputType
  }

  export type GetActivityLogAggregateType<T extends ActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityLog[P]>
      : GetScalarType<T[P], AggregateActivityLog[P]>
  }




  export type ActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithAggregationInput | ActivityLogOrderByWithAggregationInput[]
    by: ActivityLogScalarFieldEnum[] | ActivityLogScalarFieldEnum
    having?: ActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityLogCountAggregateInputType | true
    _min?: ActivityLogMinAggregateInputType
    _max?: ActivityLogMaxAggregateInputType
  }

  export type ActivityLogGroupByOutputType = {
    id: string
    userId: string
    timeStamp: Date
    status: string | null
    confidence: string | null
    details: JsonValue | null
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  type GetActivityLogGroupByPayload<T extends ActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type ActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    timeStamp?: boolean
    status?: boolean
    confidence?: boolean
    details?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    timeStamp?: boolean
    status?: boolean
    confidence?: boolean
    details?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    timeStamp?: boolean
    status?: boolean
    confidence?: boolean
    details?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectScalar = {
    id?: boolean
    userId?: boolean
    timeStamp?: boolean
    status?: boolean
    confidence?: boolean
    details?: boolean
  }

  export type ActivityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "timeStamp" | "status" | "confidence" | "details", ExtArgs["result"]["activityLog"]>
  export type ActivityLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActivityLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActivityLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      timeStamp: Date
      status: string | null
      confidence: string | null
      details: Prisma.JsonValue | null
    }, ExtArgs["result"]["activityLog"]>
    composites: {}
  }

  type ActivityLogGetPayload<S extends boolean | null | undefined | ActivityLogDefaultArgs> = $Result.GetResult<Prisma.$ActivityLogPayload, S>

  type ActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityLogCountAggregateInputType | true
    }

  export interface ActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityLog'], meta: { name: 'ActivityLog' } }
    /**
     * Find zero or one ActivityLog that matches the filter.
     * @param {ActivityLogFindUniqueArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityLogFindUniqueArgs>(args: SelectSubset<T, ActivityLogFindUniqueArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityLogFindUniqueOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityLogFindFirstArgs>(args?: SelectSubset<T, ActivityLogFindFirstArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany()
     * 
     * // Get first 10 ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityLogFindManyArgs>(args?: SelectSubset<T, ActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivityLog.
     * @param {ActivityLogCreateArgs} args - Arguments to create a ActivityLog.
     * @example
     * // Create one ActivityLog
     * const ActivityLog = await prisma.activityLog.create({
     *   data: {
     *     // ... data to create a ActivityLog
     *   }
     * })
     * 
     */
    create<T extends ActivityLogCreateArgs>(args: SelectSubset<T, ActivityLogCreateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivityLogs.
     * @param {ActivityLogCreateManyArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityLogCreateManyArgs>(args?: SelectSubset<T, ActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityLogs and returns the data saved in the database.
     * @param {ActivityLogCreateManyAndReturnArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActivityLog.
     * @param {ActivityLogDeleteArgs} args - Arguments to delete one ActivityLog.
     * @example
     * // Delete one ActivityLog
     * const ActivityLog = await prisma.activityLog.delete({
     *   where: {
     *     // ... filter to delete one ActivityLog
     *   }
     * })
     * 
     */
    delete<T extends ActivityLogDeleteArgs>(args: SelectSubset<T, ActivityLogDeleteArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivityLog.
     * @param {ActivityLogUpdateArgs} args - Arguments to update one ActivityLog.
     * @example
     * // Update one ActivityLog
     * const activityLog = await prisma.activityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityLogUpdateArgs>(args: SelectSubset<T, ActivityLogUpdateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivityLogs.
     * @param {ActivityLogDeleteManyArgs} args - Arguments to filter ActivityLogs to delete.
     * @example
     * // Delete a few ActivityLogs
     * const { count } = await prisma.activityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityLogDeleteManyArgs>(args?: SelectSubset<T, ActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityLogUpdateManyArgs>(args: SelectSubset<T, ActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs and returns the data updated in the database.
     * @param {ActivityLogUpdateManyAndReturnArgs} args - Arguments to update many ActivityLogs.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActivityLog.
     * @param {ActivityLogUpsertArgs} args - Arguments to update or create a ActivityLog.
     * @example
     * // Update or create a ActivityLog
     * const activityLog = await prisma.activityLog.upsert({
     *   create: {
     *     // ... data to create a ActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends ActivityLogUpsertArgs>(args: SelectSubset<T, ActivityLogUpsertArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogCountArgs} args - Arguments to filter ActivityLogs to count.
     * @example
     * // Count the number of ActivityLogs
     * const count = await prisma.activityLog.count({
     *   where: {
     *     // ... the filter for the ActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends ActivityLogCountArgs>(
      args?: Subset<T, ActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityLogAggregateArgs>(args: Subset<T, ActivityLogAggregateArgs>): Prisma.PrismaPromise<GetActivityLogAggregateType<T>>

    /**
     * Group by ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: ActivityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityLog model
   */
  readonly fields: ActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityLog model
   */
  interface ActivityLogFieldRefs {
    readonly id: FieldRef<"ActivityLog", 'String'>
    readonly userId: FieldRef<"ActivityLog", 'String'>
    readonly timeStamp: FieldRef<"ActivityLog", 'DateTime'>
    readonly status: FieldRef<"ActivityLog", 'String'>
    readonly confidence: FieldRef<"ActivityLog", 'String'>
    readonly details: FieldRef<"ActivityLog", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * ActivityLog findUnique
   */
  export type ActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findUniqueOrThrow
   */
  export type ActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findFirst
   */
  export type ActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findFirstOrThrow
   */
  export type ActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findMany
   */
  export type ActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLogs to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog create
   */
  export type ActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ActivityLog.
     */
    data: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
  }

  /**
   * ActivityLog createMany
   */
  export type ActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityLog createManyAndReturn
   */
  export type ActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog update
   */
  export type ActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ActivityLog.
     */
    data: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
    /**
     * Choose, which ActivityLog to update.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog updateMany
   */
  export type ActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
  }

  /**
   * ActivityLog updateManyAndReturn
   */
  export type ActivityLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog upsert
   */
  export type ActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ActivityLog to update in case it exists.
     */
    where: ActivityLogWhereUniqueInput
    /**
     * In case the ActivityLog found by the `where` argument doesn't exist, create a new ActivityLog with this data.
     */
    create: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
    /**
     * In case the ActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
  }

  /**
   * ActivityLog delete
   */
  export type ActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter which ActivityLog to delete.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog deleteMany
   */
  export type ActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLogs to delete
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to delete.
     */
    limit?: number
  }

  /**
   * ActivityLog without action
   */
  export type ActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    birthDate: 'birthDate',
    gender: 'gender',
    role: 'role',
    coachId: 'coachId',
    totpSecret: 'totpSecret',
    totpEnabled: 'totpEnabled',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TrainingMenuScalarFieldEnum: {
    id: 'id',
    name: 'name',
    authorId: 'authorId',
    clientId: 'clientId',
    exerciseList: 'exerciseList',
    createdAt: 'createdAt'
  };

  export type TrainingMenuScalarFieldEnum = (typeof TrainingMenuScalarFieldEnum)[keyof typeof TrainingMenuScalarFieldEnum]


  export const UserRecapScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    menuId: 'menuId',
    sessionSummary: 'sessionSummary',
    isCompleted: 'isCompleted',
    sessionDuration: 'sessionDuration',
    completedAt: 'completedAt',
    mongodbId: 'mongodbId'
  };

  export type UserRecapScalarFieldEnum = (typeof UserRecapScalarFieldEnum)[keyof typeof UserRecapScalarFieldEnum]


  export const ActivityLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    timeStamp: 'timeStamp',
    status: 'status',
    confidence: 'confidence',
    details: 'details'
  };

  export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    name?: StringFilter<"User"> | string
    birthDate?: DateTimeNullableFilter<"User"> | Date | string | null
    gender?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    coachId?: StringNullableFilter<"User"> | string | null
    totpSecret?: StringNullableFilter<"User"> | string | null
    totpEnabled?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    coach?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    clients?: UserListRelationFilter
    trainingMenus?: TrainingMenuListRelationFilter
    clientMenus?: TrainingMenuListRelationFilter
    recaps?: UserRecapListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    name?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    role?: SortOrder
    coachId?: SortOrderInput | SortOrder
    totpSecret?: SortOrderInput | SortOrder
    totpEnabled?: SortOrder
    createdAt?: SortOrder
    coach?: UserOrderByWithRelationInput
    clients?: UserOrderByRelationAggregateInput
    trainingMenus?: TrainingMenuOrderByRelationAggregateInput
    clientMenus?: TrainingMenuOrderByRelationAggregateInput
    recaps?: UserRecapOrderByRelationAggregateInput
    activityLogs?: ActivityLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    name?: StringFilter<"User"> | string
    birthDate?: DateTimeNullableFilter<"User"> | Date | string | null
    gender?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    coachId?: StringNullableFilter<"User"> | string | null
    totpSecret?: StringNullableFilter<"User"> | string | null
    totpEnabled?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    coach?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    clients?: UserListRelationFilter
    trainingMenus?: TrainingMenuListRelationFilter
    clientMenus?: TrainingMenuListRelationFilter
    recaps?: UserRecapListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    name?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    role?: SortOrder
    coachId?: SortOrderInput | SortOrder
    totpSecret?: SortOrderInput | SortOrder
    totpEnabled?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringWithAggregatesFilter<"User"> | string
    birthDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    gender?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    coachId?: StringNullableWithAggregatesFilter<"User"> | string | null
    totpSecret?: StringNullableWithAggregatesFilter<"User"> | string | null
    totpEnabled?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TrainingMenuWhereInput = {
    AND?: TrainingMenuWhereInput | TrainingMenuWhereInput[]
    OR?: TrainingMenuWhereInput[]
    NOT?: TrainingMenuWhereInput | TrainingMenuWhereInput[]
    id?: StringFilter<"TrainingMenu"> | string
    name?: StringFilter<"TrainingMenu"> | string
    authorId?: StringFilter<"TrainingMenu"> | string
    clientId?: StringNullableFilter<"TrainingMenu"> | string | null
    exerciseList?: JsonFilter<"TrainingMenu">
    createdAt?: DateTimeFilter<"TrainingMenu"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    client?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    recaps?: UserRecapListRelationFilter
  }

  export type TrainingMenuOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    authorId?: SortOrder
    clientId?: SortOrderInput | SortOrder
    exerciseList?: SortOrder
    createdAt?: SortOrder
    author?: UserOrderByWithRelationInput
    client?: UserOrderByWithRelationInput
    recaps?: UserRecapOrderByRelationAggregateInput
  }

  export type TrainingMenuWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrainingMenuWhereInput | TrainingMenuWhereInput[]
    OR?: TrainingMenuWhereInput[]
    NOT?: TrainingMenuWhereInput | TrainingMenuWhereInput[]
    name?: StringFilter<"TrainingMenu"> | string
    authorId?: StringFilter<"TrainingMenu"> | string
    clientId?: StringNullableFilter<"TrainingMenu"> | string | null
    exerciseList?: JsonFilter<"TrainingMenu">
    createdAt?: DateTimeFilter<"TrainingMenu"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    client?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    recaps?: UserRecapListRelationFilter
  }, "id">

  export type TrainingMenuOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    authorId?: SortOrder
    clientId?: SortOrderInput | SortOrder
    exerciseList?: SortOrder
    createdAt?: SortOrder
    _count?: TrainingMenuCountOrderByAggregateInput
    _max?: TrainingMenuMaxOrderByAggregateInput
    _min?: TrainingMenuMinOrderByAggregateInput
  }

  export type TrainingMenuScalarWhereWithAggregatesInput = {
    AND?: TrainingMenuScalarWhereWithAggregatesInput | TrainingMenuScalarWhereWithAggregatesInput[]
    OR?: TrainingMenuScalarWhereWithAggregatesInput[]
    NOT?: TrainingMenuScalarWhereWithAggregatesInput | TrainingMenuScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrainingMenu"> | string
    name?: StringWithAggregatesFilter<"TrainingMenu"> | string
    authorId?: StringWithAggregatesFilter<"TrainingMenu"> | string
    clientId?: StringNullableWithAggregatesFilter<"TrainingMenu"> | string | null
    exerciseList?: JsonWithAggregatesFilter<"TrainingMenu">
    createdAt?: DateTimeWithAggregatesFilter<"TrainingMenu"> | Date | string
  }

  export type UserRecapWhereInput = {
    AND?: UserRecapWhereInput | UserRecapWhereInput[]
    OR?: UserRecapWhereInput[]
    NOT?: UserRecapWhereInput | UserRecapWhereInput[]
    id?: StringFilter<"UserRecap"> | string
    userId?: StringFilter<"UserRecap"> | string
    menuId?: StringNullableFilter<"UserRecap"> | string | null
    sessionSummary?: JsonFilter<"UserRecap">
    isCompleted?: BoolFilter<"UserRecap"> | boolean
    sessionDuration?: IntFilter<"UserRecap"> | number
    completedAt?: DateTimeFilter<"UserRecap"> | Date | string
    mongodbId?: StringNullableFilter<"UserRecap"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    menu?: XOR<TrainingMenuNullableScalarRelationFilter, TrainingMenuWhereInput> | null
  }

  export type UserRecapOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    menuId?: SortOrderInput | SortOrder
    sessionSummary?: SortOrder
    isCompleted?: SortOrder
    sessionDuration?: SortOrder
    completedAt?: SortOrder
    mongodbId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    menu?: TrainingMenuOrderByWithRelationInput
  }

  export type UserRecapWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    mongodbId?: string
    AND?: UserRecapWhereInput | UserRecapWhereInput[]
    OR?: UserRecapWhereInput[]
    NOT?: UserRecapWhereInput | UserRecapWhereInput[]
    userId?: StringFilter<"UserRecap"> | string
    menuId?: StringNullableFilter<"UserRecap"> | string | null
    sessionSummary?: JsonFilter<"UserRecap">
    isCompleted?: BoolFilter<"UserRecap"> | boolean
    sessionDuration?: IntFilter<"UserRecap"> | number
    completedAt?: DateTimeFilter<"UserRecap"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    menu?: XOR<TrainingMenuNullableScalarRelationFilter, TrainingMenuWhereInput> | null
  }, "id" | "mongodbId">

  export type UserRecapOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    menuId?: SortOrderInput | SortOrder
    sessionSummary?: SortOrder
    isCompleted?: SortOrder
    sessionDuration?: SortOrder
    completedAt?: SortOrder
    mongodbId?: SortOrderInput | SortOrder
    _count?: UserRecapCountOrderByAggregateInput
    _avg?: UserRecapAvgOrderByAggregateInput
    _max?: UserRecapMaxOrderByAggregateInput
    _min?: UserRecapMinOrderByAggregateInput
    _sum?: UserRecapSumOrderByAggregateInput
  }

  export type UserRecapScalarWhereWithAggregatesInput = {
    AND?: UserRecapScalarWhereWithAggregatesInput | UserRecapScalarWhereWithAggregatesInput[]
    OR?: UserRecapScalarWhereWithAggregatesInput[]
    NOT?: UserRecapScalarWhereWithAggregatesInput | UserRecapScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserRecap"> | string
    userId?: StringWithAggregatesFilter<"UserRecap"> | string
    menuId?: StringNullableWithAggregatesFilter<"UserRecap"> | string | null
    sessionSummary?: JsonWithAggregatesFilter<"UserRecap">
    isCompleted?: BoolWithAggregatesFilter<"UserRecap"> | boolean
    sessionDuration?: IntWithAggregatesFilter<"UserRecap"> | number
    completedAt?: DateTimeWithAggregatesFilter<"UserRecap"> | Date | string
    mongodbId?: StringNullableWithAggregatesFilter<"UserRecap"> | string | null
  }

  export type ActivityLogWhereInput = {
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    userId?: StringFilter<"ActivityLog"> | string
    timeStamp?: DateTimeFilter<"ActivityLog"> | Date | string
    status?: StringNullableFilter<"ActivityLog"> | string | null
    confidence?: StringNullableFilter<"ActivityLog"> | string | null
    details?: JsonNullableFilter<"ActivityLog">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    timeStamp?: SortOrder
    status?: SortOrderInput | SortOrder
    confidence?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    userId?: StringFilter<"ActivityLog"> | string
    timeStamp?: DateTimeFilter<"ActivityLog"> | Date | string
    status?: StringNullableFilter<"ActivityLog"> | string | null
    confidence?: StringNullableFilter<"ActivityLog"> | string | null
    details?: JsonNullableFilter<"ActivityLog">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    timeStamp?: SortOrder
    status?: SortOrderInput | SortOrder
    confidence?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    _count?: ActivityLogCountOrderByAggregateInput
    _max?: ActivityLogMaxOrderByAggregateInput
    _min?: ActivityLogMinOrderByAggregateInput
  }

  export type ActivityLogScalarWhereWithAggregatesInput = {
    AND?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    OR?: ActivityLogScalarWhereWithAggregatesInput[]
    NOT?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivityLog"> | string
    userId?: StringWithAggregatesFilter<"ActivityLog"> | string
    timeStamp?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
    status?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    confidence?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    details?: JsonNullableWithAggregatesFilter<"ActivityLog">
  }

  export type UserCreateInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
    coach?: UserCreateNestedOneWithoutClientsInput
    clients?: UserCreateNestedManyWithoutCoachInput
    trainingMenus?: TrainingMenuCreateNestedManyWithoutAuthorInput
    clientMenus?: TrainingMenuCreateNestedManyWithoutClientInput
    recaps?: UserRecapCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    coachId?: string | null
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
    clients?: UserUncheckedCreateNestedManyWithoutCoachInput
    trainingMenus?: TrainingMenuUncheckedCreateNestedManyWithoutAuthorInput
    clientMenus?: TrainingMenuUncheckedCreateNestedManyWithoutClientInput
    recaps?: UserRecapUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coach?: UserUpdateOneWithoutClientsNestedInput
    clients?: UserUpdateManyWithoutCoachNestedInput
    trainingMenus?: TrainingMenuUpdateManyWithoutAuthorNestedInput
    clientMenus?: TrainingMenuUpdateManyWithoutClientNestedInput
    recaps?: UserRecapUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    coachId?: NullableStringFieldUpdateOperationsInput | string | null
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: UserUncheckedUpdateManyWithoutCoachNestedInput
    trainingMenus?: TrainingMenuUncheckedUpdateManyWithoutAuthorNestedInput
    clientMenus?: TrainingMenuUncheckedUpdateManyWithoutClientNestedInput
    recaps?: UserRecapUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    coachId?: string | null
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    coachId?: NullableStringFieldUpdateOperationsInput | string | null
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingMenuCreateInput = {
    id?: string
    name?: string
    exerciseList: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    author: UserCreateNestedOneWithoutTrainingMenusInput
    client?: UserCreateNestedOneWithoutClientMenusInput
    recaps?: UserRecapCreateNestedManyWithoutMenuInput
  }

  export type TrainingMenuUncheckedCreateInput = {
    id?: string
    name?: string
    authorId: string
    clientId?: string | null
    exerciseList: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    recaps?: UserRecapUncheckedCreateNestedManyWithoutMenuInput
  }

  export type TrainingMenuUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exerciseList?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutTrainingMenusNestedInput
    client?: UserUpdateOneWithoutClientMenusNestedInput
    recaps?: UserRecapUpdateManyWithoutMenuNestedInput
  }

  export type TrainingMenuUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    exerciseList?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recaps?: UserRecapUncheckedUpdateManyWithoutMenuNestedInput
  }

  export type TrainingMenuCreateManyInput = {
    id?: string
    name?: string
    authorId: string
    clientId?: string | null
    exerciseList: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TrainingMenuUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exerciseList?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingMenuUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    exerciseList?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRecapCreateInput = {
    id?: string
    sessionSummary: JsonNullValueInput | InputJsonValue
    isCompleted?: boolean
    sessionDuration?: number
    completedAt?: Date | string
    mongodbId?: string | null
    user: UserCreateNestedOneWithoutRecapsInput
    menu?: TrainingMenuCreateNestedOneWithoutRecapsInput
  }

  export type UserRecapUncheckedCreateInput = {
    id?: string
    userId: string
    menuId?: string | null
    sessionSummary: JsonNullValueInput | InputJsonValue
    isCompleted?: boolean
    sessionDuration?: number
    completedAt?: Date | string
    mongodbId?: string | null
  }

  export type UserRecapUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionSummary?: JsonNullValueInput | InputJsonValue
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    sessionDuration?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mongodbId?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutRecapsNestedInput
    menu?: TrainingMenuUpdateOneWithoutRecapsNestedInput
  }

  export type UserRecapUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    menuId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionSummary?: JsonNullValueInput | InputJsonValue
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    sessionDuration?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mongodbId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserRecapCreateManyInput = {
    id?: string
    userId: string
    menuId?: string | null
    sessionSummary: JsonNullValueInput | InputJsonValue
    isCompleted?: boolean
    sessionDuration?: number
    completedAt?: Date | string
    mongodbId?: string | null
  }

  export type UserRecapUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionSummary?: JsonNullValueInput | InputJsonValue
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    sessionDuration?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mongodbId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserRecapUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    menuId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionSummary?: JsonNullValueInput | InputJsonValue
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    sessionDuration?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mongodbId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityLogCreateInput = {
    id?: string
    timeStamp?: Date | string
    status?: string | null
    confidence?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutActivityLogsInput
  }

  export type ActivityLogUncheckedCreateInput = {
    id?: string
    userId: string
    timeStamp?: Date | string
    status?: string | null
    confidence?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ActivityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutActivityLogsNestedInput
  }

  export type ActivityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ActivityLogCreateManyInput = {
    id?: string
    userId: string
    timeStamp?: Date | string
    status?: string | null
    confidence?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ActivityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ActivityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type TrainingMenuListRelationFilter = {
    every?: TrainingMenuWhereInput
    some?: TrainingMenuWhereInput
    none?: TrainingMenuWhereInput
  }

  export type UserRecapListRelationFilter = {
    every?: UserRecapWhereInput
    some?: UserRecapWhereInput
    none?: UserRecapWhereInput
  }

  export type ActivityLogListRelationFilter = {
    every?: ActivityLogWhereInput
    some?: ActivityLogWhereInput
    none?: ActivityLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainingMenuOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserRecapOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    gender?: SortOrder
    role?: SortOrder
    coachId?: SortOrder
    totpSecret?: SortOrder
    totpEnabled?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    gender?: SortOrder
    role?: SortOrder
    coachId?: SortOrder
    totpSecret?: SortOrder
    totpEnabled?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    gender?: SortOrder
    role?: SortOrder
    coachId?: SortOrder
    totpSecret?: SortOrder
    totpEnabled?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TrainingMenuCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    authorId?: SortOrder
    clientId?: SortOrder
    exerciseList?: SortOrder
    createdAt?: SortOrder
  }

  export type TrainingMenuMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    authorId?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
  }

  export type TrainingMenuMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    authorId?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TrainingMenuNullableScalarRelationFilter = {
    is?: TrainingMenuWhereInput | null
    isNot?: TrainingMenuWhereInput | null
  }

  export type UserRecapCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    menuId?: SortOrder
    sessionSummary?: SortOrder
    isCompleted?: SortOrder
    sessionDuration?: SortOrder
    completedAt?: SortOrder
    mongodbId?: SortOrder
  }

  export type UserRecapAvgOrderByAggregateInput = {
    sessionDuration?: SortOrder
  }

  export type UserRecapMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    menuId?: SortOrder
    isCompleted?: SortOrder
    sessionDuration?: SortOrder
    completedAt?: SortOrder
    mongodbId?: SortOrder
  }

  export type UserRecapMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    menuId?: SortOrder
    isCompleted?: SortOrder
    sessionDuration?: SortOrder
    completedAt?: SortOrder
    mongodbId?: SortOrder
  }

  export type UserRecapSumOrderByAggregateInput = {
    sessionDuration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timeStamp?: SortOrder
    status?: SortOrder
    confidence?: SortOrder
    details?: SortOrder
  }

  export type ActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timeStamp?: SortOrder
    status?: SortOrder
    confidence?: SortOrder
  }

  export type ActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timeStamp?: SortOrder
    status?: SortOrder
    confidence?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type UserCreateNestedOneWithoutClientsInput = {
    create?: XOR<UserCreateWithoutClientsInput, UserUncheckedCreateWithoutClientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutCoachInput = {
    create?: XOR<UserCreateWithoutCoachInput, UserUncheckedCreateWithoutCoachInput> | UserCreateWithoutCoachInput[] | UserUncheckedCreateWithoutCoachInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCoachInput | UserCreateOrConnectWithoutCoachInput[]
    createMany?: UserCreateManyCoachInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type TrainingMenuCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TrainingMenuCreateWithoutAuthorInput, TrainingMenuUncheckedCreateWithoutAuthorInput> | TrainingMenuCreateWithoutAuthorInput[] | TrainingMenuUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TrainingMenuCreateOrConnectWithoutAuthorInput | TrainingMenuCreateOrConnectWithoutAuthorInput[]
    createMany?: TrainingMenuCreateManyAuthorInputEnvelope
    connect?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
  }

  export type TrainingMenuCreateNestedManyWithoutClientInput = {
    create?: XOR<TrainingMenuCreateWithoutClientInput, TrainingMenuUncheckedCreateWithoutClientInput> | TrainingMenuCreateWithoutClientInput[] | TrainingMenuUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TrainingMenuCreateOrConnectWithoutClientInput | TrainingMenuCreateOrConnectWithoutClientInput[]
    createMany?: TrainingMenuCreateManyClientInputEnvelope
    connect?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
  }

  export type UserRecapCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRecapCreateWithoutUserInput, UserRecapUncheckedCreateWithoutUserInput> | UserRecapCreateWithoutUserInput[] | UserRecapUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRecapCreateOrConnectWithoutUserInput | UserRecapCreateOrConnectWithoutUserInput[]
    createMany?: UserRecapCreateManyUserInputEnvelope
    connect?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
  }

  export type ActivityLogCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCoachInput = {
    create?: XOR<UserCreateWithoutCoachInput, UserUncheckedCreateWithoutCoachInput> | UserCreateWithoutCoachInput[] | UserUncheckedCreateWithoutCoachInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCoachInput | UserCreateOrConnectWithoutCoachInput[]
    createMany?: UserCreateManyCoachInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type TrainingMenuUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TrainingMenuCreateWithoutAuthorInput, TrainingMenuUncheckedCreateWithoutAuthorInput> | TrainingMenuCreateWithoutAuthorInput[] | TrainingMenuUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TrainingMenuCreateOrConnectWithoutAuthorInput | TrainingMenuCreateOrConnectWithoutAuthorInput[]
    createMany?: TrainingMenuCreateManyAuthorInputEnvelope
    connect?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
  }

  export type TrainingMenuUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<TrainingMenuCreateWithoutClientInput, TrainingMenuUncheckedCreateWithoutClientInput> | TrainingMenuCreateWithoutClientInput[] | TrainingMenuUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TrainingMenuCreateOrConnectWithoutClientInput | TrainingMenuCreateOrConnectWithoutClientInput[]
    createMany?: TrainingMenuCreateManyClientInputEnvelope
    connect?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
  }

  export type UserRecapUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRecapCreateWithoutUserInput, UserRecapUncheckedCreateWithoutUserInput> | UserRecapCreateWithoutUserInput[] | UserRecapUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRecapCreateOrConnectWithoutUserInput | UserRecapCreateOrConnectWithoutUserInput[]
    createMany?: UserRecapCreateManyUserInputEnvelope
    connect?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
  }

  export type ActivityLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneWithoutClientsNestedInput = {
    create?: XOR<UserCreateWithoutClientsInput, UserUncheckedCreateWithoutClientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientsInput
    upsert?: UserUpsertWithoutClientsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClientsInput, UserUpdateWithoutClientsInput>, UserUncheckedUpdateWithoutClientsInput>
  }

  export type UserUpdateManyWithoutCoachNestedInput = {
    create?: XOR<UserCreateWithoutCoachInput, UserUncheckedCreateWithoutCoachInput> | UserCreateWithoutCoachInput[] | UserUncheckedCreateWithoutCoachInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCoachInput | UserCreateOrConnectWithoutCoachInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCoachInput | UserUpsertWithWhereUniqueWithoutCoachInput[]
    createMany?: UserCreateManyCoachInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCoachInput | UserUpdateWithWhereUniqueWithoutCoachInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCoachInput | UserUpdateManyWithWhereWithoutCoachInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type TrainingMenuUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TrainingMenuCreateWithoutAuthorInput, TrainingMenuUncheckedCreateWithoutAuthorInput> | TrainingMenuCreateWithoutAuthorInput[] | TrainingMenuUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TrainingMenuCreateOrConnectWithoutAuthorInput | TrainingMenuCreateOrConnectWithoutAuthorInput[]
    upsert?: TrainingMenuUpsertWithWhereUniqueWithoutAuthorInput | TrainingMenuUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TrainingMenuCreateManyAuthorInputEnvelope
    set?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    disconnect?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    delete?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    connect?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    update?: TrainingMenuUpdateWithWhereUniqueWithoutAuthorInput | TrainingMenuUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TrainingMenuUpdateManyWithWhereWithoutAuthorInput | TrainingMenuUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TrainingMenuScalarWhereInput | TrainingMenuScalarWhereInput[]
  }

  export type TrainingMenuUpdateManyWithoutClientNestedInput = {
    create?: XOR<TrainingMenuCreateWithoutClientInput, TrainingMenuUncheckedCreateWithoutClientInput> | TrainingMenuCreateWithoutClientInput[] | TrainingMenuUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TrainingMenuCreateOrConnectWithoutClientInput | TrainingMenuCreateOrConnectWithoutClientInput[]
    upsert?: TrainingMenuUpsertWithWhereUniqueWithoutClientInput | TrainingMenuUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: TrainingMenuCreateManyClientInputEnvelope
    set?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    disconnect?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    delete?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    connect?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    update?: TrainingMenuUpdateWithWhereUniqueWithoutClientInput | TrainingMenuUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: TrainingMenuUpdateManyWithWhereWithoutClientInput | TrainingMenuUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: TrainingMenuScalarWhereInput | TrainingMenuScalarWhereInput[]
  }

  export type UserRecapUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRecapCreateWithoutUserInput, UserRecapUncheckedCreateWithoutUserInput> | UserRecapCreateWithoutUserInput[] | UserRecapUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRecapCreateOrConnectWithoutUserInput | UserRecapCreateOrConnectWithoutUserInput[]
    upsert?: UserRecapUpsertWithWhereUniqueWithoutUserInput | UserRecapUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRecapCreateManyUserInputEnvelope
    set?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    disconnect?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    delete?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    connect?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    update?: UserRecapUpdateWithWhereUniqueWithoutUserInput | UserRecapUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRecapUpdateManyWithWhereWithoutUserInput | UserRecapUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRecapScalarWhereInput | UserRecapScalarWhereInput[]
  }

  export type ActivityLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutUserInput | ActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutUserInput | ActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutUserInput | ActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCoachNestedInput = {
    create?: XOR<UserCreateWithoutCoachInput, UserUncheckedCreateWithoutCoachInput> | UserCreateWithoutCoachInput[] | UserUncheckedCreateWithoutCoachInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCoachInput | UserCreateOrConnectWithoutCoachInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCoachInput | UserUpsertWithWhereUniqueWithoutCoachInput[]
    createMany?: UserCreateManyCoachInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCoachInput | UserUpdateWithWhereUniqueWithoutCoachInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCoachInput | UserUpdateManyWithWhereWithoutCoachInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type TrainingMenuUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TrainingMenuCreateWithoutAuthorInput, TrainingMenuUncheckedCreateWithoutAuthorInput> | TrainingMenuCreateWithoutAuthorInput[] | TrainingMenuUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TrainingMenuCreateOrConnectWithoutAuthorInput | TrainingMenuCreateOrConnectWithoutAuthorInput[]
    upsert?: TrainingMenuUpsertWithWhereUniqueWithoutAuthorInput | TrainingMenuUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TrainingMenuCreateManyAuthorInputEnvelope
    set?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    disconnect?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    delete?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    connect?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    update?: TrainingMenuUpdateWithWhereUniqueWithoutAuthorInput | TrainingMenuUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TrainingMenuUpdateManyWithWhereWithoutAuthorInput | TrainingMenuUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TrainingMenuScalarWhereInput | TrainingMenuScalarWhereInput[]
  }

  export type TrainingMenuUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<TrainingMenuCreateWithoutClientInput, TrainingMenuUncheckedCreateWithoutClientInput> | TrainingMenuCreateWithoutClientInput[] | TrainingMenuUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TrainingMenuCreateOrConnectWithoutClientInput | TrainingMenuCreateOrConnectWithoutClientInput[]
    upsert?: TrainingMenuUpsertWithWhereUniqueWithoutClientInput | TrainingMenuUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: TrainingMenuCreateManyClientInputEnvelope
    set?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    disconnect?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    delete?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    connect?: TrainingMenuWhereUniqueInput | TrainingMenuWhereUniqueInput[]
    update?: TrainingMenuUpdateWithWhereUniqueWithoutClientInput | TrainingMenuUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: TrainingMenuUpdateManyWithWhereWithoutClientInput | TrainingMenuUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: TrainingMenuScalarWhereInput | TrainingMenuScalarWhereInput[]
  }

  export type UserRecapUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRecapCreateWithoutUserInput, UserRecapUncheckedCreateWithoutUserInput> | UserRecapCreateWithoutUserInput[] | UserRecapUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRecapCreateOrConnectWithoutUserInput | UserRecapCreateOrConnectWithoutUserInput[]
    upsert?: UserRecapUpsertWithWhereUniqueWithoutUserInput | UserRecapUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRecapCreateManyUserInputEnvelope
    set?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    disconnect?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    delete?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    connect?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    update?: UserRecapUpdateWithWhereUniqueWithoutUserInput | UserRecapUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRecapUpdateManyWithWhereWithoutUserInput | UserRecapUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRecapScalarWhereInput | UserRecapScalarWhereInput[]
  }

  export type ActivityLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutUserInput | ActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutUserInput | ActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutUserInput | ActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTrainingMenusInput = {
    create?: XOR<UserCreateWithoutTrainingMenusInput, UserUncheckedCreateWithoutTrainingMenusInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainingMenusInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutClientMenusInput = {
    create?: XOR<UserCreateWithoutClientMenusInput, UserUncheckedCreateWithoutClientMenusInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientMenusInput
    connect?: UserWhereUniqueInput
  }

  export type UserRecapCreateNestedManyWithoutMenuInput = {
    create?: XOR<UserRecapCreateWithoutMenuInput, UserRecapUncheckedCreateWithoutMenuInput> | UserRecapCreateWithoutMenuInput[] | UserRecapUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: UserRecapCreateOrConnectWithoutMenuInput | UserRecapCreateOrConnectWithoutMenuInput[]
    createMany?: UserRecapCreateManyMenuInputEnvelope
    connect?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
  }

  export type UserRecapUncheckedCreateNestedManyWithoutMenuInput = {
    create?: XOR<UserRecapCreateWithoutMenuInput, UserRecapUncheckedCreateWithoutMenuInput> | UserRecapCreateWithoutMenuInput[] | UserRecapUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: UserRecapCreateOrConnectWithoutMenuInput | UserRecapCreateOrConnectWithoutMenuInput[]
    createMany?: UserRecapCreateManyMenuInputEnvelope
    connect?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutTrainingMenusNestedInput = {
    create?: XOR<UserCreateWithoutTrainingMenusInput, UserUncheckedCreateWithoutTrainingMenusInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainingMenusInput
    upsert?: UserUpsertWithoutTrainingMenusInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTrainingMenusInput, UserUpdateWithoutTrainingMenusInput>, UserUncheckedUpdateWithoutTrainingMenusInput>
  }

  export type UserUpdateOneWithoutClientMenusNestedInput = {
    create?: XOR<UserCreateWithoutClientMenusInput, UserUncheckedCreateWithoutClientMenusInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientMenusInput
    upsert?: UserUpsertWithoutClientMenusInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClientMenusInput, UserUpdateWithoutClientMenusInput>, UserUncheckedUpdateWithoutClientMenusInput>
  }

  export type UserRecapUpdateManyWithoutMenuNestedInput = {
    create?: XOR<UserRecapCreateWithoutMenuInput, UserRecapUncheckedCreateWithoutMenuInput> | UserRecapCreateWithoutMenuInput[] | UserRecapUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: UserRecapCreateOrConnectWithoutMenuInput | UserRecapCreateOrConnectWithoutMenuInput[]
    upsert?: UserRecapUpsertWithWhereUniqueWithoutMenuInput | UserRecapUpsertWithWhereUniqueWithoutMenuInput[]
    createMany?: UserRecapCreateManyMenuInputEnvelope
    set?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    disconnect?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    delete?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    connect?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    update?: UserRecapUpdateWithWhereUniqueWithoutMenuInput | UserRecapUpdateWithWhereUniqueWithoutMenuInput[]
    updateMany?: UserRecapUpdateManyWithWhereWithoutMenuInput | UserRecapUpdateManyWithWhereWithoutMenuInput[]
    deleteMany?: UserRecapScalarWhereInput | UserRecapScalarWhereInput[]
  }

  export type UserRecapUncheckedUpdateManyWithoutMenuNestedInput = {
    create?: XOR<UserRecapCreateWithoutMenuInput, UserRecapUncheckedCreateWithoutMenuInput> | UserRecapCreateWithoutMenuInput[] | UserRecapUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: UserRecapCreateOrConnectWithoutMenuInput | UserRecapCreateOrConnectWithoutMenuInput[]
    upsert?: UserRecapUpsertWithWhereUniqueWithoutMenuInput | UserRecapUpsertWithWhereUniqueWithoutMenuInput[]
    createMany?: UserRecapCreateManyMenuInputEnvelope
    set?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    disconnect?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    delete?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    connect?: UserRecapWhereUniqueInput | UserRecapWhereUniqueInput[]
    update?: UserRecapUpdateWithWhereUniqueWithoutMenuInput | UserRecapUpdateWithWhereUniqueWithoutMenuInput[]
    updateMany?: UserRecapUpdateManyWithWhereWithoutMenuInput | UserRecapUpdateManyWithWhereWithoutMenuInput[]
    deleteMany?: UserRecapScalarWhereInput | UserRecapScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRecapsInput = {
    create?: XOR<UserCreateWithoutRecapsInput, UserUncheckedCreateWithoutRecapsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecapsInput
    connect?: UserWhereUniqueInput
  }

  export type TrainingMenuCreateNestedOneWithoutRecapsInput = {
    create?: XOR<TrainingMenuCreateWithoutRecapsInput, TrainingMenuUncheckedCreateWithoutRecapsInput>
    connectOrCreate?: TrainingMenuCreateOrConnectWithoutRecapsInput
    connect?: TrainingMenuWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutRecapsNestedInput = {
    create?: XOR<UserCreateWithoutRecapsInput, UserUncheckedCreateWithoutRecapsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecapsInput
    upsert?: UserUpsertWithoutRecapsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRecapsInput, UserUpdateWithoutRecapsInput>, UserUncheckedUpdateWithoutRecapsInput>
  }

  export type TrainingMenuUpdateOneWithoutRecapsNestedInput = {
    create?: XOR<TrainingMenuCreateWithoutRecapsInput, TrainingMenuUncheckedCreateWithoutRecapsInput>
    connectOrCreate?: TrainingMenuCreateOrConnectWithoutRecapsInput
    upsert?: TrainingMenuUpsertWithoutRecapsInput
    disconnect?: TrainingMenuWhereInput | boolean
    delete?: TrainingMenuWhereInput | boolean
    connect?: TrainingMenuWhereUniqueInput
    update?: XOR<XOR<TrainingMenuUpdateToOneWithWhereWithoutRecapsInput, TrainingMenuUpdateWithoutRecapsInput>, TrainingMenuUncheckedUpdateWithoutRecapsInput>
  }

  export type UserCreateNestedOneWithoutActivityLogsInput = {
    create?: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutActivityLogsNestedInput = {
    create?: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityLogsInput
    upsert?: UserUpsertWithoutActivityLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivityLogsInput, UserUpdateWithoutActivityLogsInput>, UserUncheckedUpdateWithoutActivityLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserCreateWithoutClientsInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
    coach?: UserCreateNestedOneWithoutClientsInput
    trainingMenus?: TrainingMenuCreateNestedManyWithoutAuthorInput
    clientMenus?: TrainingMenuCreateNestedManyWithoutClientInput
    recaps?: UserRecapCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClientsInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    coachId?: string | null
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
    trainingMenus?: TrainingMenuUncheckedCreateNestedManyWithoutAuthorInput
    clientMenus?: TrainingMenuUncheckedCreateNestedManyWithoutClientInput
    recaps?: UserRecapUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClientsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClientsInput, UserUncheckedCreateWithoutClientsInput>
  }

  export type UserCreateWithoutCoachInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
    clients?: UserCreateNestedManyWithoutCoachInput
    trainingMenus?: TrainingMenuCreateNestedManyWithoutAuthorInput
    clientMenus?: TrainingMenuCreateNestedManyWithoutClientInput
    recaps?: UserRecapCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCoachInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
    clients?: UserUncheckedCreateNestedManyWithoutCoachInput
    trainingMenus?: TrainingMenuUncheckedCreateNestedManyWithoutAuthorInput
    clientMenus?: TrainingMenuUncheckedCreateNestedManyWithoutClientInput
    recaps?: UserRecapUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCoachInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCoachInput, UserUncheckedCreateWithoutCoachInput>
  }

  export type UserCreateManyCoachInputEnvelope = {
    data: UserCreateManyCoachInput | UserCreateManyCoachInput[]
    skipDuplicates?: boolean
  }

  export type TrainingMenuCreateWithoutAuthorInput = {
    id?: string
    name?: string
    exerciseList: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    client?: UserCreateNestedOneWithoutClientMenusInput
    recaps?: UserRecapCreateNestedManyWithoutMenuInput
  }

  export type TrainingMenuUncheckedCreateWithoutAuthorInput = {
    id?: string
    name?: string
    clientId?: string | null
    exerciseList: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    recaps?: UserRecapUncheckedCreateNestedManyWithoutMenuInput
  }

  export type TrainingMenuCreateOrConnectWithoutAuthorInput = {
    where: TrainingMenuWhereUniqueInput
    create: XOR<TrainingMenuCreateWithoutAuthorInput, TrainingMenuUncheckedCreateWithoutAuthorInput>
  }

  export type TrainingMenuCreateManyAuthorInputEnvelope = {
    data: TrainingMenuCreateManyAuthorInput | TrainingMenuCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type TrainingMenuCreateWithoutClientInput = {
    id?: string
    name?: string
    exerciseList: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    author: UserCreateNestedOneWithoutTrainingMenusInput
    recaps?: UserRecapCreateNestedManyWithoutMenuInput
  }

  export type TrainingMenuUncheckedCreateWithoutClientInput = {
    id?: string
    name?: string
    authorId: string
    exerciseList: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    recaps?: UserRecapUncheckedCreateNestedManyWithoutMenuInput
  }

  export type TrainingMenuCreateOrConnectWithoutClientInput = {
    where: TrainingMenuWhereUniqueInput
    create: XOR<TrainingMenuCreateWithoutClientInput, TrainingMenuUncheckedCreateWithoutClientInput>
  }

  export type TrainingMenuCreateManyClientInputEnvelope = {
    data: TrainingMenuCreateManyClientInput | TrainingMenuCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type UserRecapCreateWithoutUserInput = {
    id?: string
    sessionSummary: JsonNullValueInput | InputJsonValue
    isCompleted?: boolean
    sessionDuration?: number
    completedAt?: Date | string
    mongodbId?: string | null
    menu?: TrainingMenuCreateNestedOneWithoutRecapsInput
  }

  export type UserRecapUncheckedCreateWithoutUserInput = {
    id?: string
    menuId?: string | null
    sessionSummary: JsonNullValueInput | InputJsonValue
    isCompleted?: boolean
    sessionDuration?: number
    completedAt?: Date | string
    mongodbId?: string | null
  }

  export type UserRecapCreateOrConnectWithoutUserInput = {
    where: UserRecapWhereUniqueInput
    create: XOR<UserRecapCreateWithoutUserInput, UserRecapUncheckedCreateWithoutUserInput>
  }

  export type UserRecapCreateManyUserInputEnvelope = {
    data: UserRecapCreateManyUserInput | UserRecapCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActivityLogCreateWithoutUserInput = {
    id?: string
    timeStamp?: Date | string
    status?: string | null
    confidence?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ActivityLogUncheckedCreateWithoutUserInput = {
    id?: string
    timeStamp?: Date | string
    status?: string | null
    confidence?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ActivityLogCreateOrConnectWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    create: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput>
  }

  export type ActivityLogCreateManyUserInputEnvelope = {
    data: ActivityLogCreateManyUserInput | ActivityLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutClientsInput = {
    update: XOR<UserUpdateWithoutClientsInput, UserUncheckedUpdateWithoutClientsInput>
    create: XOR<UserCreateWithoutClientsInput, UserUncheckedCreateWithoutClientsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClientsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClientsInput, UserUncheckedUpdateWithoutClientsInput>
  }

  export type UserUpdateWithoutClientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coach?: UserUpdateOneWithoutClientsNestedInput
    trainingMenus?: TrainingMenuUpdateManyWithoutAuthorNestedInput
    clientMenus?: TrainingMenuUpdateManyWithoutClientNestedInput
    recaps?: UserRecapUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    coachId?: NullableStringFieldUpdateOperationsInput | string | null
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingMenus?: TrainingMenuUncheckedUpdateManyWithoutAuthorNestedInput
    clientMenus?: TrainingMenuUncheckedUpdateManyWithoutClientNestedInput
    recaps?: UserRecapUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutCoachInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCoachInput, UserUncheckedUpdateWithoutCoachInput>
    create: XOR<UserCreateWithoutCoachInput, UserUncheckedCreateWithoutCoachInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCoachInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCoachInput, UserUncheckedUpdateWithoutCoachInput>
  }

  export type UserUpdateManyWithWhereWithoutCoachInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCoachInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    name?: StringFilter<"User"> | string
    birthDate?: DateTimeNullableFilter<"User"> | Date | string | null
    gender?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    coachId?: StringNullableFilter<"User"> | string | null
    totpSecret?: StringNullableFilter<"User"> | string | null
    totpEnabled?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type TrainingMenuUpsertWithWhereUniqueWithoutAuthorInput = {
    where: TrainingMenuWhereUniqueInput
    update: XOR<TrainingMenuUpdateWithoutAuthorInput, TrainingMenuUncheckedUpdateWithoutAuthorInput>
    create: XOR<TrainingMenuCreateWithoutAuthorInput, TrainingMenuUncheckedCreateWithoutAuthorInput>
  }

  export type TrainingMenuUpdateWithWhereUniqueWithoutAuthorInput = {
    where: TrainingMenuWhereUniqueInput
    data: XOR<TrainingMenuUpdateWithoutAuthorInput, TrainingMenuUncheckedUpdateWithoutAuthorInput>
  }

  export type TrainingMenuUpdateManyWithWhereWithoutAuthorInput = {
    where: TrainingMenuScalarWhereInput
    data: XOR<TrainingMenuUpdateManyMutationInput, TrainingMenuUncheckedUpdateManyWithoutAuthorInput>
  }

  export type TrainingMenuScalarWhereInput = {
    AND?: TrainingMenuScalarWhereInput | TrainingMenuScalarWhereInput[]
    OR?: TrainingMenuScalarWhereInput[]
    NOT?: TrainingMenuScalarWhereInput | TrainingMenuScalarWhereInput[]
    id?: StringFilter<"TrainingMenu"> | string
    name?: StringFilter<"TrainingMenu"> | string
    authorId?: StringFilter<"TrainingMenu"> | string
    clientId?: StringNullableFilter<"TrainingMenu"> | string | null
    exerciseList?: JsonFilter<"TrainingMenu">
    createdAt?: DateTimeFilter<"TrainingMenu"> | Date | string
  }

  export type TrainingMenuUpsertWithWhereUniqueWithoutClientInput = {
    where: TrainingMenuWhereUniqueInput
    update: XOR<TrainingMenuUpdateWithoutClientInput, TrainingMenuUncheckedUpdateWithoutClientInput>
    create: XOR<TrainingMenuCreateWithoutClientInput, TrainingMenuUncheckedCreateWithoutClientInput>
  }

  export type TrainingMenuUpdateWithWhereUniqueWithoutClientInput = {
    where: TrainingMenuWhereUniqueInput
    data: XOR<TrainingMenuUpdateWithoutClientInput, TrainingMenuUncheckedUpdateWithoutClientInput>
  }

  export type TrainingMenuUpdateManyWithWhereWithoutClientInput = {
    where: TrainingMenuScalarWhereInput
    data: XOR<TrainingMenuUpdateManyMutationInput, TrainingMenuUncheckedUpdateManyWithoutClientInput>
  }

  export type UserRecapUpsertWithWhereUniqueWithoutUserInput = {
    where: UserRecapWhereUniqueInput
    update: XOR<UserRecapUpdateWithoutUserInput, UserRecapUncheckedUpdateWithoutUserInput>
    create: XOR<UserRecapCreateWithoutUserInput, UserRecapUncheckedCreateWithoutUserInput>
  }

  export type UserRecapUpdateWithWhereUniqueWithoutUserInput = {
    where: UserRecapWhereUniqueInput
    data: XOR<UserRecapUpdateWithoutUserInput, UserRecapUncheckedUpdateWithoutUserInput>
  }

  export type UserRecapUpdateManyWithWhereWithoutUserInput = {
    where: UserRecapScalarWhereInput
    data: XOR<UserRecapUpdateManyMutationInput, UserRecapUncheckedUpdateManyWithoutUserInput>
  }

  export type UserRecapScalarWhereInput = {
    AND?: UserRecapScalarWhereInput | UserRecapScalarWhereInput[]
    OR?: UserRecapScalarWhereInput[]
    NOT?: UserRecapScalarWhereInput | UserRecapScalarWhereInput[]
    id?: StringFilter<"UserRecap"> | string
    userId?: StringFilter<"UserRecap"> | string
    menuId?: StringNullableFilter<"UserRecap"> | string | null
    sessionSummary?: JsonFilter<"UserRecap">
    isCompleted?: BoolFilter<"UserRecap"> | boolean
    sessionDuration?: IntFilter<"UserRecap"> | number
    completedAt?: DateTimeFilter<"UserRecap"> | Date | string
    mongodbId?: StringNullableFilter<"UserRecap"> | string | null
  }

  export type ActivityLogUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    update: XOR<ActivityLogUpdateWithoutUserInput, ActivityLogUncheckedUpdateWithoutUserInput>
    create: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput>
  }

  export type ActivityLogUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    data: XOR<ActivityLogUpdateWithoutUserInput, ActivityLogUncheckedUpdateWithoutUserInput>
  }

  export type ActivityLogUpdateManyWithWhereWithoutUserInput = {
    where: ActivityLogScalarWhereInput
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyWithoutUserInput>
  }

  export type ActivityLogScalarWhereInput = {
    AND?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    OR?: ActivityLogScalarWhereInput[]
    NOT?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    userId?: StringFilter<"ActivityLog"> | string
    timeStamp?: DateTimeFilter<"ActivityLog"> | Date | string
    status?: StringNullableFilter<"ActivityLog"> | string | null
    confidence?: StringNullableFilter<"ActivityLog"> | string | null
    details?: JsonNullableFilter<"ActivityLog">
  }

  export type UserCreateWithoutTrainingMenusInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
    coach?: UserCreateNestedOneWithoutClientsInput
    clients?: UserCreateNestedManyWithoutCoachInput
    clientMenus?: TrainingMenuCreateNestedManyWithoutClientInput
    recaps?: UserRecapCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTrainingMenusInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    coachId?: string | null
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
    clients?: UserUncheckedCreateNestedManyWithoutCoachInput
    clientMenus?: TrainingMenuUncheckedCreateNestedManyWithoutClientInput
    recaps?: UserRecapUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTrainingMenusInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTrainingMenusInput, UserUncheckedCreateWithoutTrainingMenusInput>
  }

  export type UserCreateWithoutClientMenusInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
    coach?: UserCreateNestedOneWithoutClientsInput
    clients?: UserCreateNestedManyWithoutCoachInput
    trainingMenus?: TrainingMenuCreateNestedManyWithoutAuthorInput
    recaps?: UserRecapCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClientMenusInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    coachId?: string | null
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
    clients?: UserUncheckedCreateNestedManyWithoutCoachInput
    trainingMenus?: TrainingMenuUncheckedCreateNestedManyWithoutAuthorInput
    recaps?: UserRecapUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClientMenusInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClientMenusInput, UserUncheckedCreateWithoutClientMenusInput>
  }

  export type UserRecapCreateWithoutMenuInput = {
    id?: string
    sessionSummary: JsonNullValueInput | InputJsonValue
    isCompleted?: boolean
    sessionDuration?: number
    completedAt?: Date | string
    mongodbId?: string | null
    user: UserCreateNestedOneWithoutRecapsInput
  }

  export type UserRecapUncheckedCreateWithoutMenuInput = {
    id?: string
    userId: string
    sessionSummary: JsonNullValueInput | InputJsonValue
    isCompleted?: boolean
    sessionDuration?: number
    completedAt?: Date | string
    mongodbId?: string | null
  }

  export type UserRecapCreateOrConnectWithoutMenuInput = {
    where: UserRecapWhereUniqueInput
    create: XOR<UserRecapCreateWithoutMenuInput, UserRecapUncheckedCreateWithoutMenuInput>
  }

  export type UserRecapCreateManyMenuInputEnvelope = {
    data: UserRecapCreateManyMenuInput | UserRecapCreateManyMenuInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTrainingMenusInput = {
    update: XOR<UserUpdateWithoutTrainingMenusInput, UserUncheckedUpdateWithoutTrainingMenusInput>
    create: XOR<UserCreateWithoutTrainingMenusInput, UserUncheckedCreateWithoutTrainingMenusInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTrainingMenusInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTrainingMenusInput, UserUncheckedUpdateWithoutTrainingMenusInput>
  }

  export type UserUpdateWithoutTrainingMenusInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coach?: UserUpdateOneWithoutClientsNestedInput
    clients?: UserUpdateManyWithoutCoachNestedInput
    clientMenus?: TrainingMenuUpdateManyWithoutClientNestedInput
    recaps?: UserRecapUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTrainingMenusInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    coachId?: NullableStringFieldUpdateOperationsInput | string | null
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: UserUncheckedUpdateManyWithoutCoachNestedInput
    clientMenus?: TrainingMenuUncheckedUpdateManyWithoutClientNestedInput
    recaps?: UserRecapUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutClientMenusInput = {
    update: XOR<UserUpdateWithoutClientMenusInput, UserUncheckedUpdateWithoutClientMenusInput>
    create: XOR<UserCreateWithoutClientMenusInput, UserUncheckedCreateWithoutClientMenusInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClientMenusInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClientMenusInput, UserUncheckedUpdateWithoutClientMenusInput>
  }

  export type UserUpdateWithoutClientMenusInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coach?: UserUpdateOneWithoutClientsNestedInput
    clients?: UserUpdateManyWithoutCoachNestedInput
    trainingMenus?: TrainingMenuUpdateManyWithoutAuthorNestedInput
    recaps?: UserRecapUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClientMenusInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    coachId?: NullableStringFieldUpdateOperationsInput | string | null
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: UserUncheckedUpdateManyWithoutCoachNestedInput
    trainingMenus?: TrainingMenuUncheckedUpdateManyWithoutAuthorNestedInput
    recaps?: UserRecapUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserRecapUpsertWithWhereUniqueWithoutMenuInput = {
    where: UserRecapWhereUniqueInput
    update: XOR<UserRecapUpdateWithoutMenuInput, UserRecapUncheckedUpdateWithoutMenuInput>
    create: XOR<UserRecapCreateWithoutMenuInput, UserRecapUncheckedCreateWithoutMenuInput>
  }

  export type UserRecapUpdateWithWhereUniqueWithoutMenuInput = {
    where: UserRecapWhereUniqueInput
    data: XOR<UserRecapUpdateWithoutMenuInput, UserRecapUncheckedUpdateWithoutMenuInput>
  }

  export type UserRecapUpdateManyWithWhereWithoutMenuInput = {
    where: UserRecapScalarWhereInput
    data: XOR<UserRecapUpdateManyMutationInput, UserRecapUncheckedUpdateManyWithoutMenuInput>
  }

  export type UserCreateWithoutRecapsInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
    coach?: UserCreateNestedOneWithoutClientsInput
    clients?: UserCreateNestedManyWithoutCoachInput
    trainingMenus?: TrainingMenuCreateNestedManyWithoutAuthorInput
    clientMenus?: TrainingMenuCreateNestedManyWithoutClientInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRecapsInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    coachId?: string | null
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
    clients?: UserUncheckedCreateNestedManyWithoutCoachInput
    trainingMenus?: TrainingMenuUncheckedCreateNestedManyWithoutAuthorInput
    clientMenus?: TrainingMenuUncheckedCreateNestedManyWithoutClientInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRecapsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRecapsInput, UserUncheckedCreateWithoutRecapsInput>
  }

  export type TrainingMenuCreateWithoutRecapsInput = {
    id?: string
    name?: string
    exerciseList: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    author: UserCreateNestedOneWithoutTrainingMenusInput
    client?: UserCreateNestedOneWithoutClientMenusInput
  }

  export type TrainingMenuUncheckedCreateWithoutRecapsInput = {
    id?: string
    name?: string
    authorId: string
    clientId?: string | null
    exerciseList: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TrainingMenuCreateOrConnectWithoutRecapsInput = {
    where: TrainingMenuWhereUniqueInput
    create: XOR<TrainingMenuCreateWithoutRecapsInput, TrainingMenuUncheckedCreateWithoutRecapsInput>
  }

  export type UserUpsertWithoutRecapsInput = {
    update: XOR<UserUpdateWithoutRecapsInput, UserUncheckedUpdateWithoutRecapsInput>
    create: XOR<UserCreateWithoutRecapsInput, UserUncheckedCreateWithoutRecapsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRecapsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRecapsInput, UserUncheckedUpdateWithoutRecapsInput>
  }

  export type UserUpdateWithoutRecapsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coach?: UserUpdateOneWithoutClientsNestedInput
    clients?: UserUpdateManyWithoutCoachNestedInput
    trainingMenus?: TrainingMenuUpdateManyWithoutAuthorNestedInput
    clientMenus?: TrainingMenuUpdateManyWithoutClientNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRecapsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    coachId?: NullableStringFieldUpdateOperationsInput | string | null
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: UserUncheckedUpdateManyWithoutCoachNestedInput
    trainingMenus?: TrainingMenuUncheckedUpdateManyWithoutAuthorNestedInput
    clientMenus?: TrainingMenuUncheckedUpdateManyWithoutClientNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TrainingMenuUpsertWithoutRecapsInput = {
    update: XOR<TrainingMenuUpdateWithoutRecapsInput, TrainingMenuUncheckedUpdateWithoutRecapsInput>
    create: XOR<TrainingMenuCreateWithoutRecapsInput, TrainingMenuUncheckedCreateWithoutRecapsInput>
    where?: TrainingMenuWhereInput
  }

  export type TrainingMenuUpdateToOneWithWhereWithoutRecapsInput = {
    where?: TrainingMenuWhereInput
    data: XOR<TrainingMenuUpdateWithoutRecapsInput, TrainingMenuUncheckedUpdateWithoutRecapsInput>
  }

  export type TrainingMenuUpdateWithoutRecapsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exerciseList?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutTrainingMenusNestedInput
    client?: UserUpdateOneWithoutClientMenusNestedInput
  }

  export type TrainingMenuUncheckedUpdateWithoutRecapsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    exerciseList?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutActivityLogsInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
    coach?: UserCreateNestedOneWithoutClientsInput
    clients?: UserCreateNestedManyWithoutCoachInput
    trainingMenus?: TrainingMenuCreateNestedManyWithoutAuthorInput
    clientMenus?: TrainingMenuCreateNestedManyWithoutClientInput
    recaps?: UserRecapCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActivityLogsInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    coachId?: string | null
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
    clients?: UserUncheckedCreateNestedManyWithoutCoachInput
    trainingMenus?: TrainingMenuUncheckedCreateNestedManyWithoutAuthorInput
    clientMenus?: TrainingMenuUncheckedCreateNestedManyWithoutClientInput
    recaps?: UserRecapUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActivityLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
  }

  export type UserUpsertWithoutActivityLogsInput = {
    update: XOR<UserUpdateWithoutActivityLogsInput, UserUncheckedUpdateWithoutActivityLogsInput>
    create: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivityLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivityLogsInput, UserUncheckedUpdateWithoutActivityLogsInput>
  }

  export type UserUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coach?: UserUpdateOneWithoutClientsNestedInput
    clients?: UserUpdateManyWithoutCoachNestedInput
    trainingMenus?: TrainingMenuUpdateManyWithoutAuthorNestedInput
    clientMenus?: TrainingMenuUpdateManyWithoutClientNestedInput
    recaps?: UserRecapUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    coachId?: NullableStringFieldUpdateOperationsInput | string | null
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: UserUncheckedUpdateManyWithoutCoachNestedInput
    trainingMenus?: TrainingMenuUncheckedUpdateManyWithoutAuthorNestedInput
    clientMenus?: TrainingMenuUncheckedUpdateManyWithoutClientNestedInput
    recaps?: UserRecapUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyCoachInput = {
    id: string
    email?: string | null
    password?: string | null
    name: string
    birthDate?: Date | string | null
    gender?: string | null
    role: string
    totpSecret?: string | null
    totpEnabled?: boolean
    createdAt?: Date | string
  }

  export type TrainingMenuCreateManyAuthorInput = {
    id?: string
    name?: string
    clientId?: string | null
    exerciseList: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TrainingMenuCreateManyClientInput = {
    id?: string
    name?: string
    authorId: string
    exerciseList: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type UserRecapCreateManyUserInput = {
    id?: string
    menuId?: string | null
    sessionSummary: JsonNullValueInput | InputJsonValue
    isCompleted?: boolean
    sessionDuration?: number
    completedAt?: Date | string
    mongodbId?: string | null
  }

  export type ActivityLogCreateManyUserInput = {
    id?: string
    timeStamp?: Date | string
    status?: string | null
    confidence?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserUpdateWithoutCoachInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: UserUpdateManyWithoutCoachNestedInput
    trainingMenus?: TrainingMenuUpdateManyWithoutAuthorNestedInput
    clientMenus?: TrainingMenuUpdateManyWithoutClientNestedInput
    recaps?: UserRecapUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCoachInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: UserUncheckedUpdateManyWithoutCoachNestedInput
    trainingMenus?: TrainingMenuUncheckedUpdateManyWithoutAuthorNestedInput
    clientMenus?: TrainingMenuUncheckedUpdateManyWithoutClientNestedInput
    recaps?: UserRecapUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCoachInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    totpSecret?: NullableStringFieldUpdateOperationsInput | string | null
    totpEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingMenuUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exerciseList?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: UserUpdateOneWithoutClientMenusNestedInput
    recaps?: UserRecapUpdateManyWithoutMenuNestedInput
  }

  export type TrainingMenuUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    exerciseList?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recaps?: UserRecapUncheckedUpdateManyWithoutMenuNestedInput
  }

  export type TrainingMenuUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    exerciseList?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingMenuUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exerciseList?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutTrainingMenusNestedInput
    recaps?: UserRecapUpdateManyWithoutMenuNestedInput
  }

  export type TrainingMenuUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    exerciseList?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recaps?: UserRecapUncheckedUpdateManyWithoutMenuNestedInput
  }

  export type TrainingMenuUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    exerciseList?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRecapUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionSummary?: JsonNullValueInput | InputJsonValue
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    sessionDuration?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mongodbId?: NullableStringFieldUpdateOperationsInput | string | null
    menu?: TrainingMenuUpdateOneWithoutRecapsNestedInput
  }

  export type UserRecapUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    menuId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionSummary?: JsonNullValueInput | InputJsonValue
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    sessionDuration?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mongodbId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserRecapUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    menuId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionSummary?: JsonNullValueInput | InputJsonValue
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    sessionDuration?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mongodbId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ActivityLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ActivityLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserRecapCreateManyMenuInput = {
    id?: string
    userId: string
    sessionSummary: JsonNullValueInput | InputJsonValue
    isCompleted?: boolean
    sessionDuration?: number
    completedAt?: Date | string
    mongodbId?: string | null
  }

  export type UserRecapUpdateWithoutMenuInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionSummary?: JsonNullValueInput | InputJsonValue
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    sessionDuration?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mongodbId?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutRecapsNestedInput
  }

  export type UserRecapUncheckedUpdateWithoutMenuInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sessionSummary?: JsonNullValueInput | InputJsonValue
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    sessionDuration?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mongodbId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserRecapUncheckedUpdateManyWithoutMenuInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sessionSummary?: JsonNullValueInput | InputJsonValue
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    sessionDuration?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mongodbId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}