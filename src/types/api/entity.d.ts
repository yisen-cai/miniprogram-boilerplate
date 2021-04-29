

type TagMeta = {
  id: String,
  cover: String,
  name: String
}

type UserMeta = {
  id: string,
  username: string,
  avatar: string
}

type QuestionOption = {
  index: number,
  content: string
}

type QuestionAnswer = {
  index: number,
  content: string
}

type QuestionVO = {
  description: string,
  content: string,
  type: string,
  options: Array<QuestionOption>,
  answers: Array<string>
}

type QuestionResult = {
  id: string,
  description: string,
  content: string,
  options: Array<QuestionOption>,
  answers: Array<string>,
  type: string,
  author: UserMeta,
  tags: string,
  likeCount: number,
  dislikeCount: number,
  rating: number,
  createTime: number,
  isDelete: boolean
}


type TestQuestion = {
  index: number,
  score: number,
  questionId: string
}

type TestVO = {
  name: string,
  cover: string,
  description: string,
  totalScore: number,
  accessToken: string,
  questions: Array<TestQuestion>?
}


type Rating = {
  id: string,
  content: string,
  entityId: string,
  type: string,
  auther: UserMeta,
  score: number,
  createTime: number,
  isDelete: boolean
}

type RatingVO = {
  content: string,
  score: number
}

type TestResult = {
  id: string,
  name: string,
  cover: string,
  description: string,
  auther: UserMeta,
  questions: Array<TestQuestion>,
  ratings: Array<Rating>,
  totalScore: number,
  totalTested: number,
  averageScore: number,
  rating: number,
  accessToken: string,
  createTime: number,
  isDelete: boolean
}

type CommentVO = {
  content: string,
  replyTo: string
}

type CommentResult = {
  id: string,
  content: string,
  entityId: string,
  author: UserMeta,
  commentType: string,
  likeCount: number,
  dislikeCount: number,
  createTime: number,
  isDelete: boolean
}

type TagVO = {
  name: string,
  cover: string,
  description: string
}

type TagResult = {
  id: string,
  cover: string,
  name: string,
  description: string,
  author: UserMeta,
  createTime: number,
  isDelete: boolean
}


type TagDTO = {
  id: string,
  cover: string,
  name: string,
  description: string
}

type QuestionDTO = {
  id: string,
  description: string,
  type: string,
  tags: string,
  likeCount: number,
  dislikeCount: number,
  rating: number
}


type UserDTO = {
  id: string,
  username: string,
  avatar: string,
  gender: string,
  signature: string
}

type TestDTO = {
  id: string,
  name: string,
  cover: string,
  author: UserMeta,
  state: number,
  description: string,
  totalTested: number,
  rating: number,
  createTime: number
}

type TestCaseAnswerVO = {
  index: number,
  questionId: string,
  answer: Array<string>
}

type TestCaseVO = {
  answers: Array<TestCaseAnswerVO>
}

type TestCaseResult = {
  id: string,
  author: UserMeta,
  test: TestResult,
  answers: Array<TestCaseAnswerVO>,
  grade: number,
  createTime: number,
  isDelete: boolean
}

type ArticleVO = {
  title: string,
  cover: string,
  tags: string,
  content: string
}



type SearchVO = {
  text: string
}

type ArticleDTO = {
  id: string,
  title: string,
  cover: string,
  rating: number,
  content: string,
  likeCount: number,
  dislikeCount: number,
  readCount: number
}


type SearchWordDTO = {
  id: string,
  keyword: string,
  count: number,
  createTime: number
}