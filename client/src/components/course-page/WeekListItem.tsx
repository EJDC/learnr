import { useState } from 'react';

import WeeklyContent from './WeeklyContent';
import styled from 'styled-components';
interface WeekProps {
    weekNumber: number;
    course: any | number;
    setOpenWeekNumber: React.Dispatch<React.SetStateAction<number>>;
    setOpenDayNumber: React.Dispatch<React.SetStateAction<number>>;
    openWeekNumber: number;
}

const WeekListItem: React.FC<WeekProps> = ({
    weekNumber,
    course,
    setOpenWeekNumber,
    setOpenDayNumber,
    openWeekNumber,
}) => {
    const OpenClickHandler = () => {
        setOpenWeekNumber(weekNumber);
    };
    const dailyNodes = course[0].days.map((dailyContent: any, index: number) => {
        if (dailyContent.weekNumber === weekNumber) {
            return (
                <WeeklyContent
                    key={index}
                    dailyContent={dailyContent}
                    setOpenDayNumber={setOpenDayNumber}
                    openWeekNumber={openWeekNumber}
                />
            );
        } else return null;
    });

    return (
        <ListItem onClick={OpenClickHandler}>
            <div>
                Week: {weekNumber}
                {dailyNodes}
            </div>
            <div>+</div>
        </ListItem>
    );
};

export default WeekListItem;

const ListItem = styled.li`
    background-color: var(--secondary-color);
    display: flex;
    justify-content: space-between;
    margin: 5px 0px;
    padding: 2rem;
    border-radius: 5px;
    color: var(--text-color);
`;
