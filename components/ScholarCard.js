// ScholarCard is a card component that displays information about scholars
// and their funding goals. It includes a progress bar to visualize the amount raised towards their goal.
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  
`;

const Progress = styled.progress`
  width: 100%;
  height: 14px;
`;
export function ScholarCard({ name, goal, raised, key }) {
    return (
      <Card>
        <h3>{name}</h3>
        <p>Goal: {goal} ETH</p>
        <p>Raised: {raised} ETH</p>
        <Progress value={raised} max={goal} />
      </Card>
    );
  }