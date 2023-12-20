import { Quill } from 'react-quill';
import './QuillToolbar.scss';

export const modules = {
  toolbar: {
    container: '#toolbar',
  },
};

export const Font = Quill.import('formats/font');
Font.whitelist = [
  'Noto-sans',
  'Pretendard',
  'Helvetica',
  'Nanum-Myeongjo',
  'Nanum-Pen-Script',
];
Quill.register(Font, true);

export const QuillToolbar = () => (
  <div id='toolbar'>
    <span className='ql-formats'>
      <button className='ql-bold' />
      <button className='ql-italic' />
      <button className='ql-underline' />
      <button className='ql-strike' />
    </span>
    <span className='ql-formats'>
      <select className='ql-align' />
      <select className='ql-color' />
      <select className='ql-background' />
    </span>
    <span className='ql-formats'>
      <select className='ql-font' defaultValue='arial'>
        <option value='Noto-sans'>Noto sans</option>
        <option value='Pretendard'>Pretendard</option>
        <option value='Helvetica'>Helvetica</option>
        <option value='Nanum-Myeongjo'>나눔명조</option>
        <option value='Nanum-Pen-Script'>나눔손글씨 손편지체</option>
      </select>
      <select className='ql-size' defaultValue='small'>
        <option value='small'>small</option>
        <option value='medium'>medium</option>
        <option value='large'>large</option>
      </select>
      <select className='ql-header' defaultValue='3'>
        <option value='1'>Heading 1</option>
        <option value='2'>Heading 2</option>
        <option value='3'>normal</option>
      </select>
    </span>
    <span className='ql-formats'>
      <button className='ql-code-block' />
      <button className='ql-clean' />
    </span>
  </div>
);
