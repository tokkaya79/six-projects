import React from 'react';

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

function Game({question, onClickVariant, step}) {
    const persentWidth = Math.round((step / questions.length) * 100)
    console.log(persentWidth)


  return (
    <>
      <div className="progress">
        <div style={{ width: `${persentWidth}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, index) => <li onClick={() => onClickVariant(index)} key={text}>{text}</li>)}
      </ul>
    </>
  );
}


export default Game
