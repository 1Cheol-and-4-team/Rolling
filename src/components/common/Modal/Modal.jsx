import { response } from '@/stores';
import { formatDate, fontToEnglish } from '@/utils';
import { Badge } from '@/components/common/Badge';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// 현재는 mock 데이터를 이용함
// 추후에 relationship은 prop으로 받아와야 함
const mockProfilImageURL =
  response.results[1].recentMessages[0].profileImageURL;
const mockSender = response.results[1].recentMessages[0].sender;
const mockDate = response.results[1].recentMessages[0].createdAt;
const mockContent = response.results[1].recentMessages[0].content;
const mockFont = response.results[1].recentMessages[0].font;
const mockRelationship = response.results[1].recentMessages[0].relationship;
// 날짜와 폰트는 함수를 통해 형식을 변환한 후 사용해야함
const formatedDate = formatDate(mockDate);
const fontClassName = fontToEnglish(mockFont);

export function Modal() {
  return (
    <div className={cx('modal')}>
      <header className={cx('modal-header')}>
        <div className={cx('modal-header-profile')}>
          <div className={cx('modal-header-profile-img')}>
            <img src={mockProfilImageURL} alt='글쓴이 프로필 사진' />
          </div>
          <div className={cx('modal-header-profile-info')}>
            <h1>
              From.<span>{mockSender}</span>
            </h1>
            <Badge relationship={mockRelationship} />
          </div>
        </div>
        <span className={cx('modal-header-date')}>{formatedDate}</span>
      </header>
      <hr />
      <main className={cx('modal-main')}>
        <div
          className={cx(
            'modal-main-content',
            `modal-main-content-${fontClassName}`
          )}
        >
          {mockContent}
        </div>
      </main>
    </div>
  );
}
