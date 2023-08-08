import React from 'react';

import { sendBuyMessageToTelegram } from '../utils/telegramNotification';

const chainId = '0x3A05';

const thanksMessage = {
  title: 'Спасибо за покупку! Проверяй свою почту и телеграм!',
  content: `Совсем скоро мы свяжемся с тобой и ты получишь доступ к курсу!
  Добро пожаловать в нашу команду!`,
};

const courseMapping = [
  { name: '🤓 PRO nodes', price: 99 },
  { name: '🚀 PRO nodes +3 ноды', price: 249 },
  { name: '🤑 PRO Max Nodes', price: 999 },
];

const BuyConfirmation = ({
  refer,
  closeWindow,
  showThanksMessage,
  thanksTitle,
  thanksContent,
  price,
}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [telegramId, setTelegramId] = React.useState('');
  const [course, setCourse] = React.useState('');
  const [txHash, setTxHash] = React.useState('');
  const [isMetamaks, setIsMetamask] = React.useState(false);
  const [account, setAccount] = React.useState();

  React.useEffect(() => {
    setIsMetamask(typeof window.ethereum != 'undefined');
    courseMapping.map((course) => (course.price === price ? setCourse(course.name) : ''));
  }, [price]);



  const onClickConnectButton = () => {
    window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
      setAccount(accounts[0]);

      if (window.ethereum.networkVersion !== chainId) {
        try {
          window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainId }],
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const onClickPayButton = async () => {
    const Web3 = require('web3');
    const web3 = new Web3(Web3.givenProvider);
    const contractABI = [
      {
        "type": "constructor",
        "name": "",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "buyProCourse",
        "inputs": [],
        "outputs": [],
        "stateMutability": "payable"
      },
      {
        "type": "function",
        "name": "buyProMaxCourse",
        "inputs": [],
        "outputs": [],
        "stateMutability": "payable"
      },
      {
        "type": "function",
        "name": "buyProPlusCourse",
        "inputs": [],
        "outputs": [],
        "stateMutability": "payable"
      },
      {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
          {
            "type": "address",
            "name": "",
            "internalType": "address payable"
          }
        ],
        "stateMutability": "view"
      }
    ];

    const contractAddress = "0x5f9F7a75F5130867bE9ffB6409C0163D08CfDB2a";
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    console.log(contract);

    const accounts = await web3.eth.getAccounts();

    if (price === 1) {
      const gas = await contract.methods.buyProCourse().estimateGas({
        from: accounts[0],
        value: web3.utils.toWei('1', 'ether')
      });

      setIsMetamask(false);

      await contract.methods.buyProCourse().send({
        from: accounts[0],
        value: web3.utils.toWei('1', 'ether'),
        gas: gas
      });
    }

    if (price === 2) {
      const gas = await contract.methods.buyProPlusCourse().estimateGas({
        from: accounts[0],
        value: web3.utils.toWei('2', 'ether')
      });

      setIsMetamask(false);

      await contract.methods.buyProPlusCourse().send({
        from: accounts[0],
        value: web3.utils.toWei('2', 'ether'),
        gas: gas
      });
    }

    if (price === 3) {
      const gas = await contract.methods.buyProMaxCourse().estimateGas({
        from: accounts[0],
        value: web3.utils.toWei('3', 'ether')
      });

      setIsMetamask(false);

      await contract.methods.buyProMaxCourse().send({
        from: accounts[0],
        value: web3.utils.toWei('3', 'ether'),
        gas: gas
      });
    }
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeTelegramId = (event) => {
    setTelegramId(event.target.value);
  };

  const onChangeCourse = (event) => {
    setCourse(event.target.value);
  };

  const onChangeTxHash = (event) => {
    setTxHash(event.target.value);
  };

  const onClickConfirm = () => {
    sendBuyMessageToTelegram(name, email, telegramId, course, txHash);
    closeWindow(false);
    thanksTitle(thanksMessage.title);
    thanksContent(thanksMessage.content);
    showThanksMessage(true);
    closeWindow(false);
  };

  return (
    <div className="login-popup bg-black p-5 md-p-l4 flex flex-wrap md-justify-between md-items-center show">
      <div ref={refer} className="box bg-indigo-lightest-10 scrool">
        <div className="img-area">
          <div className="img"></div>
          <h1 className="black text-center">
            Smart
            <br />
            Hamster
            <br />
            Nodes
            <br />
            Studio
          </h1>
        </div>
        <div className="form center scrool text-center">
          <div className="close white" onClick={() => closeWindow(false)}>
            <p>&times;</p>
          </div>
          <h1 className="white fs-m4 fw-400 text-center">Подтверждение покупки</h1>
          {isMetamaks ? (
            !account ? (
              <button
                id="connect-button"
                className="m-3 p-5 button w-50pc bg-black white hover-opacity-100 hover-scale-up-1 ease-300 metamask-button"
                onClick={() => onClickConnectButton()}
              >
                Подключить
              </button>
            ) : (
              <button
                id="pay-button"
                className="m-3 p-5 button w-50pc bg-black white hover-opacity-100 hover-scale-up-1 ease-300 metamask-button"
                onClick={() => onClickPayButton()}
              >
                Оплатить
              </button>
            )
          ) : (
            <>
              <div className="indigo-lightest fw-50 fs-s1 opacity-50 text-center break scrool">
                Указывайте email и хэш транзакции, мы отправим на него доступ к курсу.
              </div>
              <div id="payment-form" className="white py-5 scrool">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Твое имя"
                    className="white form-control input-lg flex-grow-1 bw-0 fw-200 bg-indigo-lightest-10 ph-white"
                    onChange={(event) => onChangeName(event)}
                  />
                </div>
                <div className="form-group">
                  <input
                    id="form-email"
                    type="text"
                    placeholder="Email для связи"
                    className="white form-control input-lg flex-grow-1 bw-0 fw-200 bg-indigo-lightest-10 ph-white"
                    onChange={(event) => onChangeEmail(event)}
                  />
                </div>
                <div className="form-group">
                  <input
                    id="form-telegram"
                    type="text"
                    placeholder="Твой telegram ник"
                    className="white form-control input-lg flex-grow-1 bw-0 fw-200 bg-indigo-lightest-10 ph-white"
                    onChange={(event) => onChangeTelegramId(event)}
                  />
                </div>
                <div className="form-group">
                  <select
                    defaultValue={price}
                    className="white form-control select flex-grow-1 bw-0 fw-200 bg-indigo-lightest-10 select"
                    onChange={(event) => onChangeCourse(event)}
                  >
                    <option value={99}>PRO nodes 99$</option>
                    <option value={249}>PRO nodes + 3 ноды 249$</option>
                    <option value={999}>PRO Max Nodes 999$</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    id="form-hash"
                    type="text"
                    value={txHash ? txHash : ''}
                    placeholder="Введи hash транзакции"
                    className="white form-control input-lg flex-grow-1 bw-0 fw-200 bg-indigo-lightest-10 ph-white"
                    onChange={(event) => onChangeTxHash(event)}
                  />
                </div>
                <button
                  className="button-lg bg-indigo indigo-lightest fw-300 fs-s3 sendPaymentResponse mt-5"
                  onClick={() => onClickConfirm()}
                >
                  Подтвердить покупку
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyConfirmation;
