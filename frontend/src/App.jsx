import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FlatList from './components/FlatList';
import FlatForm from './components/FlatForm';
import FlatDetail from './components/FlatDetail';
import SpecialOps from './components/SpecialOps';

function App() {
    const [showForm, setShowForm] = useState(false);
    const [editingFlat, setEditingFlat] = useState(null);

    const handleEdit = (flat = null) => {
        setEditingFlat(flat);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingFlat(null);
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-100 font-sans">
                <nav className="bg-blue-800 text-white p-4 flex gap-6">
                    <Link to="/" className="hover:underline">🏢 Управление квартирами</Link>
                    <Link to="/special" className="hover:underline">⚙️ Специальные операции БД</Link>
                </nav>

                <main className="container mx-auto mt-6 bg-white rounded shadow-lg min-h-[500px]">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <FlatList onEdit={handleEdit} />
                                {showForm && (
                                    <FlatForm
                                        flatToEdit={editingFlat}
                                        onClose={handleCloseForm}
                                        onSuccess={handleCloseForm}
                                    />
                                )}
                            </>
                        } />
                        <Route path="/flats/:id" element={<FlatDetail />} />
                        <Route path="/special" element={<SpecialOps />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;