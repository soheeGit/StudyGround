import { Descriptions } from 'antd';
import styled from 'styled-components';
import { FaRegSmile } from 'react-icons/fa';
import { PiSmileySadBold } from 'react-icons/pi';
const AuthoModal = ({ myType }) => {
  const typesData = {
    선구자: {
      description:
        '새로운 지식을 탐구하고 배우는 것에 열려있으며, 어려운 문제들을 다양한 방식으로 유연하게 대처해내요.',
      bestMatches: ['지도자', '탐구자', '환기자'],
      worstMatches: ['전략판단가', '수행자'],
    },
    탐구자: {
      description:
        '외향적이고 열정적이므로 다양한 상황에서 적응을 잘하며 기회를 발굴, 탐색하는 능력이 있어 적절한 의사결정을 내릴 수 있어요.',
      bestMatches: ['수행자', '환기자'],
      worstMatches: ['완주자', '전문가'],
    },
    지도자: {
      description:
        '자신감 넘치는 훌륭한 지도자로서,문제 신속하게 인식하고 의사결정에 적극적이에요.',
      bestMatches: ['수행자', '환기자'],
      worstMatches: ['추진자'],
    },
    추진자: {
      description:
        '도전적이고 어려운 상황에서도 긍정적인 태도를 유지하고 장애를 극복하는 과정에서 추진력과 팀원들의 역량을 존중해줘요.',
      bestMatches: ['탐구자'],
      worstMatches: ['선구자'],
    },
    수행자: {
      description:
        '자신의 행동과 결정에 대해 책임감이 있고, 명확한 계획을 세워 이를 실행에 잘 옮겨요.',
      bestMatches: ['지도자', '전략판단가', '탐구자', '완주자'],
      worstMatches: ['수행자', '선구자'],
    },
    전략판단가: {
      description:
        '냉정하고 전략적이며 주관적인 편향을 최소화시켜 객관적으로 상황을 바라보고 결정을 내릴 수 있어요.',
      bestMatches: ['지도자', '수행자'],
      worstMatches: ['완주자'],
    },
    완주자: {
      description:
        '근면 성실하여 현실적이고 실수나 빠진 것을 찾아내며 제 시간에 목표를 달성해내요.',
      bestMatches: ['수행자'],
      worstMatches: ['탐구자'],
    },
    환기자: {
      description:
        '항상 긍정적이고 밝은 태도를 유지하며 외교적이고, 사람들과 상호 작용하며 조직을 평온하게 해요.',
      bestMatches: ['환기자', '선구자'],
      worstMatches: ['추진자'],
    },
    전문가: {
      description:
        '한가지 일에만 전념하고 긍정적인 해결책을 모색하여 낙관주의적인 태도를 유지하고, 전문 분야의 지식과 기능을 잘 제공해요.',
      bestMatches: ['환기자', '수행자'],
      worstMatches: ['선구자'],
    },
  };
  console.log(typesData[myType]);
  return (
    <ModalWrap>
      <ModalTop>
        <ModalTop1>저는 </ModalTop1>
        <ModalTop2>{myType}</ModalTop2>
        <ModalTop3> 입니다 !</ModalTop3>
      </ModalTop>
      <ModalMiddel>{typesData[myType].description}</ModalMiddel>
      <ModalFooter>
        <Best>
          <BestHeader>
            <FaRegSmile />
            &nbsp;잘 맞는 유형
          </BestHeader>
          {typesData[myType].bestMatches.map((best) => (
            <BestContent>{best}</BestContent>
          ))}
        </Best>
        <Worst>
          <WorstHeader>
            {' '}
            <PiSmileySadBold />
            &nbsp;안 맞는 유형
          </WorstHeader>
          {typesData[myType].worstMatches.map((worst) => (
            <WorstContent>{worst}</WorstContent>
          ))}
        </Worst>
      </ModalFooter>
    </ModalWrap>
  );
};

const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  background-color: #f0f0f0;
  border-radius: 5px;
`;
const ModalTop = styled.div`
  display: flex;
  align-items: end;
  padding-top: 10px;
  padding-bottom: 20px;
  font-weight: 600;
`;
const ModalTop1 = styled.div`
  font-size: 20px;
`;
const ModalTop2 = styled.div`
  font-size: 40px;
`;
const ModalTop3 = styled.div``;

const ModalMiddel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 30px;
  padding-bottom: 40px;
  font-size: 18px;
`;
const ModalFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-top: 1px solid;
`;
const Best = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const BestHeader = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const BestContent = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
  transition: background-color 0.3s;
  &:hover {
    background: cornflowerblue;
    color: white;
    transition: 0.5s;
  }
  cursor: pointer;
`;
const Worst = styled.div`
  width: 100%;
  border-left: 1px solid;
`;
const WorstHeader = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const WorstContent = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ed6a5a;
    color: white;
    transition: 0.5s;
  }
  cursor: pointer;
`;
export default AuthoModal;
