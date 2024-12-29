import AnimeCard from "./AnimeCard";

interface SearchResultsProps {
  xmlDoc: Document;
}

const SearchResults = ({ xmlDoc }: SearchResultsProps) => {
  const animeElements = xmlDoc.getElementsByTagName("anime");
  const reportElements = xmlDoc.getElementsByTagName("item");
  
  const elements = animeElements.length > 0 ? animeElements : reportElements;
  
  if (elements.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No results found. Try a different search term or type.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Array.from(elements).map((anime) => (
        <AnimeCard key={anime.getAttribute("id")} anime={anime} />
      ))}
    </div>
  );
};

export default SearchResults;