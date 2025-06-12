const LS_KEY = "portfolioGames";

function getInitialGames() {
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
        }
    ];
}

function AdminGalleryEditor() {
    const [games, setGames] = React.useState(getInitialGames());
    const [editIdx, setEditIdx] = React.useState(null);
    const [form, setForm] = React.useState({title: "", desc: "", thumb: "", video: ""});

    React.useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(games));
    }, [games]);

    const handleEdit = idx => {
        setEditIdx(idx);
        setForm(games[idx]);
    };

    const handleSave = () => {
        const updated = [...games];
        updated[editIdx] = {...form};
        setGames(updated);
        setEditIdx(null);
    };

    const handleAdd = () => {
        setGames([...games, {title: "New Game", desc: "", thumb: "", video: ""}]);
    };

    const handleDelete = idx => {
        if (window.confirm("Видалити цю картку?")) {
            setGames(games.filter((_, i) => i !== idx));
            setEditIdx(null);
        }
    };

    return (
        <div style={{width: "100%", maxWidth: 900, margin: "0 auto"}}>
            <div className="portfolio-title-row">
                <span className="line"></span>
                <span className="portfolio-title">Admin Gallery</span>
                <span className="line"></span>
            </div>
            <button style={{marginBottom: 24, fontSize: 18}} onClick={handleAdd}>Додати картку</button>
            <div className="portfolio-cards-row">
                {games.map((game, idx) => (
                    <div className="portfolio-card2" key={idx} style={{position: "relative"}}>
                        <div style={{flex:1}}></div>
                        <div className="portfolio-card2-title">{game.title}</div>
                        <button style={{
                            position: "absolute", top: 8, right: 8, fontSize: 14
                        }} onClick={() => handleEdit(idx)}>✏️</button>
                        <button style={{
                            position: "absolute", top: 8, left: 8, fontSize: 14
                        }} onClick={() => handleDelete(idx)}>🗑️</button>
                    </div>
                ))}
            </div>
            {editIdx !== null && (
                <div className="portfolio-modal-bg" style={{zIndex: 2000}}>
                    <div className="portfolio-modal2" style={{minWidth: 400, maxWidth: 500, flexDirection: "column"}}>
                        <div style={{padding: 32, background: "#23273a", color: "#fff", flex: 1}}>
                            <div style={{marginBottom: 12}}>
                                <label>Назва:<br/>
                                    <input style={{width: "100%"}} value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))}/>
                                </label>
                            </div>
                            <div style={{marginBottom: 12}}>
                                <label>Опис:<br/>
                                    <textarea style={{width: "100%"}} value={form.desc} onChange={e => setForm(f => ({...f, desc: e.target.value}))}/>
                                </label>
                            </div>
                            <div style={{marginBottom: 12}}>
                                <label>Фото (шлях):<br/>
                                    <input style={{width: "100%"}} value={form.thumb} onChange={e => setForm(f => ({...f, thumb: e.target.value}))}/>
                                </label>
                            </div>
                            <div style={{marginBottom: 12}}>
                                <label>Відео (шлях):<br/>
                                    <input style={{width: "100%"}} value={form.video} onChange={e => setForm(f => ({...f, video: e.target.value}))}/>
                                </label>
                            </div>
                        </div>
                        <div style={{padding: 24, background: "#5a5e6a", textAlign: "right"}}>
                            <button onClick={handleSave} style={{marginRight: 16}}>Зберегти</button>
                            <button onClick={() => setEditIdx(null)}>Скасувати</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('admin-root')).render(<AdminGalleryEditor />);
