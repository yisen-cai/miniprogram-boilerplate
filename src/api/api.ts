import { netRequest } from "../utils/network";


/**
 * Add Question entity.
 * @param question 
 */
export function addQuestion(question: QuestionVO) {
  return netRequest('/questions', 'POST', null, question);
}


/**
 * Get Question by id.
 * @param questionId 
 */
export function getQuestion(questionId: string) {
  return netRequest(`/questions/${questionId}`, 'GET');
}


/**
 * Add Test entity.
 * @param test 
 */
export function addTest(test: TestVO) {
  return netRequest('/tests', 'POST', null, test);
}


export function getTest(testId: string) {
  return netRequest(`/tests/${testId}`, 'GET');
}


export function getTests(params: Map<string, any>) {
  return netRequest('/tests', 'GET', params);
}


export function addQuestionComment(questionId: string, comment: CommentVO) {
  return netRequest(`/questions/${questionId}/comments`, 'POST', null, comment);
}


export function addTag(tag: TagVO) {
  return netRequest('/tags', 'POST', null, tag);
}


export function addTestCase(testId: string, testCase: TestCaseVO) {
  return netRequest(`/tests/${testId}/test-cases`, 'POST', null, testCase);
}


export function addTestCaseAnswer(testId: string, testCaseId: string, answer: TestCaseAnswerVO) {
  return netRequest(`/tests/${testId}/test-cases/${testCaseId}/answers`, 'POST', null, answer);
}


/**
 * Add article.
 * @param article 
 */
export function addArticle(article: ArticleVO) {
  return netRequest('/articles', 'POST', null, article);
}