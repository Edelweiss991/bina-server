
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  passwordHash: 'passwordHash',
  role: 'role',
  createdAt: 'createdAt'
};

exports.Prisma.ClassRoomScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  teacherId: 'teacherId',
  createdAt: 'createdAt'
};

exports.Prisma.ClassMemberScalarFieldEnum = {
  id: 'id',
  classId: 'classId',
  userId: 'userId',
  joinedAt: 'joinedAt'
};

exports.Prisma.TaskScalarFieldEnum = {
  id: 'id',
  classId: 'classId',
  teacherId: 'teacherId',
  title: 'title',
  description: 'description',
  questions: 'questions',
  createdAt: 'createdAt'
};

exports.Prisma.SubmissionScalarFieldEnum = {
  id: 'id',
  taskId: 'taskId',
  studentId: 'studentId',
  answers: 'answers',
  autoScore: 'autoScore',
  score: 'score',
  review: 'review',
  submittedAt: 'submittedAt'
};

exports.Prisma.ScoreSyncScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  pretest: 'pretest',
  posttest: 'posttest',
  latihanBest: 'latihanBest',
  simulatorBest: 'simulatorBest',
  updatedAt: 'updatedAt'
};

exports.Prisma.LiveSessionScalarFieldEnum = {
  id: 'id',
  classId: 'classId',
  teacherId: 'teacherId',
  title: 'title',
  openingText: 'openingText',
  materialText: 'materialText',
  status: 'status',
  startedAt: 'startedAt',
  endedAt: 'endedAt'
};

exports.Prisma.AttendanceScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  userId: 'userId',
  joinedAt: 'joinedAt'
};

exports.Prisma.LiveQuizScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  title: 'title',
  questions: 'questions',
  status: 'status',
  currentIndex: 'currentIndex',
  bossMaxHp: 'bossMaxHp',
  createdAt: 'createdAt'
};

exports.Prisma.LiveAnswerScalarFieldEnum = {
  id: 'id',
  quizId: 'quizId',
  userId: 'userId',
  questionIndex: 'questionIndex',
  selectedIndex: 'selectedIndex',
  correct: 'correct',
  answeredAt: 'answeredAt'
};

exports.Prisma.UnderstandingVoteScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  userId: 'userId',
  level: 'level',
  updatedAt: 'updatedAt'
};

exports.Prisma.BreakoutGroupScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  name: 'name'
};

exports.Prisma.BreakoutMemberScalarFieldEnum = {
  id: 'id',
  groupId: 'groupId',
  userId: 'userId'
};

exports.Prisma.ChatMessageScalarFieldEnum = {
  id: 'id',
  groupId: 'groupId',
  userId: 'userId',
  text: 'text',
  createdAt: 'createdAt'
};

exports.Prisma.ParentReportScalarFieldEnum = {
  id: 'id',
  classId: 'classId',
  studentId: 'studentId',
  teacherId: 'teacherId',
  content: 'content',
  createdAt: 'createdAt'
};

exports.Prisma.AnnouncementScalarFieldEnum = {
  id: 'id',
  classId: 'classId',
  authorId: 'authorId',
  text: 'text',
  createdAt: 'createdAt'
};

exports.Prisma.ScheduleScalarFieldEnum = {
  id: 'id',
  classId: 'classId',
  teacherId: 'teacherId',
  title: 'title',
  date: 'date',
  createdAt: 'createdAt'
};

exports.Prisma.SchedulePartScalarFieldEnum = {
  id: 'id',
  scheduleId: 'scheduleId',
  title: 'title',
  sortOrder: 'sortOrder',
  meetLink: 'meetLink',
  createdAt: 'createdAt'
};

exports.Prisma.ChatConversationScalarFieldEnum = {
  id: 'id',
  classId: 'classId',
  teacherId: 'teacherId',
  studentId: 'studentId',
  createdAt: 'createdAt',
  guruReadAt: 'guruReadAt',
  siswaReadAt: 'siswaReadAt'
};

exports.Prisma.ConversationMessageScalarFieldEnum = {
  id: 'id',
  conversationId: 'conversationId',
  senderId: 'senderId',
  text: 'text',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  ClassRoom: 'ClassRoom',
  ClassMember: 'ClassMember',
  Task: 'Task',
  Submission: 'Submission',
  ScoreSync: 'ScoreSync',
  LiveSession: 'LiveSession',
  Attendance: 'Attendance',
  LiveQuiz: 'LiveQuiz',
  LiveAnswer: 'LiveAnswer',
  UnderstandingVote: 'UnderstandingVote',
  BreakoutGroup: 'BreakoutGroup',
  BreakoutMember: 'BreakoutMember',
  ChatMessage: 'ChatMessage',
  ParentReport: 'ParentReport',
  Announcement: 'Announcement',
  Schedule: 'Schedule',
  SchedulePart: 'SchedulePart',
  ChatConversation: 'ChatConversation',
  ConversationMessage: 'ConversationMessage'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
