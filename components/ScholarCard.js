// ScholarCard is a card component that displays information about scholars
// and their funding goals. It includes a progress bar to visualize the amount raised towards their goal.
import styled from 'styled-components';
import { formatWeiToEth, formatNumber } from '@/utils/format';

const Card = styled.div`
  border: none;
  padding: 1.5rem;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, #fcfa8a, #1e3a8a);
  }
`;

const Progress = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(to right, #fcfa8a, #1e3a8a);
  border-radius: 4px;
  transition: width 0.5s ease;
`;

const Info = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Value = styled.span`
  color: #1e293b;
  font-weight: 600;
  font-size: 1rem;
`;

const StudentName = styled.h3`
  color: #1e3a8a;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '🎓';
    font-size: 1.5rem;
  }
`;

const Status = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background: linear-gradient(135deg, #fcfa8a 0%, #f6e05e 100%);
  color: #1e3a8a;
`;

export function ScholarCard({ name, goal, raised, key }) {
  const formattedGoal = formatNumber(formatWeiToEth(goal));
  const formattedRaised = formatNumber(formatWeiToEth(raised));
  const progress = (raised / goal) * 100;

  return (
    <Card>
      <StudentName>{name}</StudentName>
      <Status>{progress.toFixed(1)}% Funded</Status>
      <Info>
        <Label>Goal:</Label>
        <Value>{formattedGoal} ETH</Value>
      </Info>
      <Info>
        <Label>Raised:</Label>
        <Value>{formattedRaised} ETH</Value>
      </Info>
      <Progress>
        <ProgressFill style={{ width: `${progress}%` }} />
      </Progress>
    </Card>
  );
}