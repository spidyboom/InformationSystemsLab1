import React, { useState, useEffect } from 'react';
import { flatApi, refApi } from '../api';
import { CoordinatesModal, HouseModal } from './RefForms';
import { Plus } from 'lucide-react';

export default function FlatForm({ flatToEdit, onClose, onSuccess }) {
    const [houses, setHouses] = useState([]);
    const [coords, setCoords] = useState([]);
    const [showCoordModal, setShowCoordModal] = useState(false);
    const [showHouseModal, setShowHouseModal] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        coordinatesId: null,
        area: '',
        price: '',
        balcony: false,
        timeToMetroOnFoot: '',
        numberOfRooms: '',
        floor: '',
        furnish: 'NONE',
        transport: 'NONE',
        houseId: null,
    });

    useEffect(() => {
        const loadRefs = async () => {
            try {
                const [hRes, cRes] = await Promise.all([
    refApi.getHouses(),
    flatToEdit ? refApi.getCoordinates() : refApi.getAvailableCoordinates()  // ← СТАЛО
]);
                setHouses(hRes.data);
                setCoords(cRes.data);
            } catch (err) {
                console.error("Не удалось загрузить справочники", err);
            }
        };
        loadRefs();

        if (flatToEdit) {
            setFormData({
                name: flatToEdit.name || '',
                coordinatesId: flatToEdit.coordinates?.id ?? null,
                area: flatToEdit.area ?? '',
                price: flatToEdit.price ?? '',
                balcony: flatToEdit.balcony ?? false,
                timeToMetroOnFoot: flatToEdit.timeToMetroOnFoot ?? '',
                numberOfRooms: flatToEdit.numberOfRooms ?? '',
                floor: flatToEdit.floor ?? '',
                furnish: flatToEdit.furnish || 'NONE',
                transport: flatToEdit.transport || 'NONE',
                houseId: flatToEdit.house?.id ?? null,
            });
        }
    }, [flatToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const payload = {
            name: formData.name,
            coordinatesId: formData.coordinatesId ? Number(formData.coordinatesId) : null,
            area: Number(formData.area),
            price: Number(formData.price),
            balcony: formData.balcony,
            timeToMetroOnFoot: Number(formData.timeToMetroOnFoot),
            numberOfRooms: Number(formData.numberOfRooms),
            floor: Number(formData.floor),
            furnish: formData.furnish || null,
            transport: formData.transport || null,
            houseId: formData.houseId ? Number(formData.houseId) : null,
        };

        try {
            if (flatToEdit) {
                await flatApi.update(flatToEdit.id, payload);
            } else {
                await flatApi.create(payload);
            }
            onSuccess();
        } catch (err) {
            const fields = err.response?.data?.fields;
            if (fields) {
                setError("Ошибки валидации:\n" + Object.entries(fields).map(([k, v]) => `• ${k}: ${v}`).join('\n'));
            } else {
                setError(err.response?.data?.error || err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCoordCreated = (newCoord) => {
        setCoords(prev => [...prev, newCoord]);
        setFormData(prev => ({ ...prev, coordinatesId: newCoord.id }));
        setShowCoordModal(false);
    };

    const handleHouseCreated = (newHouse) => {
        setHouses(prev => [...prev, newHouse]);
        setFormData(prev => ({ ...prev, houseId: newHouse.id }));
        setShowHouseModal(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-[520px] max-h-[90vh] overflow-y-auto shadow-xl">
                <h2 className="text-xl font-bold mb-4">{flatToEdit ? 'Редактировать' : 'Создать'} квартиру</h2>

                <label className="block mb-1 font-medium">Название *</label>
                <input required className="w-full border p-2 mb-3 rounded"
                       value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />

                <label className="block mb-1 font-medium">Координаты *</label>
                <div className="flex gap-2 mb-3">
                    <select required className="flex-1 border p-2 rounded"
                            value={formData.coordinatesId ?? ''}
                            onChange={e => setFormData({ ...formData, coordinatesId: e.target.value === '' ? null : Number(e.target.value) })}>
                        <option value="">Выберите координаты</option>
                        {coords.map(c => <option key={c.id} value={c.id}>ID: {c.id} (X: {c.x}, Y: {c.y})</option>)}
                    </select>
                    <button type="button" onClick={() => setShowCoordModal(true)}
                            className="bg-green-600 text-white px-3 rounded hover:bg-green-700 flex items-center gap-1" title="Создать новые координаты">
                        <Plus size={16} />
                    </button>
                </div>

                <label className="block mb-1 font-medium">Дом</label>
                <div className="flex gap-2 mb-3">
                    <select className="flex-1 border p-2 rounded"
                            value={formData.houseId ?? ''}
                            onChange={e => setFormData({ ...formData, houseId: e.target.value === '' ? null : Number(e.target.value) })}>
                        <option value="">Без дома</option>
                        {houses.map(h => <option key={h.id} value={h.id}>{h.name} ({h.year} г.)</option>)}
                    </select>
                    <button type="button" onClick={() => setShowHouseModal(true)}
                            className="bg-green-600 text-white px-3 rounded hover:bg-green-700 flex items-center gap-1" title="Создать новый дом">
                        <Plus size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block mb-1 font-medium">Площадь (м²) *</label>
                        <input required type="number" min="1" className="w-full border p-2 rounded"
                               value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value })} />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Цена (₽) *</label>
                        <input required type="number" min="1" className="w-full border p-2 rounded"
                               value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Комнат *</label>
                        <input required type="number" min="1" className="w-full border p-2 rounded"
                               value={formData.numberOfRooms} onChange={e => setFormData({ ...formData, numberOfRooms: e.target.value })} />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Этаж *</label>
                        <input required type="number" min="1" className="w-full border p-2 rounded"
                               value={formData.floor} onChange={e => setFormData({ ...formData, floor: e.target.value })} />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Минут до метро *</label>
                        <input required type="number" min="1" className="w-full border p-2 rounded"
                               value={formData.timeToMetroOnFoot} onChange={e => setFormData({ ...formData, timeToMetroOnFoot: e.target.value })} />
                    </div>
                    <div className="flex items-end">
                        <div className="flex items-center gap-2 mb-2">
                            <input type="checkbox" id="balcony" checked={formData.balcony}
                                   onChange={e => setFormData({ ...formData, balcony: e.target.checked })} className="w-4 h-4" />
                            <label htmlFor="balcony" className="font-medium">Есть балкон</label>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                        <label className="block mb-1 font-medium">Отделка (furnish)</label>
                        <select className="w-full border p-2 rounded"
                                value={formData.furnish ?? ''}
                                onChange={e => setFormData({ ...formData, furnish: e.target.value === '' ? null : e.target.value })}>
                            <option value="">— не указано —</option>
                            <option value="DESIGNER">DESIGNER</option>
                            <option value="FINE">FINE</option>
                            <option value="NONE">NONE</option>
                            <option value="BAD">BAD</option>
                            <option value="LITTLE">LITTLE</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Транспорт (transport)</label>
                        <select className="w-full border p-2 rounded"
                                value={formData.transport ?? ''}
                                onChange={e => setFormData({ ...formData, transport: e.target.value === '' ? null : e.target.value })}>
                            <option value="">— не указано —</option>
                            <option value="ENOUGH">ENOUGH</option>
                            <option value="NORMAL">NORMAL</option>
                            <option value="LITTLE">LITTLE</option>
                            <option value="FEW">FEW</option>
                            <option value="NONE">NONE</option>
                        </select>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded mt-3 text-sm whitespace-pre-line">{error}</div>
                )}

                <div className="flex justify-end gap-2 mt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Отмена</button>
                    <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                        {loading ? 'Сохранение...' : 'Сохранить'}
                    </button>
                </div>
            </form>

            {showCoordModal && <CoordinatesModal onClose={() => setShowCoordModal(false)} onCreated={handleCoordCreated} />}
            {showHouseModal && <HouseModal onClose={() => setShowHouseModal(false)} onCreated={handleHouseCreated} />}
        </div>
    );
}