import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { flatApi } from '../api';
import { Edit, ArrowLeft } from 'lucide-react';
import FlatForm from './FlatForm';

export default function FlatDetail() {
    const { id } = useParams();
    const [flat, setFlat] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        flatApi.getById(id)
            .then(res => setFlat(res.data))
            .catch(err => alert("Квартира не найдена: " + (err.response?.data?.error || err.message)));
    }, [id]);

    if (!flat) return <div className="p-8 text-gray-500">Загрузка...</div>;

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Квартира #{flat.id}</h2>
                <div className="flex gap-2">
                    <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-3 py-2 rounded flex items-center gap-2">
                        <Edit size={16} /> Редактировать
                    </button>
                    <Link to="/" className="bg-gray-200 px-3 py-2 rounded flex items-center gap-2">
                        <ArrowLeft size={16} /> Назад
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-white p-4 rounded shadow border">
                <Row label="Название" value={flat.name} />
                <Row label="Площадь" value={`${flat.area} м²`} />
                <Row label="Цена" value={`${flat.price} ₽`} />
                <Row label="Балкон" value={flat.balcony ? 'Да' : 'Нет'} />
                <Row label="До метро" value={`${flat.timeToMetroOnFoot} мин`} />
                <Row label="Комнат" value={flat.numberOfRooms} />
                <Row label="Этаж" value={flat.floor} />
                <Row label="Отделка" value={flat.furnish || '—'} />
                <Row label="Транспорт" value={flat.transport || '—'} />
                <Row label="Создана" value={flat.creationDate?.replace('T', ' ')} />
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-2">Связанные объекты</h3>
            <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border rounded bg-gray-50">
                    <div className="font-semibold">Координаты</div>
                    <div>X: {flat.coordinates?.x}</div>
                    <div>Y: {flat.coordinates?.y}</div>
                </div>
                <div className="p-3 border rounded bg-gray-50">
                    <div className="font-semibold">Дом</div>
                    {flat.house ? (
                        <>
                            <div>Название: {flat.house.name}</div>
                            <div>Год: {flat.house.year}</div>
                            <div>Квартир на этаже: {flat.house.numberOfFlatsOnFloor}</div>
                        </>
                    ) : <div className="text-gray-400">Не привязан</div>}
                </div>
            </div>

            {editing && (
                <FlatForm
                    flatToEdit={flat}
                    onClose={() => setEditing(false)}
                    onSuccess={() => { setEditing(false); flatApi.getById(id).then(r => setFlat(r.data)); }}
                />
            )}
        </div>
    );
}

const Row = ({ label, value }) => (
    <div className="flex justify-between border-b py-1">
        <span className="text-gray-600">{label}:</span>
        <span className="font-medium">{value}</span>
    </div>
);