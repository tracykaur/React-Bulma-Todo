import React from 'react';
import { Progress, Level, Heading, Title } from 'reactbulma'

const Header = ({ totalIncomplete, totalComplete  }) => (
  <div>
    <Progress primary value={totalComplete/ (totalIncomplete+totalComplete) * 100} max="100"></Progress>
    <Level>
      <Level.Item hasTextCentered>
        <div>
          <Heading>INCOMPLETE</Heading>
          <Title>{ totalIncomplete }</Title>
        </div>
        </Level.Item>
        <Level.Item hasTextCentered>
        <div>
          <Heading>COMPLETE</Heading>
          <Title>{ totalComplete }</Title>
        </div>
      </Level.Item>
    </Level>

  </div>
)

export default Header;
