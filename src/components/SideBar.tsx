import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import '../styles/sidebar.scss';
import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  selectedGenreId : number;
  setSelectedGenreId : (index : number) => void;
}

export function SideBar({setSelectedGenreId, selectedGenreId} : SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  
  return(
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => setSelectedGenreId(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
);
}