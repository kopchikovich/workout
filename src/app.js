"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
require("./app.css");
var CloudData_1 = require("@/data/CloudData");
var LocalData_1 = require("@/data/LocalData");
var header_1 = require("@/components/header");
var main_1 = require("@/components/main");
var footer_1 = require("@/components/footer");
var modal_window_1 = require("@/components/modal-window");
var modal_form_1 = require("@/components/modal-form");
var login_1 = require("@/screens/login");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            screen: 'login',
            darkTheme: localStorage.getItem('dark-theme') === 'true' ? true : false,
            isLogin: false,
            headerText: '',
            workoutTemplateKey: '',
            modal: {
                isVisible: false,
                header: '',
                content: ''
            }
        };
        return _this;
    }
    App.prototype.render = function () {
        return (<div className='app'>

        {this.state.isLogin ? null : <login_1["default"] login={this.login.bind(this)}/>}

        <header_1["default"] state={this.state}/>

        <main_1["default"] state={this.state} switchScreen={this.switchScreen.bind(this)} switchTheme={this.switchTheme.bind(this)} openWorkoutScreen={this.openWorkoutScreen.bind(this)} writeHeader={this.writeHeader.bind(this)} login={this.login.bind(this)} logout={this.logout.bind(this)} openModal={this.openModal.bind(this)} closeModal={this.closeModal.bind(this)}/>

        <footer_1["default"] screen={this.state.screen} switchScreen={this.switchScreen.bind(this)}/>

        <modal_window_1["default"] isVisible={this.state.modal.isVisible} header={this.state.modal.header} content={this.state.modal.content} closeModal={this.closeModal.bind(this)}/>
      </div>);
    };
    App.prototype.switchScreen = function (e) {
        this.setState({
            headerText: '',
            screen: e.target.value
        });
        this.closeModal(e, true);
    };
    App.prototype.switchTheme = function (setCurrent) {
        if (setCurrent === void 0) { setCurrent = false; }
        // 0 - dark theme, 1 - ligth theme
        var colors = {
            '--main-bg-color': ['#333', '#fff'],
            '--second-bg-color': ['#61dafb', '#f55'],
            '--main-text-color': ['#ddd', '#222'],
            '--second-text-color': ['#333', '#fff'],
            '--modal-bg-color': ['#666', '#ddd'],
            '--modal-text-color': ['#fff', '#111']
        };
        var root = document.querySelector('html');
        var themeIndex = 0;
        if (setCurrent) {
            themeIndex = this.state.darkTheme ? 0 : 1;
        }
        else if (!this.state.darkTheme) {
            themeIndex = 0;
            this.setState({
                darkTheme: true
            });
        }
        else {
            themeIndex = 1;
            this.setState({
                darkTheme: false
            });
        }
        if (this.state.isLogin) {
            CloudData_1["default"].user.update({
                darkTheme: !themeIndex
            }).then(function () { return CloudData_1["default"].getUserData(); })["catch"](function (e) { return console.error(e); });
        }
        Object.keys(colors).forEach(function (color) {
            root.style.setProperty(color, colors[color][themeIndex]);
        });
    };
    App.prototype.openWorkoutScreen = function (e) {
        if (!this.state.isLogin) {
            return document.controller.renderMessage('Для тренировки необходимо выполнить вход в аккаунт', '#a00');
        }
        var workoutTemplateDb = LocalData_1["default"]('workout-templates').open();
        var workoutTemplate = workoutTemplateDb[e.target.value];
        if (workoutTemplate.type === 'power') {
            this.setState({
                screen: 'workout',
                workoutTemplateKey: e.target.value
            });
        }
        else if (workoutTemplate.type === 'running' || workoutTemplate.type === 'swimming') {
            this.openModal(workoutTemplate.name, <modal_form_1["default"] workoutTemplate={workoutTemplate} recordCardioWorkout={this.recordCardioWorkout.bind(this)} closeModal={this.closeModal.bind(this)}/>);
        }
        else {
            this.openModal('Error', 'Some arror, check app.js');
        }
    };
    App.prototype.recordCardioWorkout = function (e, workoutTemplate) {
        var workout = {
            name: workoutTemplate.name,
            type: workoutTemplate.type,
            timeStop: new Date(),
            duration: e.target[0].value,
            distance: e.target[1].value
        };
        var dateString = workout.timeStop.getFullYear() + "-" + (workout.timeStop.getMonth() + 1) + "-" + workout.timeStop.getDate();
        if (!localStorage.getItem(dateString)) {
            localStorage.setItem(dateString, JSON.stringify([workout]));
        }
        else {
            var array = JSON.parse(localStorage.getItem(dateString));
            array.push(workout);
            localStorage.setItem(dateString, JSON.stringify(array));
        }
        document.controller.renderMessage('Тренировка записана', 'green');
        // make backup and append workout to firestore
        localStorage.setItem('workout-backup', JSON.stringify(workout));
        CloudData_1["default"].recordWorkout(workout);
    };
    App.prototype.writeHeader = function (text) {
        this.setState({
            headerText: text
        });
    };
    App.prototype.openModal = function (header, content) {
        this.setState({
            modal: {
                isVisible: true,
                header: header,
                content: content
            }
        });
    };
    App.prototype.closeModal = function (e, forcibly) {
        if (forcibly || e.target === e.currentTarget) {
            this.setState({
                modal: {
                    isVisible: false,
                    header: '',
                    content: ''
                }
            });
        }
    };
    App.prototype.login = function (e) {
        var _this = this;
        e.preventDefault();
        CloudData_1["default"].signIn(e.target.email.value, e.target.password.value, this.setState.bind(this))
            .then(function () {
            CloudData_1["default"].getUserData().then(function () {
                _this.setState({
                    darkTheme: localStorage.getItem('dark-theme') === 'true' ? true : false
                });
                _this.switchTheme(true);
            });
        });
    };
    App.prototype.logout = function () {
        CloudData_1["default"].signOut();
        this.setState({
            isLogin: false,
            screen: 'login'
        });
    };
    App.prototype.checkLogin = function () {
        var _this = this;
        var CHECK_NUMBER = 10;
        var CHECK_INTERVAL = 1000;
        var checkCounter = 0;
        var loginCheckTimeout = setInterval(function () {
            _this.setState({
                isLogin: CloudData_1["default"].isLogin()
            });
            checkCounter++;
            if (checkCounter >= CHECK_NUMBER || CloudData_1["default"].isLogin()) {
                clearInterval(loginCheckTimeout);
                // check backup
                if (localStorage.getItem('backup-workout-template-key')) {
                    _this.openWorkoutScreen({ target: { value: JSON.parse(localStorage.getItem('backup-workout-template-key')) } });
                }
                else {
                    _this.setState({
                        screen: 'index'
                    });
                }
            }
        }, CHECK_INTERVAL);
    };
    App.prototype.componentDidMount = function () {
        // set current theme
        this.switchTheme(true);
        // check is login
        if (localStorage.getItem('user-name'))
            this.checkLogin();
    };
    return App;
}(react_1["default"].Component));
exports["default"] = App;
