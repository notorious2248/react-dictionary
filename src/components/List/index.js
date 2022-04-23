import React from 'react';

const List = (props) => {
    let { data, index } = props;
    console.log('asdojasd', data)
    return (
        <div key={data.word + index + 'inlist'}>
            <ul class="list-unstyled">
                {data.meanings[0].definitions.map(d => {
                    return <li key={d.definitions} class="list-group-item li-tag">{d.definition}</li>
                })}
            </ul>
        </div>
    )
}

export default List;
