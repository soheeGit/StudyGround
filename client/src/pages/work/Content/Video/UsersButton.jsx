import styled from 'styled-components';
import IconButton from './IconButton';
import { FaUserFriends } from 'react-icons/fa';
import { defaultIconPrefixCls } from 'antd/es/config-provider';

const UsersButton = ({ usersCount, onClick }) => {
  return (
    <IconButton name="Users">
      <FaUserFriends size={'20px'} onClick={onClick} />
    </IconButton>
  );
};
export default UsersButton;
