import { netRequest } from "../utils/network";
import { pageParamsOf } from "../utils/util";


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


/**
 * Get articles
 * @param params page
 */
export function getArticles(params: Map<string, any>) {
  return netRequest('/articles', 'GET', params, null);
}


/**
 * Search suggestions order by count
 */
export function searchSuggestions() {
  return netRequest('/search/suggestions', 'GET', pageParamsOf(0, 10, 'count desc'), null)
}


/**
 * Search history
 */
export function searchHistories() {
  return netRequest('/search/histories', 'GET', pageParamsOf(0, 20), null)
}


/**
 * delete history
 * @param keyword
 */
export function deleteHistory(keyword: string) {
  return netRequest(`/search/histories/${keyword}`, 'GET', null, null)
}



/**
 * Search
 * @param params 
 */
export function search(params: Map<string, any>) {
  return netRequest('/search', 'GET', params, null)
}


/**
 * Get tag by name
 * @param params 
 */
export function getTagByName(tagName: string) {
  return netRequest(`/tags/name/${tagName}`, 'GET', null, null);
}