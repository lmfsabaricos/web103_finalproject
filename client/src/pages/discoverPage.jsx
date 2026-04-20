import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import '../Pages_css/discoverPage.css';

const PER_PAGE = 30;

const DiscoverPage = () => {
    const [searchParams] = useSearchParams();
    const [flowers, setFlowers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        setIsLoading(true);
        setCurrentPage(1);
        const url = searchQuery
            ? `/api/flowers?search=${encodeURIComponent(searchQuery)}`
            : '/api/flowers';

        fetch(url)
            .then(res => res.json())
            .then(data => setFlowers(Array.isArray(data) ? data : []))
            .catch(err => console.error('Error fetching flowers:', err))
            .finally(() => setIsLoading(false));
    }, [searchQuery]);

    const totalPages = Math.ceil(flowers.length / PER_PAGE);
    const pageFlowers = flowers.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    return (
        <main className="discover-page">
            <h1 className="discover-title">
                {searchQuery ? `Results for "${searchQuery}"` : 'Discover Flowers'}
            </h1>

            {isLoading && <p className="discover-status">Loading flowers...</p>}

            {!isLoading && flowers.length === 0 && (
                <p className="discover-status">No flowers found.</p>
            )}

            <div className="flower-grid">
                {pageFlowers.map(flower => (
                    <Link
                        key={flower.id}
                        to={`/gallery/${flower.id}`}
                        className="flower-card"
                    >
                        <div className="flower-card-image">
                            {flower.image_url ? (
                                <img src={flower.image_url} alt={flower.name} />
                            ) : (
                                <span className="flower-card-placeholder" aria-hidden="true">🌸</span>
                            )}
                        </div>
                        <div className="flower-card-info">
                            <h2 className="flower-card-name">{flower.name}</h2>
                            {flower.flower_family && (
                                <p className="flower-card-family">{flower.flower_family}</p>
                            )}
                            {flower.flower_meaning && (
                                <p className="flower-card-meaning">{flower.flower_meaning}</p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(p => p - 1)}
                        disabled={currentPage === 1}
                    >
                        ← Prev
                    </button>
                    <span className="pagination-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(p => p + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next →
                    </button>
                </div>
            )}
        </main>
    );
};

export default DiscoverPage;
