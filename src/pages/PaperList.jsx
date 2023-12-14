import { Link } from 'react-router-dom';
import CardList from '../components/common/CardList/CardList';
import api from '../api/api';
import { useEffect, useState } from 'react';

async function fetchData() {
  const response = await api('RECIPIENTS', 'GET');
  return response;
}
function PageList() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchData().then((response) => {
      setResults(response.results);
    });
  }, []);

  return (
    <>
      <div>
        <p>인기 롤링 페이퍼 10 🔥</p>
        <div>
          {results &&
            results.map((item, index) => (
              <Link key={index}>
                <CardList data={item} />
              </Link>
            ))}
        </div>
        <p>최근에 만든 롤링 페이퍼 10 ⭐️️</p>
        <div>
          {results &&
            results.map((item, index) => (
              <Link key={index}>
                <CardList data={item} />
              </Link>
            ))}
        </div>
      </div>
      <button>나도 만들어보기</button>
    </>
  );
}

export default PageList;
