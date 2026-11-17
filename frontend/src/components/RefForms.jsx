import React, { useState } from 'react';
import api from '../api';

export function CoordinatesModal({ onClose, onCreated }) {
    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await api.post('/coordinates', {
                x: parseFloat(x),
                y: parseFloat(y)
            });
            onCreated(res.data);
        } catch (err) {
            const fields = err.response?.data?.fields;
            if (fields) {
                setError(Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n'));
            } else {
                setError(err.response?.data?.error || err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-96 shadow-xl">
                <h3 className="text-lg font-bold mb-4">Создать координаты</h3>
                <label className="block mb-1 font-medium">X (Float) *</label>
                <input required type="number" step="any" className="w-full border p-2 mb-3 rounded"
                       value={x} onChange={e => setX(e.target.value)} placeholder="Например: 30.5" />
                <label className="block mb-1 font-medium">Y (должен быть &gt; -504) *</label>
                <input required type="number" step="any" className="w-full border p-2 mb-3 rounded"
                       value={y} onChange={e => setY(e.target.value)} placeholder="Например: 59.9" />
                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-700 p-2 rounded mb-3 text-sm whitespace-pre-line">
                        {error}
                    </div>
                )}
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Отмена</button>
                    <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
                        {loading ? 'Создание...' : 'Создать'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export function HouseModal({ onClose, onCreated }) {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [flatsOnFloor, setFlatsOnFloor] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await api.post('/houses', {
                name,
                year: parseInt(year, 10),
                numberOfFlatsOnFloor: parseInt(flatsOnFloor, 10)
            });
            onCreated(res.data);
        } catch (err) {
            const fields = err.response?.data?.fields;
            if (fields) {
                setError(Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n'));
            } else {
                setError(err.response?.data?.error || err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-96 shadow-xl">
                <h3 className="text-lg font-bold mb-4">Создать дом</h3>
                <label className="block mb-1 font-medium">Название *</label>
                <input required className="w-full border p-2 mb-3 rounded"
                       value={name} onChange={e => setName(e.target.value)} placeholder="Например: ул. Ленина, 1" />
                <label className="block mb-1 font-medium">Год постройки (1–256) *</label>
                <input required type="number" min="1" max="256" className="w-full border p-2 mb-3 rounded"
                       value={year} onChange={e => setYear(e.target.value)} placeholder="Например: 2020" />
                <label className="block mb-1 font-medium">Квартир на этаже *</label>
                <input required type="number" min="1" className="w-full border p-2 mb-3 rounded"
                       value={flatsOnFloor} onChange={e => setFlatsOnFloor(e.target.value)} placeholder="Например: 4" />
                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-700 p-2 rounded mb-3 text-sm whitespace-pre-line">
                        {error}
                    </div>
                )}
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Отмена</button>
                    <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
                        {loading ? 'Создание...' : 'Создать'}
                    </button>
                </div>
            </form>
        </div>
    );
}