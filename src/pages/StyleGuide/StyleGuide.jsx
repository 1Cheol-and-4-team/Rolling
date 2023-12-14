import classNames from 'classnames/bind';
import styles from '@/pages/StyleGuide/StyleGuide.module.scss';
import { Button, IconButton, MixButton } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Dropdown } from '@/components/common/Dropdown';
import { Banner, Count, Emoji, MemberList } from '@/components/common/SideBar';
import { Badge } from '@/components/common/Badge';
import { ColorOption } from '@/components/common/ColorOption';
import { Header } from '@/Components/common/Header';
import { Modal } from '@/components/common/Modal';
import { Tab } from '@/components/common/Tab';
import { CardList } from '@/components/common/CardList';
import { Card } from '@/components/common/Card';

import logo from '@/assets/images/icons/logo-light.svg';

import { useStoredData } from '@/hooks/useStoredData';
import { RecipientContext } from '@/contexts/RecipientProvider';

const cx = classNames.bind(styles);

export const StyleGuide = () => {
  const { storedData } = useStoredData(RecipientContext);

  console.log(storedData);

  return (
    <div className={cx('style-guide')}>
      <div className={cx('style-guide-container')}>
        <header className={cx('style-guide-header')}>
          <h1 className={cx('style-guide-title')}>Style Guide</h1>
          <img src={logo} alt='롤링 로고' />
        </header>

        <h2>COMPONENTS</h2>

        <div className={cx('style-guide-content')}>
          {/* Header Components */}
          <section className={cx('guideline')}>
            <h3 className={cx('guideline-title')}>HEADER</h3>
            <ul className={cx('guideline-list', 'display-block')}>
              <li className={cx('guideline-list-item')}>
                <div>
                  <Header isLanding={true} />
                  <Header />
                </div>
              </li>
            </ul>
          </section>

          {/* Button Components - primary, secondary, outlined */}
          <section className={cx('guideline')}>
            <h3 className={cx('guideline-title')}>BUTTONS</h3>
            <ul className={cx('guideline-list')}>
              <li className={cx('guideline-list-item')}>
                <h4>Primary-56px</h4>
                <div>
                  <Button variant='primary' size={56}>
                    Enabled
                  </Button>
                  <Button variant='primary' size={56} disabled>
                    Enabled
                  </Button>
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>Primary-40px</h4>
                <div>
                  <Button variant='primary' size={40}>
                    Enabled
                  </Button>
                  <Button variant='primary' size={40} disabled>
                    Enabled
                  </Button>
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>Secondary-40px</h4>
                <div>
                  <Button variant='secondary' size={40}>
                    Enabled
                  </Button>
                  <Button variant='secondary' size={40} disabled>
                    Enabled
                  </Button>
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>Outlined-56px</h4>
                <div>
                  <Button variant='outlined' size={56}>
                    Enabled
                  </Button>
                  <Button variant='outlined' size={56} disabled>
                    Enabled
                  </Button>
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>Outlined-40px</h4>
                <div>
                  <Button variant='outlined' size={40}>
                    Enabled
                  </Button>
                  <Button variant='outlined' size={40} disabled>
                    Enabled
                  </Button>
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>Outlined-36px</h4>
                <div>
                  <Button variant='outlined' size={36}>
                    Enabled
                  </Button>
                  <Button variant='outlined' size={36} disabled>
                    Enabled
                  </Button>
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>Outlined-28px</h4>
                <div>
                  <Button variant='outlined' size={28}>
                    Enabled
                  </Button>
                  <Button variant='outlined' size={28} disabled>
                    Enabled
                  </Button>
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>With Icon-40px</h4>
                <div>
                  <MixButton
                    variant='outlined'
                    size={40}
                    startIcon='ic-add-emoji'
                    iconSize={24}
                    iconColor='black'
                    text='Enabled'
                  />
                  <MixButton
                    variant='outlined'
                    size={40}
                    startIcon='ic-add-emoji'
                    iconSize={24}
                    iconColor='black'
                    text='Enabled'
                    disabled
                  />
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>With Icon-36px</h4>
                <div>
                  <MixButton
                    variant='outlined'
                    size={36}
                    startIcon='ic-add-emoji'
                    iconSize={24}
                    iconColor='black'
                    text='Enabled'
                  />
                  <MixButton
                    variant='outlined'
                    size={36}
                    startIcon='ic-add-emoji'
                    iconSize={24}
                    iconColor='black'
                    text='Enabled'
                    disabled
                  />
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>With Icon-28px</h4>
                <div>
                  <MixButton
                    variant='outlined'
                    size={28}
                    startIcon='ic-add-emoji'
                    iconSize={20}
                    iconColor='black'
                    text='Enabled'
                  />
                  <MixButton
                    variant='outlined'
                    size={28}
                    startIcon='ic-add-emoji'
                    iconSize={20}
                    iconColor='black'
                    text='Enabled'
                    disabled
                  />
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>Add-56px</h4>
                <div>
                  <IconButton
                    style='add-card'
                    icon='ic-plus'
                    iconSize='24'
                    iconColor='white'
                  />
                  <IconButton
                    style='add-card'
                    icon='ic-plus'
                    iconSize='24'
                    iconColor='white'
                    disabled
                  />
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>Carousel Arrow-40px</h4>
                <div className={cx('flex-row')}>
                  <IconButton
                    variant='outlined'
                    style='arrow'
                    icon='ic-arrow-right'
                    iconSize='16'
                    iconColor='gray900'
                  />
                  <IconButton
                    variant='outlined'
                    style='arrow'
                    icon='ic-arrow-left'
                    iconSize='16'
                    iconColor='gray900'
                  />
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>Delete-32px</h4>
                <div>
                  <IconButton
                    variant='outlined'
                    style='square'
                    icon='ic-delete'
                    iconSize='24'
                    iconColor='gray500'
                  />
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>Share-32px</h4>
                <div>
                  <IconButton
                    variant='outlined'
                    style='square'
                    icon='ic-share'
                    iconSize='24'
                    iconColor='gray500'
                  />
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>Emoji-32px</h4>
                <div>
                  <IconButton
                    variant='outlined'
                    style='square'
                    icon='ic-add-emoji'
                    iconSize='24'
                    iconColor='gray500'
                  />
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>Close-24px</h4>
                <div>
                  <IconButton
                    style='square'
                    icon='ic-close'
                    iconSize='24'
                    iconColor='gray500'
                  />
                </div>
              </li>
            </ul>
          </section>

          {/* Tab Components */}
          <section className={cx('guideline')}>
            <h3 className={cx('guideline-title')}>Tab</h3>
            <ul className={cx('guideline-list')}>
              <li className={cx('guideline-list-item')}>
                <div>
                  <Tab />
                </div>
              </li>
            </ul>
          </section>

          {/* Text Field Components - Input, Dropdown */}
          <section className={cx('guideline')}>
            <h3 className={cx('guideline-title')}>TEXT FIELD</h3>
            <ul className={cx('guideline-list')}>
              <li className={cx('guideline-list-item')}>
                <h4>Input</h4>
                <div className={cx('flex-row')}>
                  <div>
                    <Input placeholder='Placeholder' />
                  </div>
                  <div>
                    <Input placeholder='Placeholder' disabled />
                  </div>
                  <div>
                    <Input placeholder='Placeholder' state='error' />
                  </div>
                </div>
              </li>
              <li className={cx('guideline-list-item')}>
                <h4>Dropdown</h4>
                <div>
                  <Dropdown />
                </div>
              </li>
            </ul>
          </section>

          {/* Badges Components - 가족, 지인, 친구, 동료 */}
          <section className={cx('guideline')}>
            <h3 className={cx('guideline-title')}>BADGES</h3>
            <ul className={cx('guideline-list')}>
              <li className={cx('guideline-list-item')}>
                <div className={cx('flex-row')}>
                  <Badge relationship='가족' />
                  <Badge relationship='지인' />
                  <Badge relationship='친구' />
                  <Badge relationship='동료' />
                </div>
              </li>
            </ul>
          </section>

          {/* Color Options Components */}
          <section className={cx('guideline')}>
            <h3 className={cx('guideline-title')}>COLOR OPTIONS</h3>
            <ul className={cx('guideline-list')}>
              <li className={cx('guideline-list-item')}>
                <div>
                  <ColorOption />
                </div>
              </li>
            </ul>
          </section>

          {/* Card List Components */}
          <section className={cx('guideline')}>
            <h3 className={cx('guideline-title')}>Card List</h3>
            <ul className={cx('guideline-list')}>
              <li className={cx('guideline-list-item')}>
                <div>
                  <CardList />
                </div>
              </li>
            </ul>
          </section>

          {/* Card Components */}
          <section className={cx('guideline')}>
            <h3 className={cx('guideline-title')}>Card</h3>
            <ul className={cx('guideline-list')}>
              <li className={cx('guideline-list-item')}>
                <div>
                  <Card />
                </div>
              </li>
            </ul>
          </section>

          {/* Modal Components */}
          <section className={cx('guideline')}>
            <h3 className={cx('guideline-title')}>MODAL</h3>
            <ul className={cx('guideline-list')}>
              <li className={cx('guideline-list-item')}>
                <div>
                  <Modal />
                </div>
              </li>
            </ul>
          </section>

          {/* Sidebar Components */}
          <section className={cx('guideline')}>
            <h3 className={cx('guideline-title')}>SIDEBAR</h3>
            <ul className={cx('guideline-list')}>
              <li className={cx('guideline-list-item')}>
                <div>
                  <Count />
                  <Emoji />
                  <MemberList />
                  <Banner />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
