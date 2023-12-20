import { useState, useRef, useEffect } from 'react';
import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';
import { INITIAL_EMOJI_TYPE } from '@/stores';

import classNames from 'classnames/bind';
import styles from '@/components/common/SideBar/Emoji.module.scss';
import EmojiPicker from 'emoji-picker-react';

import { Empty } from '@/components/common/Empty';
import { BadgeEmoji } from '@/components/common/Badge';
import { IconButton } from '@/components/common/Button';
import { onClickOutside } from '@/utils';
import { IMPORT_IMAGES } from '@/stores';

const cx = classNames.bind(styles);
const { EMPTY } = IMPORT_IMAGES;

export function Emoji({ id, getEmojiApi, getReactionCount }) {
  const emojiRef = useRef();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      onClickOutside(e, emojiRef, handleClose);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const {
    data: { results },
    execute,
  } = useAsync(
    () => api.get(`${ENDPOINT.RECIPIENTS}${id}/reactions/`),
    INITIAL_EMOJI_TYPE
  );

  const isReactionsEmpty =
    getReactionCount === undefined || getReactionCount === 0;

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggleEmoji = () => {
    setOpen((prev) => !prev);
  };

  const onEmojiClick = async (e) => {
    try {
      const res = await api.post(`${ENDPOINT.RECIPIENTS}${id}/reactions/`, {
        emoji: e.emoji,
        type: 'increase',
      });

      if (!res.status) return console.error('[SERVER ERROR]', res);

      await execute();
      await getEmojiApi();
    } catch (e) {
      console.error('[API ERROR]', e);
    }

    setOpen(false);
  };

  return (
    <div className={cx('emoji')}>
      <div className={cx('emoji-header')}>
        <h1 className={cx('emoji-header-title')}>Reactions</h1>
        <div ref={emojiRef}>
          <IconButton
            variant='outlined'
            style='square'
            icon='ic-add-emoji'
            iconSize='24'
            iconColor='white'
            active={isOpen}
            onClick={handleToggleEmoji}
          />
          <div
            className={cx('emoji-picker', {
              'emoji-picker-block': isOpen,
            })}
          >
            <EmojiPicker
              width={280}
              height={360}
              searchPlaceHolder='Search...'
              emojiStyle='apple'
              searchDisabled={false}
              lazyLoadEmojis={false}
              theme='dark'
              onEmojiClick={onEmojiClick}
              previewConfig={{
                showPreview: true,
                defaultCaption: '[Rolling]Add your reaction!',
              }}
            />
          </div>
        </div>
      </div>

      {isReactionsEmpty ? (
        <Empty importImg={EMPTY} message={'No Reactions'} />
      ) : (
        <ul className={cx('emoji-content')}>
          {results.map((item) => (
            <li key={item.id}>
              <BadgeEmoji emoji={item.emoji} count={item.count} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
