class PROBLEM_MODE {
    static ACM = 0
    static OI = 1
}


class PROBLEM_STATUS {
    static VISIBLE = 0
    static HIDDEN = 1
    static CONTEST_HIDDEN = 2
    static CONTEST_VISIBLE = 3
}


class ContestStatus {
    static CONTEST_NOT_START = "1"
    static CONTEST_ENDED = "-1"
    static CONTEST_UNDERWAY = "0"
}

class ContestRuleType {
    static ACM = 0
    static OI = 1
}


class CONTEST_TYPE {
    static NORMAL = 0
    static PASSWORD = 1
    static HIDDEN_VISIBLE = 2
    static HIDDEN_INVISIBLE = 3
}

class JudgeStatus {
    static COMPILE_ERROR = -2
    static WRONG_ANSWER = -1
    static ACCEPTED = 0
    static CPU_TIME_LIMIT_EXCEEDED = 1
    static REAL_TIME_LIMIT_EXCEEDED = 2
    static MEMORY_LIMIT_EXCEEDED = 3
    static RUNTIME_ERROR = 4
    static SYSTEM_ERROR = 5
    static PENDING = 6
    static JUDGING = 7
    static PARTIALLY_ACCEPTED = 8
}

const CodeJudgeStatus = [
    {name: 'COMPILE_ERROR', type: 'warning'},
    {name: 'WRONG_ANSWER', type: 'danger'},
    {name: 'ACCEPTED', type: 'success'},
    {name: 'CPU_TIME_LIMIT_EXCEEDED', type: 'danger'},
    {name: 'REAL_TIME_LIMIT_EXCEEDED', type: 'danger'},
    {name: 'MEMORY_LIMIT_EXCEEDED', type: 'danger'},
    {name: 'RUNTIME_ERROR', type: 'warning'},
    {name: 'SYSTEM_ERROR', type: 'warning'},
    {name: 'PENDING', type: 'warning'},
    {name: 'JUDGING', type: 'warning'},
    {name: 'PARTIALLY_ACCEPTED', type: 'warning'},
]

export {
    PROBLEM_MODE,
    PROBLEM_STATUS,
    ContestStatus,
    ContestRuleType,
    CONTEST_TYPE,
    JudgeStatus,
    CodeJudgeStatus,
}
