import React from 'react';

function Counting() {
    const [count, setCount] = React.useState(0)

    const onClickPlus = () => {
        setCount(count + 1)
    }
    const onClickMinus = () => {
        setCount(count - 1)
    }
    return (
        <div>
            <h2>Счетчик:</h2>
            <h1>{count}</h1>
            <button onClick={onClickMinus} className="minus">- Минус</button>
            <button onClick={onClickPlus} className="plus">Плюс +</button>
        </div>
    )
}

export default Counting