// export const createQuiz = (quiz) => ({
//     type: 'CREATE_QUIZ',
//     payload: quiz,
// });
// add try catch 
// add try catch

export const createQuiz = (quiz) => async (dispatch) => {
    try {
        dispatch({ type: 'CREATE_QUIZ_SUCCESS', payload: quiz });
    } catch (error) {
        dispatch({ type: 'CREATE_QUIZ_FAILURE', payload: error });
    }
}
export const resetQuizStatus = () => ({
    type: 'RESET_QUIZ_STATUS',
});