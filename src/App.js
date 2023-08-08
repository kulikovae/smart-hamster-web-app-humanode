import React from 'react';
import NavBar from './components/NavBar';
import WelcomeBlock from './components/WelcomeBlock';
import AboutCourceBlock from './components/AboutCourceBlock';
import PhotoBaner from './components/PhotoBaner';
import BuyCourse from './components/BuyCourse';
import Caroucel from './components/Caroucel';
import Footer from './components/Footer';
import СourseContent from './components/СourseContent';
import ForWho from './components/ForWho';
import Card from './components/Card';
import Team from './components/Team';
import ContactMe from './components/ContactMe';
import CaseCard from './components/CaseCard';
import Login from './pages/Login';
import ThanksBlock from './components/ThanksBlock';

import { CSSTransition } from 'react-transition-group';
import { Send } from 'react-feather';

import './App.scss';
import 'shorthandcss/scss/shorthand.scss';

function App() {
  const [showWelcome, setShowWelcome] = React.useState(true);
  const [showThanksMessage, setShowThanksMessage] = React.useState(false);
  const [tanksTitle, setThanksTitle] = React.useState('');
  const [thanksContent, setThanksContent] = React.useState('');

  setTimeout(() => setShowWelcome(false), 2000);

  const nodeRef = React.useRef(null);
  return (
    <>
      <CSSTransition
        in={showWelcome}
        nodeRef={nodeRef}
        timeout={1000}
        classNames="welcome"
        unmountOnExit
      >
        <Login refer={nodeRef} />
      </CSSTransition>
      {!showWelcome ? (
        <>
          <a className="contactBtn bg-indigo indigo-lightest" href="https://t.me/Sergey_Lapa">
            <Send size={20} color="white" />
          </a>
          <NavBar />
          <WelcomeBlock />
          <AboutCourceBlock id="about-course" />
          <СourseContent />
          <PhotoBaner />
          <BuyCourse
            id="buy"
            name="buy"
            showThanksMessage={setShowThanksMessage}
            thanksTitle={setThanksTitle}
            thanksContent={setThanksContent}
          />
          <Caroucel />
          <ForWho />
          <Card />
          <Team />
          <CaseCard />
          <ContactMe
            showThanksMessage={setShowThanksMessage}
            thanksTitle={setThanksTitle}
            thanksContent={setThanksContent}
          />
          <Footer/>
          <CSSTransition
            in={showThanksMessage}
            nodeRef={nodeRef}
            timeout={500}
            classNames="thanks"
            unmountOnExit
          >
            <ThanksBlock
              refer={nodeRef}
              closeWindow={setShowThanksMessage}
              title={tanksTitle}
              content={thanksContent}
            />
          </CSSTransition>
        </>
      ) : (
        ''
      )}
    </>
  );
}

export default App;
