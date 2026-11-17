import React, { useState } from 'react';
import { specialApi } from '../api';

export default function SpecialOps() {
    const [result, setResult] = useState(null);
    const [resultType, setResultType] = useState('success'); // 'success' | 'error'
    const [furnishVal, setFurnishVal] = useState('');
    const [prefixVal, setPrefixVal] = useState('');
    const [loading, setLoading] = useState(false);

    const showError = (msg) => {
        setResultType('error');
        setResult(msg);
    };

    const showSuccess = (msg) => {
        setResultType('success');
        setResult(msg);
    };

    const handleDelete = async () => {
        if (!furnishVal) {
            showError("⚠️ Сначала выберите тип отделки (furnish) из списка");
            return;
        }
        setLoading(true);
        try {
            const res = await specialApi.deleteByFurnish(furnishVal);
            if (res.data !== null && res.data !== undefined) {
                showSuccess(`✅ Удалена квартира с ID: ${res.data}`);
            } else {
                showError(`⚠️ Квартир с отделкой "${furnishVal}" не найдено — ничего не удалено`);
            }
        } catch (err) {
            showError("Ошибка: " + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleCount = async () => {
        if (!furnishVal) {
            showError("⚠️ Сначала выберите тип отделки (furnish) из списка");
            return;
        }
        setLoading(true);
        try {
            const res = await specialApi.countByFurnish(furnishVal);
            showSuccess(`📊 Квартир с отделкой "${furnishVal}": ${res.data}`);
        } catch (err) {
            showError("Ошибка: " + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handlePrefix = async () => {
        if (!prefixVal.trim()) {
            showError("⚠️ Введите подстроку для поиска по имени");
            return;
        }
        setLoading(true);
        try {
            const res = await specialApi.byNamePrefix(prefixVal);
            if (res.data.length === 0) {
                showError(`⚠️ Квартир, начинающихся с "${prefixVal}", не найдено`);
            } else {
                showSuccess(`🔍 Найдено квартир: ${res.data.length}`);
            }
        } catch (err) {
            showError("Ошибка: " + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleExpensive = async () => {
        setLoading(true);
        try {
            const res = await specialApi.mostExpensiveWithoutBalcony();
            if (res.data) {
                showSuccess(
                    `🏆 Самая дорогая без балкона: "${res.data.name}" — ${res.data.price} ₽` +
                    ` (комнат: ${res.data.numberOfRooms}, этаж: ${res.data.floor})`
                );
            } else {
                showError("⚠️ Квартир без балкона в базе не найдено");
            }
        } catch (err) {
            showError("Ошибка: " + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleTotal = async () => {
        setLoading(true);
        try {
            const res = await specialApi.totalPrice();
            showSuccess(`💰 Суммарная стоимость всех квартир: ${res.data} ₽`);
        } catch (err) {
            showError("Ошибка: " + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Специальные операции (Функции БД)</h2>

            <div className="space-y-5">
                {/* 1. Удалить по furnish */}
                <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold mb-2">1. Удалить одну квартиру по типу отделки (Furnish)</h3>
                    <div className="flex gap-2">
                        <select
                            className="border p-2 rounded flex-1"
                            value={furnishVal}
                            onChange={e => setFurnishVal(e.target.value)}
                        >
                            <option value="">Выберите furnish...</option>
                            <option value="DESIGNER">DESIGNER</option>
                            <option value="FINE">FINE</option>
                            <option value="NONE">NONE</option>
                            <option value="BAD">BAD</option>
                            <option value="LITTLE">LITTLE</option>
                        </select>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                        >
                            Удалить
                        </button>
                    </div>
                </div>

                {/* 2. Количество по furnish */}
                <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold mb-2">2. Количество квартир по типу отделки</h3>
                    <button
                        onClick={handleCount}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        Рассчитать для: {furnishVal || 'не выбрано'}
                    </button>
                </div>

                {/* 3. Суммарная стоимость */}
                <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold mb-2">3. Суммарная стоимость всех квартир</h3>
                    <button
                        onClick={handleTotal}
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                        Рассчитать общую стоимость
                    </button>
                </div>

                {/* 4. Самая дорогая без балкона */}
                <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold mb-2">4. Самая дорогая квартира без балкона</h3>
                    <button
                        onClick={handleExpensive}
                        disabled={loading}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
                    >
                        Найти
                    </button>
                </div>

                {/* 5. Поиск по префиксу имени */}
                <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold mb-2">5. Квартиры, имя которых начинается с подстроки</h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Введите начало имени..."
                            className="border p-2 rounded flex-1"
                            value={prefixVal}
                            onChange={e => setPrefixVal(e.target.value)}
                        />
                        <button
                            onClick={handlePrefix}
                            disabled={loading}
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                        >
                            Найти
                        </button>
                    </div>
                </div>
            </div>

            {/* Блок результата */}
            {result && (
                <div className={
                    resultType === 'error'
                        ? 'mt-6 p-4 bg-red-50 border border-red-400 rounded text-lg font-mono text-red-800'
                        : 'mt-6 p-4 bg-green-50 border border-green-400 rounded text-lg font-mono text-green-800'
                }>
                    {result}
                </div>
            )}
        </div>
    );
}