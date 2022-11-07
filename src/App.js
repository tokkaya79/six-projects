import React from 'react';
import './index.scss';

import Counting from './components/Counter';
import Modal from './components/Modal';

import Game from './components/play/Game';
import Result from './components/play/Result';

import { Success } from './components/contacts/Success';
import { Users } from './components/contacts/Users';

import { Block } from './components/converter/Block';

import Photos from './components/images/Photos';



const questions = [
    {
        title: 'React - это ... ?',
        variants: ['библиотека', 'фреймворк', 'приложение'],
        correct: 0,
    },
    {
        title: 'Компонент - это ... ',
        variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
        correct: 1,
    },
    {
        title: 'Что такое JSX?',
        variants: [
            'Это простой HTML',
            'Это функция',
            'Это тот же HTML, но с возможностью выполнять JS-код',
        ],
        correct: 2,
    },
];

function App() {
    //---------Modal-------------------------

    const [open, setOpen] = React.useState(false)

    //---------Game-------------------------

    const [step, setStep] = React.useState(0)
    const [correct, setCorrect] = React.useState(0)

    const question = questions[step]
    const onClickVariant = (index) => {
        console.log(step, index)
        setStep(step + 1)
        if (index === question.correct) {
            setCorrect(correct + 1)
        }
    }
    //---------contacts-------------------------

    const [users, setUsers] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const [searchValue, setSearchValue] = React.useState('');
    const [invites, setInvites] = React.useState([]);
    const [success, setSuccess] = React.useState(false);


    React.useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then((res) => res.json())
            .then((json) => {
                setUsers(json.data)
            }).catch(err => {
                console.warn(err)
                alert('missing in geting of users')
            }).finally(() => setLoading(false))
    }, [])

    const onChangeSearchValue = (e) => {
        setSearchValue(e.target.value)
    }
    const onClickInvite = (id) => {
        if (invites.includes(id)) {
            setInvites(prev => prev.filter(_id => _id !== id))
        } else {
            setInvites(prev => [...prev, id])
        }
    }
    const onClickSendInvites = () => {
        setSuccess(true)
    }

    //---------Converter-------------------------

    const [fromCurrency, setFromCurrency] = React.useState('UAH');
    const [toCurrency, setToCurrency] = React.useState('USD');
    const [fromPrice, setFromPrice] = React.useState(0);
    const [toPrice, setToPrice] = React.useState(1);

    // const [rates, setRates] = React.useState({}); т.к. useState асинхронная, нужно использовать REF
    const ratesRef = React.useRef({})

    React.useEffect(() => {
        fetch('https://cdn.cur.su/api/latest.json')
        .then((res) => res.json())
        .then((json) => {
            // setRates(json.rates)
            ratesRef.current = json.rates
             onChangeToPrice(1)
        }).catch(err => {
            console.warn(err);
            alert('missing in geting of users')
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChangeFromPrice = (value) => {
        const price = value * ratesRef.current[fromCurrency]
        const result = price * ratesRef.current[toCurrency]
        setToPrice(result.toFixed(3))
        setFromPrice(value)
    }
     const onChangeToPrice = (value) => {
        const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value
        setFromPrice(result.toFixed(3))
        setToPrice(value)
    }
//Говорим: дождись пока выполнится fromCurrency, fromPrice и только потом выполни функцию onChangeFromPrice
//мы делаем чтобы при выборе валют в верхнем меню сразу менялось значение в инпуте
    React.useEffect(() => {
            onChangeFromPrice(fromPrice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fromCurrency])

        React.useEffect(() => {
            onChangeToPrice(toPrice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toCurrency])

//-----------Photo-collection-----------------------------------------------
    



    return (
        <div className="App">
            <div>
                <Counting />
            </div>
            <div>
                <Modal open={open} setOpen={setOpen}>
                    <img src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" alt='foto' />
                    <h3>This is modal window</h3>
                    <button>24243</button>
                </Modal>
            </div>
            <div className="play">
                {step !== questions.length ? (<Game question={question} onClickVariant={onClickVariant} step={step} />) : (<Result correct={correct} />)}
            </div>
            <div className="contacts">
                {success ? (<Success count={invites.length} />) : (<Users
                    onChangeSearchValue={onChangeSearchValue}
                    searchValue={searchValue}
                    items={users}
                    isLoading={isLoading}
                    invites={invites}
                    onClickInvite={onClickInvite}
                    onClickSendInvites={onClickSendInvites}
                />
                )}
            </div>
            <div className="converter">
                <Block 
                    value={fromPrice} 
                    currency={fromCurrency} 
                    onChangeCurrency={setFromCurrency} 
                    onChangeValue={onChangeFromPrice}/>
                <Block 
                    value={toPrice} 
                    currency={toCurrency} 
                    onChangeCurrency={setToCurrency}  
                    onChangeValue={onChangeToPrice}/>
            </div>
            <div>
                <Photos />
            </div>
        </div>
    );
}


export default App;
