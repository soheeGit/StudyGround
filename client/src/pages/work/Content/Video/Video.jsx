import { useOutletContext } from 'react-router-dom';
import WorkHeader from '../../WorkHeader';

const Video = () => {
  const { boardId } = useOutletContext();
  const { myBoard } = useOutletContext();

  return (
    <>
      <WorkHeader title="Video" />
    </>
  );
};
export default Video;
