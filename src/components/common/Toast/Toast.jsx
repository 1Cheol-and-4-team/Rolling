import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CustomToast.scss';

export function Toast() {
  const ShowToast = () =>
    toast.success('URL이 복사되었습니다.', {
      theme: 'dark',
      position: 'top-center',
      autoClose: 4000,
      className: 'custom-toast',
      closeButton: true,
      hideProgressBar: true,
      limit: 1,
    });

  return (
    <>
      <ToastContainer
        className={'toast-text-style'}
        position='top-center' // 알람 위치 지정
        autoClose={4000} // 자동 off 시간
        closeButton={false} //닫기버튼
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick={false} // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnHover={false} // 마우스를 올리면 알람 정지
        limit={1} // 알람 개수 제한
      />
    </>
  );
}
