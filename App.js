import { playersData } from './src/data/playersData';
import React, { useState } from 'react';
import PlayerList from './src/components/PlayerList';
import SortingControls from './src/components/SortingControls';
import FilteringControls from './src/components/FilteringControls';
import Pagination from './src/components/Pagination';
import { playersData } from './src/data/playersData';
import './styles.css';

const App = () => {
  const [players, setPlayers] = useState(playersData);
  const [sorting, setSorting] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;

  // Sorting Function
  const handleSort = (order) => {
    const sortedPlayers = [...players].sort((a, b) => {
      if (order === 'asc') {
        return a.battingAverage - b.battingAverage;
      } else {
        return b.battingAverage - a.battingAverage;
      }
    });
    setPlayers(sortedPlayers);
    setSorting(order);
  };

  // Filtering Function
  const handleFilter = (text) => {
    setFilterText(text);
    const filteredPlayers = playersData.filter(player =>
      player.name.toLowerCase().includes(text.toLowerCase())
    );
    setPlayers(filteredPlayers);
  };

  // Pagination Function
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Get current players
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  return (
    <div className="container">
      <h1>Cricket Player Management System</h1>
      <SortingControls handleSort={handleSort} />
      <FilteringControls handleFilter={handleFilter} />
      <PlayerList players={currentPlayers} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(players.length / playersPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
};

export default App;