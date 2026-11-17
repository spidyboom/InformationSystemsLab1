import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { flatApi } from '../api';
import { createWebSocketClient } from '../websocket';
import { Trash2, Edit, Plus, ArrowUpDown } from 'lucide-react';

const COLUMNS = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Название', sortable: true },
    { key: 'area', label: 'Площадь', sortable: true },
    { key: 'price', label: 'Цена', sortable: true },
    { key: 'balcony', label: 'Балкон', sortable: true },
    { key: 'timeToMetroOnFoot', label: 'До метро', sortable: true },
    { key: 'numberOfRooms', label: 'Комнат', sortable: true },
    { key: 'floor', label: 'Этаж', sortable: true },
    { key: 'furnish', label: 'Отделка', sortable: true },
    { key: 'transport', label: 'Транспорт', sortable: true },
    { key: 'creationDate', label: 'Создана', sortable: true },
];

export default function FlatList({ onEdit }) {
    const [flats, setFlats] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [sortDir, setSortDir] = useState('asc');

    const loadData = useCallback(async () => {
        try {
            const res = await flatApi.getAll(page, 10, filter, `${sortBy},${sortDir}`);
            setFlats(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            alert("Ошибка загрузки: " + (err.response?.data?.error || err.message));
        }
    }, [page, filter, sortBy, sortDir]);

    useEffect(() => {
        loadData();
        const wsClient = createWebSocketClient(() => {
            console.log("WebSocket: данные изменились, обновляем...");
            loadData();
        });
        return () => wsClient.deactivate();
    }, [loadData]);

    const handleSort = (key) => {
        if (sortBy === key) {
            setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortDir('asc');
        }
        setPage(0);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Удалить эту квартиру?')) {
            try {
                await flatApi.delete(id);
                loadData();
            } catch (err) {
                alert(err.response?.data?.error || "Невозможно удалить");
            }
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <input type="text" placeholder="Фильтр по имени..."
                       className="border p-2 rounded w-1/3"
                       value={filter} onChange={(e) => { setFilter(e.target.value); setPage(0); }} />
                <button onClick={() => onEdit()} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
                    <Plus size={18} /> Добавить
                </button>
            </div>

            <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        {COLUMNS.map(col => (
                            <th key={col.key} className="border p-2 cursor-pointer select-none hover:bg-blue-700"
                                onClick={() => handleSort(col.key)}>
                                <span className="flex items-center gap-1 justify-center">
                                    {col.label}
                                    {col.sortable && <ArrowUpDown size={14} />}
                                </span>
                            </th>
                        ))}
                        <th className="border p-2">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {flats.map(flat => (
                        <tr key={flat.id} className="text-center hover:bg-gray-50">
                            <td className="border p-2">
                                <Link to={`/flats/${flat.id}`} className="text-blue-600 underline">{flat.id}</Link>
                            </td>
                            <td className="border p-2">{flat.name}</td>
                            <td className="border p-2">{flat.area} м²</td>
                            <td className="border p-2">{flat.price} ₽</td>
                            <td className="border p-2">{flat.balcony ? 'Да' : 'Нет'}</td>
                            <td className="border p-2">{flat.timeToMetroOnFoot} мин</td>
                            <td className="border p-2">{flat.numberOfRooms}</td>
                            <td className="border p-2">{flat.floor}</td>
                            <td className="border p-2">{flat.furnish || '—'}</td>
                            <td className="border p-2">{flat.transport || '—'}</td>
                            <td className="border p-2 text-xs">{flat.creationDate?.replace('T', ' ')}</td>
                            <td className="border p-2 flex justify-center gap-2">
                                <button onClick={() => onEdit(flat)} className="text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
                                <button onClick={() => handleDelete(flat.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
                            </td>
                        </tr>
                    ))}
                    {flats.length === 0 && (
                        <tr><td colSpan={COLUMNS.length + 1} className="border p-4 text-gray-500">Нет данных</td></tr>
                    )}
                </tbody>
            </table>

            <div className="flex justify-center items-center gap-4 mt-4">
                <button disabled={page === 0} onClick={() => setPage(p => p - 1)}
                        className="px-4 py-2 border rounded disabled:opacity-50">Назад</button>
                <span>Страница {page + 1} из {totalPages}</span>
                <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}
                        className="px-4 py-2 border rounded disabled:opacity-50">Вперёд</button>
            </div>
        </div>
    );
}