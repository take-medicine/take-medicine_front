import React from 'react';
import './HomePage.css';
import AddButton from '../../components/addButton/AddButton';
import HistoryCard from '../../components/historyCard/HistoryCard';

export default function HomePage() {
    return(
        <div className="home-page">
            <div className="home-page__widgets-right">
                <HistoryCard />
            </div>
            <div className="home-page__button">
                <AddButton />
            </div>
            
        </div>
    );
}