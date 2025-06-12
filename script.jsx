const LS_KEY = "portfolioGames";

function getPortfolioGames() {
    const fromLS = localStorage.getItem(LS_KEY);
    if (fromLS) {
        try { return JSON.parse(fromLS); } catch {}
    }
    return [
        {
            title: "Stick&Shoot",
            video: "video1.mp4",
            desc: "About game...",
            thumb: "game1.jpg"
        },
        {
            title: "Jump&Run",
            video: "video2.mp4",
            desc: "About game...",
            thumb: "game2.jpg"
        },
        {
            title: "Puzzle Master",
            video: "video3.mp4",
            desc: "About game...",
            thumb: "game3.jpg"
        },
        {
            title: "Color Rush",
            video: "video4.mp4",
            desc: "About game...",
            thumb: "game4.jpg"
        },
        {
            title: "Space Tap",
            video: "video5.mp4",
            desc: "About game...",
            thumb: "game5.jpg"
        },
        {
            title: "Fruit Slice",
            video: "video6.mp4",
            desc: "About game...",
            thumb: "game6.jpg"
        },
        {
            title: "Block Drop",
            video: "video7.mp4",
            desc: "About game...",
            thumb: "game7.jpg"
        },
        {
            title: "Bubble Pop",
            video: "video8.mp4",
            desc: "About game...",
            thumb: "game8.jpg"
        }
    ];
}

function PortfolioModal2({ open, onClose, game }) {
    if (!open || !game) return null;
    return (
        <div className="portfolio-modal-bg" onClick={onClose}>
            <div className="portfolio-modal2" onClick={e => e.stopPropagation()}>
                <div className="portfolio-modal2-left">
                    <video
                        className="portfolio-modal2-video"
                        src={game.video}
                        controls
                        poster={game.thumb}
                    />
                </div>
                <div className="portfolio-modal2-right">
                    <div className="portfolio-modal2-title">{game.title}</div>
                    <div className="portfolio-modal2-desc">{game.desc}</div>
                    <button className="portfolio-modal2-close" onClick={onClose}>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

function PortfolioSection() {
    const [modalGame, setModalGame] = React.useState(null);
    const [games, setGames] = React.useState(getPortfolioGames());

    // Оновлюємо при зміні localStorage (наприклад, після редагування в адмінці)
    React.useEffect(() => {
        const handler = () => setGames(getPortfolioGames());
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);

    return (
        <div>
            <div className="portfolio-title-row">
                <span className="line"></span>
                <span className="portfolio-title">Portfolio</span>
                <span className="line"></span>
            </div>
            <div className="portfolio-cards-row">
                {games.map((game, idx) => (
                    <div
                        className="portfolio-card2"
                        key={idx}
                        onClick={() => setModalGame(game)}
                    >
                        {/* Можна додати <img src={game.thumb} ... /> якщо є прев'ю */}
                        <div style={{flex:1}}></div>
                        <div className="portfolio-card2-title">{game.title}</div>
                    </div>
                ))}
            </div>
            <PortfolioModal2
                open={!!modalGame}
                onClose={() => setModalGame(null)}
                game={modalGame}
            />
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('portfolio-root')).render(<PortfolioSection />);
