import React from 'react';
import { Check, X } from 'react-feather';
import { courcePrice } from '../assets/data';
import { CSSTransition } from 'react-transition-group';
import BuyConfirmation from './BuyConfirmation';

const BuyCourse = ({ showThanksMessage, thanksTitle, thanksContent, id }) => {
  const [sessionPrice, setSessionPrice] = React.useState(0);
  const [showConfirmationMessage, setShowConfirmationMessage] = React.useState(false);

  const nodeRef = React.useRef(null);

  const onClickBuy = (price) => {
    setSessionPrice(price);
    setShowConfirmationMessage(true);
  };

  return (
    <>
      <CSSTransition
        in={showConfirmationMessage}
        nodeRef={nodeRef}
        timeout={100}
        classNames="buy"
        unmountOnExit
      >
        <BuyConfirmation
          refer={nodeRef}
          closeWindow={setShowConfirmationMessage}
          showThanksMessage={showThanksMessage}
          thanksTitle={thanksTitle}
          thanksContent={thanksContent}
          price={sessionPrice}
        />
      </CSSTransition>
      <div id={id}>
        <div className="p-10 flex flex-wrap">
          <div className="w-100pc md-w-25pc">
            <div className="p-5">
              <h4 className="white fw-800 fs-l3 mb-5">Курсы</h4>
              <div className="indigo-lightest fw-600 fs-m1 opacity-50">
                Выбирай подходящий тебе тариф и скорей присоединяйся к нам!
              </div>
              <div className="flex indigo-lightest opacity-50"></div>
            </div>
          </div>
          {courcePrice.map((obj) => (
            <div key={obj.title} className="w-100pc md-w-25pc">
              <div
                className={`m-3 p-5 br-8 ${
                  obj.isWhite ? 'bg-white' : 'bg-indigo-lightest-10'
                } overflow-hidden`}
              >
                <div className="p-3">
                  <h3 className="indigo">{obj.title}</h3>
                  <div className={`${obj.isWhite ? 'black' : 'white'} flex items-center`}>
                    eHMND<span className="fs-l5 lh-1">{obj.price}</span>
                  </div>
                </div>
                <div
                  className={`p-3 ${obj.isWhite ? 'black' : 'indigo-lightest'} fw-400 fs-s1 lh-5`}
                >
                  {obj.options.map((option, i) =>
                    option.active ? (
                      <div key={i}>
                        <Check className="h-3 indigo" strokeWidth="4" />
                        <span className="opacity-50">{option.optionName}</span>
                      </div>
                    ) : (
                      <div key={i}>
                        <X className="h-3 indigo" strokeWidth="4" />
                        <span className="opacity-50">{option.optionName}</span>
                      </div>
                    ),
                  )}
                </div>
                <div className="p-3">
                  <button
                    className="button full bg-black white hover-opacity-100 hover-scale-up-1 ease-300"
                    onClick={() => onClickBuy(obj.price)}
                  >
                    Купить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BuyCourse;
