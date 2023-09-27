import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import style from './Search.module.scss';
import { useEffect, useRef, useState } from 'react';
import Wrapper from '../Poper';
import FilmItem from '../FilmItem';
import { useDebounce } from '~/hooks';
import { filmService } from '~/services';

const cx = classNames.bind(style);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);
      const result = await filmService.searchFilm(debouncedValue);
      setSearchResult(result.data);
      setLoading(false);
    };

    fetchApi();
  }, [debouncedValue]);

  const handleClear = () => {
    setSearchValue('');
    inputRef.current.focus();
    setShowResult(false);
  };

  const handelHideResult = () => {
    setShowResult(false);
  };

  const handelChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  return (
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx('search-results')} tabIndex="-1" {...attrs}>
            <Wrapper>
              <h4 className={cx('search-title')}>Phim đang chiếu</h4>
              {searchResult.map((result) => (
                <FilmItem key={result.id} data={result} />
              ))}
            </Wrapper>
          </div>
        )}
        onClickOutside={handelHideResult}
      >
        <div className={cx('search')}>
          <input
            value={searchValue}
            ref={inputRef}
            onChange={handelChange}
            onFocus={() => setShowResult(true)}
            placeholder="Search accounts and videos"
            spellCheck={false}
          />

          {!!searchValue && !loading && (
            <button className={cx('clear')} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
          <button className={cx('search-btn')}>
            <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
              ></path>
            </svg>
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
