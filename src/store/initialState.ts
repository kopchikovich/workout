export const initialState = {
  screen: 'login',
  darkTheme: localStorage.getItem('dark-theme') === 'true',
  isLogin: false,
  headerText: '',
  workoutTemplateKey: '',
  modal: {
    isVisible: false,
    header: '',
    content: ''
  }
}

export const mapStateToProps = (state: typeof initialState ) => {
  return {
    screen: state.screen,
    darkTheme: state.darkTheme,
    isLogin: state.isLogin,
    headerText: state.headerText,
    workoutTemplateKey: state.workoutTemplateKey,
    modal: {
      isVisible: state.modal.isVisible,
      header: state.modal.header,
      content: state.modal.content
    }
  }
}