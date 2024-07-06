import WorkHeadr from '../../WorkHeader';
import './Storage.css';
import storage1 from '../../../../assets/storage1.png';
import storage2 from '../../../../assets/storage2.png';
import storage3 from '../../../../assets/storage3.png';
import { Link } from 'react-router-dom';

const Storage = () => {
  return (
    <>
      <WorkHeadr title='Storage' />
      <div className='storage-container'>
        <div className='storage-img-container'>
          <img src={storage1} width={'50px'} />
          <p>Image</p>
        </div>
        <div className='storage-file-container'>
          <img src={storage2} width={'50px'} />
          <p>File</p>
        </div>
        <div className='storage-memo-container'>
          <img src={storage3} width={'50px'} />
          <p>Memo</p>
        </div>
        <div className='storage-task-container'>
          <img src={storage3} width={'50px'} />
          <p>Memo</p>
        </div>
      </div>
    </>
  );
};
export default Storage;
