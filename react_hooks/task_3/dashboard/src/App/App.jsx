import { Component } from 'react';
import Notifications from '../Notifications/Notifications';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import newContext from '../Context/context';

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
];

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 }
];

export default class App extends Component {
  static contextType = newContext;

  constructor(props) {
    super(props);

    this.state = {
      displayDrawer: false,
      user: this.context
        ? this.context.user
        : { email: '', password: '', isLoggedIn: false },
      logOut: this.context ? this.context.logOut : () => {},

      // ✅ NOUVEL ÉTAT DEMANDÉ
      notifications: notificationsList,
      courses: coursesList,
    };
  }

  // ✅ NOUVELLE MÉTHODE
  markNotificationAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);

    this.setState((prevState) => ({
      notifications: prevState.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  };

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true });
  };

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false });
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (e) => {
    if (e.ctrlKey && e.key === 'h') {
      alert('Logging you out');
      if (this.state.logOut) {
        this.state.logOut();
      }
    }
  };

  logIn = (email, password) => {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    });
  };

  logOut = () => {
    this.setState({
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
    });
  };

  render() {
    const { user, notifications, courses } = this.state;
    const isLoggedIn = user && user.isLoggedIn;

    return (
      <div className="
        relative
        px-3
        max-[912px]:px-2
        max-[520px]:px-2
        min-h-screen
        flex
        flex-col
      ">
        {/* Notifications layer */}
        <div className="absolute top-0 right-0 z-10">
          <Notifications
            notifications={notifications}                 // ✅ VIA STATE
            displayDrawer={this.state.displayDrawer}
            handleDisplayDrawer={this.handleDisplayDrawer}
            handleHideDrawer={this.handleHideDrawer}
            markNotificationAsRead={this.markNotificationAsRead} // ✅ MÉTHODE PASSÉE
          />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <Header />

          {!isLoggedIn ? (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login
                logIn={this.logIn}
                email={user.email}
                password={user.password}
              />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList courses={courses} /> {/* ✅ VIA STATE */}
            </BodySectionWithMarginBottom>
          )}

          <BodySection title="News from the School">
            <p className="
              max-w-full
              break-words
              text-base
              max-[520px]:text-sm
              leading-relaxed
            ">
              ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Similique, asperiores architecto blanditiis fuga doloribus sit
              illum aliquid ea distinctio minus accusantium, impedit quo
              voluptatibus ut magni dicta. Recusandae, quia dicta?
            </p>
          </BodySection>
        </div>

        {/* Footer always at the bottom */}
        <Footer />
      </div>
    );
  }
}
