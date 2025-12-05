import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axiosinstance from '../shared/axiosinstance';

export default function Reader() {
  const [page, setPage] = useState('');

  const [rarewords, setRarewords] = useState([]);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axiosinstance
      .get('/page')
      .then((res) => setPage(res.data[0].content))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axiosinstance
      .get('/ai')

      .then((res) => setRarewords(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!page) return <h1>Загрузка...</h1>;

  return (
    <>
      <h1>Текст целиком:</h1>
      <p>{page}</p>

      <h2>По словам:</h2>
      <ul>
        {rarewords.map((item, index) => (
          <li key={index} style={}>
            <strong>{item.word} </strong>

            <button onClick={() => setSelected(item)}>Показать определение</button>
          </li>
        ))}
      </ul>

      {selected && (
        <div>
          <h3>{selected.word}</h3>
          <p>{selected.definition}</p>
          <button onClick={() => setSelected(null)}>Закрыть</button>
        </div>
      )}
    </>
  );
}
