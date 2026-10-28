
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
 * Model ClassRoom
 * 
 */
export type ClassRoom = $Result.DefaultSelection<Prisma.$ClassRoomPayload>
/**
 * Model ClassMember
 * 
 */
export type ClassMember = $Result.DefaultSelection<Prisma.$ClassMemberPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Submission
 * 
 */
export type Submission = $Result.DefaultSelection<Prisma.$SubmissionPayload>
/**
 * Model ScoreSync
 * 
 */
export type ScoreSync = $Result.DefaultSelection<Prisma.$ScoreSyncPayload>

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
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.classRoom`: Exposes CRUD operations for the **ClassRoom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClassRooms
    * const classRooms = await prisma.classRoom.findMany()
    * ```
    */
  get classRoom(): Prisma.ClassRoomDelegate<ExtArgs>;

  /**
   * `prisma.classMember`: Exposes CRUD operations for the **ClassMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClassMembers
    * const classMembers = await prisma.classMember.findMany()
    * ```
    */
  get classMember(): Prisma.ClassMemberDelegate<ExtArgs>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs>;

  /**
   * `prisma.submission`: Exposes CRUD operations for the **Submission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Submissions
    * const submissions = await prisma.submission.findMany()
    * ```
    */
  get submission(): Prisma.SubmissionDelegate<ExtArgs>;

  /**
   * `prisma.scoreSync`: Exposes CRUD operations for the **ScoreSync** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScoreSyncs
    * const scoreSyncs = await prisma.scoreSync.findMany()
    * ```
    */
  get scoreSync(): Prisma.ScoreSyncDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    ClassRoom: 'ClassRoom',
    ClassMember: 'ClassMember',
    Task: 'Task',
    Submission: 'Submission',
    ScoreSync: 'ScoreSync'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "classRoom" | "classMember" | "task" | "submission" | "scoreSync"
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
      ClassRoom: {
        payload: Prisma.$ClassRoomPayload<ExtArgs>
        fields: Prisma.ClassRoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassRoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassRoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>
          }
          findFirst: {
            args: Prisma.ClassRoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassRoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>
          }
          findMany: {
            args: Prisma.ClassRoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>[]
          }
          create: {
            args: Prisma.ClassRoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>
          }
          createMany: {
            args: Prisma.ClassRoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassRoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>[]
          }
          delete: {
            args: Prisma.ClassRoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>
          }
          update: {
            args: Prisma.ClassRoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>
          }
          deleteMany: {
            args: Prisma.ClassRoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassRoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClassRoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>
          }
          aggregate: {
            args: Prisma.ClassRoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClassRoom>
          }
          groupBy: {
            args: Prisma.ClassRoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassRoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassRoomCountArgs<ExtArgs>
            result: $Utils.Optional<ClassRoomCountAggregateOutputType> | number
          }
        }
      }
      ClassMember: {
        payload: Prisma.$ClassMemberPayload<ExtArgs>
        fields: Prisma.ClassMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassMemberPayload>
          }
          findFirst: {
            args: Prisma.ClassMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassMemberPayload>
          }
          findMany: {
            args: Prisma.ClassMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassMemberPayload>[]
          }
          create: {
            args: Prisma.ClassMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassMemberPayload>
          }
          createMany: {
            args: Prisma.ClassMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassMemberPayload>[]
          }
          delete: {
            args: Prisma.ClassMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassMemberPayload>
          }
          update: {
            args: Prisma.ClassMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassMemberPayload>
          }
          deleteMany: {
            args: Prisma.ClassMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClassMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassMemberPayload>
          }
          aggregate: {
            args: Prisma.ClassMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClassMember>
          }
          groupBy: {
            args: Prisma.ClassMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassMemberCountArgs<ExtArgs>
            result: $Utils.Optional<ClassMemberCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Submission: {
        payload: Prisma.$SubmissionPayload<ExtArgs>
        fields: Prisma.SubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findFirst: {
            args: Prisma.SubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findMany: {
            args: Prisma.SubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          create: {
            args: Prisma.SubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          createMany: {
            args: Prisma.SubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          delete: {
            args: Prisma.SubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          update: {
            args: Prisma.SubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          deleteMany: {
            args: Prisma.SubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          aggregate: {
            args: Prisma.SubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubmission>
          }
          groupBy: {
            args: Prisma.SubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<SubmissionCountAggregateOutputType> | number
          }
        }
      }
      ScoreSync: {
        payload: Prisma.$ScoreSyncPayload<ExtArgs>
        fields: Prisma.ScoreSyncFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScoreSyncFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreSyncPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScoreSyncFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreSyncPayload>
          }
          findFirst: {
            args: Prisma.ScoreSyncFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreSyncPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScoreSyncFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreSyncPayload>
          }
          findMany: {
            args: Prisma.ScoreSyncFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreSyncPayload>[]
          }
          create: {
            args: Prisma.ScoreSyncCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreSyncPayload>
          }
          createMany: {
            args: Prisma.ScoreSyncCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScoreSyncCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreSyncPayload>[]
          }
          delete: {
            args: Prisma.ScoreSyncDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreSyncPayload>
          }
          update: {
            args: Prisma.ScoreSyncUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreSyncPayload>
          }
          deleteMany: {
            args: Prisma.ScoreSyncDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScoreSyncUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ScoreSyncUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreSyncPayload>
          }
          aggregate: {
            args: Prisma.ScoreSyncAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScoreSync>
          }
          groupBy: {
            args: Prisma.ScoreSyncGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScoreSyncGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScoreSyncCountArgs<ExtArgs>
            result: $Utils.Optional<ScoreSyncCountAggregateOutputType> | number
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
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
    classesOwned: number
    memberships: number
    submissions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classesOwned?: boolean | UserCountOutputTypeCountClassesOwnedArgs
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs
    submissions?: boolean | UserCountOutputTypeCountSubmissionsArgs
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
  export type UserCountOutputTypeCountClassesOwnedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassRoomWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }


  /**
   * Count Type ClassRoomCountOutputType
   */

  export type ClassRoomCountOutputType = {
    members: number
    tasks: number
  }

  export type ClassRoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | ClassRoomCountOutputTypeCountMembersArgs
    tasks?: boolean | ClassRoomCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * ClassRoomCountOutputType without action
   */
  export type ClassRoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoomCountOutputType
     */
    select?: ClassRoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClassRoomCountOutputType without action
   */
  export type ClassRoomCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassMemberWhereInput
  }

  /**
   * ClassRoomCountOutputType without action
   */
  export type ClassRoomCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    submissions: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submissions?: boolean | TaskCountOutputTypeCountSubmissionsArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    email: string
    passwordHash: string
    role: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    classesOwned?: boolean | User$classesOwnedArgs<ExtArgs>
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    scoreSync?: boolean | User$scoreSyncArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classesOwned?: boolean | User$classesOwnedArgs<ExtArgs>
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    scoreSync?: boolean | User$scoreSyncArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      classesOwned: Prisma.$ClassRoomPayload<ExtArgs>[]
      memberships: Prisma.$ClassMemberPayload<ExtArgs>[]
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
      scoreSync: Prisma.$ScoreSyncPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      passwordHash: string
      role: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    classesOwned<T extends User$classesOwnedArgs<ExtArgs> = {}>(args?: Subset<T, User$classesOwnedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "findMany"> | Null>
    memberships<T extends User$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassMemberPayload<ExtArgs>, T, "findMany"> | Null>
    submissions<T extends User$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, User$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany"> | Null>
    scoreSync<T extends User$scoreSyncArgs<ExtArgs> = {}>(args?: Subset<T, User$scoreSyncArgs<ExtArgs>>): Prisma__ScoreSyncClient<$Result.GetResult<Prisma.$ScoreSyncPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
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
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
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
  }

  /**
   * User.classesOwned
   */
  export type User$classesOwnedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassRoomInclude<ExtArgs> | null
    where?: ClassRoomWhereInput
    orderBy?: ClassRoomOrderByWithRelationInput | ClassRoomOrderByWithRelationInput[]
    cursor?: ClassRoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClassRoomScalarFieldEnum | ClassRoomScalarFieldEnum[]
  }

  /**
   * User.memberships
   */
  export type User$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassMember
     */
    select?: ClassMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassMemberInclude<ExtArgs> | null
    where?: ClassMemberWhereInput
    orderBy?: ClassMemberOrderByWithRelationInput | ClassMemberOrderByWithRelationInput[]
    cursor?: ClassMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClassMemberScalarFieldEnum | ClassMemberScalarFieldEnum[]
  }

  /**
   * User.submissions
   */
  export type User$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * User.scoreSync
   */
  export type User$scoreSyncArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreSync
     */
    select?: ScoreSyncSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreSyncInclude<ExtArgs> | null
    where?: ScoreSyncWhereInput
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ClassRoom
   */

  export type AggregateClassRoom = {
    _count: ClassRoomCountAggregateOutputType | null
    _avg: ClassRoomAvgAggregateOutputType | null
    _sum: ClassRoomSumAggregateOutputType | null
    _min: ClassRoomMinAggregateOutputType | null
    _max: ClassRoomMaxAggregateOutputType | null
  }

  export type ClassRoomAvgAggregateOutputType = {
    id: number | null
    teacherId: number | null
  }

  export type ClassRoomSumAggregateOutputType = {
    id: number | null
    teacherId: number | null
  }

  export type ClassRoomMinAggregateOutputType = {
    id: number | null
    name: string | null
    code: string | null
    teacherId: number | null
    createdAt: Date | null
  }

  export type ClassRoomMaxAggregateOutputType = {
    id: number | null
    name: string | null
    code: string | null
    teacherId: number | null
    createdAt: Date | null
  }

  export type ClassRoomCountAggregateOutputType = {
    id: number
    name: number
    code: number
    teacherId: number
    createdAt: number
    _all: number
  }


  export type ClassRoomAvgAggregateInputType = {
    id?: true
    teacherId?: true
  }

  export type ClassRoomSumAggregateInputType = {
    id?: true
    teacherId?: true
  }

  export type ClassRoomMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    teacherId?: true
    createdAt?: true
  }

  export type ClassRoomMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    teacherId?: true
    createdAt?: true
  }

  export type ClassRoomCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    teacherId?: true
    createdAt?: true
    _all?: true
  }

  export type ClassRoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClassRoom to aggregate.
     */
    where?: ClassRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassRooms to fetch.
     */
    orderBy?: ClassRoomOrderByWithRelationInput | ClassRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClassRooms
    **/
    _count?: true | ClassRoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClassRoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClassRoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassRoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassRoomMaxAggregateInputType
  }

  export type GetClassRoomAggregateType<T extends ClassRoomAggregateArgs> = {
        [P in keyof T & keyof AggregateClassRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClassRoom[P]>
      : GetScalarType<T[P], AggregateClassRoom[P]>
  }




  export type ClassRoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassRoomWhereInput
    orderBy?: ClassRoomOrderByWithAggregationInput | ClassRoomOrderByWithAggregationInput[]
    by: ClassRoomScalarFieldEnum[] | ClassRoomScalarFieldEnum
    having?: ClassRoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassRoomCountAggregateInputType | true
    _avg?: ClassRoomAvgAggregateInputType
    _sum?: ClassRoomSumAggregateInputType
    _min?: ClassRoomMinAggregateInputType
    _max?: ClassRoomMaxAggregateInputType
  }

  export type ClassRoomGroupByOutputType = {
    id: number
    name: string
    code: string
    teacherId: number
    createdAt: Date
    _count: ClassRoomCountAggregateOutputType | null
    _avg: ClassRoomAvgAggregateOutputType | null
    _sum: ClassRoomSumAggregateOutputType | null
    _min: ClassRoomMinAggregateOutputType | null
    _max: ClassRoomMaxAggregateOutputType | null
  }

  type GetClassRoomGroupByPayload<T extends ClassRoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassRoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassRoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassRoomGroupByOutputType[P]>
            : GetScalarType<T[P], ClassRoomGroupByOutputType[P]>
        }
      >
    >


  export type ClassRoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    teacherId?: boolean
    createdAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | ClassRoom$membersArgs<ExtArgs>
    tasks?: boolean | ClassRoom$tasksArgs<ExtArgs>
    _count?: boolean | ClassRoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["classRoom"]>

  export type ClassRoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    teacherId?: boolean
    createdAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["classRoom"]>

  export type ClassRoomSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    teacherId?: boolean
    createdAt?: boolean
  }

  export type ClassRoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | ClassRoom$membersArgs<ExtArgs>
    tasks?: boolean | ClassRoom$tasksArgs<ExtArgs>
    _count?: boolean | ClassRoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClassRoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ClassRoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClassRoom"
    objects: {
      teacher: Prisma.$UserPayload<ExtArgs>
      members: Prisma.$ClassMemberPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      code: string
      teacherId: number
      createdAt: Date
    }, ExtArgs["result"]["classRoom"]>
    composites: {}
  }

  type ClassRoomGetPayload<S extends boolean | null | undefined | ClassRoomDefaultArgs> = $Result.GetResult<Prisma.$ClassRoomPayload, S>

  type ClassRoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClassRoomFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClassRoomCountAggregateInputType | true
    }

  export interface ClassRoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClassRoom'], meta: { name: 'ClassRoom' } }
    /**
     * Find zero or one ClassRoom that matches the filter.
     * @param {ClassRoomFindUniqueArgs} args - Arguments to find a ClassRoom
     * @example
     * // Get one ClassRoom
     * const classRoom = await prisma.classRoom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassRoomFindUniqueArgs>(args: SelectSubset<T, ClassRoomFindUniqueArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ClassRoom that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClassRoomFindUniqueOrThrowArgs} args - Arguments to find a ClassRoom
     * @example
     * // Get one ClassRoom
     * const classRoom = await prisma.classRoom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassRoomFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassRoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ClassRoom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassRoomFindFirstArgs} args - Arguments to find a ClassRoom
     * @example
     * // Get one ClassRoom
     * const classRoom = await prisma.classRoom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassRoomFindFirstArgs>(args?: SelectSubset<T, ClassRoomFindFirstArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ClassRoom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassRoomFindFirstOrThrowArgs} args - Arguments to find a ClassRoom
     * @example
     * // Get one ClassRoom
     * const classRoom = await prisma.classRoom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassRoomFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassRoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ClassRooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassRoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClassRooms
     * const classRooms = await prisma.classRoom.findMany()
     * 
     * // Get first 10 ClassRooms
     * const classRooms = await prisma.classRoom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classRoomWithIdOnly = await prisma.classRoom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassRoomFindManyArgs>(args?: SelectSubset<T, ClassRoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ClassRoom.
     * @param {ClassRoomCreateArgs} args - Arguments to create a ClassRoom.
     * @example
     * // Create one ClassRoom
     * const ClassRoom = await prisma.classRoom.create({
     *   data: {
     *     // ... data to create a ClassRoom
     *   }
     * })
     * 
     */
    create<T extends ClassRoomCreateArgs>(args: SelectSubset<T, ClassRoomCreateArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ClassRooms.
     * @param {ClassRoomCreateManyArgs} args - Arguments to create many ClassRooms.
     * @example
     * // Create many ClassRooms
     * const classRoom = await prisma.classRoom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassRoomCreateManyArgs>(args?: SelectSubset<T, ClassRoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClassRooms and returns the data saved in the database.
     * @param {ClassRoomCreateManyAndReturnArgs} args - Arguments to create many ClassRooms.
     * @example
     * // Create many ClassRooms
     * const classRoom = await prisma.classRoom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClassRooms and only return the `id`
     * const classRoomWithIdOnly = await prisma.classRoom.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassRoomCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassRoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ClassRoom.
     * @param {ClassRoomDeleteArgs} args - Arguments to delete one ClassRoom.
     * @example
     * // Delete one ClassRoom
     * const ClassRoom = await prisma.classRoom.delete({
     *   where: {
     *     // ... filter to delete one ClassRoom
     *   }
     * })
     * 
     */
    delete<T extends ClassRoomDeleteArgs>(args: SelectSubset<T, ClassRoomDeleteArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ClassRoom.
     * @param {ClassRoomUpdateArgs} args - Arguments to update one ClassRoom.
     * @example
     * // Update one ClassRoom
     * const classRoom = await prisma.classRoom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassRoomUpdateArgs>(args: SelectSubset<T, ClassRoomUpdateArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ClassRooms.
     * @param {ClassRoomDeleteManyArgs} args - Arguments to filter ClassRooms to delete.
     * @example
     * // Delete a few ClassRooms
     * const { count } = await prisma.classRoom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassRoomDeleteManyArgs>(args?: SelectSubset<T, ClassRoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClassRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassRoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClassRooms
     * const classRoom = await prisma.classRoom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassRoomUpdateManyArgs>(args: SelectSubset<T, ClassRoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ClassRoom.
     * @param {ClassRoomUpsertArgs} args - Arguments to update or create a ClassRoom.
     * @example
     * // Update or create a ClassRoom
     * const classRoom = await prisma.classRoom.upsert({
     *   create: {
     *     // ... data to create a ClassRoom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClassRoom we want to update
     *   }
     * })
     */
    upsert<T extends ClassRoomUpsertArgs>(args: SelectSubset<T, ClassRoomUpsertArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ClassRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassRoomCountArgs} args - Arguments to filter ClassRooms to count.
     * @example
     * // Count the number of ClassRooms
     * const count = await prisma.classRoom.count({
     *   where: {
     *     // ... the filter for the ClassRooms we want to count
     *   }
     * })
    **/
    count<T extends ClassRoomCountArgs>(
      args?: Subset<T, ClassRoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassRoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClassRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassRoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClassRoomAggregateArgs>(args: Subset<T, ClassRoomAggregateArgs>): Prisma.PrismaPromise<GetClassRoomAggregateType<T>>

    /**
     * Group by ClassRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassRoomGroupByArgs} args - Group by arguments.
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
      T extends ClassRoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassRoomGroupByArgs['orderBy'] }
        : { orderBy?: ClassRoomGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClassRoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClassRoom model
   */
  readonly fields: ClassRoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClassRoom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassRoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    members<T extends ClassRoom$membersArgs<ExtArgs> = {}>(args?: Subset<T, ClassRoom$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassMemberPayload<ExtArgs>, T, "findMany"> | Null>
    tasks<T extends ClassRoom$tasksArgs<ExtArgs> = {}>(args?: Subset<T, ClassRoom$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the ClassRoom model
   */ 
  interface ClassRoomFieldRefs {
    readonly id: FieldRef<"ClassRoom", 'Int'>
    readonly name: FieldRef<"ClassRoom", 'String'>
    readonly code: FieldRef<"ClassRoom", 'String'>
    readonly teacherId: FieldRef<"ClassRoom", 'Int'>
    readonly createdAt: FieldRef<"ClassRoom", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClassRoom findUnique
   */
  export type ClassRoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassRoomInclude<ExtArgs> | null
    /**
     * Filter, which ClassRoom to fetch.
     */
    where: ClassRoomWhereUniqueInput
  }

  /**
   * ClassRoom findUniqueOrThrow
   */
  export type ClassRoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassRoomInclude<ExtArgs> | null
    /**
     * Filter, which ClassRoom to fetch.
     */
    where: ClassRoomWhereUniqueInput
  }

  /**
   * ClassRoom findFirst
   */
  export type ClassRoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassRoomInclude<ExtArgs> | null
    /**
     * Filter, which ClassRoom to fetch.
     */
    where?: ClassRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassRooms to fetch.
     */
    orderBy?: ClassRoomOrderByWithRelationInput | ClassRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClassRooms.
     */
    cursor?: ClassRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClassRooms.
     */
    distinct?: ClassRoomScalarFieldEnum | ClassRoomScalarFieldEnum[]
  }

  /**
   * ClassRoom findFirstOrThrow
   */
  export type ClassRoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassRoomInclude<ExtArgs> | null
    /**
     * Filter, which ClassRoom to fetch.
     */
    where?: ClassRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassRooms to fetch.
     */
    orderBy?: ClassRoomOrderByWithRelationInput | ClassRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClassRooms.
     */
    cursor?: ClassRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClassRooms.
     */
    distinct?: ClassRoomScalarFieldEnum | ClassRoomScalarFieldEnum[]
  }

  /**
   * ClassRoom findMany
   */
  export type ClassRoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassRoomInclude<ExtArgs> | null
    /**
     * Filter, which ClassRooms to fetch.
     */
    where?: ClassRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassRooms to fetch.
     */
    orderBy?: ClassRoomOrderByWithRelationInput | ClassRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClassRooms.
     */
    cursor?: ClassRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassRooms.
     */
    skip?: number
    distinct?: ClassRoomScalarFieldEnum | ClassRoomScalarFieldEnum[]
  }

  /**
   * ClassRoom create
   */
  export type ClassRoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassRoomInclude<ExtArgs> | null
    /**
     * The data needed to create a ClassRoom.
     */
    data: XOR<ClassRoomCreateInput, ClassRoomUncheckedCreateInput>
  }

  /**
   * ClassRoom createMany
   */
  export type ClassRoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClassRooms.
     */
    data: ClassRoomCreateManyInput | ClassRoomCreateManyInput[]
  }

  /**
   * ClassRoom createManyAndReturn
   */
  export type ClassRoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ClassRooms.
     */
    data: ClassRoomCreateManyInput | ClassRoomCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassRoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClassRoom update
   */
  export type ClassRoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassRoomInclude<ExtArgs> | null
    /**
     * The data needed to update a ClassRoom.
     */
    data: XOR<ClassRoomUpdateInput, ClassRoomUncheckedUpdateInput>
    /**
     * Choose, which ClassRoom to update.
     */
    where: ClassRoomWhereUniqueInput
  }

  /**
   * ClassRoom updateMany
   */
  export type ClassRoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClassRooms.
     */
    data: XOR<ClassRoomUpdateManyMutationInput, ClassRoomUncheckedUpdateManyInput>
    /**
     * Filter which ClassRooms to update
     */
    where?: ClassRoomWhereInput
  }

  /**
   * ClassRoom upsert
   */
  export type ClassRoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassRoomInclude<ExtArgs> | null
    /**
     * The filter to search for the ClassRoom to update in case it exists.
     */
    where: ClassRoomWhereUniqueInput
    /**
     * In case the ClassRoom found by the `where` argument doesn't exist, create a new ClassRoom with this data.
     */
    create: XOR<ClassRoomCreateInput, ClassRoomUncheckedCreateInput>
    /**
     * In case the ClassRoom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassRoomUpdateInput, ClassRoomUncheckedUpdateInput>
  }

  /**
   * ClassRoom delete
   */
  export type ClassRoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassRoomInclude<ExtArgs> | null
    /**
     * Filter which ClassRoom to delete.
     */
    where: ClassRoomWhereUniqueInput
  }

  /**
   * ClassRoom deleteMany
   */
  export type ClassRoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClassRooms to delete
     */
    where?: ClassRoomWhereInput
  }

  /**
   * ClassRoom.members
   */
  export type ClassRoom$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassMember
     */
    select?: ClassMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassMemberInclude<ExtArgs> | null
    where?: ClassMemberWhereInput
    orderBy?: ClassMemberOrderByWithRelationInput | ClassMemberOrderByWithRelationInput[]
    cursor?: ClassMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClassMemberScalarFieldEnum | ClassMemberScalarFieldEnum[]
  }

  /**
   * ClassRoom.tasks
   */
  export type ClassRoom$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * ClassRoom without action
   */
  export type ClassRoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassRoomInclude<ExtArgs> | null
  }


  /**
   * Model ClassMember
   */

  export type AggregateClassMember = {
    _count: ClassMemberCountAggregateOutputType | null
    _avg: ClassMemberAvgAggregateOutputType | null
    _sum: ClassMemberSumAggregateOutputType | null
    _min: ClassMemberMinAggregateOutputType | null
    _max: ClassMemberMaxAggregateOutputType | null
  }

  export type ClassMemberAvgAggregateOutputType = {
    id: number | null
    classId: number | null
    userId: number | null
  }

  export type ClassMemberSumAggregateOutputType = {
    id: number | null
    classId: number | null
    userId: number | null
  }

  export type ClassMemberMinAggregateOutputType = {
    id: number | null
    classId: number | null
    userId: number | null
    joinedAt: Date | null
  }

  export type ClassMemberMaxAggregateOutputType = {
    id: number | null
    classId: number | null
    userId: number | null
    joinedAt: Date | null
  }

  export type ClassMemberCountAggregateOutputType = {
    id: number
    classId: number
    userId: number
    joinedAt: number
    _all: number
  }


  export type ClassMemberAvgAggregateInputType = {
    id?: true
    classId?: true
    userId?: true
  }

  export type ClassMemberSumAggregateInputType = {
    id?: true
    classId?: true
    userId?: true
  }

  export type ClassMemberMinAggregateInputType = {
    id?: true
    classId?: true
    userId?: true
    joinedAt?: true
  }

  export type ClassMemberMaxAggregateInputType = {
    id?: true
    classId?: true
    userId?: true
    joinedAt?: true
  }

  export type ClassMemberCountAggregateInputType = {
    id?: true
    classId?: true
    userId?: true
    joinedAt?: true
    _all?: true
  }

  export type ClassMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClassMember to aggregate.
     */
    where?: ClassMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassMembers to fetch.
     */
    orderBy?: ClassMemberOrderByWithRelationInput | ClassMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClassMembers
    **/
    _count?: true | ClassMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClassMemberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClassMemberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassMemberMaxAggregateInputType
  }

  export type GetClassMemberAggregateType<T extends ClassMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateClassMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClassMember[P]>
      : GetScalarType<T[P], AggregateClassMember[P]>
  }




  export type ClassMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassMemberWhereInput
    orderBy?: ClassMemberOrderByWithAggregationInput | ClassMemberOrderByWithAggregationInput[]
    by: ClassMemberScalarFieldEnum[] | ClassMemberScalarFieldEnum
    having?: ClassMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassMemberCountAggregateInputType | true
    _avg?: ClassMemberAvgAggregateInputType
    _sum?: ClassMemberSumAggregateInputType
    _min?: ClassMemberMinAggregateInputType
    _max?: ClassMemberMaxAggregateInputType
  }

  export type ClassMemberGroupByOutputType = {
    id: number
    classId: number
    userId: number
    joinedAt: Date
    _count: ClassMemberCountAggregateOutputType | null
    _avg: ClassMemberAvgAggregateOutputType | null
    _sum: ClassMemberSumAggregateOutputType | null
    _min: ClassMemberMinAggregateOutputType | null
    _max: ClassMemberMaxAggregateOutputType | null
  }

  type GetClassMemberGroupByPayload<T extends ClassMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassMemberGroupByOutputType[P]>
            : GetScalarType<T[P], ClassMemberGroupByOutputType[P]>
        }
      >
    >


  export type ClassMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    classId?: boolean
    userId?: boolean
    joinedAt?: boolean
    class?: boolean | ClassRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["classMember"]>

  export type ClassMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    classId?: boolean
    userId?: boolean
    joinedAt?: boolean
    class?: boolean | ClassRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["classMember"]>

  export type ClassMemberSelectScalar = {
    id?: boolean
    classId?: boolean
    userId?: boolean
    joinedAt?: boolean
  }

  export type ClassMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClassMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassRoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ClassMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClassMember"
    objects: {
      class: Prisma.$ClassRoomPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      classId: number
      userId: number
      joinedAt: Date
    }, ExtArgs["result"]["classMember"]>
    composites: {}
  }

  type ClassMemberGetPayload<S extends boolean | null | undefined | ClassMemberDefaultArgs> = $Result.GetResult<Prisma.$ClassMemberPayload, S>

  type ClassMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClassMemberFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClassMemberCountAggregateInputType | true
    }

  export interface ClassMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClassMember'], meta: { name: 'ClassMember' } }
    /**
     * Find zero or one ClassMember that matches the filter.
     * @param {ClassMemberFindUniqueArgs} args - Arguments to find a ClassMember
     * @example
     * // Get one ClassMember
     * const classMember = await prisma.classMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassMemberFindUniqueArgs>(args: SelectSubset<T, ClassMemberFindUniqueArgs<ExtArgs>>): Prisma__ClassMemberClient<$Result.GetResult<Prisma.$ClassMemberPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ClassMember that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClassMemberFindUniqueOrThrowArgs} args - Arguments to find a ClassMember
     * @example
     * // Get one ClassMember
     * const classMember = await prisma.classMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassMemberClient<$Result.GetResult<Prisma.$ClassMemberPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ClassMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassMemberFindFirstArgs} args - Arguments to find a ClassMember
     * @example
     * // Get one ClassMember
     * const classMember = await prisma.classMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassMemberFindFirstArgs>(args?: SelectSubset<T, ClassMemberFindFirstArgs<ExtArgs>>): Prisma__ClassMemberClient<$Result.GetResult<Prisma.$ClassMemberPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ClassMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassMemberFindFirstOrThrowArgs} args - Arguments to find a ClassMember
     * @example
     * // Get one ClassMember
     * const classMember = await prisma.classMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassMemberClient<$Result.GetResult<Prisma.$ClassMemberPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ClassMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClassMembers
     * const classMembers = await prisma.classMember.findMany()
     * 
     * // Get first 10 ClassMembers
     * const classMembers = await prisma.classMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classMemberWithIdOnly = await prisma.classMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassMemberFindManyArgs>(args?: SelectSubset<T, ClassMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassMemberPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ClassMember.
     * @param {ClassMemberCreateArgs} args - Arguments to create a ClassMember.
     * @example
     * // Create one ClassMember
     * const ClassMember = await prisma.classMember.create({
     *   data: {
     *     // ... data to create a ClassMember
     *   }
     * })
     * 
     */
    create<T extends ClassMemberCreateArgs>(args: SelectSubset<T, ClassMemberCreateArgs<ExtArgs>>): Prisma__ClassMemberClient<$Result.GetResult<Prisma.$ClassMemberPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ClassMembers.
     * @param {ClassMemberCreateManyArgs} args - Arguments to create many ClassMembers.
     * @example
     * // Create many ClassMembers
     * const classMember = await prisma.classMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassMemberCreateManyArgs>(args?: SelectSubset<T, ClassMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClassMembers and returns the data saved in the database.
     * @param {ClassMemberCreateManyAndReturnArgs} args - Arguments to create many ClassMembers.
     * @example
     * // Create many ClassMembers
     * const classMember = await prisma.classMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClassMembers and only return the `id`
     * const classMemberWithIdOnly = await prisma.classMember.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassMemberPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ClassMember.
     * @param {ClassMemberDeleteArgs} args - Arguments to delete one ClassMember.
     * @example
     * // Delete one ClassMember
     * const ClassMember = await prisma.classMember.delete({
     *   where: {
     *     // ... filter to delete one ClassMember
     *   }
     * })
     * 
     */
    delete<T extends ClassMemberDeleteArgs>(args: SelectSubset<T, ClassMemberDeleteArgs<ExtArgs>>): Prisma__ClassMemberClient<$Result.GetResult<Prisma.$ClassMemberPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ClassMember.
     * @param {ClassMemberUpdateArgs} args - Arguments to update one ClassMember.
     * @example
     * // Update one ClassMember
     * const classMember = await prisma.classMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassMemberUpdateArgs>(args: SelectSubset<T, ClassMemberUpdateArgs<ExtArgs>>): Prisma__ClassMemberClient<$Result.GetResult<Prisma.$ClassMemberPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ClassMembers.
     * @param {ClassMemberDeleteManyArgs} args - Arguments to filter ClassMembers to delete.
     * @example
     * // Delete a few ClassMembers
     * const { count } = await prisma.classMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassMemberDeleteManyArgs>(args?: SelectSubset<T, ClassMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClassMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClassMembers
     * const classMember = await prisma.classMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassMemberUpdateManyArgs>(args: SelectSubset<T, ClassMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ClassMember.
     * @param {ClassMemberUpsertArgs} args - Arguments to update or create a ClassMember.
     * @example
     * // Update or create a ClassMember
     * const classMember = await prisma.classMember.upsert({
     *   create: {
     *     // ... data to create a ClassMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClassMember we want to update
     *   }
     * })
     */
    upsert<T extends ClassMemberUpsertArgs>(args: SelectSubset<T, ClassMemberUpsertArgs<ExtArgs>>): Prisma__ClassMemberClient<$Result.GetResult<Prisma.$ClassMemberPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ClassMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassMemberCountArgs} args - Arguments to filter ClassMembers to count.
     * @example
     * // Count the number of ClassMembers
     * const count = await prisma.classMember.count({
     *   where: {
     *     // ... the filter for the ClassMembers we want to count
     *   }
     * })
    **/
    count<T extends ClassMemberCountArgs>(
      args?: Subset<T, ClassMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClassMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClassMemberAggregateArgs>(args: Subset<T, ClassMemberAggregateArgs>): Prisma.PrismaPromise<GetClassMemberAggregateType<T>>

    /**
     * Group by ClassMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassMemberGroupByArgs} args - Group by arguments.
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
      T extends ClassMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassMemberGroupByArgs['orderBy'] }
        : { orderBy?: ClassMemberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClassMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClassMember model
   */
  readonly fields: ClassMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClassMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    class<T extends ClassRoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassRoomDefaultArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ClassMember model
   */ 
  interface ClassMemberFieldRefs {
    readonly id: FieldRef<"ClassMember", 'Int'>
    readonly classId: FieldRef<"ClassMember", 'Int'>
    readonly userId: FieldRef<"ClassMember", 'Int'>
    readonly joinedAt: FieldRef<"ClassMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClassMember findUnique
   */
  export type ClassMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassMember
     */
    select?: ClassMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassMemberInclude<ExtArgs> | null
    /**
     * Filter, which ClassMember to fetch.
     */
    where: ClassMemberWhereUniqueInput
  }

  /**
   * ClassMember findUniqueOrThrow
   */
  export type ClassMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassMember
     */
    select?: ClassMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassMemberInclude<ExtArgs> | null
    /**
     * Filter, which ClassMember to fetch.
     */
    where: ClassMemberWhereUniqueInput
  }

  /**
   * ClassMember findFirst
   */
  export type ClassMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassMember
     */
    select?: ClassMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassMemberInclude<ExtArgs> | null
    /**
     * Filter, which ClassMember to fetch.
     */
    where?: ClassMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassMembers to fetch.
     */
    orderBy?: ClassMemberOrderByWithRelationInput | ClassMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClassMembers.
     */
    cursor?: ClassMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClassMembers.
     */
    distinct?: ClassMemberScalarFieldEnum | ClassMemberScalarFieldEnum[]
  }

  /**
   * ClassMember findFirstOrThrow
   */
  export type ClassMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassMember
     */
    select?: ClassMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassMemberInclude<ExtArgs> | null
    /**
     * Filter, which ClassMember to fetch.
     */
    where?: ClassMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassMembers to fetch.
     */
    orderBy?: ClassMemberOrderByWithRelationInput | ClassMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClassMembers.
     */
    cursor?: ClassMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClassMembers.
     */
    distinct?: ClassMemberScalarFieldEnum | ClassMemberScalarFieldEnum[]
  }

  /**
   * ClassMember findMany
   */
  export type ClassMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassMember
     */
    select?: ClassMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassMemberInclude<ExtArgs> | null
    /**
     * Filter, which ClassMembers to fetch.
     */
    where?: ClassMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassMembers to fetch.
     */
    orderBy?: ClassMemberOrderByWithRelationInput | ClassMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClassMembers.
     */
    cursor?: ClassMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassMembers.
     */
    skip?: number
    distinct?: ClassMemberScalarFieldEnum | ClassMemberScalarFieldEnum[]
  }

  /**
   * ClassMember create
   */
  export type ClassMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassMember
     */
    select?: ClassMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a ClassMember.
     */
    data: XOR<ClassMemberCreateInput, ClassMemberUncheckedCreateInput>
  }

  /**
   * ClassMember createMany
   */
  export type ClassMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClassMembers.
     */
    data: ClassMemberCreateManyInput | ClassMemberCreateManyInput[]
  }

  /**
   * ClassMember createManyAndReturn
   */
  export type ClassMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassMember
     */
    select?: ClassMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ClassMembers.
     */
    data: ClassMemberCreateManyInput | ClassMemberCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClassMember update
   */
  export type ClassMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassMember
     */
    select?: ClassMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a ClassMember.
     */
    data: XOR<ClassMemberUpdateInput, ClassMemberUncheckedUpdateInput>
    /**
     * Choose, which ClassMember to update.
     */
    where: ClassMemberWhereUniqueInput
  }

  /**
   * ClassMember updateMany
   */
  export type ClassMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClassMembers.
     */
    data: XOR<ClassMemberUpdateManyMutationInput, ClassMemberUncheckedUpdateManyInput>
    /**
     * Filter which ClassMembers to update
     */
    where?: ClassMemberWhereInput
  }

  /**
   * ClassMember upsert
   */
  export type ClassMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassMember
     */
    select?: ClassMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the ClassMember to update in case it exists.
     */
    where: ClassMemberWhereUniqueInput
    /**
     * In case the ClassMember found by the `where` argument doesn't exist, create a new ClassMember with this data.
     */
    create: XOR<ClassMemberCreateInput, ClassMemberUncheckedCreateInput>
    /**
     * In case the ClassMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassMemberUpdateInput, ClassMemberUncheckedUpdateInput>
  }

  /**
   * ClassMember delete
   */
  export type ClassMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassMember
     */
    select?: ClassMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassMemberInclude<ExtArgs> | null
    /**
     * Filter which ClassMember to delete.
     */
    where: ClassMemberWhereUniqueInput
  }

  /**
   * ClassMember deleteMany
   */
  export type ClassMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClassMembers to delete
     */
    where?: ClassMemberWhereInput
  }

  /**
   * ClassMember without action
   */
  export type ClassMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassMember
     */
    select?: ClassMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassMemberInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    id: number | null
    classId: number | null
    teacherId: number | null
  }

  export type TaskSumAggregateOutputType = {
    id: number | null
    classId: number | null
    teacherId: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: number | null
    classId: number | null
    teacherId: number | null
    title: string | null
    description: string | null
    questions: string | null
    createdAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: number | null
    classId: number | null
    teacherId: number | null
    title: string | null
    description: string | null
    questions: string | null
    createdAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    classId: number
    teacherId: number
    title: number
    description: number
    questions: number
    createdAt: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    id?: true
    classId?: true
    teacherId?: true
  }

  export type TaskSumAggregateInputType = {
    id?: true
    classId?: true
    teacherId?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    classId?: true
    teacherId?: true
    title?: true
    description?: true
    questions?: true
    createdAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    classId?: true
    teacherId?: true
    title?: true
    description?: true
    questions?: true
    createdAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    classId?: true
    teacherId?: true
    title?: true
    description?: true
    questions?: true
    createdAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: number
    classId: number
    teacherId: number
    title: string
    description: string | null
    questions: string
    createdAt: Date
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    classId?: boolean
    teacherId?: boolean
    title?: boolean
    description?: boolean
    questions?: boolean
    createdAt?: boolean
    class?: boolean | ClassRoomDefaultArgs<ExtArgs>
    submissions?: boolean | Task$submissionsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    classId?: boolean
    teacherId?: boolean
    title?: boolean
    description?: boolean
    questions?: boolean
    createdAt?: boolean
    class?: boolean | ClassRoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    classId?: boolean
    teacherId?: boolean
    title?: boolean
    description?: boolean
    questions?: boolean
    createdAt?: boolean
  }

  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassRoomDefaultArgs<ExtArgs>
    submissions?: boolean | Task$submissionsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassRoomDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      class: Prisma.$ClassRoomPayload<ExtArgs>
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      classId: number
      teacherId: number
      title: string
      description: string | null
      questions: string
      createdAt: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
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
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    class<T extends ClassRoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassRoomDefaultArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    submissions<T extends Task$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, Task$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Task model
   */ 
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'Int'>
    readonly classId: FieldRef<"Task", 'Int'>
    readonly teacherId: FieldRef<"Task", 'Int'>
    readonly title: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly questions: FieldRef<"Task", 'String'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
  }

  /**
   * Task.submissions
   */
  export type Task$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Submission
   */

  export type AggregateSubmission = {
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  export type SubmissionAvgAggregateOutputType = {
    id: number | null
    taskId: number | null
    studentId: number | null
    autoScore: number | null
    score: number | null
  }

  export type SubmissionSumAggregateOutputType = {
    id: number | null
    taskId: number | null
    studentId: number | null
    autoScore: number | null
    score: number | null
  }

  export type SubmissionMinAggregateOutputType = {
    id: number | null
    taskId: number | null
    studentId: number | null
    answers: string | null
    autoScore: number | null
    score: number | null
    review: string | null
    submittedAt: Date | null
  }

  export type SubmissionMaxAggregateOutputType = {
    id: number | null
    taskId: number | null
    studentId: number | null
    answers: string | null
    autoScore: number | null
    score: number | null
    review: string | null
    submittedAt: Date | null
  }

  export type SubmissionCountAggregateOutputType = {
    id: number
    taskId: number
    studentId: number
    answers: number
    autoScore: number
    score: number
    review: number
    submittedAt: number
    _all: number
  }


  export type SubmissionAvgAggregateInputType = {
    id?: true
    taskId?: true
    studentId?: true
    autoScore?: true
    score?: true
  }

  export type SubmissionSumAggregateInputType = {
    id?: true
    taskId?: true
    studentId?: true
    autoScore?: true
    score?: true
  }

  export type SubmissionMinAggregateInputType = {
    id?: true
    taskId?: true
    studentId?: true
    answers?: true
    autoScore?: true
    score?: true
    review?: true
    submittedAt?: true
  }

  export type SubmissionMaxAggregateInputType = {
    id?: true
    taskId?: true
    studentId?: true
    answers?: true
    autoScore?: true
    score?: true
    review?: true
    submittedAt?: true
  }

  export type SubmissionCountAggregateInputType = {
    id?: true
    taskId?: true
    studentId?: true
    answers?: true
    autoScore?: true
    score?: true
    review?: true
    submittedAt?: true
    _all?: true
  }

  export type SubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submission to aggregate.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Submissions
    **/
    _count?: true | SubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubmissionMaxAggregateInputType
  }

  export type GetSubmissionAggregateType<T extends SubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubmission[P]>
      : GetScalarType<T[P], AggregateSubmission[P]>
  }




  export type SubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithAggregationInput | SubmissionOrderByWithAggregationInput[]
    by: SubmissionScalarFieldEnum[] | SubmissionScalarFieldEnum
    having?: SubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubmissionCountAggregateInputType | true
    _avg?: SubmissionAvgAggregateInputType
    _sum?: SubmissionSumAggregateInputType
    _min?: SubmissionMinAggregateInputType
    _max?: SubmissionMaxAggregateInputType
  }

  export type SubmissionGroupByOutputType = {
    id: number
    taskId: number
    studentId: number
    answers: string
    autoScore: number
    score: number | null
    review: string | null
    submittedAt: Date
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  type GetSubmissionGroupByPayload<T extends SubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
        }
      >
    >


  export type SubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    studentId?: boolean
    answers?: boolean
    autoScore?: boolean
    score?: boolean
    review?: boolean
    submittedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    student?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    studentId?: boolean
    answers?: boolean
    autoScore?: boolean
    score?: boolean
    review?: boolean
    submittedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    student?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectScalar = {
    id?: boolean
    taskId?: boolean
    studentId?: boolean
    answers?: boolean
    autoScore?: boolean
    score?: boolean
    review?: boolean
    submittedAt?: boolean
  }

  export type SubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    student?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    student?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Submission"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      student: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      taskId: number
      studentId: number
      answers: string
      autoScore: number
      score: number | null
      review: string | null
      submittedAt: Date
    }, ExtArgs["result"]["submission"]>
    composites: {}
  }

  type SubmissionGetPayload<S extends boolean | null | undefined | SubmissionDefaultArgs> = $Result.GetResult<Prisma.$SubmissionPayload, S>

  type SubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SubmissionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SubmissionCountAggregateInputType | true
    }

  export interface SubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Submission'], meta: { name: 'Submission' } }
    /**
     * Find zero or one Submission that matches the filter.
     * @param {SubmissionFindUniqueArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubmissionFindUniqueArgs>(args: SelectSubset<T, SubmissionFindUniqueArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Submission that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SubmissionFindUniqueOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Submission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubmissionFindFirstArgs>(args?: SelectSubset<T, SubmissionFindFirstArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Submission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Submissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Submissions
     * const submissions = await prisma.submission.findMany()
     * 
     * // Get first 10 Submissions
     * const submissions = await prisma.submission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const submissionWithIdOnly = await prisma.submission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubmissionFindManyArgs>(args?: SelectSubset<T, SubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Submission.
     * @param {SubmissionCreateArgs} args - Arguments to create a Submission.
     * @example
     * // Create one Submission
     * const Submission = await prisma.submission.create({
     *   data: {
     *     // ... data to create a Submission
     *   }
     * })
     * 
     */
    create<T extends SubmissionCreateArgs>(args: SelectSubset<T, SubmissionCreateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Submissions.
     * @param {SubmissionCreateManyArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubmissionCreateManyArgs>(args?: SelectSubset<T, SubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Submissions and returns the data saved in the database.
     * @param {SubmissionCreateManyAndReturnArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Submission.
     * @param {SubmissionDeleteArgs} args - Arguments to delete one Submission.
     * @example
     * // Delete one Submission
     * const Submission = await prisma.submission.delete({
     *   where: {
     *     // ... filter to delete one Submission
     *   }
     * })
     * 
     */
    delete<T extends SubmissionDeleteArgs>(args: SelectSubset<T, SubmissionDeleteArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Submission.
     * @param {SubmissionUpdateArgs} args - Arguments to update one Submission.
     * @example
     * // Update one Submission
     * const submission = await prisma.submission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubmissionUpdateArgs>(args: SelectSubset<T, SubmissionUpdateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Submissions.
     * @param {SubmissionDeleteManyArgs} args - Arguments to filter Submissions to delete.
     * @example
     * // Delete a few Submissions
     * const { count } = await prisma.submission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubmissionDeleteManyArgs>(args?: SelectSubset<T, SubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubmissionUpdateManyArgs>(args: SelectSubset<T, SubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Submission.
     * @param {SubmissionUpsertArgs} args - Arguments to update or create a Submission.
     * @example
     * // Update or create a Submission
     * const submission = await prisma.submission.upsert({
     *   create: {
     *     // ... data to create a Submission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Submission we want to update
     *   }
     * })
     */
    upsert<T extends SubmissionUpsertArgs>(args: SelectSubset<T, SubmissionUpsertArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionCountArgs} args - Arguments to filter Submissions to count.
     * @example
     * // Count the number of Submissions
     * const count = await prisma.submission.count({
     *   where: {
     *     // ... the filter for the Submissions we want to count
     *   }
     * })
    **/
    count<T extends SubmissionCountArgs>(
      args?: Subset<T, SubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubmissionAggregateArgs>(args: Subset<T, SubmissionAggregateArgs>): Prisma.PrismaPromise<GetSubmissionAggregateType<T>>

    /**
     * Group by Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionGroupByArgs} args - Group by arguments.
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
      T extends SubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubmissionGroupByArgs['orderBy'] }
        : { orderBy?: SubmissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Submission model
   */
  readonly fields: SubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Submission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    student<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Submission model
   */ 
  interface SubmissionFieldRefs {
    readonly id: FieldRef<"Submission", 'Int'>
    readonly taskId: FieldRef<"Submission", 'Int'>
    readonly studentId: FieldRef<"Submission", 'Int'>
    readonly answers: FieldRef<"Submission", 'String'>
    readonly autoScore: FieldRef<"Submission", 'Int'>
    readonly score: FieldRef<"Submission", 'Int'>
    readonly review: FieldRef<"Submission", 'String'>
    readonly submittedAt: FieldRef<"Submission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Submission findUnique
   */
  export type SubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findUniqueOrThrow
   */
  export type SubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findFirst
   */
  export type SubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findFirstOrThrow
   */
  export type SubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findMany
   */
  export type SubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submissions to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission create
   */
  export type SubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Submission.
     */
    data: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
  }

  /**
   * Submission createMany
   */
  export type SubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
  }

  /**
   * Submission createManyAndReturn
   */
  export type SubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission update
   */
  export type SubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Submission.
     */
    data: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
    /**
     * Choose, which Submission to update.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission updateMany
   */
  export type SubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
  }

  /**
   * Submission upsert
   */
  export type SubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Submission to update in case it exists.
     */
    where: SubmissionWhereUniqueInput
    /**
     * In case the Submission found by the `where` argument doesn't exist, create a new Submission with this data.
     */
    create: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
    /**
     * In case the Submission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
  }

  /**
   * Submission delete
   */
  export type SubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter which Submission to delete.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission deleteMany
   */
  export type SubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submissions to delete
     */
    where?: SubmissionWhereInput
  }

  /**
   * Submission without action
   */
  export type SubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
  }


  /**
   * Model ScoreSync
   */

  export type AggregateScoreSync = {
    _count: ScoreSyncCountAggregateOutputType | null
    _avg: ScoreSyncAvgAggregateOutputType | null
    _sum: ScoreSyncSumAggregateOutputType | null
    _min: ScoreSyncMinAggregateOutputType | null
    _max: ScoreSyncMaxAggregateOutputType | null
  }

  export type ScoreSyncAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    pretest: number | null
    posttest: number | null
    latihanBest: number | null
    simulatorBest: number | null
  }

  export type ScoreSyncSumAggregateOutputType = {
    id: number | null
    userId: number | null
    pretest: number | null
    posttest: number | null
    latihanBest: number | null
    simulatorBest: number | null
  }

  export type ScoreSyncMinAggregateOutputType = {
    id: number | null
    userId: number | null
    pretest: number | null
    posttest: number | null
    latihanBest: number | null
    simulatorBest: number | null
    updatedAt: Date | null
  }

  export type ScoreSyncMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    pretest: number | null
    posttest: number | null
    latihanBest: number | null
    simulatorBest: number | null
    updatedAt: Date | null
  }

  export type ScoreSyncCountAggregateOutputType = {
    id: number
    userId: number
    pretest: number
    posttest: number
    latihanBest: number
    simulatorBest: number
    updatedAt: number
    _all: number
  }


  export type ScoreSyncAvgAggregateInputType = {
    id?: true
    userId?: true
    pretest?: true
    posttest?: true
    latihanBest?: true
    simulatorBest?: true
  }

  export type ScoreSyncSumAggregateInputType = {
    id?: true
    userId?: true
    pretest?: true
    posttest?: true
    latihanBest?: true
    simulatorBest?: true
  }

  export type ScoreSyncMinAggregateInputType = {
    id?: true
    userId?: true
    pretest?: true
    posttest?: true
    latihanBest?: true
    simulatorBest?: true
    updatedAt?: true
  }

  export type ScoreSyncMaxAggregateInputType = {
    id?: true
    userId?: true
    pretest?: true
    posttest?: true
    latihanBest?: true
    simulatorBest?: true
    updatedAt?: true
  }

  export type ScoreSyncCountAggregateInputType = {
    id?: true
    userId?: true
    pretest?: true
    posttest?: true
    latihanBest?: true
    simulatorBest?: true
    updatedAt?: true
    _all?: true
  }

  export type ScoreSyncAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScoreSync to aggregate.
     */
    where?: ScoreSyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScoreSyncs to fetch.
     */
    orderBy?: ScoreSyncOrderByWithRelationInput | ScoreSyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScoreSyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScoreSyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScoreSyncs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScoreSyncs
    **/
    _count?: true | ScoreSyncCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScoreSyncAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScoreSyncSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScoreSyncMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScoreSyncMaxAggregateInputType
  }

  export type GetScoreSyncAggregateType<T extends ScoreSyncAggregateArgs> = {
        [P in keyof T & keyof AggregateScoreSync]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScoreSync[P]>
      : GetScalarType<T[P], AggregateScoreSync[P]>
  }




  export type ScoreSyncGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScoreSyncWhereInput
    orderBy?: ScoreSyncOrderByWithAggregationInput | ScoreSyncOrderByWithAggregationInput[]
    by: ScoreSyncScalarFieldEnum[] | ScoreSyncScalarFieldEnum
    having?: ScoreSyncScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScoreSyncCountAggregateInputType | true
    _avg?: ScoreSyncAvgAggregateInputType
    _sum?: ScoreSyncSumAggregateInputType
    _min?: ScoreSyncMinAggregateInputType
    _max?: ScoreSyncMaxAggregateInputType
  }

  export type ScoreSyncGroupByOutputType = {
    id: number
    userId: number
    pretest: number | null
    posttest: number | null
    latihanBest: number | null
    simulatorBest: number | null
    updatedAt: Date
    _count: ScoreSyncCountAggregateOutputType | null
    _avg: ScoreSyncAvgAggregateOutputType | null
    _sum: ScoreSyncSumAggregateOutputType | null
    _min: ScoreSyncMinAggregateOutputType | null
    _max: ScoreSyncMaxAggregateOutputType | null
  }

  type GetScoreSyncGroupByPayload<T extends ScoreSyncGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScoreSyncGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScoreSyncGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScoreSyncGroupByOutputType[P]>
            : GetScalarType<T[P], ScoreSyncGroupByOutputType[P]>
        }
      >
    >


  export type ScoreSyncSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    pretest?: boolean
    posttest?: boolean
    latihanBest?: boolean
    simulatorBest?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scoreSync"]>

  export type ScoreSyncSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    pretest?: boolean
    posttest?: boolean
    latihanBest?: boolean
    simulatorBest?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scoreSync"]>

  export type ScoreSyncSelectScalar = {
    id?: boolean
    userId?: boolean
    pretest?: boolean
    posttest?: boolean
    latihanBest?: boolean
    simulatorBest?: boolean
    updatedAt?: boolean
  }

  export type ScoreSyncInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ScoreSyncIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ScoreSyncPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScoreSync"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      pretest: number | null
      posttest: number | null
      latihanBest: number | null
      simulatorBest: number | null
      updatedAt: Date
    }, ExtArgs["result"]["scoreSync"]>
    composites: {}
  }

  type ScoreSyncGetPayload<S extends boolean | null | undefined | ScoreSyncDefaultArgs> = $Result.GetResult<Prisma.$ScoreSyncPayload, S>

  type ScoreSyncCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ScoreSyncFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ScoreSyncCountAggregateInputType | true
    }

  export interface ScoreSyncDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScoreSync'], meta: { name: 'ScoreSync' } }
    /**
     * Find zero or one ScoreSync that matches the filter.
     * @param {ScoreSyncFindUniqueArgs} args - Arguments to find a ScoreSync
     * @example
     * // Get one ScoreSync
     * const scoreSync = await prisma.scoreSync.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScoreSyncFindUniqueArgs>(args: SelectSubset<T, ScoreSyncFindUniqueArgs<ExtArgs>>): Prisma__ScoreSyncClient<$Result.GetResult<Prisma.$ScoreSyncPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ScoreSync that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ScoreSyncFindUniqueOrThrowArgs} args - Arguments to find a ScoreSync
     * @example
     * // Get one ScoreSync
     * const scoreSync = await prisma.scoreSync.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScoreSyncFindUniqueOrThrowArgs>(args: SelectSubset<T, ScoreSyncFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScoreSyncClient<$Result.GetResult<Prisma.$ScoreSyncPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ScoreSync that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreSyncFindFirstArgs} args - Arguments to find a ScoreSync
     * @example
     * // Get one ScoreSync
     * const scoreSync = await prisma.scoreSync.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScoreSyncFindFirstArgs>(args?: SelectSubset<T, ScoreSyncFindFirstArgs<ExtArgs>>): Prisma__ScoreSyncClient<$Result.GetResult<Prisma.$ScoreSyncPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ScoreSync that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreSyncFindFirstOrThrowArgs} args - Arguments to find a ScoreSync
     * @example
     * // Get one ScoreSync
     * const scoreSync = await prisma.scoreSync.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScoreSyncFindFirstOrThrowArgs>(args?: SelectSubset<T, ScoreSyncFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScoreSyncClient<$Result.GetResult<Prisma.$ScoreSyncPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ScoreSyncs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreSyncFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScoreSyncs
     * const scoreSyncs = await prisma.scoreSync.findMany()
     * 
     * // Get first 10 ScoreSyncs
     * const scoreSyncs = await prisma.scoreSync.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scoreSyncWithIdOnly = await prisma.scoreSync.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScoreSyncFindManyArgs>(args?: SelectSubset<T, ScoreSyncFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScoreSyncPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ScoreSync.
     * @param {ScoreSyncCreateArgs} args - Arguments to create a ScoreSync.
     * @example
     * // Create one ScoreSync
     * const ScoreSync = await prisma.scoreSync.create({
     *   data: {
     *     // ... data to create a ScoreSync
     *   }
     * })
     * 
     */
    create<T extends ScoreSyncCreateArgs>(args: SelectSubset<T, ScoreSyncCreateArgs<ExtArgs>>): Prisma__ScoreSyncClient<$Result.GetResult<Prisma.$ScoreSyncPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ScoreSyncs.
     * @param {ScoreSyncCreateManyArgs} args - Arguments to create many ScoreSyncs.
     * @example
     * // Create many ScoreSyncs
     * const scoreSync = await prisma.scoreSync.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScoreSyncCreateManyArgs>(args?: SelectSubset<T, ScoreSyncCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScoreSyncs and returns the data saved in the database.
     * @param {ScoreSyncCreateManyAndReturnArgs} args - Arguments to create many ScoreSyncs.
     * @example
     * // Create many ScoreSyncs
     * const scoreSync = await prisma.scoreSync.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScoreSyncs and only return the `id`
     * const scoreSyncWithIdOnly = await prisma.scoreSync.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScoreSyncCreateManyAndReturnArgs>(args?: SelectSubset<T, ScoreSyncCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScoreSyncPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ScoreSync.
     * @param {ScoreSyncDeleteArgs} args - Arguments to delete one ScoreSync.
     * @example
     * // Delete one ScoreSync
     * const ScoreSync = await prisma.scoreSync.delete({
     *   where: {
     *     // ... filter to delete one ScoreSync
     *   }
     * })
     * 
     */
    delete<T extends ScoreSyncDeleteArgs>(args: SelectSubset<T, ScoreSyncDeleteArgs<ExtArgs>>): Prisma__ScoreSyncClient<$Result.GetResult<Prisma.$ScoreSyncPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ScoreSync.
     * @param {ScoreSyncUpdateArgs} args - Arguments to update one ScoreSync.
     * @example
     * // Update one ScoreSync
     * const scoreSync = await prisma.scoreSync.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScoreSyncUpdateArgs>(args: SelectSubset<T, ScoreSyncUpdateArgs<ExtArgs>>): Prisma__ScoreSyncClient<$Result.GetResult<Prisma.$ScoreSyncPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ScoreSyncs.
     * @param {ScoreSyncDeleteManyArgs} args - Arguments to filter ScoreSyncs to delete.
     * @example
     * // Delete a few ScoreSyncs
     * const { count } = await prisma.scoreSync.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScoreSyncDeleteManyArgs>(args?: SelectSubset<T, ScoreSyncDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScoreSyncs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreSyncUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScoreSyncs
     * const scoreSync = await prisma.scoreSync.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScoreSyncUpdateManyArgs>(args: SelectSubset<T, ScoreSyncUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ScoreSync.
     * @param {ScoreSyncUpsertArgs} args - Arguments to update or create a ScoreSync.
     * @example
     * // Update or create a ScoreSync
     * const scoreSync = await prisma.scoreSync.upsert({
     *   create: {
     *     // ... data to create a ScoreSync
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScoreSync we want to update
     *   }
     * })
     */
    upsert<T extends ScoreSyncUpsertArgs>(args: SelectSubset<T, ScoreSyncUpsertArgs<ExtArgs>>): Prisma__ScoreSyncClient<$Result.GetResult<Prisma.$ScoreSyncPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ScoreSyncs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreSyncCountArgs} args - Arguments to filter ScoreSyncs to count.
     * @example
     * // Count the number of ScoreSyncs
     * const count = await prisma.scoreSync.count({
     *   where: {
     *     // ... the filter for the ScoreSyncs we want to count
     *   }
     * })
    **/
    count<T extends ScoreSyncCountArgs>(
      args?: Subset<T, ScoreSyncCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScoreSyncCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScoreSync.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreSyncAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ScoreSyncAggregateArgs>(args: Subset<T, ScoreSyncAggregateArgs>): Prisma.PrismaPromise<GetScoreSyncAggregateType<T>>

    /**
     * Group by ScoreSync.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreSyncGroupByArgs} args - Group by arguments.
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
      T extends ScoreSyncGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScoreSyncGroupByArgs['orderBy'] }
        : { orderBy?: ScoreSyncGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ScoreSyncGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScoreSyncGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScoreSync model
   */
  readonly fields: ScoreSyncFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScoreSync.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScoreSyncClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ScoreSync model
   */ 
  interface ScoreSyncFieldRefs {
    readonly id: FieldRef<"ScoreSync", 'Int'>
    readonly userId: FieldRef<"ScoreSync", 'Int'>
    readonly pretest: FieldRef<"ScoreSync", 'Int'>
    readonly posttest: FieldRef<"ScoreSync", 'Int'>
    readonly latihanBest: FieldRef<"ScoreSync", 'Int'>
    readonly simulatorBest: FieldRef<"ScoreSync", 'Int'>
    readonly updatedAt: FieldRef<"ScoreSync", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ScoreSync findUnique
   */
  export type ScoreSyncFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreSync
     */
    select?: ScoreSyncSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreSyncInclude<ExtArgs> | null
    /**
     * Filter, which ScoreSync to fetch.
     */
    where: ScoreSyncWhereUniqueInput
  }

  /**
   * ScoreSync findUniqueOrThrow
   */
  export type ScoreSyncFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreSync
     */
    select?: ScoreSyncSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreSyncInclude<ExtArgs> | null
    /**
     * Filter, which ScoreSync to fetch.
     */
    where: ScoreSyncWhereUniqueInput
  }

  /**
   * ScoreSync findFirst
   */
  export type ScoreSyncFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreSync
     */
    select?: ScoreSyncSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreSyncInclude<ExtArgs> | null
    /**
     * Filter, which ScoreSync to fetch.
     */
    where?: ScoreSyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScoreSyncs to fetch.
     */
    orderBy?: ScoreSyncOrderByWithRelationInput | ScoreSyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScoreSyncs.
     */
    cursor?: ScoreSyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScoreSyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScoreSyncs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScoreSyncs.
     */
    distinct?: ScoreSyncScalarFieldEnum | ScoreSyncScalarFieldEnum[]
  }

  /**
   * ScoreSync findFirstOrThrow
   */
  export type ScoreSyncFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreSync
     */
    select?: ScoreSyncSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreSyncInclude<ExtArgs> | null
    /**
     * Filter, which ScoreSync to fetch.
     */
    where?: ScoreSyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScoreSyncs to fetch.
     */
    orderBy?: ScoreSyncOrderByWithRelationInput | ScoreSyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScoreSyncs.
     */
    cursor?: ScoreSyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScoreSyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScoreSyncs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScoreSyncs.
     */
    distinct?: ScoreSyncScalarFieldEnum | ScoreSyncScalarFieldEnum[]
  }

  /**
   * ScoreSync findMany
   */
  export type ScoreSyncFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreSync
     */
    select?: ScoreSyncSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreSyncInclude<ExtArgs> | null
    /**
     * Filter, which ScoreSyncs to fetch.
     */
    where?: ScoreSyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScoreSyncs to fetch.
     */
    orderBy?: ScoreSyncOrderByWithRelationInput | ScoreSyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScoreSyncs.
     */
    cursor?: ScoreSyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScoreSyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScoreSyncs.
     */
    skip?: number
    distinct?: ScoreSyncScalarFieldEnum | ScoreSyncScalarFieldEnum[]
  }

  /**
   * ScoreSync create
   */
  export type ScoreSyncCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreSync
     */
    select?: ScoreSyncSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreSyncInclude<ExtArgs> | null
    /**
     * The data needed to create a ScoreSync.
     */
    data: XOR<ScoreSyncCreateInput, ScoreSyncUncheckedCreateInput>
  }

  /**
   * ScoreSync createMany
   */
  export type ScoreSyncCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScoreSyncs.
     */
    data: ScoreSyncCreateManyInput | ScoreSyncCreateManyInput[]
  }

  /**
   * ScoreSync createManyAndReturn
   */
  export type ScoreSyncCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreSync
     */
    select?: ScoreSyncSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ScoreSyncs.
     */
    data: ScoreSyncCreateManyInput | ScoreSyncCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreSyncIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScoreSync update
   */
  export type ScoreSyncUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreSync
     */
    select?: ScoreSyncSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreSyncInclude<ExtArgs> | null
    /**
     * The data needed to update a ScoreSync.
     */
    data: XOR<ScoreSyncUpdateInput, ScoreSyncUncheckedUpdateInput>
    /**
     * Choose, which ScoreSync to update.
     */
    where: ScoreSyncWhereUniqueInput
  }

  /**
   * ScoreSync updateMany
   */
  export type ScoreSyncUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScoreSyncs.
     */
    data: XOR<ScoreSyncUpdateManyMutationInput, ScoreSyncUncheckedUpdateManyInput>
    /**
     * Filter which ScoreSyncs to update
     */
    where?: ScoreSyncWhereInput
  }

  /**
   * ScoreSync upsert
   */
  export type ScoreSyncUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreSync
     */
    select?: ScoreSyncSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreSyncInclude<ExtArgs> | null
    /**
     * The filter to search for the ScoreSync to update in case it exists.
     */
    where: ScoreSyncWhereUniqueInput
    /**
     * In case the ScoreSync found by the `where` argument doesn't exist, create a new ScoreSync with this data.
     */
    create: XOR<ScoreSyncCreateInput, ScoreSyncUncheckedCreateInput>
    /**
     * In case the ScoreSync was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScoreSyncUpdateInput, ScoreSyncUncheckedUpdateInput>
  }

  /**
   * ScoreSync delete
   */
  export type ScoreSyncDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreSync
     */
    select?: ScoreSyncSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreSyncInclude<ExtArgs> | null
    /**
     * Filter which ScoreSync to delete.
     */
    where: ScoreSyncWhereUniqueInput
  }

  /**
   * ScoreSync deleteMany
   */
  export type ScoreSyncDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScoreSyncs to delete
     */
    where?: ScoreSyncWhereInput
  }

  /**
   * ScoreSync without action
   */
  export type ScoreSyncDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreSync
     */
    select?: ScoreSyncSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreSyncInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ClassRoomScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    teacherId: 'teacherId',
    createdAt: 'createdAt'
  };

  export type ClassRoomScalarFieldEnum = (typeof ClassRoomScalarFieldEnum)[keyof typeof ClassRoomScalarFieldEnum]


  export const ClassMemberScalarFieldEnum: {
    id: 'id',
    classId: 'classId',
    userId: 'userId',
    joinedAt: 'joinedAt'
  };

  export type ClassMemberScalarFieldEnum = (typeof ClassMemberScalarFieldEnum)[keyof typeof ClassMemberScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    classId: 'classId',
    teacherId: 'teacherId',
    title: 'title',
    description: 'description',
    questions: 'questions',
    createdAt: 'createdAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const SubmissionScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    studentId: 'studentId',
    answers: 'answers',
    autoScore: 'autoScore',
    score: 'score',
    review: 'review',
    submittedAt: 'submittedAt'
  };

  export type SubmissionScalarFieldEnum = (typeof SubmissionScalarFieldEnum)[keyof typeof SubmissionScalarFieldEnum]


  export const ScoreSyncScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    pretest: 'pretest',
    posttest: 'posttest',
    latihanBest: 'latihanBest',
    simulatorBest: 'simulatorBest',
    updatedAt: 'updatedAt'
  };

  export type ScoreSyncScalarFieldEnum = (typeof ScoreSyncScalarFieldEnum)[keyof typeof ScoreSyncScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    classesOwned?: ClassRoomListRelationFilter
    memberships?: ClassMemberListRelationFilter
    submissions?: SubmissionListRelationFilter
    scoreSync?: XOR<ScoreSyncNullableRelationFilter, ScoreSyncWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    classesOwned?: ClassRoomOrderByRelationAggregateInput
    memberships?: ClassMemberOrderByRelationAggregateInput
    submissions?: SubmissionOrderByRelationAggregateInput
    scoreSync?: ScoreSyncOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    classesOwned?: ClassRoomListRelationFilter
    memberships?: ClassMemberListRelationFilter
    submissions?: SubmissionListRelationFilter
    scoreSync?: XOR<ScoreSyncNullableRelationFilter, ScoreSyncWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ClassRoomWhereInput = {
    AND?: ClassRoomWhereInput | ClassRoomWhereInput[]
    OR?: ClassRoomWhereInput[]
    NOT?: ClassRoomWhereInput | ClassRoomWhereInput[]
    id?: IntFilter<"ClassRoom"> | number
    name?: StringFilter<"ClassRoom"> | string
    code?: StringFilter<"ClassRoom"> | string
    teacherId?: IntFilter<"ClassRoom"> | number
    createdAt?: DateTimeFilter<"ClassRoom"> | Date | string
    teacher?: XOR<UserRelationFilter, UserWhereInput>
    members?: ClassMemberListRelationFilter
    tasks?: TaskListRelationFilter
  }

  export type ClassRoomOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
    teacher?: UserOrderByWithRelationInput
    members?: ClassMemberOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type ClassRoomWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: ClassRoomWhereInput | ClassRoomWhereInput[]
    OR?: ClassRoomWhereInput[]
    NOT?: ClassRoomWhereInput | ClassRoomWhereInput[]
    name?: StringFilter<"ClassRoom"> | string
    teacherId?: IntFilter<"ClassRoom"> | number
    createdAt?: DateTimeFilter<"ClassRoom"> | Date | string
    teacher?: XOR<UserRelationFilter, UserWhereInput>
    members?: ClassMemberListRelationFilter
    tasks?: TaskListRelationFilter
  }, "id" | "code">

  export type ClassRoomOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
    _count?: ClassRoomCountOrderByAggregateInput
    _avg?: ClassRoomAvgOrderByAggregateInput
    _max?: ClassRoomMaxOrderByAggregateInput
    _min?: ClassRoomMinOrderByAggregateInput
    _sum?: ClassRoomSumOrderByAggregateInput
  }

  export type ClassRoomScalarWhereWithAggregatesInput = {
    AND?: ClassRoomScalarWhereWithAggregatesInput | ClassRoomScalarWhereWithAggregatesInput[]
    OR?: ClassRoomScalarWhereWithAggregatesInput[]
    NOT?: ClassRoomScalarWhereWithAggregatesInput | ClassRoomScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ClassRoom"> | number
    name?: StringWithAggregatesFilter<"ClassRoom"> | string
    code?: StringWithAggregatesFilter<"ClassRoom"> | string
    teacherId?: IntWithAggregatesFilter<"ClassRoom"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ClassRoom"> | Date | string
  }

  export type ClassMemberWhereInput = {
    AND?: ClassMemberWhereInput | ClassMemberWhereInput[]
    OR?: ClassMemberWhereInput[]
    NOT?: ClassMemberWhereInput | ClassMemberWhereInput[]
    id?: IntFilter<"ClassMember"> | number
    classId?: IntFilter<"ClassMember"> | number
    userId?: IntFilter<"ClassMember"> | number
    joinedAt?: DateTimeFilter<"ClassMember"> | Date | string
    class?: XOR<ClassRoomRelationFilter, ClassRoomWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ClassMemberOrderByWithRelationInput = {
    id?: SortOrder
    classId?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
    class?: ClassRoomOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ClassMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    classId_userId?: ClassMemberClassIdUserIdCompoundUniqueInput
    AND?: ClassMemberWhereInput | ClassMemberWhereInput[]
    OR?: ClassMemberWhereInput[]
    NOT?: ClassMemberWhereInput | ClassMemberWhereInput[]
    classId?: IntFilter<"ClassMember"> | number
    userId?: IntFilter<"ClassMember"> | number
    joinedAt?: DateTimeFilter<"ClassMember"> | Date | string
    class?: XOR<ClassRoomRelationFilter, ClassRoomWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "classId_userId">

  export type ClassMemberOrderByWithAggregationInput = {
    id?: SortOrder
    classId?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
    _count?: ClassMemberCountOrderByAggregateInput
    _avg?: ClassMemberAvgOrderByAggregateInput
    _max?: ClassMemberMaxOrderByAggregateInput
    _min?: ClassMemberMinOrderByAggregateInput
    _sum?: ClassMemberSumOrderByAggregateInput
  }

  export type ClassMemberScalarWhereWithAggregatesInput = {
    AND?: ClassMemberScalarWhereWithAggregatesInput | ClassMemberScalarWhereWithAggregatesInput[]
    OR?: ClassMemberScalarWhereWithAggregatesInput[]
    NOT?: ClassMemberScalarWhereWithAggregatesInput | ClassMemberScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ClassMember"> | number
    classId?: IntWithAggregatesFilter<"ClassMember"> | number
    userId?: IntWithAggregatesFilter<"ClassMember"> | number
    joinedAt?: DateTimeWithAggregatesFilter<"ClassMember"> | Date | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: IntFilter<"Task"> | number
    classId?: IntFilter<"Task"> | number
    teacherId?: IntFilter<"Task"> | number
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    questions?: StringFilter<"Task"> | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
    class?: XOR<ClassRoomRelationFilter, ClassRoomWhereInput>
    submissions?: SubmissionListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    classId?: SortOrder
    teacherId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    questions?: SortOrder
    createdAt?: SortOrder
    class?: ClassRoomOrderByWithRelationInput
    submissions?: SubmissionOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    classId?: IntFilter<"Task"> | number
    teacherId?: IntFilter<"Task"> | number
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    questions?: StringFilter<"Task"> | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
    class?: XOR<ClassRoomRelationFilter, ClassRoomWhereInput>
    submissions?: SubmissionListRelationFilter
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    classId?: SortOrder
    teacherId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    questions?: SortOrder
    createdAt?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Task"> | number
    classId?: IntWithAggregatesFilter<"Task"> | number
    teacherId?: IntWithAggregatesFilter<"Task"> | number
    title?: StringWithAggregatesFilter<"Task"> | string
    description?: StringNullableWithAggregatesFilter<"Task"> | string | null
    questions?: StringWithAggregatesFilter<"Task"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type SubmissionWhereInput = {
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    id?: IntFilter<"Submission"> | number
    taskId?: IntFilter<"Submission"> | number
    studentId?: IntFilter<"Submission"> | number
    answers?: StringFilter<"Submission"> | string
    autoScore?: IntFilter<"Submission"> | number
    score?: IntNullableFilter<"Submission"> | number | null
    review?: StringNullableFilter<"Submission"> | string | null
    submittedAt?: DateTimeFilter<"Submission"> | Date | string
    task?: XOR<TaskRelationFilter, TaskWhereInput>
    student?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SubmissionOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    studentId?: SortOrder
    answers?: SortOrder
    autoScore?: SortOrder
    score?: SortOrderInput | SortOrder
    review?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    student?: UserOrderByWithRelationInput
  }

  export type SubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    taskId_studentId?: SubmissionTaskIdStudentIdCompoundUniqueInput
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    taskId?: IntFilter<"Submission"> | number
    studentId?: IntFilter<"Submission"> | number
    answers?: StringFilter<"Submission"> | string
    autoScore?: IntFilter<"Submission"> | number
    score?: IntNullableFilter<"Submission"> | number | null
    review?: StringNullableFilter<"Submission"> | string | null
    submittedAt?: DateTimeFilter<"Submission"> | Date | string
    task?: XOR<TaskRelationFilter, TaskWhereInput>
    student?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "taskId_studentId">

  export type SubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    studentId?: SortOrder
    answers?: SortOrder
    autoScore?: SortOrder
    score?: SortOrderInput | SortOrder
    review?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    _count?: SubmissionCountOrderByAggregateInput
    _avg?: SubmissionAvgOrderByAggregateInput
    _max?: SubmissionMaxOrderByAggregateInput
    _min?: SubmissionMinOrderByAggregateInput
    _sum?: SubmissionSumOrderByAggregateInput
  }

  export type SubmissionScalarWhereWithAggregatesInput = {
    AND?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    OR?: SubmissionScalarWhereWithAggregatesInput[]
    NOT?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Submission"> | number
    taskId?: IntWithAggregatesFilter<"Submission"> | number
    studentId?: IntWithAggregatesFilter<"Submission"> | number
    answers?: StringWithAggregatesFilter<"Submission"> | string
    autoScore?: IntWithAggregatesFilter<"Submission"> | number
    score?: IntNullableWithAggregatesFilter<"Submission"> | number | null
    review?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    submittedAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
  }

  export type ScoreSyncWhereInput = {
    AND?: ScoreSyncWhereInput | ScoreSyncWhereInput[]
    OR?: ScoreSyncWhereInput[]
    NOT?: ScoreSyncWhereInput | ScoreSyncWhereInput[]
    id?: IntFilter<"ScoreSync"> | number
    userId?: IntFilter<"ScoreSync"> | number
    pretest?: IntNullableFilter<"ScoreSync"> | number | null
    posttest?: IntNullableFilter<"ScoreSync"> | number | null
    latihanBest?: IntNullableFilter<"ScoreSync"> | number | null
    simulatorBest?: IntNullableFilter<"ScoreSync"> | number | null
    updatedAt?: DateTimeFilter<"ScoreSync"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ScoreSyncOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    pretest?: SortOrderInput | SortOrder
    posttest?: SortOrderInput | SortOrder
    latihanBest?: SortOrderInput | SortOrder
    simulatorBest?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ScoreSyncWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: ScoreSyncWhereInput | ScoreSyncWhereInput[]
    OR?: ScoreSyncWhereInput[]
    NOT?: ScoreSyncWhereInput | ScoreSyncWhereInput[]
    pretest?: IntNullableFilter<"ScoreSync"> | number | null
    posttest?: IntNullableFilter<"ScoreSync"> | number | null
    latihanBest?: IntNullableFilter<"ScoreSync"> | number | null
    simulatorBest?: IntNullableFilter<"ScoreSync"> | number | null
    updatedAt?: DateTimeFilter<"ScoreSync"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type ScoreSyncOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    pretest?: SortOrderInput | SortOrder
    posttest?: SortOrderInput | SortOrder
    latihanBest?: SortOrderInput | SortOrder
    simulatorBest?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: ScoreSyncCountOrderByAggregateInput
    _avg?: ScoreSyncAvgOrderByAggregateInput
    _max?: ScoreSyncMaxOrderByAggregateInput
    _min?: ScoreSyncMinOrderByAggregateInput
    _sum?: ScoreSyncSumOrderByAggregateInput
  }

  export type ScoreSyncScalarWhereWithAggregatesInput = {
    AND?: ScoreSyncScalarWhereWithAggregatesInput | ScoreSyncScalarWhereWithAggregatesInput[]
    OR?: ScoreSyncScalarWhereWithAggregatesInput[]
    NOT?: ScoreSyncScalarWhereWithAggregatesInput | ScoreSyncScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ScoreSync"> | number
    userId?: IntWithAggregatesFilter<"ScoreSync"> | number
    pretest?: IntNullableWithAggregatesFilter<"ScoreSync"> | number | null
    posttest?: IntNullableWithAggregatesFilter<"ScoreSync"> | number | null
    latihanBest?: IntNullableWithAggregatesFilter<"ScoreSync"> | number | null
    simulatorBest?: IntNullableWithAggregatesFilter<"ScoreSync"> | number | null
    updatedAt?: DateTimeWithAggregatesFilter<"ScoreSync"> | Date | string
  }

  export type UserCreateInput = {
    name: string
    email: string
    passwordHash: string
    role: string
    createdAt?: Date | string
    classesOwned?: ClassRoomCreateNestedManyWithoutTeacherInput
    memberships?: ClassMemberCreateNestedManyWithoutUserInput
    submissions?: SubmissionCreateNestedManyWithoutStudentInput
    scoreSync?: ScoreSyncCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    passwordHash: string
    role: string
    createdAt?: Date | string
    classesOwned?: ClassRoomUncheckedCreateNestedManyWithoutTeacherInput
    memberships?: ClassMemberUncheckedCreateNestedManyWithoutUserInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutStudentInput
    scoreSync?: ScoreSyncUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classesOwned?: ClassRoomUpdateManyWithoutTeacherNestedInput
    memberships?: ClassMemberUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUpdateManyWithoutStudentNestedInput
    scoreSync?: ScoreSyncUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classesOwned?: ClassRoomUncheckedUpdateManyWithoutTeacherNestedInput
    memberships?: ClassMemberUncheckedUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutStudentNestedInput
    scoreSync?: ScoreSyncUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    email: string
    passwordHash: string
    role: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassRoomCreateInput = {
    name: string
    code: string
    createdAt?: Date | string
    teacher: UserCreateNestedOneWithoutClassesOwnedInput
    members?: ClassMemberCreateNestedManyWithoutClassInput
    tasks?: TaskCreateNestedManyWithoutClassInput
  }

  export type ClassRoomUncheckedCreateInput = {
    id?: number
    name: string
    code: string
    teacherId: number
    createdAt?: Date | string
    members?: ClassMemberUncheckedCreateNestedManyWithoutClassInput
    tasks?: TaskUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassRoomUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutClassesOwnedNestedInput
    members?: ClassMemberUpdateManyWithoutClassNestedInput
    tasks?: TaskUpdateManyWithoutClassNestedInput
  }

  export type ClassRoomUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    teacherId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ClassMemberUncheckedUpdateManyWithoutClassNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ClassRoomCreateManyInput = {
    id?: number
    name: string
    code: string
    teacherId: number
    createdAt?: Date | string
  }

  export type ClassRoomUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassRoomUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    teacherId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassMemberCreateInput = {
    joinedAt?: Date | string
    class: ClassRoomCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutMembershipsInput
  }

  export type ClassMemberUncheckedCreateInput = {
    id?: number
    classId: number
    userId: number
    joinedAt?: Date | string
  }

  export type ClassMemberUpdateInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: ClassRoomUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type ClassMemberUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    classId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassMemberCreateManyInput = {
    id?: number
    classId: number
    userId: number
    joinedAt?: Date | string
  }

  export type ClassMemberUpdateManyMutationInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassMemberUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    classId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateInput = {
    teacherId: number
    title: string
    description?: string | null
    questions: string
    createdAt?: Date | string
    class: ClassRoomCreateNestedOneWithoutTasksInput
    submissions?: SubmissionCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: number
    classId: number
    teacherId: number
    title: string
    description?: string | null
    questions: string
    createdAt?: Date | string
    submissions?: SubmissionUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    teacherId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: ClassRoomUpdateOneRequiredWithoutTasksNestedInput
    submissions?: SubmissionUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    classId?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: SubmissionUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: number
    classId: number
    teacherId: number
    title: string
    description?: string | null
    questions: string
    createdAt?: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    teacherId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    classId?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateInput = {
    answers: string
    autoScore: number
    score?: number | null
    review?: string | null
    submittedAt?: Date | string
    task: TaskCreateNestedOneWithoutSubmissionsInput
    student: UserCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateInput = {
    id?: number
    taskId: number
    studentId: number
    answers: string
    autoScore: number
    score?: number | null
    review?: string | null
    submittedAt?: Date | string
  }

  export type SubmissionUpdateInput = {
    answers?: StringFieldUpdateOperationsInput | string
    autoScore?: IntFieldUpdateOperationsInput | number
    score?: NullableIntFieldUpdateOperationsInput | number | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutSubmissionsNestedInput
    student?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    autoScore?: IntFieldUpdateOperationsInput | number
    score?: NullableIntFieldUpdateOperationsInput | number | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateManyInput = {
    id?: number
    taskId: number
    studentId: number
    answers: string
    autoScore: number
    score?: number | null
    review?: string | null
    submittedAt?: Date | string
  }

  export type SubmissionUpdateManyMutationInput = {
    answers?: StringFieldUpdateOperationsInput | string
    autoScore?: IntFieldUpdateOperationsInput | number
    score?: NullableIntFieldUpdateOperationsInput | number | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    autoScore?: IntFieldUpdateOperationsInput | number
    score?: NullableIntFieldUpdateOperationsInput | number | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScoreSyncCreateInput = {
    pretest?: number | null
    posttest?: number | null
    latihanBest?: number | null
    simulatorBest?: number | null
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutScoreSyncInput
  }

  export type ScoreSyncUncheckedCreateInput = {
    id?: number
    userId: number
    pretest?: number | null
    posttest?: number | null
    latihanBest?: number | null
    simulatorBest?: number | null
    updatedAt?: Date | string
  }

  export type ScoreSyncUpdateInput = {
    pretest?: NullableIntFieldUpdateOperationsInput | number | null
    posttest?: NullableIntFieldUpdateOperationsInput | number | null
    latihanBest?: NullableIntFieldUpdateOperationsInput | number | null
    simulatorBest?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScoreSyncNestedInput
  }

  export type ScoreSyncUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    pretest?: NullableIntFieldUpdateOperationsInput | number | null
    posttest?: NullableIntFieldUpdateOperationsInput | number | null
    latihanBest?: NullableIntFieldUpdateOperationsInput | number | null
    simulatorBest?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScoreSyncCreateManyInput = {
    id?: number
    userId: number
    pretest?: number | null
    posttest?: number | null
    latihanBest?: number | null
    simulatorBest?: number | null
    updatedAt?: Date | string
  }

  export type ScoreSyncUpdateManyMutationInput = {
    pretest?: NullableIntFieldUpdateOperationsInput | number | null
    posttest?: NullableIntFieldUpdateOperationsInput | number | null
    latihanBest?: NullableIntFieldUpdateOperationsInput | number | null
    simulatorBest?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScoreSyncUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    pretest?: NullableIntFieldUpdateOperationsInput | number | null
    posttest?: NullableIntFieldUpdateOperationsInput | number | null
    latihanBest?: NullableIntFieldUpdateOperationsInput | number | null
    simulatorBest?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ClassRoomListRelationFilter = {
    every?: ClassRoomWhereInput
    some?: ClassRoomWhereInput
    none?: ClassRoomWhereInput
  }

  export type ClassMemberListRelationFilter = {
    every?: ClassMemberWhereInput
    some?: ClassMemberWhereInput
    none?: ClassMemberWhereInput
  }

  export type SubmissionListRelationFilter = {
    every?: SubmissionWhereInput
    some?: SubmissionWhereInput
    none?: SubmissionWhereInput
  }

  export type ScoreSyncNullableRelationFilter = {
    is?: ScoreSyncWhereInput | null
    isNot?: ScoreSyncWhereInput | null
  }

  export type ClassRoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClassMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClassRoomCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClassRoomAvgOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
  }

  export type ClassRoomMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClassRoomMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClassRoomSumOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
  }

  export type ClassRoomRelationFilter = {
    is?: ClassRoomWhereInput
    isNot?: ClassRoomWhereInput
  }

  export type ClassMemberClassIdUserIdCompoundUniqueInput = {
    classId: number
    userId: number
  }

  export type ClassMemberCountOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
  }

  export type ClassMemberAvgOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    userId?: SortOrder
  }

  export type ClassMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
  }

  export type ClassMemberMinOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
  }

  export type ClassMemberSumOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    userId?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    teacherId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    questions?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    teacherId?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    teacherId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    questions?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    teacherId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    questions?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    teacherId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TaskRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type SubmissionTaskIdStudentIdCompoundUniqueInput = {
    taskId: number
    studentId: number
  }

  export type SubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    studentId?: SortOrder
    answers?: SortOrder
    autoScore?: SortOrder
    score?: SortOrder
    review?: SortOrder
    submittedAt?: SortOrder
  }

  export type SubmissionAvgOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    studentId?: SortOrder
    autoScore?: SortOrder
    score?: SortOrder
  }

  export type SubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    studentId?: SortOrder
    answers?: SortOrder
    autoScore?: SortOrder
    score?: SortOrder
    review?: SortOrder
    submittedAt?: SortOrder
  }

  export type SubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    studentId?: SortOrder
    answers?: SortOrder
    autoScore?: SortOrder
    score?: SortOrder
    review?: SortOrder
    submittedAt?: SortOrder
  }

  export type SubmissionSumOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    studentId?: SortOrder
    autoScore?: SortOrder
    score?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ScoreSyncCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    pretest?: SortOrder
    posttest?: SortOrder
    latihanBest?: SortOrder
    simulatorBest?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScoreSyncAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    pretest?: SortOrder
    posttest?: SortOrder
    latihanBest?: SortOrder
    simulatorBest?: SortOrder
  }

  export type ScoreSyncMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    pretest?: SortOrder
    posttest?: SortOrder
    latihanBest?: SortOrder
    simulatorBest?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScoreSyncMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    pretest?: SortOrder
    posttest?: SortOrder
    latihanBest?: SortOrder
    simulatorBest?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScoreSyncSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    pretest?: SortOrder
    posttest?: SortOrder
    latihanBest?: SortOrder
    simulatorBest?: SortOrder
  }

  export type ClassRoomCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ClassRoomCreateWithoutTeacherInput, ClassRoomUncheckedCreateWithoutTeacherInput> | ClassRoomCreateWithoutTeacherInput[] | ClassRoomUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassRoomCreateOrConnectWithoutTeacherInput | ClassRoomCreateOrConnectWithoutTeacherInput[]
    createMany?: ClassRoomCreateManyTeacherInputEnvelope
    connect?: ClassRoomWhereUniqueInput | ClassRoomWhereUniqueInput[]
  }

  export type ClassMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<ClassMemberCreateWithoutUserInput, ClassMemberUncheckedCreateWithoutUserInput> | ClassMemberCreateWithoutUserInput[] | ClassMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClassMemberCreateOrConnectWithoutUserInput | ClassMemberCreateOrConnectWithoutUserInput[]
    createMany?: ClassMemberCreateManyUserInputEnvelope
    connect?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
  }

  export type SubmissionCreateNestedManyWithoutStudentInput = {
    create?: XOR<SubmissionCreateWithoutStudentInput, SubmissionUncheckedCreateWithoutStudentInput> | SubmissionCreateWithoutStudentInput[] | SubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutStudentInput | SubmissionCreateOrConnectWithoutStudentInput[]
    createMany?: SubmissionCreateManyStudentInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type ScoreSyncCreateNestedOneWithoutUserInput = {
    create?: XOR<ScoreSyncCreateWithoutUserInput, ScoreSyncUncheckedCreateWithoutUserInput>
    connectOrCreate?: ScoreSyncCreateOrConnectWithoutUserInput
    connect?: ScoreSyncWhereUniqueInput
  }

  export type ClassRoomUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ClassRoomCreateWithoutTeacherInput, ClassRoomUncheckedCreateWithoutTeacherInput> | ClassRoomCreateWithoutTeacherInput[] | ClassRoomUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassRoomCreateOrConnectWithoutTeacherInput | ClassRoomCreateOrConnectWithoutTeacherInput[]
    createMany?: ClassRoomCreateManyTeacherInputEnvelope
    connect?: ClassRoomWhereUniqueInput | ClassRoomWhereUniqueInput[]
  }

  export type ClassMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ClassMemberCreateWithoutUserInput, ClassMemberUncheckedCreateWithoutUserInput> | ClassMemberCreateWithoutUserInput[] | ClassMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClassMemberCreateOrConnectWithoutUserInput | ClassMemberCreateOrConnectWithoutUserInput[]
    createMany?: ClassMemberCreateManyUserInputEnvelope
    connect?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<SubmissionCreateWithoutStudentInput, SubmissionUncheckedCreateWithoutStudentInput> | SubmissionCreateWithoutStudentInput[] | SubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutStudentInput | SubmissionCreateOrConnectWithoutStudentInput[]
    createMany?: SubmissionCreateManyStudentInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type ScoreSyncUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ScoreSyncCreateWithoutUserInput, ScoreSyncUncheckedCreateWithoutUserInput>
    connectOrCreate?: ScoreSyncCreateOrConnectWithoutUserInput
    connect?: ScoreSyncWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ClassRoomUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ClassRoomCreateWithoutTeacherInput, ClassRoomUncheckedCreateWithoutTeacherInput> | ClassRoomCreateWithoutTeacherInput[] | ClassRoomUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassRoomCreateOrConnectWithoutTeacherInput | ClassRoomCreateOrConnectWithoutTeacherInput[]
    upsert?: ClassRoomUpsertWithWhereUniqueWithoutTeacherInput | ClassRoomUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ClassRoomCreateManyTeacherInputEnvelope
    set?: ClassRoomWhereUniqueInput | ClassRoomWhereUniqueInput[]
    disconnect?: ClassRoomWhereUniqueInput | ClassRoomWhereUniqueInput[]
    delete?: ClassRoomWhereUniqueInput | ClassRoomWhereUniqueInput[]
    connect?: ClassRoomWhereUniqueInput | ClassRoomWhereUniqueInput[]
    update?: ClassRoomUpdateWithWhereUniqueWithoutTeacherInput | ClassRoomUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ClassRoomUpdateManyWithWhereWithoutTeacherInput | ClassRoomUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ClassRoomScalarWhereInput | ClassRoomScalarWhereInput[]
  }

  export type ClassMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<ClassMemberCreateWithoutUserInput, ClassMemberUncheckedCreateWithoutUserInput> | ClassMemberCreateWithoutUserInput[] | ClassMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClassMemberCreateOrConnectWithoutUserInput | ClassMemberCreateOrConnectWithoutUserInput[]
    upsert?: ClassMemberUpsertWithWhereUniqueWithoutUserInput | ClassMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ClassMemberCreateManyUserInputEnvelope
    set?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    disconnect?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    delete?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    connect?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    update?: ClassMemberUpdateWithWhereUniqueWithoutUserInput | ClassMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ClassMemberUpdateManyWithWhereWithoutUserInput | ClassMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ClassMemberScalarWhereInput | ClassMemberScalarWhereInput[]
  }

  export type SubmissionUpdateManyWithoutStudentNestedInput = {
    create?: XOR<SubmissionCreateWithoutStudentInput, SubmissionUncheckedCreateWithoutStudentInput> | SubmissionCreateWithoutStudentInput[] | SubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutStudentInput | SubmissionCreateOrConnectWithoutStudentInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutStudentInput | SubmissionUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: SubmissionCreateManyStudentInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutStudentInput | SubmissionUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutStudentInput | SubmissionUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type ScoreSyncUpdateOneWithoutUserNestedInput = {
    create?: XOR<ScoreSyncCreateWithoutUserInput, ScoreSyncUncheckedCreateWithoutUserInput>
    connectOrCreate?: ScoreSyncCreateOrConnectWithoutUserInput
    upsert?: ScoreSyncUpsertWithoutUserInput
    disconnect?: ScoreSyncWhereInput | boolean
    delete?: ScoreSyncWhereInput | boolean
    connect?: ScoreSyncWhereUniqueInput
    update?: XOR<XOR<ScoreSyncUpdateToOneWithWhereWithoutUserInput, ScoreSyncUpdateWithoutUserInput>, ScoreSyncUncheckedUpdateWithoutUserInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClassRoomUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ClassRoomCreateWithoutTeacherInput, ClassRoomUncheckedCreateWithoutTeacherInput> | ClassRoomCreateWithoutTeacherInput[] | ClassRoomUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassRoomCreateOrConnectWithoutTeacherInput | ClassRoomCreateOrConnectWithoutTeacherInput[]
    upsert?: ClassRoomUpsertWithWhereUniqueWithoutTeacherInput | ClassRoomUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ClassRoomCreateManyTeacherInputEnvelope
    set?: ClassRoomWhereUniqueInput | ClassRoomWhereUniqueInput[]
    disconnect?: ClassRoomWhereUniqueInput | ClassRoomWhereUniqueInput[]
    delete?: ClassRoomWhereUniqueInput | ClassRoomWhereUniqueInput[]
    connect?: ClassRoomWhereUniqueInput | ClassRoomWhereUniqueInput[]
    update?: ClassRoomUpdateWithWhereUniqueWithoutTeacherInput | ClassRoomUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ClassRoomUpdateManyWithWhereWithoutTeacherInput | ClassRoomUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ClassRoomScalarWhereInput | ClassRoomScalarWhereInput[]
  }

  export type ClassMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ClassMemberCreateWithoutUserInput, ClassMemberUncheckedCreateWithoutUserInput> | ClassMemberCreateWithoutUserInput[] | ClassMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClassMemberCreateOrConnectWithoutUserInput | ClassMemberCreateOrConnectWithoutUserInput[]
    upsert?: ClassMemberUpsertWithWhereUniqueWithoutUserInput | ClassMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ClassMemberCreateManyUserInputEnvelope
    set?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    disconnect?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    delete?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    connect?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    update?: ClassMemberUpdateWithWhereUniqueWithoutUserInput | ClassMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ClassMemberUpdateManyWithWhereWithoutUserInput | ClassMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ClassMemberScalarWhereInput | ClassMemberScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<SubmissionCreateWithoutStudentInput, SubmissionUncheckedCreateWithoutStudentInput> | SubmissionCreateWithoutStudentInput[] | SubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutStudentInput | SubmissionCreateOrConnectWithoutStudentInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutStudentInput | SubmissionUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: SubmissionCreateManyStudentInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutStudentInput | SubmissionUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutStudentInput | SubmissionUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type ScoreSyncUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ScoreSyncCreateWithoutUserInput, ScoreSyncUncheckedCreateWithoutUserInput>
    connectOrCreate?: ScoreSyncCreateOrConnectWithoutUserInput
    upsert?: ScoreSyncUpsertWithoutUserInput
    disconnect?: ScoreSyncWhereInput | boolean
    delete?: ScoreSyncWhereInput | boolean
    connect?: ScoreSyncWhereUniqueInput
    update?: XOR<XOR<ScoreSyncUpdateToOneWithWhereWithoutUserInput, ScoreSyncUpdateWithoutUserInput>, ScoreSyncUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutClassesOwnedInput = {
    create?: XOR<UserCreateWithoutClassesOwnedInput, UserUncheckedCreateWithoutClassesOwnedInput>
    connectOrCreate?: UserCreateOrConnectWithoutClassesOwnedInput
    connect?: UserWhereUniqueInput
  }

  export type ClassMemberCreateNestedManyWithoutClassInput = {
    create?: XOR<ClassMemberCreateWithoutClassInput, ClassMemberUncheckedCreateWithoutClassInput> | ClassMemberCreateWithoutClassInput[] | ClassMemberUncheckedCreateWithoutClassInput[]
    connectOrCreate?: ClassMemberCreateOrConnectWithoutClassInput | ClassMemberCreateOrConnectWithoutClassInput[]
    createMany?: ClassMemberCreateManyClassInputEnvelope
    connect?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutClassInput = {
    create?: XOR<TaskCreateWithoutClassInput, TaskUncheckedCreateWithoutClassInput> | TaskCreateWithoutClassInput[] | TaskUncheckedCreateWithoutClassInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutClassInput | TaskCreateOrConnectWithoutClassInput[]
    createMany?: TaskCreateManyClassInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ClassMemberUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<ClassMemberCreateWithoutClassInput, ClassMemberUncheckedCreateWithoutClassInput> | ClassMemberCreateWithoutClassInput[] | ClassMemberUncheckedCreateWithoutClassInput[]
    connectOrCreate?: ClassMemberCreateOrConnectWithoutClassInput | ClassMemberCreateOrConnectWithoutClassInput[]
    createMany?: ClassMemberCreateManyClassInputEnvelope
    connect?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<TaskCreateWithoutClassInput, TaskUncheckedCreateWithoutClassInput> | TaskCreateWithoutClassInput[] | TaskUncheckedCreateWithoutClassInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutClassInput | TaskCreateOrConnectWithoutClassInput[]
    createMany?: TaskCreateManyClassInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutClassesOwnedNestedInput = {
    create?: XOR<UserCreateWithoutClassesOwnedInput, UserUncheckedCreateWithoutClassesOwnedInput>
    connectOrCreate?: UserCreateOrConnectWithoutClassesOwnedInput
    upsert?: UserUpsertWithoutClassesOwnedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClassesOwnedInput, UserUpdateWithoutClassesOwnedInput>, UserUncheckedUpdateWithoutClassesOwnedInput>
  }

  export type ClassMemberUpdateManyWithoutClassNestedInput = {
    create?: XOR<ClassMemberCreateWithoutClassInput, ClassMemberUncheckedCreateWithoutClassInput> | ClassMemberCreateWithoutClassInput[] | ClassMemberUncheckedCreateWithoutClassInput[]
    connectOrCreate?: ClassMemberCreateOrConnectWithoutClassInput | ClassMemberCreateOrConnectWithoutClassInput[]
    upsert?: ClassMemberUpsertWithWhereUniqueWithoutClassInput | ClassMemberUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: ClassMemberCreateManyClassInputEnvelope
    set?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    disconnect?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    delete?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    connect?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    update?: ClassMemberUpdateWithWhereUniqueWithoutClassInput | ClassMemberUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: ClassMemberUpdateManyWithWhereWithoutClassInput | ClassMemberUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: ClassMemberScalarWhereInput | ClassMemberScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutClassNestedInput = {
    create?: XOR<TaskCreateWithoutClassInput, TaskUncheckedCreateWithoutClassInput> | TaskCreateWithoutClassInput[] | TaskUncheckedCreateWithoutClassInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutClassInput | TaskCreateOrConnectWithoutClassInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutClassInput | TaskUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: TaskCreateManyClassInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutClassInput | TaskUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutClassInput | TaskUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ClassMemberUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<ClassMemberCreateWithoutClassInput, ClassMemberUncheckedCreateWithoutClassInput> | ClassMemberCreateWithoutClassInput[] | ClassMemberUncheckedCreateWithoutClassInput[]
    connectOrCreate?: ClassMemberCreateOrConnectWithoutClassInput | ClassMemberCreateOrConnectWithoutClassInput[]
    upsert?: ClassMemberUpsertWithWhereUniqueWithoutClassInput | ClassMemberUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: ClassMemberCreateManyClassInputEnvelope
    set?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    disconnect?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    delete?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    connect?: ClassMemberWhereUniqueInput | ClassMemberWhereUniqueInput[]
    update?: ClassMemberUpdateWithWhereUniqueWithoutClassInput | ClassMemberUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: ClassMemberUpdateManyWithWhereWithoutClassInput | ClassMemberUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: ClassMemberScalarWhereInput | ClassMemberScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<TaskCreateWithoutClassInput, TaskUncheckedCreateWithoutClassInput> | TaskCreateWithoutClassInput[] | TaskUncheckedCreateWithoutClassInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutClassInput | TaskCreateOrConnectWithoutClassInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutClassInput | TaskUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: TaskCreateManyClassInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutClassInput | TaskUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutClassInput | TaskUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ClassRoomCreateNestedOneWithoutMembersInput = {
    create?: XOR<ClassRoomCreateWithoutMembersInput, ClassRoomUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ClassRoomCreateOrConnectWithoutMembersInput
    connect?: ClassRoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type ClassRoomUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<ClassRoomCreateWithoutMembersInput, ClassRoomUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ClassRoomCreateOrConnectWithoutMembersInput
    upsert?: ClassRoomUpsertWithoutMembersInput
    connect?: ClassRoomWhereUniqueInput
    update?: XOR<XOR<ClassRoomUpdateToOneWithWhereWithoutMembersInput, ClassRoomUpdateWithoutMembersInput>, ClassRoomUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    upsert?: UserUpsertWithoutMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMembershipsInput, UserUpdateWithoutMembershipsInput>, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type ClassRoomCreateNestedOneWithoutTasksInput = {
    create?: XOR<ClassRoomCreateWithoutTasksInput, ClassRoomUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ClassRoomCreateOrConnectWithoutTasksInput
    connect?: ClassRoomWhereUniqueInput
  }

  export type SubmissionCreateNestedManyWithoutTaskInput = {
    create?: XOR<SubmissionCreateWithoutTaskInput, SubmissionUncheckedCreateWithoutTaskInput> | SubmissionCreateWithoutTaskInput[] | SubmissionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutTaskInput | SubmissionCreateOrConnectWithoutTaskInput[]
    createMany?: SubmissionCreateManyTaskInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<SubmissionCreateWithoutTaskInput, SubmissionUncheckedCreateWithoutTaskInput> | SubmissionCreateWithoutTaskInput[] | SubmissionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutTaskInput | SubmissionCreateOrConnectWithoutTaskInput[]
    createMany?: SubmissionCreateManyTaskInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ClassRoomUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<ClassRoomCreateWithoutTasksInput, ClassRoomUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ClassRoomCreateOrConnectWithoutTasksInput
    upsert?: ClassRoomUpsertWithoutTasksInput
    connect?: ClassRoomWhereUniqueInput
    update?: XOR<XOR<ClassRoomUpdateToOneWithWhereWithoutTasksInput, ClassRoomUpdateWithoutTasksInput>, ClassRoomUncheckedUpdateWithoutTasksInput>
  }

  export type SubmissionUpdateManyWithoutTaskNestedInput = {
    create?: XOR<SubmissionCreateWithoutTaskInput, SubmissionUncheckedCreateWithoutTaskInput> | SubmissionCreateWithoutTaskInput[] | SubmissionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutTaskInput | SubmissionCreateOrConnectWithoutTaskInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutTaskInput | SubmissionUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: SubmissionCreateManyTaskInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutTaskInput | SubmissionUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutTaskInput | SubmissionUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<SubmissionCreateWithoutTaskInput, SubmissionUncheckedCreateWithoutTaskInput> | SubmissionCreateWithoutTaskInput[] | SubmissionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutTaskInput | SubmissionCreateOrConnectWithoutTaskInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutTaskInput | SubmissionUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: SubmissionCreateManyTaskInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutTaskInput | SubmissionUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutTaskInput | SubmissionUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<TaskCreateWithoutSubmissionsInput, TaskUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutSubmissionsInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TaskUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<TaskCreateWithoutSubmissionsInput, TaskUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutSubmissionsInput
    upsert?: TaskUpsertWithoutSubmissionsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutSubmissionsInput, TaskUpdateWithoutSubmissionsInput>, TaskUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    upsert?: UserUpsertWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubmissionsInput, UserUpdateWithoutSubmissionsInput>, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserCreateNestedOneWithoutScoreSyncInput = {
    create?: XOR<UserCreateWithoutScoreSyncInput, UserUncheckedCreateWithoutScoreSyncInput>
    connectOrCreate?: UserCreateOrConnectWithoutScoreSyncInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutScoreSyncNestedInput = {
    create?: XOR<UserCreateWithoutScoreSyncInput, UserUncheckedCreateWithoutScoreSyncInput>
    connectOrCreate?: UserCreateOrConnectWithoutScoreSyncInput
    upsert?: UserUpsertWithoutScoreSyncInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutScoreSyncInput, UserUpdateWithoutScoreSyncInput>, UserUncheckedUpdateWithoutScoreSyncInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ClassRoomCreateWithoutTeacherInput = {
    name: string
    code: string
    createdAt?: Date | string
    members?: ClassMemberCreateNestedManyWithoutClassInput
    tasks?: TaskCreateNestedManyWithoutClassInput
  }

  export type ClassRoomUncheckedCreateWithoutTeacherInput = {
    id?: number
    name: string
    code: string
    createdAt?: Date | string
    members?: ClassMemberUncheckedCreateNestedManyWithoutClassInput
    tasks?: TaskUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassRoomCreateOrConnectWithoutTeacherInput = {
    where: ClassRoomWhereUniqueInput
    create: XOR<ClassRoomCreateWithoutTeacherInput, ClassRoomUncheckedCreateWithoutTeacherInput>
  }

  export type ClassRoomCreateManyTeacherInputEnvelope = {
    data: ClassRoomCreateManyTeacherInput | ClassRoomCreateManyTeacherInput[]
  }

  export type ClassMemberCreateWithoutUserInput = {
    joinedAt?: Date | string
    class: ClassRoomCreateNestedOneWithoutMembersInput
  }

  export type ClassMemberUncheckedCreateWithoutUserInput = {
    id?: number
    classId: number
    joinedAt?: Date | string
  }

  export type ClassMemberCreateOrConnectWithoutUserInput = {
    where: ClassMemberWhereUniqueInput
    create: XOR<ClassMemberCreateWithoutUserInput, ClassMemberUncheckedCreateWithoutUserInput>
  }

  export type ClassMemberCreateManyUserInputEnvelope = {
    data: ClassMemberCreateManyUserInput | ClassMemberCreateManyUserInput[]
  }

  export type SubmissionCreateWithoutStudentInput = {
    answers: string
    autoScore: number
    score?: number | null
    review?: string | null
    submittedAt?: Date | string
    task: TaskCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateWithoutStudentInput = {
    id?: number
    taskId: number
    answers: string
    autoScore: number
    score?: number | null
    review?: string | null
    submittedAt?: Date | string
  }

  export type SubmissionCreateOrConnectWithoutStudentInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutStudentInput, SubmissionUncheckedCreateWithoutStudentInput>
  }

  export type SubmissionCreateManyStudentInputEnvelope = {
    data: SubmissionCreateManyStudentInput | SubmissionCreateManyStudentInput[]
  }

  export type ScoreSyncCreateWithoutUserInput = {
    pretest?: number | null
    posttest?: number | null
    latihanBest?: number | null
    simulatorBest?: number | null
    updatedAt?: Date | string
  }

  export type ScoreSyncUncheckedCreateWithoutUserInput = {
    id?: number
    pretest?: number | null
    posttest?: number | null
    latihanBest?: number | null
    simulatorBest?: number | null
    updatedAt?: Date | string
  }

  export type ScoreSyncCreateOrConnectWithoutUserInput = {
    where: ScoreSyncWhereUniqueInput
    create: XOR<ScoreSyncCreateWithoutUserInput, ScoreSyncUncheckedCreateWithoutUserInput>
  }

  export type ClassRoomUpsertWithWhereUniqueWithoutTeacherInput = {
    where: ClassRoomWhereUniqueInput
    update: XOR<ClassRoomUpdateWithoutTeacherInput, ClassRoomUncheckedUpdateWithoutTeacherInput>
    create: XOR<ClassRoomCreateWithoutTeacherInput, ClassRoomUncheckedCreateWithoutTeacherInput>
  }

  export type ClassRoomUpdateWithWhereUniqueWithoutTeacherInput = {
    where: ClassRoomWhereUniqueInput
    data: XOR<ClassRoomUpdateWithoutTeacherInput, ClassRoomUncheckedUpdateWithoutTeacherInput>
  }

  export type ClassRoomUpdateManyWithWhereWithoutTeacherInput = {
    where: ClassRoomScalarWhereInput
    data: XOR<ClassRoomUpdateManyMutationInput, ClassRoomUncheckedUpdateManyWithoutTeacherInput>
  }

  export type ClassRoomScalarWhereInput = {
    AND?: ClassRoomScalarWhereInput | ClassRoomScalarWhereInput[]
    OR?: ClassRoomScalarWhereInput[]
    NOT?: ClassRoomScalarWhereInput | ClassRoomScalarWhereInput[]
    id?: IntFilter<"ClassRoom"> | number
    name?: StringFilter<"ClassRoom"> | string
    code?: StringFilter<"ClassRoom"> | string
    teacherId?: IntFilter<"ClassRoom"> | number
    createdAt?: DateTimeFilter<"ClassRoom"> | Date | string
  }

  export type ClassMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: ClassMemberWhereUniqueInput
    update: XOR<ClassMemberUpdateWithoutUserInput, ClassMemberUncheckedUpdateWithoutUserInput>
    create: XOR<ClassMemberCreateWithoutUserInput, ClassMemberUncheckedCreateWithoutUserInput>
  }

  export type ClassMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: ClassMemberWhereUniqueInput
    data: XOR<ClassMemberUpdateWithoutUserInput, ClassMemberUncheckedUpdateWithoutUserInput>
  }

  export type ClassMemberUpdateManyWithWhereWithoutUserInput = {
    where: ClassMemberScalarWhereInput
    data: XOR<ClassMemberUpdateManyMutationInput, ClassMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type ClassMemberScalarWhereInput = {
    AND?: ClassMemberScalarWhereInput | ClassMemberScalarWhereInput[]
    OR?: ClassMemberScalarWhereInput[]
    NOT?: ClassMemberScalarWhereInput | ClassMemberScalarWhereInput[]
    id?: IntFilter<"ClassMember"> | number
    classId?: IntFilter<"ClassMember"> | number
    userId?: IntFilter<"ClassMember"> | number
    joinedAt?: DateTimeFilter<"ClassMember"> | Date | string
  }

  export type SubmissionUpsertWithWhereUniqueWithoutStudentInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutStudentInput, SubmissionUncheckedUpdateWithoutStudentInput>
    create: XOR<SubmissionCreateWithoutStudentInput, SubmissionUncheckedCreateWithoutStudentInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutStudentInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutStudentInput, SubmissionUncheckedUpdateWithoutStudentInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutStudentInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutStudentInput>
  }

  export type SubmissionScalarWhereInput = {
    AND?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    OR?: SubmissionScalarWhereInput[]
    NOT?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    id?: IntFilter<"Submission"> | number
    taskId?: IntFilter<"Submission"> | number
    studentId?: IntFilter<"Submission"> | number
    answers?: StringFilter<"Submission"> | string
    autoScore?: IntFilter<"Submission"> | number
    score?: IntNullableFilter<"Submission"> | number | null
    review?: StringNullableFilter<"Submission"> | string | null
    submittedAt?: DateTimeFilter<"Submission"> | Date | string
  }

  export type ScoreSyncUpsertWithoutUserInput = {
    update: XOR<ScoreSyncUpdateWithoutUserInput, ScoreSyncUncheckedUpdateWithoutUserInput>
    create: XOR<ScoreSyncCreateWithoutUserInput, ScoreSyncUncheckedCreateWithoutUserInput>
    where?: ScoreSyncWhereInput
  }

  export type ScoreSyncUpdateToOneWithWhereWithoutUserInput = {
    where?: ScoreSyncWhereInput
    data: XOR<ScoreSyncUpdateWithoutUserInput, ScoreSyncUncheckedUpdateWithoutUserInput>
  }

  export type ScoreSyncUpdateWithoutUserInput = {
    pretest?: NullableIntFieldUpdateOperationsInput | number | null
    posttest?: NullableIntFieldUpdateOperationsInput | number | null
    latihanBest?: NullableIntFieldUpdateOperationsInput | number | null
    simulatorBest?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScoreSyncUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    pretest?: NullableIntFieldUpdateOperationsInput | number | null
    posttest?: NullableIntFieldUpdateOperationsInput | number | null
    latihanBest?: NullableIntFieldUpdateOperationsInput | number | null
    simulatorBest?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutClassesOwnedInput = {
    name: string
    email: string
    passwordHash: string
    role: string
    createdAt?: Date | string
    memberships?: ClassMemberCreateNestedManyWithoutUserInput
    submissions?: SubmissionCreateNestedManyWithoutStudentInput
    scoreSync?: ScoreSyncCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClassesOwnedInput = {
    id?: number
    name: string
    email: string
    passwordHash: string
    role: string
    createdAt?: Date | string
    memberships?: ClassMemberUncheckedCreateNestedManyWithoutUserInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutStudentInput
    scoreSync?: ScoreSyncUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClassesOwnedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClassesOwnedInput, UserUncheckedCreateWithoutClassesOwnedInput>
  }

  export type ClassMemberCreateWithoutClassInput = {
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
  }

  export type ClassMemberUncheckedCreateWithoutClassInput = {
    id?: number
    userId: number
    joinedAt?: Date | string
  }

  export type ClassMemberCreateOrConnectWithoutClassInput = {
    where: ClassMemberWhereUniqueInput
    create: XOR<ClassMemberCreateWithoutClassInput, ClassMemberUncheckedCreateWithoutClassInput>
  }

  export type ClassMemberCreateManyClassInputEnvelope = {
    data: ClassMemberCreateManyClassInput | ClassMemberCreateManyClassInput[]
  }

  export type TaskCreateWithoutClassInput = {
    teacherId: number
    title: string
    description?: string | null
    questions: string
    createdAt?: Date | string
    submissions?: SubmissionCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutClassInput = {
    id?: number
    teacherId: number
    title: string
    description?: string | null
    questions: string
    createdAt?: Date | string
    submissions?: SubmissionUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutClassInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutClassInput, TaskUncheckedCreateWithoutClassInput>
  }

  export type TaskCreateManyClassInputEnvelope = {
    data: TaskCreateManyClassInput | TaskCreateManyClassInput[]
  }

  export type UserUpsertWithoutClassesOwnedInput = {
    update: XOR<UserUpdateWithoutClassesOwnedInput, UserUncheckedUpdateWithoutClassesOwnedInput>
    create: XOR<UserCreateWithoutClassesOwnedInput, UserUncheckedCreateWithoutClassesOwnedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClassesOwnedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClassesOwnedInput, UserUncheckedUpdateWithoutClassesOwnedInput>
  }

  export type UserUpdateWithoutClassesOwnedInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: ClassMemberUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUpdateManyWithoutStudentNestedInput
    scoreSync?: ScoreSyncUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClassesOwnedInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: ClassMemberUncheckedUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutStudentNestedInput
    scoreSync?: ScoreSyncUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ClassMemberUpsertWithWhereUniqueWithoutClassInput = {
    where: ClassMemberWhereUniqueInput
    update: XOR<ClassMemberUpdateWithoutClassInput, ClassMemberUncheckedUpdateWithoutClassInput>
    create: XOR<ClassMemberCreateWithoutClassInput, ClassMemberUncheckedCreateWithoutClassInput>
  }

  export type ClassMemberUpdateWithWhereUniqueWithoutClassInput = {
    where: ClassMemberWhereUniqueInput
    data: XOR<ClassMemberUpdateWithoutClassInput, ClassMemberUncheckedUpdateWithoutClassInput>
  }

  export type ClassMemberUpdateManyWithWhereWithoutClassInput = {
    where: ClassMemberScalarWhereInput
    data: XOR<ClassMemberUpdateManyMutationInput, ClassMemberUncheckedUpdateManyWithoutClassInput>
  }

  export type TaskUpsertWithWhereUniqueWithoutClassInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutClassInput, TaskUncheckedUpdateWithoutClassInput>
    create: XOR<TaskCreateWithoutClassInput, TaskUncheckedCreateWithoutClassInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutClassInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutClassInput, TaskUncheckedUpdateWithoutClassInput>
  }

  export type TaskUpdateManyWithWhereWithoutClassInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutClassInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: IntFilter<"Task"> | number
    classId?: IntFilter<"Task"> | number
    teacherId?: IntFilter<"Task"> | number
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    questions?: StringFilter<"Task"> | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
  }

  export type ClassRoomCreateWithoutMembersInput = {
    name: string
    code: string
    createdAt?: Date | string
    teacher: UserCreateNestedOneWithoutClassesOwnedInput
    tasks?: TaskCreateNestedManyWithoutClassInput
  }

  export type ClassRoomUncheckedCreateWithoutMembersInput = {
    id?: number
    name: string
    code: string
    teacherId: number
    createdAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassRoomCreateOrConnectWithoutMembersInput = {
    where: ClassRoomWhereUniqueInput
    create: XOR<ClassRoomCreateWithoutMembersInput, ClassRoomUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutMembershipsInput = {
    name: string
    email: string
    passwordHash: string
    role: string
    createdAt?: Date | string
    classesOwned?: ClassRoomCreateNestedManyWithoutTeacherInput
    submissions?: SubmissionCreateNestedManyWithoutStudentInput
    scoreSync?: ScoreSyncCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMembershipsInput = {
    id?: number
    name: string
    email: string
    passwordHash: string
    role: string
    createdAt?: Date | string
    classesOwned?: ClassRoomUncheckedCreateNestedManyWithoutTeacherInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutStudentInput
    scoreSync?: ScoreSyncUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
  }

  export type ClassRoomUpsertWithoutMembersInput = {
    update: XOR<ClassRoomUpdateWithoutMembersInput, ClassRoomUncheckedUpdateWithoutMembersInput>
    create: XOR<ClassRoomCreateWithoutMembersInput, ClassRoomUncheckedCreateWithoutMembersInput>
    where?: ClassRoomWhereInput
  }

  export type ClassRoomUpdateToOneWithWhereWithoutMembersInput = {
    where?: ClassRoomWhereInput
    data: XOR<ClassRoomUpdateWithoutMembersInput, ClassRoomUncheckedUpdateWithoutMembersInput>
  }

  export type ClassRoomUpdateWithoutMembersInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutClassesOwnedNestedInput
    tasks?: TaskUpdateManyWithoutClassNestedInput
  }

  export type ClassRoomUncheckedUpdateWithoutMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    teacherId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutClassNestedInput
  }

  export type UserUpsertWithoutMembershipsInput = {
    update: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateWithoutMembershipsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classesOwned?: ClassRoomUpdateManyWithoutTeacherNestedInput
    submissions?: SubmissionUpdateManyWithoutStudentNestedInput
    scoreSync?: ScoreSyncUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classesOwned?: ClassRoomUncheckedUpdateManyWithoutTeacherNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutStudentNestedInput
    scoreSync?: ScoreSyncUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ClassRoomCreateWithoutTasksInput = {
    name: string
    code: string
    createdAt?: Date | string
    teacher: UserCreateNestedOneWithoutClassesOwnedInput
    members?: ClassMemberCreateNestedManyWithoutClassInput
  }

  export type ClassRoomUncheckedCreateWithoutTasksInput = {
    id?: number
    name: string
    code: string
    teacherId: number
    createdAt?: Date | string
    members?: ClassMemberUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassRoomCreateOrConnectWithoutTasksInput = {
    where: ClassRoomWhereUniqueInput
    create: XOR<ClassRoomCreateWithoutTasksInput, ClassRoomUncheckedCreateWithoutTasksInput>
  }

  export type SubmissionCreateWithoutTaskInput = {
    answers: string
    autoScore: number
    score?: number | null
    review?: string | null
    submittedAt?: Date | string
    student: UserCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateWithoutTaskInput = {
    id?: number
    studentId: number
    answers: string
    autoScore: number
    score?: number | null
    review?: string | null
    submittedAt?: Date | string
  }

  export type SubmissionCreateOrConnectWithoutTaskInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutTaskInput, SubmissionUncheckedCreateWithoutTaskInput>
  }

  export type SubmissionCreateManyTaskInputEnvelope = {
    data: SubmissionCreateManyTaskInput | SubmissionCreateManyTaskInput[]
  }

  export type ClassRoomUpsertWithoutTasksInput = {
    update: XOR<ClassRoomUpdateWithoutTasksInput, ClassRoomUncheckedUpdateWithoutTasksInput>
    create: XOR<ClassRoomCreateWithoutTasksInput, ClassRoomUncheckedCreateWithoutTasksInput>
    where?: ClassRoomWhereInput
  }

  export type ClassRoomUpdateToOneWithWhereWithoutTasksInput = {
    where?: ClassRoomWhereInput
    data: XOR<ClassRoomUpdateWithoutTasksInput, ClassRoomUncheckedUpdateWithoutTasksInput>
  }

  export type ClassRoomUpdateWithoutTasksInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutClassesOwnedNestedInput
    members?: ClassMemberUpdateManyWithoutClassNestedInput
  }

  export type ClassRoomUncheckedUpdateWithoutTasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    teacherId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ClassMemberUncheckedUpdateManyWithoutClassNestedInput
  }

  export type SubmissionUpsertWithWhereUniqueWithoutTaskInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutTaskInput, SubmissionUncheckedUpdateWithoutTaskInput>
    create: XOR<SubmissionCreateWithoutTaskInput, SubmissionUncheckedCreateWithoutTaskInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutTaskInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutTaskInput, SubmissionUncheckedUpdateWithoutTaskInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutTaskInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskCreateWithoutSubmissionsInput = {
    teacherId: number
    title: string
    description?: string | null
    questions: string
    createdAt?: Date | string
    class: ClassRoomCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutSubmissionsInput = {
    id?: number
    classId: number
    teacherId: number
    title: string
    description?: string | null
    questions: string
    createdAt?: Date | string
  }

  export type TaskCreateOrConnectWithoutSubmissionsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutSubmissionsInput, TaskUncheckedCreateWithoutSubmissionsInput>
  }

  export type UserCreateWithoutSubmissionsInput = {
    name: string
    email: string
    passwordHash: string
    role: string
    createdAt?: Date | string
    classesOwned?: ClassRoomCreateNestedManyWithoutTeacherInput
    memberships?: ClassMemberCreateNestedManyWithoutUserInput
    scoreSync?: ScoreSyncCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubmissionsInput = {
    id?: number
    name: string
    email: string
    passwordHash: string
    role: string
    createdAt?: Date | string
    classesOwned?: ClassRoomUncheckedCreateNestedManyWithoutTeacherInput
    memberships?: ClassMemberUncheckedCreateNestedManyWithoutUserInput
    scoreSync?: ScoreSyncUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSubmissionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
  }

  export type TaskUpsertWithoutSubmissionsInput = {
    update: XOR<TaskUpdateWithoutSubmissionsInput, TaskUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<TaskCreateWithoutSubmissionsInput, TaskUncheckedCreateWithoutSubmissionsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutSubmissionsInput, TaskUncheckedUpdateWithoutSubmissionsInput>
  }

  export type TaskUpdateWithoutSubmissionsInput = {
    teacherId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: ClassRoomUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutSubmissionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    classId?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutSubmissionsInput = {
    update: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserUpdateWithoutSubmissionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classesOwned?: ClassRoomUpdateManyWithoutTeacherNestedInput
    memberships?: ClassMemberUpdateManyWithoutUserNestedInput
    scoreSync?: ScoreSyncUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubmissionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classesOwned?: ClassRoomUncheckedUpdateManyWithoutTeacherNestedInput
    memberships?: ClassMemberUncheckedUpdateManyWithoutUserNestedInput
    scoreSync?: ScoreSyncUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutScoreSyncInput = {
    name: string
    email: string
    passwordHash: string
    role: string
    createdAt?: Date | string
    classesOwned?: ClassRoomCreateNestedManyWithoutTeacherInput
    memberships?: ClassMemberCreateNestedManyWithoutUserInput
    submissions?: SubmissionCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutScoreSyncInput = {
    id?: number
    name: string
    email: string
    passwordHash: string
    role: string
    createdAt?: Date | string
    classesOwned?: ClassRoomUncheckedCreateNestedManyWithoutTeacherInput
    memberships?: ClassMemberUncheckedCreateNestedManyWithoutUserInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutScoreSyncInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutScoreSyncInput, UserUncheckedCreateWithoutScoreSyncInput>
  }

  export type UserUpsertWithoutScoreSyncInput = {
    update: XOR<UserUpdateWithoutScoreSyncInput, UserUncheckedUpdateWithoutScoreSyncInput>
    create: XOR<UserCreateWithoutScoreSyncInput, UserUncheckedCreateWithoutScoreSyncInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutScoreSyncInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutScoreSyncInput, UserUncheckedUpdateWithoutScoreSyncInput>
  }

  export type UserUpdateWithoutScoreSyncInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classesOwned?: ClassRoomUpdateManyWithoutTeacherNestedInput
    memberships?: ClassMemberUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutScoreSyncInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classesOwned?: ClassRoomUncheckedUpdateManyWithoutTeacherNestedInput
    memberships?: ClassMemberUncheckedUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type ClassRoomCreateManyTeacherInput = {
    id?: number
    name: string
    code: string
    createdAt?: Date | string
  }

  export type ClassMemberCreateManyUserInput = {
    id?: number
    classId: number
    joinedAt?: Date | string
  }

  export type SubmissionCreateManyStudentInput = {
    id?: number
    taskId: number
    answers: string
    autoScore: number
    score?: number | null
    review?: string | null
    submittedAt?: Date | string
  }

  export type ClassRoomUpdateWithoutTeacherInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ClassMemberUpdateManyWithoutClassNestedInput
    tasks?: TaskUpdateManyWithoutClassNestedInput
  }

  export type ClassRoomUncheckedUpdateWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ClassMemberUncheckedUpdateManyWithoutClassNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ClassRoomUncheckedUpdateManyWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassMemberUpdateWithoutUserInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: ClassRoomUpdateOneRequiredWithoutMembersNestedInput
  }

  export type ClassMemberUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    classId?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassMemberUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    classId?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUpdateWithoutStudentInput = {
    answers?: StringFieldUpdateOperationsInput | string
    autoScore?: IntFieldUpdateOperationsInput | number
    score?: NullableIntFieldUpdateOperationsInput | number | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    autoScore?: IntFieldUpdateOperationsInput | number
    score?: NullableIntFieldUpdateOperationsInput | number | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    autoScore?: IntFieldUpdateOperationsInput | number
    score?: NullableIntFieldUpdateOperationsInput | number | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassMemberCreateManyClassInput = {
    id?: number
    userId: number
    joinedAt?: Date | string
  }

  export type TaskCreateManyClassInput = {
    id?: number
    teacherId: number
    title: string
    description?: string | null
    questions: string
    createdAt?: Date | string
  }

  export type ClassMemberUpdateWithoutClassInput = {
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type ClassMemberUncheckedUpdateWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassMemberUncheckedUpdateManyWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutClassInput = {
    teacherId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: SubmissionUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: SubmissionUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateManyTaskInput = {
    id?: number
    studentId: number
    answers: string
    autoScore: number
    score?: number | null
    review?: string | null
    submittedAt?: Date | string
  }

  export type SubmissionUpdateWithoutTaskInput = {
    answers?: StringFieldUpdateOperationsInput | string
    autoScore?: IntFieldUpdateOperationsInput | number
    score?: NullableIntFieldUpdateOperationsInput | number | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    autoScore?: IntFieldUpdateOperationsInput | number
    score?: NullableIntFieldUpdateOperationsInput | number | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    answers?: StringFieldUpdateOperationsInput | string
    autoScore?: IntFieldUpdateOperationsInput | number
    score?: NullableIntFieldUpdateOperationsInput | number | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClassRoomCountOutputTypeDefaultArgs instead
     */
    export type ClassRoomCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClassRoomCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskCountOutputTypeDefaultArgs instead
     */
    export type TaskCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClassRoomDefaultArgs instead
     */
    export type ClassRoomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClassRoomDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClassMemberDefaultArgs instead
     */
    export type ClassMemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClassMemberDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskDefaultArgs instead
     */
    export type TaskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SubmissionDefaultArgs instead
     */
    export type SubmissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SubmissionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ScoreSyncDefaultArgs instead
     */
    export type ScoreSyncArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ScoreSyncDefaultArgs<ExtArgs>

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