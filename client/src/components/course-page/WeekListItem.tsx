import { useEffect, useState } from 'react';

import WeeklyContent from './WeeklyContent';
import styled from 'styled-components';
interface WeekProps {
    weekNumber: number;
    course: any;
}

const WeekListItem: React.FC<WeekProps> = ({ weekNumber, course }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const OpenClickHandler = () => {
        setIsOpen(!isOpen);
    };
    const dailyNodes = course.course[0].days.map((dailyContent: any, index: number) => {
        if (dailyContent.weekNumber === weekNumber) {
            return <WeeklyContent isOpen={isOpen} key={index} dailyContent={dailyContent} />;
        } else return null;
    });

    return (
        <ListItem onClick={OpenClickHandler}>
            <div>Week: {weekNumber}
            {dailyNodes}
            </div>
            <div>+</div>
        </ListItem>
    );
};

export default WeekListItem;

const ListItem = styled.li`
    background-color: var(--secondary-color);
    display:flex;
    justify-content:space-between;
    margin: 5px 0px;
    padding: 2rem;
    border-radius: 5px;
    color:var(--text-color);
    
`;
